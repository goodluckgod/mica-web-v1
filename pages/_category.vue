<template>
  <div class="container mx-auto py-5 min-h-[calc(100vh-175px)]">
    <transition name="menu-fade" mode="out-in" :delay="1000">
      <div v-if="products.length > 0" class="flex gap-5">
        <div
          class="w-2/12 flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-175px)] min-h-[calc(100vh-175px)] scrollbar"
        >
          <div v-for="(filter, index) in Object.keys(filters)" :key="index">
            <div v-if="filter == 'brands'" class="flex flex-col gap-2">
              <div class="text-sm">Marka</div>
              <ul>
                <li
                  v-for="(brand, index) in filters[filter]"
                  :key="index"
                  class="flex items-center"
                >
                  <input-check :label="brand.name" />
                </li>
              </ul>
            </div>
            <div v-else class="flex flex-col gap-3">
              <div
                v-for="(filter, bindex) in filters[filter]"
                :key="bindex"
                class="flex flex-col gap-2"
                v-show="filter.attributeValues.length > 0"
              >
                <div class="text-sm">
                  {{ filter.attribute.name }}
                </div>
                <ul>
                  <li
                    v-for="(value, cindex) in filter.attributeValues"
                    :key="cindex"
                  >
                    <input-check :label="value.name" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="w-10/12">
          <ul class="grid grid-cols-4 gap-5">
            <product-card
              v-for="(product, index) in products"
              :key="index"
              :product="product"
            />
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iscategory: this.$searchslug("/" + this.$route.params.category),
      products: [],
      filters: [],
    };
  },
  mounted() {
    if (this.iscategory) {
      this.$axios
        .post(
          "/v1/products/categories",
          {
            categories: this.iscategory.options.category,
          },
          {
            params: {
              gender: this.iscategory.options.gender,
            },
          }
        )
        .then((response) => {
          this.products = response.data.products;
          this.filters = response.data.filters;
        });
    } else {
      this.$nuxt.error({ statusCode: 404, message: "Category not found" });
    }
  },
};
</script>
