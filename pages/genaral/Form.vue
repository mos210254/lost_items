<script setup>
import { ref } from "vue";
const isSubmitting = ref(false); // ⏳ ตัวแปรสถานะ
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

const form = ref({
  name: "",
  phone: "",
  category: "",
  details: "",
  date: "",
  location: "",
  status: "1",
  picture: null, // ใช้เก็บไฟล์รูป
});

const botToken = "7524032480:AAEYg7MYKuAbUuM8ZjfouVW0sWhtd7Uw5SA";
const chatId = "-4746763912"; // 👈 ใส่ Chat ID ของกลุ่มหรือผู้ใช้

// 📌 ฟังก์ชันส่งข้อความ (สถานที่ + เวลา)
const sendTelegramMessage = async (message) => {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const result = await response.json();
    console.log("📩 ส่งข้อความสำเร็จ:", result);
  } catch (error) {
    console.error("❌ ส่งข้อความล้มเหลว:", error);
  }
};

// 📌 ฟังก์ชันส่งรูปภาพ (อัปโหลดโดยตรง)
const sendTelegramPhoto = async (photoFile) => {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("photo", photoFile);
  formData.append("caption", "📷 ภาพของหาย");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData, // ✅ ส่งเป็น FormData
    });

    const result = await response.json();
    console.log("📸 ส่งรูปภาพสำเร็จ:", result);
  } catch (error) {
    console.error("❌ ส่งรูปภาพล้มเหลว:", error);
  }
};

const handleFileUpload = (event) => {
  form.value.picture = event.target.files[0]; // เก็บไฟล์ภาพ
};

const validateForm = () => {
  if (!form.value.name) {
    Swal.fire("ต้องมีรูปภาพประกอบ", "กรุณากรอกชื่อ", "info");
    return false;
  }
  if (!form.value.phone) {
    Swal.fire("ต้องมีรูปภาพประกอบ", "กรุณากรอกเบอร์โทร", "info");
    return false;
  }
  if (!form.value.category) {
    Swal.fire("ต้องมีรูปภาพประกอบ", "กรุณาเลือกหมวดหมู่", "info");
    return false;
  }
  if (!form.value.details) {
    Swal.fire("ต้องมีรูปภาพประกอบ", "กรุณากรอกรายละเอียด", "info");
    return false;
  }
  if (!form.value.date) {
    Swal.fire("ต้องมีรูปภาพประกอบ", "กรุณาเลือกวันที่", "info");
    return false;
  }
  if (!form.value.location) {
    Swal.fire("ต้องมีรูปภาพประกอบ", "กรุณากรอกสถานที่", "info");
    return false;
  }
  if (!form.value.picture) {
    Swal.fire("ต้องมีรูปภาพประกอบ", "กรุณาแนบรูปภาพ", "info");
    return false;
  }
  return true;
};

const submitForm = async () => {
  if (!validateForm()) {
    return; // 🛑 หยุดส่ง ถ้ามีข้อผิดพลาด
  }
  isSubmitting.value = true; // 🚫 ปิดปุ่มก่อนส่ง

  const formData = new FormData();
  formData.append("name", form.value.name);
  formData.append("category", form.value.category);
  formData.append("detail", form.value.details);
  formData.append("phone", form.value.phone);
  formData.append("date", form.value.date);
  formData.append("location", form.value.location);
  formData.append("status", "1");

  if (form.value.picture) {
    formData.append("picture", form.value.picture);
  }

  try {
    const response = await fetch("http://192.168.1.27:8000/api/lost-item", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("📩 ข้อความตอบกลับ", result);

    if (result.status === 200) {
      const message = `📢 แจ้งเตือน! พบของหายแล้ว 🎒\n📍 สถานที่: ${
        form.value.location
      }\n⏰ เวลา: ${new Date().toLocaleString()}`;
      await sendTelegramMessage(message);

      if (form.value.picture) {
        await sendTelegramPhoto(form.value.picture);
      }

      const id = result.id;

      await Swal.fire({
        title: "รหัสของหายของคุณคือ: " + id,
        text: "กรุณาติดต่อ: ฝ่ายไอที - คณะวิทยาศาสตร์และเทคโนโลยี: ชั้น 2 เพื่อฝากของ",
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      navigateTo("/genaral");
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error);
    Swal.fire("Error", "Failed to submit report", "error");
  }
};
</script>

<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-gray-400"
  >
    <HamburgerMenu />

    <div class="mx-auto w-full max-w-[550px] bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">
        แจ้งพบของหาย
      </h2>

      <form @submit.prevent="submitForm">
        <!-- ชื่อผู้แจ้ง -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2"
            >ชื่อ-นามสกุล</label
          >
          <input
            type="text"
            v-model="form.name"
            required
            class="w-full rounded-md border-gray-300 py-3 px-4 text-base !outline-none p-2 border-2 transition"
          />
        </div>

        <!-- เบอร์โทร -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2"
            >เบอร์โทรติดต่อ</label
          >
          <input
            type="text"
            v-model="form.phone"
            required
            class="w-full rounded-md border-gray-300 py-3 px-4 text-base !outline-none p-2 border-2 transition"
          />
        </div>

        <!-- หมวดหมู่ของหาย -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2"
            >หมวดหมู่ของหาย</label
          >
          <select
            v-model="form.category"
            class="w-full rounded-md border-gray-300 py-3 px-4 text-base !outline-none p-2 border-2 transition"
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

        <!-- รายละเอียด -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2"
            >รายละเอียดสิ่งของ</label
          >
          <textarea
            v-model="form.details"
            required
            class="w-full rounded-md border-gray-300 py-3 px-4 text-base !outline-none p-2 border-2 transition"
          ></textarea>
        </div>

        <!-- วันที่พบของหาย -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2"
            >วันที่พบของหาย</label
          >
          <input
            type="date"
            v-model="form.date"
            required
            class="w-full rounded-md border-gray-300 py-3 px-4 text-base !outline-none p-2 border-2 transition"
          />
        </div>

        <!-- สถานที่พบของหาย -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2"
            >สถานที่พบของหาย</label
          >
          <input
            type="text"
            v-model="form.location"
            required
            class="w-full rounded-md border-gray-300 py-3 px-4 text-base !outline-none p-2 border-2 transition"
          />
        </div>

        <!-- อัปโหลดรูปภาพ -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2"
            >อัปโหลดรูปภาพ</label
          >
          <input
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            class="w-full rounded-md border-gray-300 py-3 px-4 text-base !outline-none p-2 border-2 transition"
          />
        </div>

        <!-- ปุ่มส่งข้อมูล -->
        <div class="mt-6">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="cursor-pointer w-full py-3 rounded-lg text-white font-semibold text-lg bg-blue-400 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {{ isSubmitting ? "กำลังส่งข้อมูล..." : "ส่งข้อมูล" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
