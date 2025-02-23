<script setup>
definePageMeta({
  middleware: "auth",
});
import { ref, computed } from "vue";

const { data: allItems } = await useFetch(
  "http://192.168.1.27:8000/api/lost-item"
);
console.log(allItems.value.data);

// ✅ ดึงแค่ 5 รายการล่าสุด
const latestItems = computed(() => {
  return allItems.value.data.slice(-5).reverse();
});

import { createApp } from "vue/dist/vue.esm-bundler";
async function edit(id_form) {
  const container = document.createElement("div");
  const allItems = await $fetch("http://192.168.1.27:8000/api/lost-item");
  console.log(allItems);
  let data_item;
  try {
    data_item = allItems.data.filter((e) => e.id === id_form);
    console.log(data_item);
  } catch (error) {
    console.log(error);
  }

  const app = createApp({
    setup() {
      const test = computed(() => ({
        cash: "เงินสด",
        glass: "แก้วน้ำ",
        bottle: "ขวดน้ำ",
        tablet: "แท็บเล็ต",
        ipad: "ไอแพด",
        power_bank: "พาวเวอร์แบงค์",
        glasses: "แว่นตา",
        mobile: "โทรศัพท์มือถือ",
        notebook: "โน้ตบุ๊ก",
        bag: "กระเป๋า",
        wallet: "กระเป๋าสตางค์",
        key: "กุญแจ",
        watch: "นาฬิกา",
        card: "บัตรต่างๆ",
        stylus_pen: "ปากกาสไตลัส",
        charging_cable: "สายชาร์จ",
        book: "หนังสือ",
        earphones: "หูฟัง",
        hdd_external: "ฮาร์ดดิสก์ภายนอก",
        flash_drive: "แฟลชไดรฟ์",
        other: "อื่น ๆ",
      }));

      return { test };
    },
    data() {
      return {
        data_item,
      };
    },
    computed() {},
    template: `
        <div class="grid grid-cols-1   gap-5">
          <div
            v-for="data in data_item"
            :key="data.id"
            class="bg-white shadow-lg rounded-xl p-5 border border-gray-200"
          >
            <h1 class="text-xl font-semibold text-blue-600">รหัสของหายที่: {{ data.id }}</h1>
            <p class="text-gray-700"><span class="font-semibold">ชื่อผู้แจ้ง:</span> {{ data.name }}</p>
            <p class="text-gray-700"><span class="font-semibold">เบอร์โทร:</span> {{ data.phone }}</p>
            <p class="text-gray-700"><span class="font-semibold">ประเภท:</span> {{ test[data.category] }}</p>
            <p class="text-gray-700"><span class="font-semibold">รายละเอียด:</span> {{ data.detail }}</p>
          </div>
        </div>
    `,
  });
  app.mount(container);

  Swal.fire({
    title: "รายละเอียด",
    html: container,
    width: "500px",
    showCancelButton: true,
    confirmButtonText: "คืนสำเส็จ",
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#28a745", // ✅ ปุ่มสีเขียว
    allowOutsideClick: false,
    allowEscapeKey: false,
    didClose: () => {
      app.unmount();
    },
  }).then((result) => {
    if (result.isConfirmed) {
      test();
    }
  });

  async function test() {
    const data = {
      id: id_form,
      status: 2,
    };
    const res = await $fetch("http://192.168.1.27:8000/lost-item/status", {
      method: "PUT",
      body: data,
    });
    await Swal.fire({
      title: "อัปเดตสถานะเรียบร้อย",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    reloadNuxtApp({ ttl: 1 });
  }
}
async function deleteItem(id) {
  const confirmDelete = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "ข้อมูลจะถูกลบถาวร!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ใช่, ลบเลย!",
    cancelButtonText: "ยกเลิก",
  });

  if (!confirmDelete.isConfirmed) return;

  try {
    const response = await fetch(
      `http://192.168.1.27:8000/api/lost-item/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (response.ok) {
      await Swal.fire("ลบสำเร็จ!", "ข้อมูลถูกลบแล้ว", "success");
      location.reload(); // รีเฟรชหน้าเว็บ
    } else {
      Swal.fire("เกิดข้อผิดพลาด!", result.error || "ลบไม่สำเร็จ", "error");
    }
  } catch (error) {
    Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบข้อมูลได้", "error");
  }
}
const test = computed(() => ({
  cash: "เงินสด",
  glass: "แก้วน้ำ",
  bottle: "ขวดน้ำ",
  tablet: "แท็บเล็ต",
  ipad: "ไอแพด",
  power_bank: "พาวเวอร์แบงค์",
  glasses: "แว่นตา",
  mobile: "โทรศัพท์มือถือ",
  notebook: "โน้ตบุ๊ก",
  bag: "กระเป๋า",
  wallet: "กระเป๋าสตางค์",
  key: "กุญแจ",
  watch: "นาฬิกา",
  card: "บัตรต่างๆ",
  stylus_pen: "ปากกาสไตลัส",
  charging_cable: "สายชาร์จ",
  book: "หนังสือ",
  earphones: "หูฟัง",
  hdd_external: "ฮาร์ดดิสก์ภายนอก",
  flash_drive: "แฟลชไดรฟ์",
  other: "อื่น ๆ",
}));
const test2 = computed(() => ({
  1: "กำลังรอเจ้าของมารับ",
  2: "ส่งคืนสำเร็จ",
}));
</script>

<template>
  <div class="min-h-[100vh]">
    <HamburgerMenuAdmin />
    <div class="md:py-[2rem] py-3 px-3 md:px-[3rem]">
      <div>
        <h1 class="text-[4rem]">ยินดีต้อนรับเข้าสู่</h1>
        <p class="text-[2rem]">ระบบแจ้งของหาย</p>
      </div>
      <div class="grid grid-cols-2 gap-4 md:gap-6">
        <nuxt-link to="/admin/Form">
          <div
            class="bg-gradient-to-r from-blue-200 to-blue-600 text-white rounded-2xl h-[150px] flex items-center justify-center cursor-pointer transition transform shadow-xl backdrop-blur-md hover:shadow-2xl hover:scale-105 hover:rotate-1"
          >
            <p class="text-2xl font-semibold drop-shadow-md">📢 แจ้งของหาย</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/admin/oficer_edit">
          <div
            class="bg-gradient-to-r from-blue-300 to-blue-600 text-white rounded-2xl h-[150px] flex items-center justify-center cursor-pointer transition transform shadow-xl backdrop-blur-md hover:shadow-2xl hover:scale-105 hover:-rotate-1"
          >
            <p class="text-2xl font-semibold text-center drop-shadow-md">
              📋 รายการของหาย
            </p>
          </div>
        </nuxt-link>
      </div>
      <div class="mt-[2rem] mb-2">
        <p class="my-2 text-2xl">5 รายการล่าสุด</p>
        <div class="rounded-lg overflow-x-auto hidden md:block">
          <table class="w-full hidden md:table">
            <thead>
              <tr class="bg-amber-200 text-gray-700 text-sm">
                <th
                  class="border-r border-amber-400 p-3 text-center text-[1.4rem]"
                >
                  #
                </th>
                <th
                  class="border-r border-amber-400 p-3 text-center text-[1.4rem]"
                >
                  หมวดหมู่
                </th>
                <th
                  class="border-r border-amber-400 p-3 text-center text-[1.4rem]"
                >
                  รูปภาพ
                </th>
                <th
                  class="border-r border-amber-400 p-3 text-center text-[1.4rem]"
                >
                  วันที่พบ
                </th>
                <th
                  class="border-r border-amber-400 p-3 text-center text-[1.4rem]"
                >
                  สถานที่
                </th>
                <th
                  class="border-r border-amber-400 p-3 text-center text-[1.4rem]"
                >
                  สถานะ
                </th>
                <th class="p-3 text-center text-[1.4rem]">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in latestItems"
                :key="item.id"
                class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                <td
                  class="border-r border-amber-100 p-3 text-left text-[1.2rem]"
                >
                  0{{ item.id }}
                </td>
                <td
                  class="border-r border-amber-100 p-3 text-left text-[1.2rem]"
                >
                  {{ test[item.category] }}
                </td>
                <td
                  class="border-r border-amber-100 p-3 text-left w-[200px] text-[1.2rem]"
                >
                  <img
                    v-if="item.picture"
                    class="object-cover w-[150px] h-[150px] rounded-md shadow-sm"
                    :src="'http://192.168.1.27:8000' + item.picture"
                    alt="Lost Item"
                  />
                </td>
                <td
                  class="border-r border-amber-100 p-3 text-left text-[1.2rem]"
                >
                  {{ new Date(item.date).toLocaleDateString() }}
                </td>
                <td
                  class="border-r border-amber-100 p-3 text-left text-[1.2rem]"
                >
                  {{ item.location }}
                </td>
                <td
                  class="border-r border-amber-100 p-3 font-semibold text-[1.2rem] text-center"
                  :class="item.status === 2 ? 'text-green-500' : 'text-red-500'"
                >
                  {{ test2[item.status] }}
                </td>
                <td class="p-3 text-left text-[1.2rem] min-w-[210px]">
                  <div
                    class="grid gap-2 mt-3 justify-center"
                    :class="item.status === 2 ? '!grid-cols-1' : 'grid-cols-2'"
                  >
                    <button
                      v-if="item.status === 1"
                      @click="edit(item.id)"
                      class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                      ✏️ แก้ไข
                    </button>

                    <button
                      @click="deleteItem(item.id)"
                      class="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                    >
                      🗑️ ลบ
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            v-for="item in latestItems"
            :key="item.id"
            class="md:hidden bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-300"
          >
            <p class="text-sm text-gray-500 text-center">#0{{ item.id }}</p>
            <p class="text-lg font-semibold text-gray-800">
              {{ test[item.category] }}
            </p>
            <div v-if="item.picture" class="my-2 text-center">
              <img
                class="object-cover w-full h-[200px] md:h-[150px] rounded-md shadow-sm"
                :src="'http://192.168.1.27:8000' + item.picture"
                alt="Lost Item"
              />
            </div>
            <p>
              <span class="font-semibold">รายละเอียด:</span> {{ item.detail }}
            </p>
            <p>
              <span class="font-semibold">วันที่พบ:</span>
              {{ new Date(item.date).toLocaleDateString() }}
            </p>
            <p>
              <span class="font-semibold">สถานที่:</span> {{ item.location }}
            </p>
            <p
              class="font-semibold mt-2"
              :class="item.status === 2 ? 'text-green-500' : 'text-red-500'"
            >
              {{ test2[item.status] }}
            </p>
          </div>
        </div>
        <div
          v-for="item in latestItems"
          :key="item.id"
          class="md:hidden bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-300"
        >
          <p class="text-sm text-gray-500 text-center">#0{{ item.id }}</p>
          <p class="text-lg font-semibold text-gray-800">
            {{ test[item.category] }}
          </p>
          <div v-if="item.picture" class="my-2 text-center">
            <img
              class="object-cover w-full h-[200px] md:h-[150px] rounded-md shadow-sm"
              :src="'http://192.168.1.27:8000' + item.picture"
              alt="Lost Item"
            />
          </div>
          <p>
            <span class="font-semibold">รายละเอียด:</span> {{ item.detail }}
          </p>
          <p>
            <span class="font-semibold">วันที่พบ:</span>
            {{ new Date(item.date).toLocaleDateString() }}
          </p>
          <p><span class="font-semibold">สถานที่:</span> {{ item.location }}</p>
          <p
            class="font-semibold mt-2"
            :class="item.status === 2 ? 'text-green-500' : 'text-red-500'"
          >
            {{ test2[item.status] }}
          </p>
          <div
            class="grid gap-2 mt-3 justify-center"
            :class="item.status === 2 ? '!grid-cols-1' : 'grid-cols-2'"
          >
            <button
              v-if="item.status === 1"
              @click="edit(item.id)"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              ✏️ แก้ไข
            </button>

            <button
              @click="deleteItem(item.id)"
              class="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
              🗑️ ลบ
            </button>
          </div>
        </div>
      </div>
      <div class="flex">
        <p
          class="bg-blue-200 p-3 rounded-2xl text-[16px] border border-blue-700"
        >
          สามารถไปแจ้งรับ/แจ้งของหายได้ที่ <br />
          ฝ่ายไอที - คณะวิทยาศาสตร์และเทคโนโลยี: ชั้น 2
        </p>
      </div>
    </div>
  </div>
</template>
