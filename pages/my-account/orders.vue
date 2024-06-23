<template>
  <div>
    <div
      class="p-5 border border-gray-100 border-b-0 rounded-t-xl flex justify-between items-center"
    >
      <div>
        <p class="text-xl">Siparişlerim</p>
      </div>
      <div class="h-12"></div>
    </div>
    <div class="border border-gray-100 rounded-b-xl">
      <ul class="flex flex-col">
        <li
          v-for="(order, index) in orders"
          :key="index"
          class="flex items-center justify-between border-t border-gray-100 p-5"
          :class="{ 'border-t-0': index == 0 }"
        >
          <div class="text-sm font-light text-gray-500">
            <p>Sipariş Durumu: {{ $t(order.status) }}</p>
            <p>
              Sipariş Tarihi:
              {{
                new Date(order.createdat)
                  .toLocaleString("en-GB")
                  .replace(",", "")
              }}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <div v-for="(item, bindex) in order.items" :key="bindex">
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
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  layout: "account",
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    getorders() {
      this.$axios.get("/v1/profile/customer/orders").then((response) => {
        if (response.data.status == "success") {
          this.orders = response.data.orders;
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
    this.getorders();
  },
};
</script>
