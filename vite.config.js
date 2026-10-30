import { defineConfig, loadEnv } from "vite";
import { handler } from "./server/youcam.mjs";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "YOUCAM_");
  if (env.YOUCAM_API_KEY) process.env.YOUCAM_API_KEY = env.YOUCAM_API_KEY;
  return {
    plugins: [
      {
        name: "youcam-server-api",
        configureServer(server) {
          server.middlewares.use("/api/youcam", (req, res) =>
            handler(req, res),
          );
        },
        configurePreviewServer(server) {
          server.middlewares.use("/api/youcam", (req, res) =>
            handler(req, res),
          );
        },
      },
    ],
  };
});
