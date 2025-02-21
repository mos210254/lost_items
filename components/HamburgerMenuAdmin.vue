<script setup>
import { useCookie } from "#app";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  useCookie("isLoggedIn").value = null;
  router.push("/");
};
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// ปิดเมนูเมื่อคลิกข้างนอก
const closeMenu = (event) => {
  if (!event.target.closest(".menu-container")) {
    isOpen.value = false;
  }
};

// onMounted(() => {
//   document.addEventListener("click", closeMenu);
// });

// onBeforeUnmount(() => {
//   document.removeEventListener("click", closeMenu);
// });
</script>

<template>
  <div class="fixed top-4 right-4 z-50">
    <!-- ปุ่มเปิดเมนู -->
    <button
      @click="toggleMenu()"
      class="p-2 bg-gray-800 text-white rounded-full shadow-lg cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>

    <!-- เมนู -->
    <div
      v-if="isOpen"
      class="menu-container absolute top-12 right-0 bg-white shadow-lg rounded-lg w-40"
    >
      <ul class="py-2">
        <nuxt-link to="/admin/oficer_main">
          <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">หน้าแรก</li>
        </nuxt-link>
        <nuxt-link to="/admin/oficer_edit">
          <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            รายการของหาย
          </li>
        </nuxt-link>
        <nuxt-link to="/admin/Form">
          <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">แจ้งของหาย</li>
        </nuxt-link>
        <nuxt-link to="/admin/add_user">
          <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            จัดการสิทธิ์
          </li>
        </nuxt-link>

        <li
          @click="logout()"
          class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        >
          ออกจากระบบ
        </li>

        <!-- <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">ออกจากระบบ</li> -->
      </ul>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
