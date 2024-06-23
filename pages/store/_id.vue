<template>
  <div class="min-h-[calc(100vh-130px)]">
    <transition name="menu-fade" mode="out-in">
      <div v-if="store" class="container mx-auto py-5 flex flex-col gap-5">
        <div class="border border-gray-100 rounded-xl overflow-hidden">
          <div class="bg-primary-50/50 p-5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="h-14 w-14 bg-white rounded-full border border-gray-100"
              ></div>
              <div>
                <p class="text-xl">{{ store.name.toUpperCase() }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 w-4/12">
              <div class="bg-white w-full rounded-xl border border-gray-100">
                <input-primary label="Mağazada Arayın" v-model="search" />
              </div>
              <button
                @click="followstore()"
                class="h-12 px-5 bg-white border min-w-fit border-gray-100 rounded-xl transition duration-300"
                :class="{ '!bg-black border-black text-white': follow }"
              >
                <span v-if="follow">Takibi Bırak</span>
                <span v-else>Takip Et</span>
              </button>
            </div>
          </div>
        </div>
        <div v-if="search.length > 0">
          <ul v-if="filteredproducts.length > 0" class="grid grid-cols-5 gap-5">
            <product-card
              v-for="(product, index) in filteredproducts"
              :key="index"
              :product="product"
            />
          </ul>
          <div v-else>
            <span>"{{ search }}" aramanız için bir sonuç bulunamadı</span>
          </div>
        </div>

        <ul v-else class="grid grid-cols-5 gap-5">
          <product-card
            v-for="(product, index) in store.products"
            :key="index"
            :product="product"
          />
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      store: null,
      follow: false,
      search: "",
      filteredproducts: [],
    };
  },
  methods: {
    searchproducts() {
      this.$axios
        .get("/v1/store/" + this.$route.params.id + "/search", {
          params: {
            query: this.search,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.filteredproducts = response.data.products;
          }
        });
    },
    getstore() {
      this.$axios.get("/v1/store/" + this.$route.params.id).then((response) => {
        this.store = response.data.data.store;
        this.follow =
          this.$auth.user.follows.filter((follow) => {
            return follow.storeid == response.data.data.store.id;
          }).length > 0
            ? true
            : false;
      });
    },
    async followstore() {
      await this.$followstore(this.store);
      this.follow = !this.follow;
    },
  },
  mounted() {
    this.getstore();
  },
  watch: {
    search: function () {
      this.searchproducts();
    },
  },
};
</script>
