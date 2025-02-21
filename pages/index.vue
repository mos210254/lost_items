<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");

// ใช้ Cookie แทน LocalStorage
const isLoggedIn = useCookie("isLoggedIn");
const adminName = useCookie("adminName");

const login = async () => {
  errorMessage.value = "";

  try {
    const admins = await $fetch("http://192.168.1.26:8000/api/admin");

    const admin = admins.find(
      (a) => a.username === username.value && a.password === password.value
    );

    if (admin) {
      // ตั้งค่า Cookie
      isLoggedIn.value = "true";
      adminName.value = admin.name;

      await Swal.fire({
        title: "เข้าสู่ระบบสำเร็จ",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      router.push("/admin/oficer_main"); // ไปหน้าหลักของแอดมิน
    } else {
      Swal.fire({
        title: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        icon: "warning",
        timer: 1000,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }
  } catch (error) {
    console.error("❌ Error logging in:", error);
    errorMessage.value = "เกิดข้อผิดพลาด กรุณาลองใหม่";
  }
};
</script>

<template>
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center"
  >
    <div
      class="w-full max-w-md bg-white p-6 rounded-lg shadow-md dark:bg-gray-800"
    >
      <h1
        class="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white"
      >
        เข้าสู่ระบบ
      </h1>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-white"
            >ชื่อผู้ใช้</label
          >
          <input
            v-model="username"
            type="text"
            class="input-field"
            placeholder="กรอกชื่อผู้ใช้"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-white"
            >รหัสผ่าน</label
          >
          <input
            v-model="password"
            type="password"
            class="input-field"
            placeholder="••••••••"
            required
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
}
</style>
