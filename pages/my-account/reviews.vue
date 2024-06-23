<template>
  <div>
    <div
      class="p-5 border border-gray-100 border-b-0 rounded-t-xl flex justify-between items-center"
    >
      <div>
        <p class="text-xl">Değerlendirmelerim</p>
      </div>
      <div class="h-12"></div>
    </div>
    <div class="border border-gray-100 rounded-b-xl">
      <div
        class="grid grid-cols-2 border-b border-gray-100 text-sm text-gray-500 font-light"
      >
        <div
          class="h-12 flex items-center justify-center border-b-2 border-transparent cursor-pointer"
          :class="{ '!border-primary-500 text-primary-600': step == 'review' }"
          @click="step = 'review'"
        >
          <span>Değerlendir</span>
        </div>
        <div
          class="h-12 flex items-center justify-center border-b-2 border-transparent cursor-pointer"
          :class="{
            '!border-primary-500 text-primary-600': step == 'reviewed',
          }"
          @click="step = 'reviewed'"
        >
          <span>Değerlendirdiklerim</span>
        </div>
      </div>
      <div v-if="step == 'review'">
        <ul class="flex flex-col">
          <li
            class="p-5 border-t border-gray-100 flex gap-3"
            :class="{ 'border-t-0': index == 0 }"
            v-for="(item, index) in unreviewedproducts"
            :key="index"
          >
            <div
              @click="go(item.product)"
              class="h-[105px] min-w-[70px] cursor-pointer max-w-[70px] bg-cover bg-center border border-gray-100 rounded-xl bg-no-repeat"
              :style="{
                'background-image':
                  'url(' +
                  $axios.defaults.baseURL +
                  '/images/product/' +
                  item.product.images[0].url +
                  ')',
              }"
            ></div>
            <div class="w-full flex flex-col justify-between">
              <p>
                {{ item.product.title }}
              </p>
              <div>
                <div
                  @click="
                    selected = item.product;
                    modal.review = true;
                  "
                >
                  <button-secondary
                    title="Ürünü Değerlendir"
                    class="w-auto px-5"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="p-5" v-if="step == 'reviewed'">
        <ul class="flex flex-col">
          <li
            @click="go(item.product)"
            class="p-5 border-t border-gray-100 flex gap-3 cursor-pointer"
            :class="{ 'border-t-0': index == 0 }"
            v-for="(item, index) in reviewedproducts"
            :key="index"
          >
            <div
              class="h-[105px] min-w-[70px] cursor-pointer max-w-[70px] bg-cover bg-center border border-gray-100 rounded-xl bg-no-repeat"
              :style="{
                'background-image':
                  'url(' +
                  $axios.defaults.baseURL +
                  '/images/product/' +
                  item.product.images[0].url +
                  ')',
              }"
            ></div>
            <div class="w-full flex flex-col gap-1.5">
              <p>
                {{ item.product.title }}
              </p>
              <div>
                <div class="flex items-center gap-0.5">
                  <div v-for="i in 5" :key="i" class="cursor-pointer">
                    <icon-star
                      :class="{ 'fill-amber-500': item.rating >= i }"
                      class="fill-gray-300 h-5 w-5"
                    />
                  </div>
                </div>
              </div>
              <p v-if="item.comment">
                {{ item.comment }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <modal-review-product
      v-if="modal.review"
      :product="selected"
      @close="
        modal.review = false;
        getreviews();
      "
    />
  </div>
</template>

<script>
export default {
  layout: "account",
  data() {
    return {
      step: "review",
      unreviewedproducts: [],
      reviewedproducts: [],
      selected: null,
      modal: {
        review: false,
      },
    };
  },
  methods: {
    getreviews() {
      this.$axios.get("/v1/profile/customer/reviews").then((response) => {
        this.unreviewedproducts = response.data.unreviewedproducts;
      });
      this.$axios
        .get("/v1/profile/customer/reviews/published")
        .then((response) => {
          this.reviewedproducts = response.data.reviews;
        });
    },
    go(product) {
      this.$router.push(
        "/product/" +
          product.mainid.toLowerCase() +
          "/" +
          this.slug(product.title)
      );
      if (this.$auth.user) {
        this.$axios
          .post("/v1/products/view/create/" + product.id)
          .then((response) => {});
      }
      if (product.stores[0].storeid) {
        this.$axios
          .post(
            "/v1/products/view/count/" +
              product.id +
              "/" +
              product.stores[0]?.storeid
          )
          .then((response) => {});
      }
    },
    slug(text) {
      const charMap = {
        ç: "c",
        ğ: "g",
        ı: "i",
        ö: "o",
        ş: "s",
        ü: "u",
        Ç: "C",
        Ğ: "G",
        İ: "I",
        Ö: "O",
        Ş: "S",
        Ü: "U",
      };

      return text
        .toString()
        .replace(/[çğıöşüÇĞİÖŞÜ]/g, (match) => charMap[match])
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 -]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    },
  },
  mounted() {
    this.getreviews();
  },
};
</script>
