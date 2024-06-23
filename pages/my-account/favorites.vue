<template>
  <div>
    <div
      class="p-5 border border-gray-100 border-b-0 rounded-t-xl flex justify-between items-center"
    >
      <div>
        <p class="text-xl">Favori Ürünlerim</p>
      </div>
      <div class="h-12"></div>
    </div>
    <div class="border border-gray-100 rounded-b-xl p-5">
      <ul v-if="products.length > 0" class="grid grid-cols-4 gap-3">
        <product-card
          v-for="(product, index) in products"
          :key="index"
          :product="product.product"
        />
      </ul>
      <div v-else class="flex items-center justify-center">
        <div class="w-6/12 flex flex-col text-center gap-5">
          <div class="flex items-center justify-center">
            <icon-heart class="fill-primary-300 h-24 w-24" />
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-xl font-medium">Listelenecek Ürün Bulunamadı</p>
            <p class="font-light text-sm text-gray-500">
              Aradığınız yüz binlerce indirimli ürün en uygun fiyatlar ve
              kampanyalarla Dinazors'da.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "account",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    go(product) {
      this.$router.push("/product/" + product.mainid);
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
    getproducts() {
      this.$axios.get("/v1/profile/customer/favorites").then((response) => {
        if (response.data.status == "success") {
          this.products = response.data.products;
        }
      });
    },
  },
  mounted() {
    this.getproducts();
  },
};
</script>
