<script setup>
import { computed } from "vue";
// Props definition
const props = defineProps({
  id: String,
  label: {
    type: String,
    default: "กล่องข้อความ",
  },
  name: String,
  placeholder: String,
  type: String,
  size: String,
  min: [String, Number], // อนุญาตทั้ง String และ Number
  max: [String, Number], // อนุญาตทั้ง String และ Number
  disabled: Boolean,
  required: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

// Emit event for v-model updates
const emit = defineEmits(["update:modelValue"]);

// Computed for input size
const inputSize = computed(() => {
  switch (props.size) {
    case "md":
      return "py-2 px-4";
    case "md-full":
      return "py-2 px-4 w-full";
    case "sm-full":
      return "py-1 px-4 w-full";
    default:
      return "py-1 px-4";
  }
});
</script>

<template>
  <div class="grid gap-2">
    <label :for="id">{{ label }}</label>
    <div class="relative -z-0">
      <input
        :class="[
          'peer focus:outline-0 border-2 border-gray-300 rounded-[10px] invalid:[&:user-invalid]:border-[#FDA29B] invalid[&:user-invalid]:text-[#FDA29B]',
          inputSize,
        ]"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :minlength="min"
        :maxlength="max"
        :disabled="disabled"
        :value="modelValue"
        :type="type"
        :required="required"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <i
        class="fa-solid fa-circle-info invisible peer-[&:user-invalid]:visible absolute text-[#FDA29B] top-1/2 right-1 -translate-x-1/2 -translate-y-1/2"
      ></i>
    </div>
  </div>
</template>
