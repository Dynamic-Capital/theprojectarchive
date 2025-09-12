import { createServer as createHttpServer } from "http";
import { createServer as createHttpsServer } from "https";
import { readFileSync, existsSync, createReadStream } from "fs";
import { stat } from "fs/promises";
import { join, resolve, extname } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const port = process.env.PORT || 3000;

// Static assets are built into the repository root "_static" directory
const staticDir = resolve(new URL("./_static", import.meta.url).pathname);
const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

export async function startServer(appInstance) {
  const dev = process.env.NODE_ENV !== "production";
  const allowedOrigin = process.env.NEXT_ALLOWED_ORIGIN;
  const sslKeyPath = process.env.SSL_KEY_PATH;
  const sslCertPath = process.env.SSL_CERT_PATH;
  try {
    if (!dev && existsSync(staticDir)) {
      const requestHandler = async (req, res) => {
        if (
          allowedOrigin &&
          req.headers.origin &&
          req.headers.origin !== allowedOrigin
        ) {
          res.statusCode = 403;
          res.end("Forbidden");
          return;
        }
        if (req.method === "OPTIONS") {
          if (allowedOrigin) {
            res.writeHead(204, {
              "Access-Control-Allow-Origin": allowedOrigin,
              "Access-Control-Allow-Methods": "GET,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            });
          } else {
            res.writeHead(204);
          }
          res.end();
          return;
        }
        if (allowedOrigin) {
          res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
        }
        let urlPath;
        try {
          urlPath = decodeURIComponent(req.url.split("?")[0]);
        } catch {
          res.statusCode = 404;
          res.end("Not found");
          return;
        }
        let filePath = join(staticDir, urlPath);
        const resolvedPath = resolve(filePath);
        if (!resolvedPath.startsWith(staticDir)) {
          res.statusCode = 403;
          res.end("Forbidden");
          return;
        }
        try {
          const stats = await stat(resolvedPath);
          let finalPath = resolvedPath;
          if (stats.isDirectory()) {
            finalPath = join(resolvedPath, "index.html");
          }
          const ext = extname(finalPath);
          res.setHeader(
            "Content-Type",
            mimeTypes[ext] || "application/octet-stream",
          );
          createReadStream(finalPath).pipe(res);
        } catch {
          res.statusCode = 404;
          res.end("Not found");
        }
      };

      const server =
        sslKeyPath && sslCertPath
          ? createHttpsServer(
              { key: readFileSync(sslKeyPath), cert: readFileSync(sslCertPath) },
              requestHandler,
            )
          : createHttpServer(requestHandler);

      server.on("error", (err) => {
        console.error("Server error:", err);
      });

      server.listen(port, () => {
        const protocol = sslKeyPath && sslCertPath ? "https" : "http";
        console.log(`> Ready on ${protocol}://localhost:${port}`);
      });
      return server;
    }

    const app =
      appInstance ||
      require("./next-app/node_modules/next")({ dev, dir: "./next-app" });
    const handle = app.getRequestHandler();
    await app.prepare();

    const requestHandler = (req, res) => {
      if (
        allowedOrigin &&
        req.headers.origin &&
        req.headers.origin !== allowedOrigin
      ) {
        res.statusCode = 403;
        res.end("Forbidden");
        return;
      }
      if (req.method === "OPTIONS") {
        if (allowedOrigin) {
          res.writeHead(204, {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          });
        } else {
          res.writeHead(204);
        }
        res.end();
        return;
      }
      if (allowedOrigin) {
        res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
      }
      handle(req, res);
    };

    const server =
      sslKeyPath && sslCertPath
        ? createHttpsServer(
            { key: readFileSync(sslKeyPath), cert: readFileSync(sslCertPath) },
            requestHandler,
          )
        : createHttpServer(requestHandler);

    server.on("error", (err) => {
      console.error("Server error:", err);
    });

    server.listen(port, () => {
      const protocol = sslKeyPath && sslCertPath ? "https" : "http";
      console.log(`> Ready on ${protocol}://localhost:${port}`);
    });
    return server;
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== "test") {
  startServer();
}
