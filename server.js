import { createServer } from "http";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const next = require("./next-app/node_modules/next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./next-app" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
