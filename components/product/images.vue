<template>
  <div class="">
    <hooper :itemsToShow="1">
      <slide v-for="(image, index) in images" :key="index">
        <img
          :src="$axios.defaults.baseURL + '/images/product/' + image.url"
          alt=""
          class="rounded-xl border border-gray-100"
        />
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

export default {
  props: ["images"],
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
};
</script>
