// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        setupFiles: ['./test/vitest.setup.ts'], // Path to your setup file
        environment: 'jsdom'
    }
});
