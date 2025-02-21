<script setup>
definePageMeta({
  middleware: "auth",
});
import { createApp } from "vue/dist/vue.esm-bundler";
const admins = ref([]);

const fetchAdmins = async () => {
  try {
    admins.value = await $fetch("http://192.168.1.26:8000/api/admin");
  } catch (error) {
    console.error("❌ Error fetching admin data:", error);
  }
};

onMounted(fetchAdmins);

async function add_user() {
  const container = document.createElement("div");

  let name = ref(null);
  let username = ref(null);
  let password = ref(null);
  const app = createApp({
    data() {
      return {
        name,
        username,
        password,
      };
    },
    methods: {},
    computed: {},
    template: `
      <div>
        <div class="border bg-[#FEF0C7] p-4">
          <!-- ฟอร์มเพิ่มข้อมูล -->
          <label for="name" class="block text-sm font-medium text-gray-700">ชื่อเจ้าหน้าที่</label>
          <input type="text" id="name" v-model="name" class="mt-1 block w-full p-2 border rounded-md" placeholder="ชื่อ-สกุล">

          <label for="name" class="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
          <input type="text" id="name" v-model="username" class="mt-1 block w-full p-2 border rounded-md" placeholder="username">

          <label for="name" class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
          <input type="text" id="name" v-model="password" class="mt-1 block w-full p-2 border rounded-md" placeholder="password">

        </div>
      </div>
    `,
  });

  // Mount Vue App
  app.mount(container);

  // ใช้ SweetAlert2
  Swal.fire({
    title: "เพิ่มบัญชีเจ้าหน้าที่",
    html: container,
    width: "500px",
    didClose: () => {
      app.unmount();
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Trigger Save action
      // console.log(app._instance.proxy.item);
      test();
    }
  });

  async function test() {
    if (!name || !username || password) {
      await Swal.fire({
        title: "กรอกข้อมูลให้ครบถ้วน",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      return;
    }
    const data = {
      name: name.value,
      username: username.value,
      password: password.value,
    };
    const res = await $fetch("http://192.168.1.26:8000/admin/insert", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    });
    await Swal.fire({
      title: "เพิ่มบัญชีสำเร็จ",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    reloadNuxtApp({ ttl: 1 });
  }
}ยย

async function edit_user(id_user) {
  const container = document.createElement("div");
  console.log("user id:", id_user);
  // ดึงข้อมูลผู้ใช้จาก API
  const userData = await $fetch(`http://192.168.1.26:8000/api/admin`);
  const user = await userData.find((e) => e.id === id_user);
  console.log(user);
  let name = ref(user.name);
  let username = ref(user.username);
  let password = ref(user.password);

  const app = createApp({
    data() {
      return {
        name,
        username,
        password,
      };
    },
    methods: {},
    computed: {},
    template: `
      <div>
        <div class="border bg-[#FEF0C7] p-4">
          <!-- ฟอร์มแก้ไขข้อมูล -->
          <label for="name" class="block text-sm font-medium text-gray-700">ชื่อเจ้าหน้าที่</label>
          <input type="text" id="name" v-model="name" class="mt-1 block w-full p-2 border rounded-md" placeholder="ชื่อ-สกุล">

          <label for="username" class="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
          <input type="text" id="username" v-model="username" class="mt-1 block w-full p-2 border rounded-md" placeholder="username">

          <label for="password" class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
          <input type="text" id="password" v-model="password" class="mt-1 block w-full p-2 border rounded-md" placeholder="password">
        </div>
      </div>
    `,
  });

  // Mount Vue App
  app.mount(container);

  // ใช้ SweetAlert2
  Swal.fire({
    title: "แก้ไขบัญชีเจ้าหน้าที่",
    html: container,
    width: "500px",
    showCancelButton: true,
    confirmButtonText: "บันทึก",
    cancelButtonText: "ยกเลิก",
    didClose: () => {
      app.unmount();
    },
  }).then((result) => {
    if (result.isConfirmed) {
      updateUser();
    }
  });

  async function updateUser() {
    const data = {
      id: id_user,
      name: name.value,
      username: username.value,
      password: password.value,
    };

    const res = await $fetch(`http://192.168.1.26:8000/admin/edit_user`, {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
    await Swal.fire({
      title: "แก้ไขบัญชีสำเร็จ",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    reloadNuxtApp({ ttl: 1 });
  }
}

async function del_user(id_user) {
  if (!id_user) {
    Swal.fire({
      title: "เกิดข้อผิดพลาด",
      text: "ไม่พบ ID ของผู้ใช้",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  // แสดง Pop-up ยืนยันการลบ
  const result = await Swal.fire({
    title: "ยืนยันการลบ",
    text: "คุณต้องการลบผู้ใช้นี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ลบ",
    cancelButtonText: "ยกเลิก",
  });

  if (!result.isConfirmed) return; // ถ้ากดยกเลิกให้หยุดทำงาน

  try {
    const res = await $fetch("http://192.168.1.26:8000/admin/delete_user", {
      method: "DELETE",
      body: { id: id_user },
    });

    await Swal.fire({
      title: "ลบข้อมูลสำเร็จ",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    reloadNuxtApp({ ttl: 1 }); // รีโหลดหน้าเพื่ออัปเดตข้อมูล
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    Swal.fire({
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถลบผู้ใช้ได้",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
  }
}
</script>

<template>
  <div class="container mx-auto p-6">
    <HamburgerMenuAdmin />
    <div class="flex justify-between">
      <div>
        <h1 class="text-2xl font-bold mb-4">บัญชีที่ได้รับอนุญาต</h1>
      </div>
      <div class="flex gap-5">
        <div>
          <button
            @click="add_user()"
            class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            เพิ่ม
          </button>
        </div>
      </div>
    </div>

    <div class="w-full">
      <!-- Desktop Table View -->
      <div class="hidden md:block">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2">ID</th>
              <th class="border p-2">ชื่อ</th>
              <th class="border p-2">Username</th>
              <th class="border p-2">Password</th>
              <th class="border p-2">สร้าง/แก้ไข</th>
              <th class="border p-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="admin in admins"
              :key="admin.id"
              class="hover:bg-gray-50"
            >
              <td class="border p-2 text-center">00{{ admin.id }}</td>
              <td class="border p-2">{{ admin.name }}</td>
              <td class="border p-2">{{ admin.username }}</td>
              <td class="border p-2">{{ admin.password }}</td>
              <td class="border p-2">
                {{ new Date(admin.created_at).toLocaleString() }}
              </td>
              <td class="border p-2">
                <div class="grid grid-cols-2 gap-2">
                  <button
                    @click="edit_user(admin.id)"
                    class="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 border border-amber-700 rounded"
                  >
                    แก้ไข
                  </button>
                  <button
                    @click="del_user(admin.id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                  >
                    ลบ
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Stack Mode -->
      <div class="md:hidden">
        <div
          v-for="admin in admins"
          :key="admin.id"
          class="bg-white shadow-md rounded-lg p-4 mb-4 border"
        >
          <p class="text-gray-700"><strong>ID:</strong> 00{{ admin.id }}</p>
          <p class="text-gray-700"><strong>ชื่อ:</strong> {{ admin.name }}</p>
          <p class="text-gray-700">
            <strong>Username:</strong> {{ admin.username }}
          </p>
          <p class="text-gray-700">
            <strong>Password:</strong> {{ admin.password }}
          </p>
          <p class="text-gray-700">
            <strong>สร้าง/แก้ไข:</strong>
            {{ new Date(admin.created_at).toLocaleString() }}
          </p>
          <div class="mt-3 flex gap-2">
            <button
              @click="edit_user(admin.id)"
              class="flex-1 bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 border border-amber-700 rounded"
            >
              แก้ไข
            </button>
            <button
              @click="del_user(admin.id)"
              class="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
            >
              ลบ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
