import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      mode === "analyze"
        ? visualizer({ open: true, template: "flamegraph" })
        : null,
    ],
    build: {
      outDir: "build",
      target: "es2022",
      sourcemap: true,

      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "forms",
                test: (id) => {
                  return (
                    id.includes("node_modules") &&
                    ["zod", "react-hook-form"].some((libName) =>
                      id.includes(libName),
                    )
                  );
                },
              },
            ],
          },
        },
      },
    },
  };
});
