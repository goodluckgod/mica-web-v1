<template>
  <div
    @click="go(product.id)"
    class="border border-gray-100 rounded-xl overflow-hidden cursor-pointer bg-white"
  >
    <div
      class="w-[210px] h-[230px] bg-contain bg-center bg-no-repeat"
      :style="{
        'background-image':
          'url(' +
          $axios.defaults.baseURL +
          '/images/product/' +
          product.images[0].url +
          ')',
      }"
    ></div>
    <div class="bg-primary-400 text-white text-sm text-center p-0.5">
      <span>KARGO BEDAVA</span>
    </div>
    <div class="text-xs p-1.5 text-gray-500 font-light h-11">
      <span class="text-black font-normal">{{ product.brand.name }}</span>
      <span>{{ product.title }}</span>
    </div>
    <div class="p-1.5">
      <div
        v-if="product.saleprice"
        class="flex items-center gap-1.5 text-sm font-light"
      >
        <span class="text-gray-500 line-through"
          >{{ product.listprice }} TL</span
        >
        <span class="font-medium text-red-600">{{ product.saleprice }} TL</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  methods: {
    go(id) {
      this.$router.push("/product/" + id);
    },
  },
};
</script>
