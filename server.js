import { createServer as createHttpServer } from "http";
import { createServer as createHttpsServer } from "https";
import { readFileSync, existsSync, createReadStream } from "fs";
import { stat } from "fs/promises";
import { join, resolve, extname } from "path";
import { createRequire } from "module";
import mime from "mime-types";

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
  ".txt": "text/plain",
  ".xml": "application/xml",
};

export async function startServer(appInstance) {
  const dev = process.env.NODE_ENV !== "production";
  const allowedOriginsEnv =
    process.env.ALLOWED_ORIGINS || process.env.NEXT_ALLOWED_ORIGIN || "*";
  const allowedOrigins = allowedOriginsEnv
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  const allowAll = allowedOrigins.includes("*");
  const sslKeyPath = process.env.SSL_KEY_PATH;
  const sslCertPath = process.env.SSL_CERT_PATH;
  try {
    // Only serve prebuilt static assets when the expected build output exists.
    // The `_static` directory includes a placeholder `index.html` in version control,
    // so check for the Next.js `_next` directory to ensure a real build is present.
    if (
      !dev &&
      existsSync(join(staticDir, "index.html")) &&
      existsSync(join(staticDir, "_next"))
    ) {
      const requestHandler = async (req, res) => {
        const origin = req.headers.origin;
        const corsOrigin = allowAll
          ? "*"
          : origin && allowedOrigins.includes(origin)
          ? origin
          : null;
        if (!allowAll && allowedOrigins.length > 0 && origin && !corsOrigin) {
          res.statusCode = 403;
          res.end("Forbidden");
          return;
        }
        if (req.method === "OPTIONS") {
          if (corsOrigin) {
            res.writeHead(204, {
              "Access-Control-Allow-Origin": corsOrigin,
              "Access-Control-Allow-Methods": "GET,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            });
          } else if (allowAll) {
            res.writeHead(204, {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            });
          } else {
            res.writeHead(204);
          }
          res.end();
          return;
        }
        if (corsOrigin) {
          res.setHeader("Access-Control-Allow-Origin", corsOrigin);
        } else if (allowAll) {
          res.setHeader("Access-Control-Allow-Origin", "*");
        }
        let urlPath;
        try {
          urlPath = decodeURIComponent(req.url.split("?")[0]);
        } catch {
          res.statusCode = 404;
          res.end("Not found");
          return;
        }
        // Prevent `path.join` from discarding `staticDir` when `urlPath` is absolute
        const safePath = urlPath.replace(/^\/+/g, "");
        let filePath = join(staticDir, safePath);
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
            mimeTypes[ext] || mime.lookup(ext) || "application/octet-stream",
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
      const origin = req.headers.origin;
      const corsOrigin = allowAll
        ? "*"
        : origin && allowedOrigins.includes(origin)
        ? origin
        : null;
      if (!allowAll && allowedOrigins.length > 0 && origin && !corsOrigin) {
        res.statusCode = 403;
        res.end("Forbidden");
        return;
      }
      if (req.method === "OPTIONS") {
        if (corsOrigin) {
          res.writeHead(204, {
            "Access-Control-Allow-Origin": corsOrigin,
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          });
        } else if (allowAll) {
          res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          });
        } else {
          res.writeHead(204);
        }
        res.end();
        return;
      }
      if (corsOrigin) {
        res.setHeader("Access-Control-Allow-Origin", corsOrigin);
      } else if (allowAll) {
        res.setHeader("Access-Control-Allow-Origin", "*");
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
