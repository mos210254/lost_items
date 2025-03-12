import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            BASE_URL: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:8000", // ค่าพื้นฐาน
        },
    },
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    vite: {
        plugins: [tailwindcss()],
    },
});
