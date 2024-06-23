<template>
  <div class="w-full relative">
    <div class="relative flex items-center">
      <input
        type="text"
        ref="input"
        @focus="show.dropdown = true"
        :class="{
          '!bg-white !border-primary-500 rounded-b-none': show.dropdown,
        }"
        :placeholder="$t('searchinputplaceholder')"
        @keyup="search"
        v-model="query"
        class="h-11 text-sm w-full bg-gray-100 rounded-xl outline-none border-2 border-transparent border-b-0 px-3 transition-all duration-300 placeholder:font-light"
      />
      <icon-search class="absolute right-3 stroke-primary-500" />
    </div>
    <transition name="fade" mode="out-in">
      <div
        v-if="show.dropdown"
        v-on:mouseleave="blur()"
        class="min-h-20 max-h-[500px] overflow-y-auto scrollbar w-full absolute top-full border-2 border-primary-500 rounded-b-xl z-10 py-2 bg-white flex flex-col gap-2"
      >
        <div v-if="brands.length > 0" class="flex flex-col gap-2">
          <div
            v-for="(brand, index) in brands"
            :key="index"
            class="h-8 flex items-center justify-between px-2"
          >
            <div class="text-sm flex items-center justify-between">
              <p class="capitalize">{{ brand.name }}</p>
            </div>
            <p class="text-xs font-light text-gray-500">Marka</p>
          </div>
        </div>
        <div v-if="products.length > 0" class="flex flex-col gap-2">
          <div
            v-for="(product, index) in products"
            :key="index"
            class="h-8 flex items-center px-2 cursor-pointer"
            @click="go(product)"
          >
            <div class="text-sm font-light">
              <p>{{ product.title }}</p>
            </div>
          </div>
        </div>
        <div v-if="stores.length > 0" class="flex flex-col gap-2">
          <div
            v-for="(store, index) in stores"
            :key="index"
            class="h-8 flex items-center justify-between px-2 cursor-pointer"
            @click="$router.push('/store/' + store.slug)"
          >
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 border border-gray-100 rounded-full"></div>
              <div class="text-sm flex items-center justify-between">
                <p class="capitalize">{{ store.name }}</p>
              </div>
            </div>
            <p class="text-xs font-light text-gray-500">Mağaza</p>
          </div>
        </div>
        <div
          v-if="
            query.length > 0 &&
            products.length == 0 &&
            brands.length == 0 &&
            stores.length == 0
          "
        >
          <div class="text-center font-light text-gray-500">
            <span class="font-normal text-black">"{{ query }}"</span> aramanız
            için bir sonuç bulunamadı
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: {
        dropdown: false,
      },
      query: "",
      products: [],
      brands: [],
      stores: [],
    };
  },
  methods: {
    blur() {
      this.$refs.input.blur();
      this.show.dropdown = false;
    },
    search(event) {
      this.$axios
        .get("/v1/products/search", {
          params: {
            query: this.query,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.products = response.data.products;
            this.brands = response.data.brands;
            this.stores = response.data.stores;
          }
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
      this.$axios
        .post(
          "/v1/products/view/count/" +
            product.id +
            "/" +
            product.stores[0].storeid
        )
        .then((response) => {});
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
