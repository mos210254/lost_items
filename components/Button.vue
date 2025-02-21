<script setup lang="ts">
    const props = defineProps({
        text: String,
        size: {
            type: String,
            defualt: "md"
        },
        state: {
            stype: String,
            default: "text-[#5BBCFF]"
        },
        id: String,
        disabled: Boolean,
    })

    const btnSize = computed(() => {
        switch (props.size) {
            case "md":
                return "py-3"
            case "lg":
                return "py-4"
            default:
                return "py-2"
        }
    })

    const colorState = computed(() => {
        switch (props.state) {
            case "success":
                return "bg-[#32D583] hover:ring-4 ring-[#32D58345]"
            case "warning":
                return "bg-[#FEC84B] hover:ring-4 ring-[#FEC84B45]"
            case "danger":
                return "bg-[#D92D20] hover:ring-4 ring-[#D92D2045]"
            case "hiddin":
                return "bg-[#eeeee4] text-[#050505]" 
            default:
                return "bg-[#5BBCFF] hover:ring-4 ring-[#5BBCFF45]"
        }
    })
</script>

<template>
    <button :class="['px-6 text-white rounded-[10px] text-[16px]', btnSize, colorState] " :disabled="props.disabled" :id="props.id">{{ props.text }}</button>
</template>