export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = useCookie("isLoggedIn").value;
  if (!isLoggedIn) {
    return navigateTo("/");
  }
});
