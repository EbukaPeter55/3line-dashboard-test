/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_DOMAINS_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
