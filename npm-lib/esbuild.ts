import esbuild from 'esbuild';
import path from 'path';

esbuild
    .build({
        entryPoints: [path.resolve(process.cwd(), 'src', 'index.ts')],
        bundle: true,
        outdir: 'build',
        jsx: 'automatic',
        minify: false,
        sourcemap: false,
        format: 'esm',
        external: ['react', 'react-dom', 'react-router'],
    })
    .then(console.log)
    .catch(console.error);
