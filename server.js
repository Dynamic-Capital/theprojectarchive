import { createServer as createHttpServer } from "http";
import { createServer as createHttpsServer } from "https";
import { readFileSync, existsSync, createReadStream } from "fs";
import { stat } from "fs/promises";
import { createGzip } from "zlib";
import { join, resolve, extname } from "path";
import { createRequire } from "module";
import mime from "mime-types";

const require = createRequire(import.meta.url);


// Determine where prebuilt static assets live. Prefer the repository root
// "_static" directory, but fall back to the Next.js "out" directory if the
// project was built but not exported yet.
function resolveStaticDir() {
  const candidates = [
    resolve(new URL("./_static", import.meta.url).pathname),
    resolve(new URL("./next-app/out", import.meta.url).pathname),
  ];
  for (const dir of candidates) {
    if (existsSync(join(dir, "index.html")) && existsSync(join(dir, "_next"))) {
      return dir;
    }
  }
  return null;
}

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
  if (!process.env.NODE_ENV) {
    console.warn('[Env] NODE_ENV is missing, defaulting to "development"');
    process.env.NODE_ENV = 'development';
  }
  const dev = process.env.NODE_ENV !== "production";
  const port = process.env.PORT || 3000;
  const staticDir = resolveStaticDir();
  let allowedOriginsEnv =
    process.env.ALLOWED_ORIGINS || process.env.NEXT_ALLOWED_ORIGIN;
  if (!allowedOriginsEnv) {
    console.warn(
      '[CORS] ALLOWED_ORIGINS is missing, defaulting to "http://localhost:3000"',
    );
    allowedOriginsEnv = "http://localhost:3000";
  }
  const allowedOrigins = allowedOriginsEnv
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  const allowAll = allowedOrigins.includes("*");
  function handleCors(req, res) {
    const origin = req.headers.origin;
    const corsOrigin = allowAll
      ? "*"
      : origin && allowedOrigins.includes(origin)
      ? origin
      : null;
    if (!allowAll && allowedOrigins.length > 0 && origin && !corsOrigin) {
      res.statusCode = 403;
      res.end("Forbidden");
      return true;
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
      return true;
    }
    if (corsOrigin) {
      res.setHeader("Access-Control-Allow-Origin", corsOrigin);
    } else if (allowAll) {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
    return false;
  }

  function applyRewrites(url) {
    if (url === "/favicon.ico") return "/favicon.svg";
    if (process.env.SERVE_STATIC_EXPORT === "true" && url === "/") {
      return "/index.html";
    }
    return url;
  }
  const sslKeyPath = process.env.SSL_KEY_PATH;
  const sslCertPath = process.env.SSL_CERT_PATH;
  try {
    // Only serve prebuilt static assets when the expected build output exists.
    // The `_static` directory includes a placeholder `index.html` in version control,
    // so check for the Next.js `_next` directory to ensure a real build is present.
    if (!dev && staticDir) {
      const requestHandler = async (req, res) => {
        if (handleCors(req, res)) return;
        let urlPath;
        try {
          urlPath = decodeURIComponent(req.url.split("?")[0]);
        } catch {
          res.statusCode = 404;
          res.end("Not found");
          return;
        }
        urlPath = applyRewrites(urlPath);
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
            if (ext === ".html") {
              res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
            } else {
              res.setHeader(
                "Cache-Control",
                "public, max-age=31536000, immutable",
              );
            }
            const accept = req.headers["accept-encoding"] || "";
            if (accept.includes("gzip")) {
              res.setHeader("Content-Encoding", "gzip");
              createReadStream(finalPath).pipe(createGzip()).pipe(res);
            } else {
              createReadStream(finalPath).pipe(res);
            }
        } catch {
            const indexPath = join(staticDir, "index.html");
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
            const accept = req.headers["accept-encoding"] || "";
            if (accept.includes("gzip")) {
              res.setHeader("Content-Encoding", "gzip");
              createReadStream(indexPath).pipe(createGzip()).pipe(res);
            } else {
              createReadStream(indexPath).pipe(res);
            }
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
      if (handleCors(req, res)) return;
      const [pathname, qs] = req.url.split("?", 2);
      const rewritten = applyRewrites(pathname);
      req.url = qs ? `${rewritten}?${qs}` : rewritten;
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
