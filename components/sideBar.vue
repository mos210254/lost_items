<script setup>
const { user } = useUserSession();
const router = useRouter();
const props = defineProps({
  active: String,
  activeList1: String,
  activeList2: String,
  activeList3: String,
  activeList4: String,
});

const activeStage = computed(() => {
  switch (props.active) {
    case "true":
      return "bg-blue-400";
    case "false":
      return "";
  }
});

const activeStageList1 = computed(() => {
  switch (props.activeList1) {
    case "true":
      return "bg-blue-400";
    case "false":
      return "";
  }
});

const activeStageList2 = computed(() => {
  switch (props.activeList2) {
    case "true":
      return "bg-blue-400";
    case "false":
      return "";
  }
});

const activeStageList3 = computed(() => {
  switch (props.activeList3) {
    case "true":
      return "bg-blue-400";
    case "false":
      return "";
  }
});

const activeStageList4 = computed(() => {
  switch (props.activeList4) {
    case "true":
      return "bg-blue-400";
    case "false":
      return "";
  }
});

async function logout() {
  await $fetch("/api/logout", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: {
      logout: true,
    },
  }).then(() => {
    Swal.fire({
      icon: "success",
      title: "ออกจากระบบ",
      text: "กำลังนำท่านออกจากระบบ",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).then(
      setTimeout(() => {
        router.push("/");
      }, 2000)
    );
  });
}
</script>
<template>
  <div class="h-screen z-50 lg:block hidden">
    <div
      class="bg-blue-300 h-[100vh] w-[6rem] absolute overflow-hidden ease-in-out duration-300"
      :class="{ 'pr-[300px]': isExpaneded }"
      @mouseover="isExpaneded = !isExpaneded"
      @mouseout="isExpaneded = false"
    >
      <div
        class="flex h-[1rem] group relative cursor-pointer py-2"
        @mouseover="menuhide = !menuhide"
        @mouseout="menuhide = false"
      >
        <nuxt-link
          to="/genarals/dashboard"
          class="transition-all px-4 py-2 min-w-max items-center h-[56px] flex gap-5 absolute mt-[10rem] translate-x-[1.5rem] hover:bg-blue-400 rounded-[10px] cursor-pointer"
          :class="{ 'w-[15rem]': isExpaneded }, ['', activeStage]"
        >
          <i class="fa-solid fa-house"></i>
          <h3
            :class="{
              'hidden transition-all delay-300 opacity-0': !isExpaneded,
            }"
          >
            หน้าแรก
          </h3>
        </nuxt-link>
        <div
          class="p-4 absolute invisible min-w-max flex flex-col gap-3 mt-52 w-full translate-x-[6rem] group-hover:visible"
        >
          <nuxt-link
            to="/genarals/FormItem"
            class="p-2 hover:bg-blue-400 rounded-[10px]"
            :class="['', activeStageList1]"
          >
            แจ้งขอยืมครุภัณฑ์
          </nuxt-link>
          <nuxt-link
            to="/genarals/reItem"
            class="p-2 hover:bg-blue-400 rounded-[10px] hidden"
            :class="['', activeStageList2]"
          >
            แจ้งคืนครุภัณฑ์
          </nuxt-link>
          <nuxt-link
            to="/genarals/takeitem"
            class="p-2 hover:bg-blue-400 rounded-[10px] hidden"
            :class="['', activeStageList3]"
          >
            แจ้งเข้ารับครุภัณฑ์
          </nuxt-link>
          <nuxt-link
            to="/genarals/FormRoom"
            class="p-2 hover:bg-blue-400 rounded-[10px] hidden"
            :class="['', activeStageList4]"
          >
            แจ้งขอจองห้อง
          </nuxt-link>
        </div>
      </div>

      <div
        class="transition-all min-w-max flex items-center h-[56px] gap-5 mt-[14rem] translate-x-[1.5rem] py-2 px-4 hover:bg-blue-400 rounded-[10px] cursor-pointer"
        :class="{
          'w-[15rem] transition-all ease-linear': isExpaneded,
          '!mt-[17rem]': menuhide,
        }"
      >
        <i class="fa-solid fa-paper-plane"></i>
        <h3
          :class="{
            'hidden transition-all delay-300 opacity-0 ': !isExpaneded,
          }"
        >
          แจ้งเตือน
        </h3>
      </div>
      <div
        class="min-w-max flex items-center h-[56px] gap-5 absolute mt-[1rem] translate-x-[1.5rem] py-2 px-4 hover:bg-blue-400 rounded-[10px] cursor-pointer"
        :class="{ 'w-[15rem]': isExpaneded }"
      >
        <i class="fa-solid fa-bars-staggered"></i>
        <h3
          :class="{
            'hidden transition-all delay-300 opacity-0 ': !isExpaneded,
          }"
        >
          ประวัติการทำรายการ
        </h3>
      </div>
      <div
        class="min-w-max flex items-center h-[56px] gap-5 absolute bottom-[15%] translate-x-[1.5rem] py-2 px-0 rounded-[10px] cursor-pointer"
        :class="{ 'w-[15rem]': isExpaneded }"
      >
        <img
          class="w-[3rem] rounded-full"
          src="https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"
          alt=""
        />
        <h3
          :class="{
            'hidden transition-all delay- opacity-0 ': !isExpaneded,
          }"
        >
          {{ user.first_name }}<br />
          นักศึกษา
        </h3>
      </div>
      <!-- absolute bottom-[15%] -->
      <!-- absolute bottom-[5%] -->
      <div
        class="min-w-max flex items-center h-[56px] gap-5 absolute bottom-[5%] translate-x-[1.5rem] py-2 px-4 hover:bg-blue-400 rounded-[10px] cursor-pointer"
        :class="{ 'w-[15rem]': isExpaneded }"
      >
        <i class="rotate-180 fa-solid fa-right-from-bracket"></i>
        <div @click="logout">
          <h3
            :class="{
              'hidden transition-all delay-300 opacity-0 ': !isExpaneded,
            }"
          >
            ออกจากระบบ
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpaneded: false,
      menuhide: false,
    };
  },
};
</script>
