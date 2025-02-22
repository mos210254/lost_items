<script setup>
import { ref, computed } from "vue";
const { data: allItems } = await useFetch(
  "http://192.168.1.27:8000/api/lost-item"
);
console.log(allItems.value.data);

const itemsPerPage = 5; // ✅ แสดง 10 รายการต่อหน้า
const currentPage = ref(1); // ✅ หน้าปัจจุบัน

const paginatedItems = computed(() => {
  const dataToShow = filteredItems.value.length
    ? filteredItems.value
    : allItems.value.data;
  const start = (currentPage.value - 1) * itemsPerPage;
  return dataToShow.slice(start, start + itemsPerPage);
});

// ✅ คำนวณจำนวนหน้าทั้งหมด
const totalPages = computed(() =>
  Math.ceil(allItems.value.data.length / itemsPerPage)
);

// ✅ เปลี่ยนหน้า
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const input_data = ref(null);
const selectedDay = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);

const days = ref(Array.from({ length: 31 }, (_, i) => i + 1));
const months = ref([
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
]);
const years = ref([2024, 2025]);

const selectedCategory = ref("");

const categoriesTH = ref({
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
});
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

const filteredItems = ref([]);

const selectedStatus = ref(0); // เปลี่ยนจาก null เป็น ""

function data_serach() {
  const keyword = input_data.value?.toLowerCase() || "";
  const category = selectedCategory.value || "";
  const day = selectedDay.value;
  const month = selectedMonth.value;
  const year = selectedYear.value;
  const status = selectedStatus.value;
  console.log(typeof status);

  filteredItems.value = allItems.value.data.filter((item) => {
    const itemDate = new Date(item.date);
    const itemDay = itemDate.getDate();
    const itemMonth = itemDate.getMonth() + 1; // เดือนใน JavaScript เริ่มที่ 0
    const itemYear = itemDate.getFullYear();

    return (
      (!keyword ||
        item.id.toString().includes(keyword) ||
        item.detail.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword)) &&
      (!category || item.category === category) &&
      (!day || itemDay === day) &&
      (!month || itemMonth === months.value.indexOf(month) + 1) &&
      (!year || itemYear === year) &&
      (!status || Number(status) === item.status)
    );
  });
  if (filteredItems.value && filteredItems.value.length > 0) {
    console.log("ผลลัพธ์ที่ค้นหา", filteredItems.value);
  } else {
    Swal.fire({
      title: "ไม่พบสิ่งของ",
      text: "กรุณาตรวจสอบคำค้นหา!",
      icon: "warning",
      timer: 1000,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }
}

function btn_reset() {
  input_data.value = null;
  selectedDay.value = null;
  selectedMonth.value = null;
  selectedYear.value = null;
  selectedCategory.value = null;
  filteredItems.value = [];
  reloadNuxtApp({ ttl: 1 });
}
</script>

<template>
  <div class="min-h-[100vh]">
    <HamburgerMenu />
    <div class="md:py-[2rem] py-3 px-3 md:px-[3rem]">
      <div>
        <h1 class="text-[4rem]">ยินดีต้อนรับเข้าสู่</h1>
        <p class="text-[2rem]">รายการของหาย</p>
      </div>
      <div class="grid md:grid-cols-2 gap-[3rem]">
        <div class="flex flex-col gap-5 p-4 bg-white shadow rounded-lg">
          <!-- 🔍 ค้นหา -->
          <div class="flex flex-col">
            <label for="Search" class="text-2xl font-medium text-gray-700"
              >ค้นหา</label
            >
            <input
              v-model="input_data"
              id="Search"
              type="text"
              placeholder="พิมพ์เพื่อค้นหา..."
              class="!outline-none p-2 border-2 rounded-md border-blue-200"
            />
          </div>

          <!-- 📅 เลือกวันที่ -->
          <div class="flex flex-col gap-2">
            <label for="data_search" class="text-2xl font-medium text-gray-700">
              วันที่สูญของหาย(dd/mm/yy)
            </label>
            <div id="data_search" class="flex flex-wrap gap-2">
              <!-- Select วันที่ -->
              <select
                v-model="selectedDay"
                class="!outline-none p-2 border-2 rounded-md border-amber-200"
              >
                <option v-for="day in days" :key="day" :value="day">
                  {{ day }}
                </option>
              </select>

              <span>-</span>

              <!-- Select เดือน -->
              <select
                v-model="selectedMonth"
                class="!outline-none p-2 border-2 rounded-md border-amber-200"
              >
                <option
                  v-for="(month, index) in months"
                  :key="index"
                  :value="index + 1"
                >
                  {{ month }}
                </option>
              </select>

              <span>-</span>

              <!-- Select ปี -->
              <select
                v-model="selectedYear"
                class="!outline-none p-2 border-2 rounded-md border-amber-200"
              >
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div
          id="Search"
          class="flex flex-col gap-5 p-4 bg-white shadow rounded-lg"
        >
          <!-- 🔎 ค้นหาด้วยหมวดหมู่ -->
          <div class="flex flex-col">
            <label for="category" class="text-2xl font-medium text-gray-700">
              ค้นหาด้วยหมวดหมู่
            </label>
            <select
              id="category"
              v-model="selectedCategory"
              class="!outline-none p-2 border-2 rounded-md border-blue-200"
            >
              <option value="" disabled selected>เลือกหมวดหมู่</option>
              <option
                v-for="(label, value) in categoriesTH"
                :key="value"
                :value="value"
              >
                {{ label }}
              </option>
            </select>
          </div>
          <select v-model="selectedStatus" class="!outline-none p-2 border-2 rounded-md border-amber-200">
            <option value="">-- สถานะทั้งหมด --</option>
            <option value="1">กำลังรอเจ้าของมารับ</option>
            <option value="2">ส่งคืนสำเร็จ</option>
          </select>

          <!-- 🔘 ปุ่มค้นหา & รีเซ็ต -->
          <div id="btn" class="flex flex-wrap gap-3">
            <button
              @click="data_serach()"
              class="cursor-pointer px-5 py-2 bg-amber-500 text-white rounded-md  hover:bg-amber-600 transition"
            >
              ค้นหา
            </button>
            <button
              @click="btn_reset()"
              class="cursor-pointer px-5 py-2 bg-gray-300 text-gray-700 rounded-md  hover:bg-gray-400 transition"
            >
              ค่าเริ่มต้น
            </button>
          </div>
        </div>
      </div>

      <div class="mt-[2rem]">
        <div class="overflow-x-auto rounded-lg shadow">
          <table
            class="w-full shadow-md rounded-lg overflow-hidden hidden md:table"
          >
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
                  รายละเอียด
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
                v-for="item in paginatedItems"
                :key="item.id"
                class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                <td
                  class="border-r border-amber-100 p-3 text-center text-[1.2rem]"
                >
                  0{{ item.id }}
                </td>
                <td
                  class="border-r border-amber-100 p-3 text-center text-[1.2rem]"
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
                <td class="border-r border-amber-100 p-3 text-[1.2rem]">
                  {{ item.detail }}
                </td>
                <td class="border-r border-amber-100 p-3 text-[1.2rem]">
                  {{ new Date(item.date).toLocaleDateString() }}
                </td>
                <td class="border-r border-amber-100 p-3 text-[1.2rem]">
                  {{ item.location }}
                </td>
                <td
                  class="border-r border-amber-100 p-3 font-semibold text-[1.2rem] text-center min-w-max"
                  :class="item.status === 2 ? 'text-green-500' : 'text-red-500'"
                >
                  {{ test2[item.status] }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Mobile View (Stack Mode) -->
          <div
            v-for="item in paginatedItems"
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

          <div
            class="text-2xl text-center w-full"
            v-if="paginatedItems.length === 0"
          >
            <p>ยังไม่มีรายการของหาย</p>
          </div>
        </div>

        <!-- ✅ Pagination Controls -->
        <div class="mt-4 flex justify-center items-center gap-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 mb-5"
          >
            Prev
          </button>

          <button
            v-for="page in totalPages"
            class="mb-5"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-1 rounded',
              currentPage === page
                ? 'bg-blue-500 text-white cursor-pointer'
                : 'bg-gray-200',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="cursor-pointer px-3 py-1 bg-gray-300 rounded disabled:opacity-50 mb-5"
          >
            Next
          </button>
        </div>
      </div>
      <p>
        สามารถไปรับของหายได้ที่ <br />
        ฝ่ายไอที - คณะวิทยาศาสตร์และเทคโนโลยี: ชั้น 2
      </p>
    </div>
  </div>
</template>

<style></style>
