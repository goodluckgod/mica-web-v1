<template>
  <div class="min-h-[calc(100vh-130px)]">
    <transition name="menu-fade" mode="out-in" delay="1000">
      <div
        v-if="products.length > 0 && category"
        class="container mx-auto py-5 flex flex-col gap-5"
      >
        <div class="flex gap-5">
          <div ref="images" class="w-4/12">
            <div
              class="w-full border border-gray-100 rounded-xl overflow-hidden"
            >
              <hooper :itemsToShow="1" :autoPlay="false" class="w-full">
                <slide
                  v-for="(image, index) in selected.images"
                  :key="index"
                  class="w-full"
                >
                  <div
                    class="h-[600px] bg-cover bg-center bg-no-repeat"
                    :style="{
                      'background-image':
                        'url(' +
                        $axios.defaults.baseURL +
                        '/images/product/' +
                        image.url +
                        ')',
                    }"
                  ></div>
                </slide>
              </hooper>
            </div>
          </div>
          <div class="w-5/12 flex flex-col gap-5">
            <div class="font-light text-gray-500">
              <p class="leading-tight">
                <span class="text-black font-medium">{{
                  selected.brand.name
                }}</span>
                <span>{{ selected.title }}</span>
              </p>
            </div>
            <div
              v-if="reviews.data.length > 0"
              class="flex items-center gap-3 text-sm font-light cursor-pointer"
              @click="modal.review = true"
            >
              <product-rating :rating="reviews.averagerating" />
              <div>
                <p>{{ reviews.data.length }} Değerlendirme</p>
              </div>
            </div>
            <div
              v-if="
                selected.stores[0].saleprice &&
                selected.stores[0].listprice > selected.stores[0].saleprice
              "
              class="text-xl font-light flex items-center gap-2"
            >
              <span class="line-through text-gray-500">
                {{ selected.stores[0].listprice }} TL
              </span>
              <span class="text-red-600 font-medium">
                {{ selected.stores[0].saleprice }} TL
              </span>
            </div>
            <div v-else class="text-xl font-medium">
              {{ selected.stores[0].listprice }} TL
            </div>
            <div
              class="flex flex-col gap-5"
              v-if="slicer.values.length > 0 || varianter.values.length > 0"
            >
              <div class="flex flex-col gap-2">
                <div class="text-sm">
                  <span>{{ slicer.label }}</span>
                </div>
                <div class="flex gap-2">
                  <div
                    v-for="(slice, index) in slicer.values"
                    :key="index"
                    @click="changeslice(slice)"
                    class="border-2 border-gray-100 rounded-lg text-sm font-light h-10 flex items-center px-3 justify-center cursor-pointer"
                    :class="{
                      '!border-primary-500':
                        selected.attributes.filter(
                          (attribute) => attribute.attributeid == slicer.id
                        )[0].customattributevalue == slice.customattributevalue,
                    }"
                  >
                    <span v-if="slice.customattributevalue" class="capitalize">
                      {{ slice.customattributevalue }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="text-sm">
                  <span>{{ varianter.label }}</span>
                </div>
                <div class="flex gap-2">
                  <div
                    @click="changevariant(variant)"
                    v-for="(variant, index) in varianter.values"
                    :key="index"
                    class="border-2 border-gray-100 rounded-lg text-sm font-light h-10 flex items-center px-3 justify-center cursor-pointer"
                    :class="{
                      '!border-primary-500':
                        selected.attributes.filter(
                          (attribute) => attribute.attributeid == varianter.id
                        )[0]?.attributevalueid == variant.id,
                    }"
                  >
                    <span v-if="variant.name">
                      {{ variant.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-full" @click="addbasket()">
                <button-primary title="Sepete Ekle" />
              </div>
              <div class="cursor-pointer" @click="addfavorite()">
                <icon-heart
                  :class="{ 'fill-black !stroke-black': favorite }"
                  class="stroke-gray-300 h-8 w-8"
                />
              </div>
            </div>
            <div class="text-xs font-light text-gray-500">
              <div
                class="max-h-[300px] overflow-hidden flex flex-col gap-2 relative"
              >
                <a
                  href="#description"
                  class="absolute bottom-0 left-0 w-full p-5 pb-0 bg-gradient-to-b from-transparent via-white to-white flex items-end justify-center"
                >
                  <button
                    class="h-10 px-5 bg-primary-50 rounded-full text-black"
                  >
                    Ürünün Tüm Özellikleri
                  </button>
                </a>
                <ul class="flex flex-col gap-2 list-inside">
                  <li>
                    Bu ürün
                    <nuxt-link
                      class="text-primary-500"
                      :to="'/store/' + selected.stores[0].store.slug"
                      >{{ selected.stores[0].store.name }}</nuxt-link
                    >
                    tarafından gönderilecektir.
                  </li>
                  <li>
                    Kampanya fiyatından satılmak üzere 5 adetten fazla stok
                    sunulmuştur.
                  </li>
                  <li>
                    İncelemiş olduğunuz ürünün satış fiyatını satıcı
                    belirlemektedir.
                  </li>
                  <li>
                    Bir ürün, birden fazla satıcı tarafından satılabilir. Birden
                    fazla satıcı tarafından satışa sunulan ürünlerin satıcıları
                    ürün için belirledikleri fiyata, satıcı puanlarına, teslimat
                    statülerine, ürünlerdeki promosyonlara, kargonun bedava olup
                    olmamasına ve ürünlerin hızlı teslimat ile teslim edilip
                    edilememesine, ürünlerin stok ve kategorileri bilgilerine
                    göre sıralanmaktadır.
                  </li>
                  <li>
                    Bu üründen en fazla 5 adet sipariş verilebilir. 5 adedin
                    üzerindeki siparişleri Dinazors iptal etme hakkını saklı
                    tutar. Belirlenen bu limit kurumsal siparişlerde geçerli
                    olmayıp, kurumsal siparişler için farklı limitler
                    belirlenebilmektedir.
                  </li>
                </ul>
                <div
                  v-html="
                    selected.description.replace(
                      /\n/g,
                      `<br /><div class='h-2'></div>`
                    )
                  "
                ></div>
              </div>
            </div>
          </div>
          <div class="w-3/12">
            <div
              class="border border-gray-100 rounded-xl p-2 flex flex-col gap-2"
            >
              <div
                @click="openstore(selected.stores[0])"
                class="bg-primary-50/40 p-3 text-sm rounded-lg flex items-center justify-between cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="h-10 rounded-full w-10 bg-white border border-gray-100"
                  ></div>
                  <div>
                    <p class="capitalize text-primary-600/70">
                      {{ selected.stores[0].store.name }}
                    </p>
                    <p class="capitalize text-xs font-light text-gray-500">
                      <span>{{ storeFollowers }}</span> Takipçi
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    @click="followstore()"
                    @click.stop
                    class="text-xs font-light text-gray-500 bg-white rounded-lg h-10 px-3 border border-gray-100 hover:bg-black hover:text-white transition duration-300 hover:border-black"
                  >
                    <span v-if="follow">Takibi Bırak</span>
                    <span v-else>Takip Et</span>
                  </button>
                </div>
              </div>
              <ul class="text-sm font-light text-gray-500">
                <li
                  @click="modal.question = !modal.question"
                  class="w-full flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-lg h-10 transition duration-300 cursor-pointer"
                >
                  <span>Satıcı Soruları ({{ questions.length }})</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1.5">
          <div>
            <p class="text-2xl">Benzer Ürünler</p>
          </div>
          <hooper :itemsToShow="5">
            <slide
              v-for="(product, index) in similarproducts"
              :key="index"
              v-show="product.mainid != selected.mainid"
            >
              <div class="p-1.5">
                <product-card :product="product" />
              </div>
            </slide>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
          </hooper>
        </div>
        <div
          id="description"
          class="flex flex-col border border-gray-100 rounded-xl"
        >
          <div class="flex flex-col">
            <div class="p-5 border-b border-gray-100">Ürün Açıklaması</div>
            <div class="flex gap-5 p-5 border-b border-gray-100">
              <div
                class="h-[247px] min-w-[165px] bg-cover bg-center rounded-xl bg-no-repeat"
                :style="{
                  'background-image':
                    'url(' +
                    $axios.defaults.baseURL +
                    '/images/product/' +
                    selected.images[0].url +
                    ')',
                }"
              ></div>
              <div class="grid grid-cols-2 text-xs font-light text-gray-500">
                <ul class="flex flex-col gap-2 list-inside">
                  <li>
                    Bu ürün
                    <nuxt-link
                      class="text-primary-500"
                      :to="'/store/' + selected.stores[0].store.slug"
                      >{{ selected.stores[0].store.name }}</nuxt-link
                    >
                    tarafından gönderilecektir.
                  </li>
                  <li>
                    Kampanya fiyatından satılmak üzere 5 adetten fazla stok
                    sunulmuştur.
                  </li>
                  <li>
                    İncelemiş olduğunuz ürünün satış fiyatını satıcı
                    belirlemektedir.
                  </li>
                  <li>
                    Bir ürün, birden fazla satıcı tarafından satılabilir. Birden
                    fazla satıcı tarafından satışa sunulan ürünlerin satıcıları
                    ürün için belirledikleri fiyata, satıcı puanlarına, teslimat
                    statülerine, ürünlerdeki promosyonlara, kargonun bedava olup
                    olmamasına ve ürünlerin hızlı teslimat ile teslim edilip
                    edilememesine, ürünlerin stok ve kategorileri bilgilerine
                    göre sıralanmaktadır.
                  </li>
                  <li>
                    Bu üründen en fazla 5 adet sipariş verilebilir. 5 adedin
                    üzerindeki siparişleri Dinazors iptal etme hakkını saklı
                    tutar. Belirlenen bu limit kurumsal siparişlerde geçerli
                    olmayıp, kurumsal siparişler için farklı limitler
                    belirlenebilmektedir.
                  </li>
                </ul>
                <div
                  v-html="
                    selected.description.replace(
                      /\n/g,
                      `<br /><div class='h-2'></div>`
                    )
                  "
                ></div>
              </div>
            </div>
          </div>
          <div>
            <div class="p-5 border-b border-gray-100">Ürün Özellikleri</div>
            <ul class="grid grid-cols-2 gap-1 p-5">
              <li
                v-for="(attribute, index) in selected.attributes"
                :key="index"
                class="bg-gray-50 p-3 rounded-lg flex items-center justify-between text-sm"
              >
                <span class="text-gray-500 font-light">
                  {{
                    category.attributes.filter(
                      (attr) => attr.attribute.id == attribute.attributeid
                    )[0]?.attribute.name
                  }}
                </span>
                <span v-if="attribute.customattributevalue">
                  {{ attribute.customattributevalue }}
                </span>
                <span v-else>
                  {{
                    category.attributes
                      .filter(
                        (attr) => attr.attribute.id == attribute.attributeid
                      )[0]
                      ?.attributeValues.filter(
                        (value) => value.id == attribute.attributevalueid
                      )[0]?.name
                  }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <modal-question-product
        v-if="selected && modal.question"
        :product="selected"
        :questions="questions"
        @close="modal.question = false"
        @login="redirect()"
      />
      <modal-review
        v-if="selected && modal.review"
        :product="selected"
        :reviews="reviews.data"
        @close="modal.review = false"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

export default {
  data() {
    return {
      products: [],
      selected: null,
      category: null,
      slicer: [],
      varianter: [],
      favorite: false,
      follow: false,
      questions: [],
      reviews: [],
      modal: {
        question: false,
        review: false,
      },
      similarproducts: [],
    };
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
  computed: {
    storeFollowers() {
      if (this.selected && this.selected.stores[0]) {
        const followerCount = this.selected.stores[0].store.followers.length;
        if (followerCount <= 1) {
          return followerCount + (this.follow ? 1 : 0);
        }
        return followerCount;
      }
      return 0;
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
    addbasket() {
      console.log();
      console.log(this.varianter);
      let attr = {
        slicer: {
          ...this.selected.attributes.find(
            (attribute) => attribute.attributeid === this.slicer.id
          ),
          attributename: this.category.attributes.filter(
            (attr) =>
              attr?.attribute?.id ==
              this.selected.attributes?.find(
                (attribute) => attribute?.attributeid === this.slicer.id
              )?.attributeid
          )[0]?.attribute?.name,
        },
        varianter: {
          ...this.selected.attributes?.find(
            (attribute) => attribute?.attributeid === this.varianter.id
          ),
          attributename: this.category.attributes.filter(
            (attr) =>
              attr?.attribute?.id ==
              this.selected.attributes?.find(
                (attribute) => attribute?.attributeid === this.varianter.id
              )?.attributeid
          )[0]?.attribute.name,
          attributevalue: this.category.attributes
            .filter(
              (attr) =>
                attr?.attribute?.id ==
                this.selected.attributes.find(
                  (attribute) => attribute?.attributeid === this.varianter.id
                )?.attributeid
            )[0]
            ?.attributeValues.filter(
              (attr) =>
                attr?.id ==
                this.selected.attributes.find(
                  (attribute) => attribute?.attributeid === this.varianter.id
                )?.attributevalueid
            )[0]?.name,
        },
      };

      console.log(attr);
      this.additem({
        ...this.selected,
        ...attr,
      });
    },
    redirect() {
      this.modal.question = false;
      setTimeout(() => {
        this.$router.push("/login");
      }, 500);
    },
    getslicer(product, attributes) {
      let newslicer = {
        label: "",
        id: null,
        values: [],
      };

      product.attributes.forEach((attribute) => {
        attributes.forEach((categoryattribute) => {
          if (
            categoryattribute.attribute.id === attribute.attributeid &&
            categoryattribute.slicer
          ) {
            newslicer.label = categoryattribute.attribute.name;
            newslicer.id = categoryattribute.attribute.id;
            this.products.forEach((product) => {
              product.attributes.forEach((prodAttr) => {
                if (prodAttr.attributeid === categoryattribute.attribute.id) {
                  newslicer.values.push(prodAttr);
                }
              });
            });
          }
        });
      });

      const uniqueSlicer = [];
      const slicerMap = new Map();

      newslicer.values.forEach((item) => {
        const key = `${item.attributeid}-${item.attributevalueid}-${item.customattributevalue}`;
        if (!slicerMap.has(key)) {
          slicerMap.set(key, true);
          uniqueSlicer.push(item);
        }
      });

      newslicer.values = uniqueSlicer;

      this.slicer = newslicer;

      let newvarianter = {
        label: "",
        id: null,
        values: [],
      };

      product.attributes.map((attribute) => {
        let id = attributes.filter(
          (categoryattribute) =>
            categoryattribute.attribute.id == attribute.attributeid &&
            categoryattribute.varianter == true
        )[0]?.attribute.id;
        let label = attributes.filter(
          (categoryattribute) =>
            categoryattribute.attribute.id == attribute.attributeid &&
            categoryattribute.varianter == true
        )[0]?.attribute.name;
        if (label) {
          newvarianter.label = label;
        }
        if (id) {
          newvarianter.id = id;
        }
        let varianter = attributes.filter(
          (categoryattribute) =>
            categoryattribute.attribute.id == attribute.attributeid &&
            categoryattribute.varianter == true
        )[0]?.attributeValues;
        if (varianter) {
          this.products.map((product) => {
            product.attributes.forEach((prodAttr) => {
              let variant = varianter.filter((variant) => {
                return variant.id == prodAttr.attributevalueid;
              })[0];

              if (variant) {
                newvarianter.values.push(variant);
              }
            });
          });
        }
      });

      const uniqueVarianter = [];
      const varianterMap = new Map();

      newvarianter.values.forEach((item) => {
        const key = `${item.id}-${item.name}`;
        if (!varianterMap.has(key)) {
          varianterMap.set(key, true);
          uniqueVarianter.push(item);
        }
      });

      newvarianter.values = uniqueVarianter;
      this.varianter = newvarianter;
    },
    changevariant(attribute) {
      let slice = this.selected.attributes.filter(
        (attr) => attr.customattributevalue
      )[0]?.customattributevalue;

      this.products.map((product) => {
        let some = product.attributes.filter(
          (attr) => attr.attributevalueid == attribute.id
        )[0];

        if (some) {
          let check = product.attributes.filter(
            (attr) => attr.customattributevalue == slice
          )[0];

          if (check) {
            this.selected = product;
            this.$axios
              .post(
                "/v1/products/view/count/" +
                  product.id +
                  "/" +
                  this.selected.stores[0].storeid
              )
              .then((response) => {});
          }
        }
      });
    },
    changeslice(slice) {
      this.products.map((product) => {
        let check = product.attributes.filter(
          (attr) => attr.customattributevalue == slice.customattributevalue
        )[0];

        if (check) {
          this.selected = product;
          this.$axios
            .post(
              "/v1/products/view/count/" +
                product.id +
                "/" +
                this.selected.stores[0].storeid
            )
            .then((response) => {});
          return;
        }
      });
    },
    async addfavorite() {
      await this.$addfavorite(this.selected);
    },
    async followstore() {
      if (this.$auth.user) {
        this.follow = !this.follow;
      }
      await this.$followstore(this.selected.stores[0]);
    },
    openstore(store) {
      this.$router.push("/store/" + store.store.slug);
    },
  },
  mounted() {
    this.$axios
      .get("/v1/products/" + this.$route.params.id)
      .then((response) => {
        if (response.data.status == "success") {
          this.products = response.data.products;
          this.questions = response.data.questions;
          this.reviews = response.data.reviews;
          this.selected = response.data.products[0];
          this.$axios
            .get("/v1/category/" + this.selected.categoryid + "/attributes")
            .then((category) => {
              if (category.data.status == "success") {
                this.category = category.data.category;
                this.getslicer(this.selected, this.category.attributes);
              }
              if (
                this.$route.query["add-favorite"] &&
                this.$route.query["add-favorite"] == "true" &&
                this.selected
              ) {
                this.addfavorite();
              }
            });

          this.$axios
            .post("/v1/products/categories", {
              categories: [this.selected.categoryid],
              //gender burada gönderilirse benzer ürünler aynı cinsiyette gelir
            })
            .then((response) => {
              this.similarproducts = response.data.products;
            });
        }
        // Kullanıcı takip ediyorsa follow değişkenini güncelle
        if (this.$auth.user && this.$auth.user.follows) {
          this.follow =
            this.$auth.user.follows.filter(
              (follow) => follow.storeid == this.selected.stores[0].storeid
            ).length > 0;
        }
      });
  },
  watch: {
    selected: function (selecteddata) {
      if (this.$auth.user && this.$auth.user.customerfavorites) {
        this.favorite = this.$auth.user.customerfavorites.filter(
          (favorite) => favorite.productid == selecteddata.id
        ).length;
      }
      if (this.$auth.user && this.$auth.user.follows) {
        this.follow =
          this.$auth.user.follows.filter(
            (follow) => follow.storeid == this.selected.stores[0].storeid
          ).length > 0;
      }
    },
    "$auth.user": function (user) {
      if (user && user.customerfavorites) {
        this.favorite = user.customerfavorites.filter(
          (favorite) => favorite.productid == this.selected.id
        ).length;
      }
      if (user && user.follows) {
        this.follow =
          user.follows.filter(
            (follow) => follow.storeid == this.selected.stores[0].storeid
          ).length > 0;
      }
    },
  },
};
</script>
