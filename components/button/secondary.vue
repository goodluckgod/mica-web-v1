<template>
  <button
    :disabled="loading ? true : disabled ? true : false"
    :class="{ 'hover:!bg-primary-500': loading }"
    class="h-12 w-full flex items-center justify-center bg-primary-50/50 px-5 hover:bg-black hover:text-white text-primary-500 rounded-xl outline-black transition-all duration-300 disabled:bg-gray-200"
  >
    <transition name="fade" mode="out-in">
      <span v-if="loading" class="loader"></span>
      <span v-else>
        {{ title }}
      </span>
    </transition>
  </button>
</template>

<script>
export default {
  props: ["title", "disabled", "loading"],
};
</script>
