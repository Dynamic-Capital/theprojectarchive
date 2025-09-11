import { createServer } from "http";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const allowedOrigin = process.env.NEXT_ALLOWED_ORIGIN;

export async function startServer(appInstance) {
  try {
    const app =
      appInstance || require("./next-app/node_modules/next")({ dev, dir: "./next-app" });
    const handle = app.getRequestHandler();
    await app.prepare();

    const server = createServer((req, res) => {
      if (allowedOrigin && req.headers.origin && req.headers.origin !== allowedOrigin) {
        res.statusCode = 403;
        res.end("Forbidden");
        return;
      }
      if (allowedOrigin) {
        res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
      }
      handle(req, res);
    });

    server.on("error", (err) => {
      console.error("Server error:", err);
    });

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
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
