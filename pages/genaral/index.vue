<script setup>
import { ref, computed } from "vue";

const { data: allItems } = await useFetch(
  "http://192.168.1.27:8000/api/lost-item"
);
console.log(allItems.value.data);

// ✅ ดึงแค่ 5 รายการล่าสุด
const latestItems = computed(() => {
  return allItems.value.data.slice(-5).reverse();
});
const test2 = computed(() => ({
  1: "กำลังรอเจ้าของมารับ",
  2: "ส่งคืนสำเร็จ",
}));

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
</script>

<template>
  <div class="min-h-[100vh]">
    <HamburgerMenu />
    <div class="md:py-[2rem] py-3 px-3 md:px-[3rem]">
      <div>
        <h1 class="text-[4rem]">ยินดีต้อนรับเข้าสู่</h1>
        <p class="text-[2rem]">ระบบแจ้งของหาย</p>
      </div>
      <div class="grid grid-cols-2 gap-4 md:gap-6">
        <nuxt-link to="/genaral/Form">
          <div
            class="bg-gradient-to-r from-blue-200 to-blue-600 text-white rounded-2xl h-[150px] flex items-center justify-center cursor-pointer transition transform shadow-xl backdrop-blur-md hover:shadow-2xl hover:scale-105 hover:rotate-1"
          >
            <p class="text-2xl font-semibold drop-shadow-md">📢 แจ้งของหาย</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/genaral/lostitems">
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

        <div class="rounded-lg overflow-x-auto shadow">
          <table
            class="w-full shadow-md rounded-lg overflow-hidden hidden md:table"
          >
            <thead>
              <tr class="bg-amber-200 text-gray-700 text-sm">
                <th
                  class="border-r text- border-amber-400 p-3 text-center text-[1.4rem]"
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
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in latestItems"
                :key="item.id"
                class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                <td
                  class="border-r border-amber-100 p-3 text-center text-[1.2rem]"
                >
                  0{{ item.id }}
                </td>
                <td
                  class="border-r border-amber-100 p-3 text-[1.2rem] text-center"
                >
                  {{ test[item.category] }}
                </td>
                <td
                  class="border-r border-amber-100 p-3 w-[200px] text-center text-[1.2rem]"
                >
                  <img
                    v-if="item.picture"
                    class="object-cover w-[200px] h-[200px] rounded-md shadow-sm"
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
              </tr>
            </tbody>
          </table>

          <!-- Mobile View (Stack Mode) -->
          <div
            v-for="item in latestItems"
            :key="item.id"
            class="md:hidden bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-300"
          >
            <p class="text-sm text-gray-500 text-center">#0{{ item.id }}</p>
            <p class="text-lg font-semibold text-gray-800 text-center">
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
            <td
              class="border-r border-amber-100 p-3 font-semibold text-[1.2rem]"
              :class="item.status === 2 ? 'text-green-500' : 'text-red-500'"
            >
              {{ test2[item.status] }}
            </td>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
