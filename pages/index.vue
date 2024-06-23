<template>
  <div class="container mx-auto py-5">
    <hooper
      :itemsToShow="$device.isDesktop ? 5 : 2"
      :autoPlay="true"
      :playSpeed="2000"
      :infiniteScroll="true"
    >
      <slide>
        <img src="@/assets/images/1.png" alt="" class="rounded-xl" />
      </slide>
      <slide>
        <img src="@/assets/images/2.png" alt="" class="rounded-xl" />
      </slide>
      <slide>
        <img src="@/assets/images/3.png" alt="" class="rounded-xl" />
      </slide>
      <slide>
        <img src="@/assets/images/4.png" alt="" class="rounded-xl" />
      </slide>
      <slide>
        <img src="@/assets/images/5.png" alt="" class="rounded-xl" />
      </slide>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: {
    Hooper,
    Slide,
  },
};
</script>
