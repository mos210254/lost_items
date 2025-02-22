<script setup>
import { ref } from "vue";

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

const submitForm = async () => {
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
    if (result.status === 200) {
      // ✅ ส่งข้อความแจ้งเตือน
      const message = `📢 แจ้งเตือน! พบของหายแล้ว 🎒\n📍 สถานที่: ${
        form.value.location
      }\n⏰ เวลา: ${new Date().toLocaleString()}`;
      await sendTelegramMessage(message);

      // ✅ ส่งรูปภาพไป Telegram ถ้ามีแนบมา
      if (form.value.picture) {
        await sendTelegramPhoto(form.value.picture);
      }

      await Swal.fire("Success", "Report submitted successfully", "success");
      window.location.reload();
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  } catch (error) {
    Swal.fire("Error", "Failed to submit report", "error");
  }
};
</script>

<template>
  <div class="">
    <HamburgerMenu />
    <div class="h-[100vh] flex items-center justify-center">
      <div class="mx-auto w-full max-w-[550px] bg-white p-12">
        <form @submit.prevent="submitForm">
          <!-- ชื่อผู้แจ้ง -->
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]"
              >ชื่อ-นามสกุล</label
            >
            <input
              type="text"
              v-model="form.name"
              required
              class="w-full rounded-md border border-gray-300 py-3 px-6 text-base"
            />
          </div>

          <!-- เบอร์โทร -->
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]"
              >เบอร์โทรติดต่อ</label
            >
            <input
              type="text"
              v-model="form.phone"
              required
              class="w-full rounded-md border border-gray-300 py-3 px-6 text-base"
            />
          </div>

          <!-- หมวดหมู่ของหาย -->
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]"
              >หมวดหมู่ของหาย</label
            >
            <select
              class="w-full rounded-md border border-gray-300 py-3 px-6 text-base"
              id="category"
              v-model="form.category"
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
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]"
              >รายละเอียดสิ่งของ</label
            >
            <textarea
              v-model="form.details"
              required
              class="w-full rounded-md border border-gray-300 py-3 px-6 text-base"
            ></textarea>
          </div>

          <!-- วันที่พบของหาย -->
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]"
              >วันที่พบของหาย</label
            >
            <input
              type="date"
              v-model="form.date"
              required
              class="w-full rounded-md border border-gray-300 py-3 px-6 text-base"
            />
          </div>

          <!-- สถานที่พบของหาย -->
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]"
              >สถานที่พบของหาย</label
            >
            <input
              type="text"
              v-model="form.location"
              required
              class="w-full rounded-md border border-gray-300 py-3 px-6 text-base"
            />
          </div>

          <!-- อัปโหลดรูปภาพ -->
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]">
              อัปโหลดรูปภาพ
            </label>
            <input
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="w-full rounded-md border border-gray-300 py-3 px-6 text-base"
            />
          </div>

          <div>
            <button
              type="submit"
              class="cursor-pointer w-full rounded-md bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white"
            >
              ส่งข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
