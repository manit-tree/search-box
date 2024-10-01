import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [cssInjectedByJsPlugin()],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        outDir: './dist/search-box',
        minify: true,
        sourcemap: false,
        emptyOutDir: false,   

        lib: {
            entry: './modules/search-box/index.js',
            name:'search_box',
            formats: ['iife'],
            fileName: (format) => `[name].min.js`
        }
    }
})