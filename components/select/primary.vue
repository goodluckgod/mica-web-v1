<template>
  <div class="relative h-12">
    <select
      :id="random"
      ref="input"
      autocomplete="off"
      class="block h-12 px-2.5 pb-2.5 pt-5 w-full focus:outline-2 outline-black text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:ring-0 peer"
      :type="type ? type : 'text'"
      @change="input"
      :value="value"
      :autofocus="autofocus ? autofocus : false"
    >
      <slot />
    </select>
    <label
      :for="random"
      @click="openSelect"
      :class="{
        'scale-100 translate-y-0 top-3.5': !value,
        'scale-75 top-2': value,
      }"
      class="absolute font-light text-sm text-gray-500 duration-300 transform z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-2 start-1"
    >
      <span class="text-red-600" v-if="error">{{ error }}</span>
      <span v-else>{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["label", "type", "autofocus", "mask", "error", "value"],
  data() {
    return {
      random: "",
    };
  },
  methods: {
    input(e) {
      this.$emit("input", e.target.value);
    },
    openSelect() {
      this.$refs.input.focus();
      // select elementini tıklanmış gibi davranarak açmak için
      this.$refs.input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    },
  },
  mounted() {
    this.autofocus ? this.$refs.input.focus() : null;
    this.random = Math.floor(Math.random() * 100) + 1;
  },
};
</script>
