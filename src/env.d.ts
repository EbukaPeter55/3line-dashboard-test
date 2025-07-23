// src/env.d.ts (or vite-env.d.ts)
/// <reference types="vite/client" /> // This line is crucial for Vite's default env types

interface ImportMetaEnv {
    readonly VITE_DOMAINS_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
