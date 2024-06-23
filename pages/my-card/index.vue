<template>
  <div>
    <transition name="menu-fade" mode="out-in" :delay="1000">
      <div
        v-if="groupedItems.length > 0"
        class="container mx-auto flex gap-5 py-5"
      >
        <div
          class="w-9/12 flex flex-col gap-5 min-h-[calc(100vh-175px)] pr-3 max-h-[calc(100vh-175px)] overflow-y-auto scrollbar"
        >
          <div
            v-for="(store, index) in groupedItems"
            :key="index"
            class="flex flex-col border border-gray-100 rounded-xl overflow-hidden"
          >
            <div
              class="flex items-center gap-2 p-3 border-b border-gray-100 bg-gray-50 cursor-pointer"
              @click="$router.push('/store/' + store.store.slug)"
            >
              <div
                class="h-8 w-8 border border-gray-100 bg-white rounded-full"
              ></div>
              <p class="capitalize text-sm font-light">
                {{ store.store.name }}
              </p>
            </div>
            <div>
              <div
                v-for="(product, bindex) in store.products"
                :key="bindex"
                :class="{ 'border-t-0': bindex == 0 }"
                class="flex gap-5 border-t border-gray-100 p-3 cursor-pointer hover:bg-gray-50 transition duration-300 justify-between"
              >
                <div @click="go(product)" class="flex gap-5">
                  <div
                    class="h-[105px] min-w-[70px] max-w-[70px] bg-cover bg-center border border-gray-100 rounded-xl bg-no-repeat"
                    :style="{
                      'background-image':
                        'url(' +
                        $axios.defaults.baseURL +
                        '/images/product/' +
                        product.image.url +
                        ')',
                    }"
                  ></div>
                  <div class="text-sm font-light text-gray-500">
                    <p class="capitalize">
                      {{ product.title }}
                    </p>
                    <p v-if="product.slicer?.customattributevalue">
                      <span class="text-black">{{
                        product.slicer.attributename
                      }}</span
                      >:
                      {{ product.slicer.customattributevalue }}
                    </p>
                    <p v-if="product.varianter?.attributename">
                      <span class="text-black">{{
                        product.varianter.attributename
                      }}</span
                      >:
                      {{ product.varianter.attributevalue }}
                    </p>
                  </div>
                </div>
                <div class="flex flex-col items-end justify-between">
                  <p
                    class="text-xs font-light text-gray-500 hover:text-red-600 transition duration-300 cursor-pointer"
                    @click.stop="removeitem(product.id)"
                  >
                    Sepetimden Kaldır
                  </p>
                  <div class="flex flex-col gap-2 items-end">
                    <p class="text-primary-500">{{ product.price }} TL</p>
                    <div
                      @click.stop
                      class="flex border border-gray-100 rounded-lg overflow-hidden"
                    >
                      <div
                        @click="decrementitemquantity(product.id)"
                        class="w-8 h-8 border-r border-gray-100 bg-gray-50 flex items-center justify-center"
                      >
                        -
                      </div>
                      <div
                        class="w-16 flex items-center justify-center text-gray-500"
                      >
                        {{ product.quantity }}
                      </div>
                      <div
                        @click="incrementitemquantity(product.id)"
                        class="w-8 h-8 border-l border-gray-100 bg-gray-50 flex items-center justify-center"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-3/12 flex flex-col gap-5">
          <div
            class="border border-gray-100 rounded-xl p-5 flex flex-col gap-5"
          >
            <p class="text-lg">Sipariş Özeti</p>
            <ul class="text-sm font-light flex flex-col gap-2">
              <li class="flex items-center justify-between">
                <span>Ürünün Toplamı</span>
                <span> {{ cartTotalPrice - totalShippingCost }} TL </span>
              </li>
              <li
                class="flex items-center justify-between"
                v-if="totalShippingCost > 0"
              >
                <span>Kargo Toplam</span>
                <span> {{ totalShippingCost }} TL </span>
              </li>
              <li
                class="flex items-center justify-between border-t border-gray-100 pt-2"
              >
                <span>Toplam</span>
                <span class="text-primary-500 font-medium">
                  {{ cartTotalPrice }} TL
                </span>
              </li>
            </ul>
          </div>
          <div
            @click="
              cartTotalPrice > 0
                ? $auth.user
                  ? $router.push('/my-card/payment')
                  : $router.push('/login?redirect=my-card+payment')
                : null
            "
          >
            <button-primary v-if="cartTotalPrice > 0" title="Sepeti Onayla" />
          </div>
        </div>
      </div>
    </transition>
    <transition name="menu-fade" mode="out-in" :delay="1000">
      <div
        v-if="groupedItems.length < 1"
        class="container mx-auto flex gap-5 py-5"
      >
        <div
          class="w-full min-h-[calc(100vh-175px)] flex items-center justify-center"
        >
          <div class="flex items-center justify-center flex-col gap-5">
            <svg
              width="96"
              height="96"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M16.1894 8.8599C15.7994 8.8599 15.4894 8.5499 15.4894 8.1599V6.8799C15.4894 5.8999 15.0694 4.9599 14.3494 4.2999C13.6094 3.6299 12.6594 3.3199 11.6594 3.4099C9.97937 3.5699 8.50938 5.2799 8.50938 7.0599V7.9599C8.50938 8.3499 8.19937 8.6599 7.80937 8.6599C7.41937 8.6599 7.10938 8.3499 7.10938 7.9599V7.0599C7.10938 4.5599 9.12938 2.2499 11.5194 2.0199C12.9094 1.8899 14.2494 2.3299 15.2794 3.2699C16.2994 4.1899 16.8794 5.5099 16.8794 6.8799V8.1599C16.8794 8.5499 16.5694 8.8599 16.1894 8.8599Z"
                class="fill-primary-500"
              />
              <path
                d="M19.9597 8.96008C19.1197 8.03008 17.7397 7.58008 15.7197 7.58008H8.27975C6.25975 7.58008 4.87975 8.03008 4.03975 8.96008C3.06975 10.0401 3.09975 11.4801 3.20975 12.4801L3.90975 18.0501C4.11975 20.0001 4.90975 22.0001 9.20975 22.0001H14.7897C19.0897 22.0001 19.8797 20.0001 20.0897 18.0601L20.7897 12.4701C20.8997 11.4801 20.9197 10.0401 19.9597 8.96008ZM8.41975 13.1501H8.40975C7.85975 13.1501 7.40975 12.7001 7.40975 12.1501C7.40975 11.6001 7.85975 11.1501 8.40975 11.1501C8.96975 11.1501 9.41975 11.6001 9.41975 12.1501C9.41975 12.7001 8.96975 13.1501 8.41975 13.1501ZM15.4197 13.1501H15.4097C14.8597 13.1501 14.4097 12.7001 14.4097 12.1501C14.4097 11.6001 14.8597 11.1501 15.4097 11.1501C15.9697 11.1501 16.4197 11.6001 16.4197 12.1501C16.4197 12.7001 15.9697 13.1501 15.4197 13.1501Z"
                class="fill-primary-300"
              />
            </svg>

            <p class="font-medium text-lg">Sepetinde ürün bulunmamaktadır.</p>

            <div @click="$router.push('/')">
              <button-secondary title="Alışverişe Devam Et" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      cartItems: "cartitems",
      cartTotalPrice: "carttotalprice",
      totalShippingCost: "totalshippingcost",
    }),
    groupedItems() {
      const grouped = this.cartItems.reduce((acc, item) => {
        const storeId = item.store.id;
        if (!acc[storeId]) {
          acc[storeId] = {
            store: item.store,
            products: [],
          };
        }
        acc[storeId].products.push({
          ...item,
        });
        return acc;
      }, {});
      return Object.values(grouped);
    },
  },
  methods: {
    ...mapActions([
      "additem",
      "removeitem",
      "clearcart",
      "incrementitemquantity",
      "decrementitemquantity",
    ]),
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

<style>
/* Stillerinizi buraya ekleyin */
</style>
