<template>
  <div
    class="lg:hidden z-40 fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md"
  >
    <div class="flex justify-around py-2">
      <!-- Home -->
      <button
        class="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:outline-none"
        @click="navigate('/dashboard')"
      >
        <i class="fa-solid fa-house text-xl"></i>
        <span class="text-sm mt-1">Home</span>
      </button>

      <!-- แจ้งเตือน -->
      <button
        class="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:outline-none"
        @click="navigate('/')"
      >
        <i class="fa-solid fa-paper-plane text-xl"></i>
        <span class="text-sm mt-1">แจ้งเตือน</span>
      </button>

      <!-- โปรไฟล์ -->
      <div class="relative">
        <button
          class="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:outline-none"
          @click="toggleProfileDropdown"
        >
          <div
            class="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
          >
            <img
              src="https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"
              alt="Profile"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="text-sm mt-1">โปรไฟล์</span>
        </button>
        <div
          v-if="isDropdownOpenProfile"
          class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <button
            class="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 min-w-max"
          >
            โปรไฟล์
          </button>
          <button
            class="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 min-w-max"
            @click="logout"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>

      <!-- แจ้งขอ (Toggle Dropdown) -->
      <div class="relative">
        <button
          class="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:outline-none"
          @click="toggleRequestDropdown"
        >
          <i class="fa-solid fa-clipboard text-xl"></i>
          <span class="text-sm mt-1">แจ้ง</span>
        </button>
        <div
          v-if="isDropdownOpenRequest"
          class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <ul class="py-2 text-gray-700">
            <li
              v-for="(item, index) in requestItems"
              :key="index"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer min-w-max"
              @click="navigate(item.route)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>

      <!-- ประวัติการทำรายการ -->
      <button
        class="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:outline-none"
        @click="navigate('/')"
      >
        <i class="fa-solid fa-bars-staggered text-xl"></i>
        <span class="text-sm mt-1">ประวัติ</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomMenu",
  data() {
    return {
      isDropdownOpenRequest: false,
      isDropdownOpenProfile: false,
      requestItems: [
        { label: "แจ้งขอยืมครุภัณฑ์", route: "/FormItem" },
        { label: "แจ้งคืนครุภัณฑ์", route: "/reItem" },
        { label: "แจ้งเข้ารับครุภัณฑ์", route: "/takeitem" },
        { label: "แจ้งขอจองห้อง", route: "/FormRoom" },
      ],
    };
  },
  methods: {
    toggleRequestDropdown() {
      this.isDropdownOpenRequest = !this.isDropdownOpenRequest;
      this.isDropdownOpenProfile = false; // ปิดเมนูโปรไฟล์
    },
    toggleProfileDropdown() {
      this.isDropdownOpenProfile = !this.isDropdownOpenProfile;
      this.isDropdownOpenRequest = false; // ปิดเมนูแจ้ง
    },
    navigate(route) {
      this.isDropdownOpenRequest = false;
      this.isDropdownOpenProfile = false;
      this.$router.push(route);
    },
    logout() {
      console.log("Logging out...");
      this.$router.push("/");
    },
  },
};
</script>
