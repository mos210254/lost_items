<script setup>
definePageMeta({
  middleware: "auth",
});
import { ref, computed } from "vue";

const { data: allItems } = await useFetch(
  "http://192.168.1.26:8000/api/lost-item"
);
console.log(allItems.value.data);

// ✅ ดึงแค่ 5 รายการล่าสุด
const latestItems = computed(() => {
  return allItems.value.data.slice(-5).reverse();
});

import { createApp } from "vue/dist/vue.esm-bundler";
async function edit(id_form) {
  const container = document.createElement("div");
  let data_item;
  try {
    data_item = allItems.value.data.filter((e) => e.id === id_form);
    console.log(data_item);
  } catch (error) {
    console.log(error);
  }

  const app = createApp({
    data() {
      return {};
    },
    template: `
      <div>H1</div>
    `,
  });
  app.mount(container);

  Swal.fire({
    title: "แก้ไขอุปกรณ์",
    html: container,
    width: "500px",
    showCancelButton: true,
    confirmButtonText: "บันทึก",
    cancelButtonText: "ยกเลิก",
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
    const res = await $fetch("http://192.168.1.26:8000/lost-item/status", {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/json" },
    });
    await Swal.fire({
      title: "แก้ไขสำเร็จ",
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
      `http://192.168.1.26:8000/api/lost-item/${id}`,
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
      <div class="grid grid-cols-2 gap-2">
        <nuxt-link to="/admin/Form">
          <div
            class="bg-[#C6E7FF] shadow-md rounded-2xl h-[150px] items-center flex justify-center cursor-pointer"
          >
            <p class="text-[2rem]">แจ้งของหาย</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/admin/oficer_edit">
          <div
            class="bg-[#C6E7FF] shadow-md rounded-2xl h-[150px] items-center flex justify-center cursor-pointer"
          >
            <p class="text-[2rem] text-center">รายการของหาย</p>
          </div>
        </nuxt-link>
      </div>
      <div class="mt-[2rem] mb-2">
        <p class="my-2 text-2xl">5 รายการล่าสุด</p>
        <div
          class="border border-gray-300 shadow-md rounded-lg overflow-x-auto hidden md:block"
        >
          <table class="w-full hidden md:table">
            <thead>
              <tr class="bg-amber-200 text-gray-700 text-sm">
                <th class="border-r border-amber-400 p-3 text-left">#</th>
                <th class="border-r border-amber-400 p-3 text-left">
                  หมวดหมู่
                </th>
                <th class="border-r border-amber-400 p-3 text-left">รูปภาพ</th>
                <th class="border-r border-amber-400 p-3 text-left">
                  วันที่พบ
                </th>
                <th class="border-r border-amber-400 p-3 text-left">สถานที่</th>
                <th class="border-r border-amber-400 p-3 text-left">สถานะ</th>
                <th class="border-r border-amber-400 p-3 text-left">แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in latestItems"
                :key="item.id"
                class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                <td class="border-r border-amber-400 p-3 text-left">
                  0{{ item.id }}
                </td>
                <td class="border-r border-amber-400 p-3 text-left">
                  {{ item.category }}
                </td>
                <td class="border-r border-amber-400 p-3 text-left w-[200px]">
                  <img
                    @click="test(item.id)"
                    v-if="item.picture"
                    class="object-cover"
                    width="150px"
                    height="150px"
                    :src="'http://192.168.1.26:8000' + item.picture"
                    alt="Lost Item"
                  />
                </td>
                <td class="border-r border-amber-400 p-3 text-left">
                  {{ new Date(item.date).toLocaleDateString() }}
                </td>
                <td class="border-r border-amber-400 p-3 text-left">
                  {{ item.location }}
                </td>
                <td class="border-r border-amber-400 p-3 text-left">
                  {{ test2[item.status] }}
                </td>
                <td class="border-r border-amber-400 p-3 text-left">
                  <div class="grid grid-cols-2 gap-5">
                    <button @click="edit(item.id)" class="p-2 border">
                      แก้ไข</button
                    ><button @click="deleteItem(item.id)" class="p-2 border">
                      ลบ
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
                :src="'http://192.168.1.26:8000' + item.picture"
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
              :src="'http://192.168.1.26:8000' + item.picture"
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
          <div class="text-center grid grid-cols-2 gap-5">
            <button
              @click="edit(item.id)"
              type="button"
              class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              แก้ไข
            </button>
            <button
              @click="deleteItem(item.id)"
              type="button"
              class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              ลบ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
