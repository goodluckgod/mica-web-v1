<template>
  <li
    @click="go(product)"
    class="rounded-xl overflow-hidden border border-gray-100 cursor-pointer shadow-xl shadow-gray-400/5"
  >
    <div
      class="w-full h-[280px] bg-cover bg-center relative"
      :style="{
        'background-image':
          'url(' +
          $axios.defaults.baseURL +
          '/images/product/' +
          product.images[0].url +
          ')',
      }"
    >
      <div
        class="h-9 w-9 bg-white rounded-full border border-gray-100 absolute right-2 top-2 flex items-center justify-center"
        @click.stop
        @click="addfavorite(product)"
      >
        <icon-heart
          :class="{ 'fill-black': getfavorite(product) }"
          class="stroke-black -mt-0.5 transition-all duration-300"
        />
      </div>
      <div
        v-if="product.colored"
        class="absolute bottom-2 right-2 bg-white rounded-full p-0.5 flex items-center"
      >
        <div
          class="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-primary-500 relative"
        ></div>
        <div
          class="h-3 w-3 -ml-1.5 rounded-full bg-gradient-to-r from-rose-500 to-primary-200"
        ></div>
      </div>
    </div>
    <div class="h-[140px] flex flex-col justify-between">
      <div class="p-3 flex flex-col gap-1.5">
        <p class="text-sm leading-tight">
          <span class="font-medium">{{ product.brand.name }}</span>
          <span class="font-light text-gray-500">{{ product.title }}</span>
        </p>
        <div
          v-if="product.reviews"
          class="flex items-center text-sm font-light text-gray-500 gap-1.5"
        >
          <product-rating :rating="product.reviews.average" />
          <span>({{ product.reviews.total }})</span>
        </div>
      </div>
      <div class="p-3">
        <div
          v-if="
            product.stores[0].saleprice &&
            product.stores[0].listprice > product.stores[0].saleprice
          "
          class="text-sm font-light flex items-center gap-2"
        >
          <span class="line-through text-gray-500">
            {{ product.stores[0].listprice }} TL
          </span>
          <span class="text-red-600 font-medium">
            {{ product.stores[0].saleprice }} TL
          </span>
        </div>
        <div v-else>{{ product.stores[0].listprice }} TL</div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
    async addfavorite(product) {
      await this.$addfavorite(product);
    },
    getfavorite(product) {
      if (this.$auth.user) {
        return this.$auth.user?.customerfavorites?.filter((favorite) => {
          return favorite.productid == product.id;
        }).length;
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
};
</script>
