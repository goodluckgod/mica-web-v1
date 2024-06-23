<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-black/5 backdrop-blur-md flex items-center justify-center"
    @click="$emit('close')"
  >
    <div class="container mx-auto flex items-center justify-center">
      <transition name="menu-fade" mode="out-in">
        <div
          class="w-7/12 bg-white rounded-xl border border-gray-100"
          @click.stop
        >
          <div
            class="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
          >
            <div class="leading-none">
              <p>{{ product.title }}</p>
              <p class="font-light text-sm">Değerlendirmeleri</p>
            </div>
          </div>
          <div
            class="p-5 overflow-y-auto scrollbar transition-all duration-500 grid min-h-[500px] max-h-[500px]"
          >
            <ul>
              <li
                v-for="(review, index) in reviews"
                :key="index"
                :class="{ 'border-t-0 pt-0': index == 0 }"
                class="border-t border-gray-100 py-5 flex flex-col gap-2"
              >
                <div
                  class="pr-3 border-r leading-tight border-gray-100 text-xs font-light text-gray-600 rounded-xl flex items-center justify-between"
                >
                  <p
                    v-if="review.customer.firstname && review.customer.lastname"
                  >
                    <span>{{ review.customer.firstname[0] }}**</span>
                    <span>{{ review.customer.lastname[0] }}**</span>
                  </p>
                  <p v-else>*** ***</p>
                  <p>
                    {{
                      new Date(review.createdat).toLocaleString("tr-TR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </p>
                </div>
                <div class="flex flex-col gap-2">
                  <product-rating :rating="review.rating" />
                  <div
                    v-if="review.comment"
                    class="bg-gray-100/75 text-xs font-light text-gray-600 p-3 rounded-xl flex gap-3"
                  >
                    <p>{{ review.comment }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "reviews"],
  data() {
    return {
      type: "list",
    };
  },
  methods: {
    timedifference(timestamp1, timestamp2) {
      const date1 = new Date(timestamp1);
      const date2 = new Date(timestamp2);

      let diffInMilliseconds = Math.abs(date2 - date1);
      const oneDay = 24 * 60 * 60 * 1000;
      const oneHour = 60 * 60 * 1000;
      const oneMinute = 60 * 1000;

      const days = Math.floor(diffInMilliseconds / oneDay);
      diffInMilliseconds -= days * oneDay;

      const hours = Math.floor(diffInMilliseconds / oneHour);
      diffInMilliseconds -= hours * oneHour;

      const minutes = Math.floor(diffInMilliseconds / oneMinute);

      if (days > 0) {
        return `${days} gün`;
      } else if (hours > 0) {
        return `${hours} saat`;
      } else {
        return `${minutes} dakika`;
      }
    },
  },
};
</script>
