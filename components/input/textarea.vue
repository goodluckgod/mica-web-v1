<template>
  <div class="relative h-full">
    <textarea
      :id="random"
      ref="input"
      autocomplete="off"
      class="block h-full px-2.5 pb-2.5 pt-6 w-full focus:outline-2 outline-black text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:ring-0 peer"
      placeholder=" "
      :type="type ? type : 'text'"
      @input="input"
      :autofocus="autofocus ? autofocus : false"
      :disabled="disabled"
      :value="value"
    />
    <label
      :for="random"
      :class="{ 'focus:!w-[130%]': error }"
      class="absolute text-sm font-light peer-focus:text-primary-600 text-gray-500 duration-300 transform -translate-y-0.5 scale-75 top-1.5 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:top-8 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-0.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
      <span class="text-red-600" v-if="error">{{ error }}</span>
      <span v-else>{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["label", "type", "autofocus", "mask", "error", "disabled", "value"],
  data() {
    return {
      random: "",
    };
  },
  methods: {
    input(e) {
      this.$emit("input", e.target.value);
    },
  },
  mounted() {
    this.autofocus ? this.$refs.input.focus() : null;
    this.random = Math.floor(Math.random() * 100) + 1;
  },
};
</script>
