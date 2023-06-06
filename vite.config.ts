import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteTsconfigPaths(),
        svgrPlugin(),
        splitVendorChunkPlugin(),
    ],
    server: {
        host: true,
        port: 3000,
        watch: {
            usePolling: true,
        },
    },
    build: {
        chunkSizeWarningLimit: 5000,
    },
});
