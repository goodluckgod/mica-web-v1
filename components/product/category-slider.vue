<template>
  <div class="container mx-auto flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <div>{{ category.name }}</div>
      <div>Tümünü Gör</div>
    </div>
    <div class="flex overflow-x-auto bg-rose-50 p-3 rounded-xl">
      <hooper
        :itemsToShow="$device.isDesktop ? 5 : 2"
        :infiniteScroll="true"
      >
        <slide
          v-for="(product, index) in category.products"
          :key="index"
          class="!p-1"
        >
          <product :product="product" />
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
      </hooper>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

export default {
  props: ["id", "title"],
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
  data() {
    return {
      category: {},
    };
  },
  mounted() {
    this.$axios.get("/v1/categories/" + this.id).then((response) => {
      this.category = response.data;
    });
  },
};
</script>
