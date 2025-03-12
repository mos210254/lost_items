export default function useApiConfig() {
    const config = useRuntimeConfig();
    return {
        BASE_URL: config.public.BASE_URL,
    };
}
