import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      mode === "analyze"
        ? visualizer({ open: true, template: "network" })
        : null,
    ],
    resolve: {
      tsconfigPaths: true,
    },
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
