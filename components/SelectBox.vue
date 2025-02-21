<script setup>
// Props definition
const props = defineProps({
  id: String,
  label: {
    type: String,
  },
  name: String,
  options: {
    type: Array,
    default: () => [],
  },
  size: String,
  custom: String,
  disabled: Boolean,
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

// Emit event for v-model updates
const emit = defineEmits(["update:modelValue"]);

// เพิ่มตัวแปรที่ใช้ในการคำนวณแต่ไม่ได้แสดงผล
const computedId = computed(() => {
  return `calculated-${props.id}`; // ตัวอย่างการคำนวณหรือปรับ id
});

// Computed for select size
const selectSize = computed(() => {
  switch (props.size) {
    case "md":
      return "py-2 px-4";
    default:
      return "py-1 px-4";
  }
});
</script>

<template>
  <div class="grid gap-2">
    <label :for="computedId">{{ label }}</label>
    <!-- ใช้ computedId แทน -->
    <div>
      <select
        :class="[
          'border-2 border-gray-300 rounded-[10px] focus:outline-0 peer invalid:border-[#FDA29B] invalid:text-[#FDA29B]',
          selectSize,
          custom,
        ]"
        :id="computedId"
        :name="name"
        :disabled="disabled"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option value="" disabled selected hidden>{{ label }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
