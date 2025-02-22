<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  script: [
    { src: "https://kit.fontawesome.com/7126d50135.js" },
    { src: "https://cdn.jsdelivr.net/npm/sweetalert2@11" },
  ],
  
});
</script>
