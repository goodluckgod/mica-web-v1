<template>
  <div
    @click="$emit('close')"
    class="fixed top-0 left-0 h-screen w-screen z-30 backdrop-blur-lg bg-black/5 flex items-center justify-center"
  >
    <div class="container mx-auto flex items-center justify-center">
      <div
        @click.stop
        class="w-6/12 bg-white rounded-xl border border-gray-100"
      >
        <div class="p-3 border-b border-gray-100">Ürünü Değerlendir</div>
        <div class="p-3 flex gap-3">
          <div class="h-full">
            <div
              class="h-[125px] min-w-[90px] cursor-pointer max-w-[70px] bg-cover bg-center border border-gray-100 rounded-xl bg-no-repeat"
              :style="{
                'background-image':
                  'url(' +
                  $axios.defaults.baseURL +
                  '/images/product/' +
                  product.images[0].url +
                  ')',
              }"
            ></div>
          </div>
          <div class="w-full grid grid-cols-1 justify-between gap-3">
            <div class="w-full flex items-center justify-between">
              <p>Ürünü Puanlayın</p>
              <div class="flex items-center gap-0.5">
                <div
                  v-for="i in 5"
                  :key="i"
                  @click="count == i ? (count = 0) : (count = i)"
                  class="cursor-pointer"
                >
                  <icon-star
                    :class="{ 'fill-amber-500': count >= i }"
                    class="fill-gray-300"
                  />
                </div>
              </div>
            </div>
            <input-textarea
              class="border border-gray-100 rounded-xl"
              label="Yorumunuz"
              v-model="comment"
            />
          </div>
        </div>
        <div class="p-3 pt-0" @click="addreview()">
          <button-primary title="Ürünü Değerlendir" :disabled="count < 1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      count: 0,
      comment: null,
    };
  },
  methods: {
    addreview() {
      this.$axios
        .post("/v1/profile/customer/reviews/create", {
          rating: this.count,
          comment: this.comment,
          productid: this.product.id,
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$emit("close");
          }
        });
    },
  },
};
</script>
