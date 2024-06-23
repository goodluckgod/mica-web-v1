<template>
  <div>
    <transition name="menu-fade" mode="out-in">
      <div v-if="addresses" class="container mx-auto flex gap-5 py-5">
        <div class="w-9/12 min-h-[calc(100vh-175px)]">
          <div
            class="grid grid-cols-2 border border-gray-100 rounded-t-xl overflow-hidden"
          >
            <div>
              <div
                :class="{ 'bg-gray-50': step == 'address' }"
                class="flex flex-col gap-2 p-3 border-r border-gray-100 cursor-pointer"
                @click="step = 'address'"
              >
                <p>Adres Bilgileri</p>
                <div
                  v-if="selectedaddress"
                  class="text-sm font-light leading-tight"
                >
                  <p>{{ selectedaddress.title }}</p>
                  <p>{{ selectedaddress.address }}</p>
                </div>
              </div>
            </div>
            <div>
              <div
                :class="{ 'bg-gray-50': step == 'card' }"
                @click="step = 'card'"
                class="flex flex-col gap-2 p-3 cursor-pointer"
              >
                <p>Ödeme Seçenekleri</p>
                <div class="text-sm font-light leading-tight">
                  <p>
                    Banka veya Kredi Kartı kullanarak ödemenizi güvenle
                    yapabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="border border-t-0 border-gray-100 rounded-b-xl p-3">
            <transition name="fade" mode="out-in">
              <div v-if="step == 'address'" class="grid grid-cols-2 gap-3">
                <div
                  @click="modal.address = !modal.address"
                  class="border border-primary-500 text-primary-600 font-light text-sm border-dashed rounded-xl flex items-center justify-center cursor-pointer"
                >
                  <p>Yeni Adres Ekle</p>
                </div>
                <div v-for="(address, index) in addresses" :key="index">
                  <div
                    @click="selectedaddress = address"
                    :class="{
                      'bg-primary-50/50': selectedaddress.id == address.id,
                    }"
                    class="border border-gray-100 p-3 text-sm rounded-xl cursor-pointer"
                  >
                    <p>{{ $t(address.type) }} | {{ address.title }}</p>
                    <p>{{ address.firstname }} {{ address.lastname }}</p>
                    <p>{{ address.address }}</p>
                  </div>
                </div>
              </div>
              <div v-else-if="step == 'card'">
                <div class="grid grid-cols-2 gap-3">
                  <div class="flex flex-col gap-3">
                    <p>Kart Bilgileri</p>
                    <ValidationProvider
                      name="Kart Numarası"
                      rules="required|min:19"
                      v-slot="{ errors }"
                      class="border border-gray-100 rounded-xl"
                      ref="cardnumber"
                    >
                      <input-primary
                        mask="#### #### #### ####"
                        :error="errors[0]"
                        label="Kart Numarası"
                        v-model="card.number"
                      />
                    </ValidationProvider>
                    <div class="flex items-center justify-between">
                      <div class="w-6/12">
                        <div class="w-full flex items-center gap-3">
                          <ValidationProvider
                            v-slot="{ errors }"
                            rules="required"
                            name="Ay"
                            class="w-full border border-gray-100 rounded-xl"
                            ref="month"
                          >
                            <select-primary
                              :error="errors[0]"
                              v-model="card.month"
                              label="Ay"
                            >
                              <option v-for="i in getyears(1, 12)" :key="i">
                                {{ i }}
                              </option>
                            </select-primary>
                          </ValidationProvider>
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Yıl"
                            rules="required"
                            class="w-full border border-gray-100 rounded-xl"
                            ref="year"
                          >
                            <select-primary
                              :error="errors[0]"
                              v-model="card.year"
                              label="Yıl"
                            >
                              <option
                                v-for="i in getyears(2024, 2060)"
                                :key="i"
                              >
                                {{ i }}
                              </option>
                            </select-primary>
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="w-3/12">
                        <ValidationProvider
                          ref="cvv"
                          rules="required|min:3"
                          tag="div"
                          name="CVV"
                          v-slot="{ errors }"
                          class="border border-gray-100 rounded-xl"
                        >
                          <input-primary
                            :error="errors[0]"
                            v-model="card.cvv"
                            label="CVV"
                            mask="###"
                          />
                        </ValidationProvider>
                      </div>
                    </div>
                    <div>
                      <input-check label="3D Secure ile ödemek istiyorum" />
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="w-3/12 flex flex-col gap-5">
          <ValidationProvider
            name="Sözleşmeler"
            rules="policies|required"
            ref="policies"
            v-slot="{ errors }"
            class="flex gap-1.5 p-3 border border-gray-100 rounded-xl items-start text-xs font-light leading-tight text-gray-500"
          >
            <input-check ref="policiescheckbox" v-model="policies" />
            <div @click="policies = !policies" class="cursor-pointer">
              <p :class="{ '!text-red-600': errors[0] }">
                <span
                  @click.stop
                  @click="modal.policies = !modal.policies"
                  class="text-black font-medium"
                  :class="{ '!text-red-600': errors[0] }"
                  >Ön Bilgilendirme Koşulları</span
                >'nı ve
                <span
                  @click.stop
                  @click="modal.policies = !modal.policies"
                  class="text-black font-medium"
                  :class="{ '!text-red-600': errors[0] }"
                  >Mesafeli Satış Sözleşmesi</span
                >'ni okudum onaylıyorum.
              </p>
              <p v-if="errors[0]" class="text-red-600">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
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
          <div @click="step == 'address' ? (step = 'card') : validatepayment()">
            <button-primary
              :title="step == 'address' ? 'Kaydet ve Devam Et' : 'Ödeme Yap'"
            />
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <modal-auth-add-address
        v-if="modal.address"
        @close="
          modal.address = false;
          getaddress();
        "
      />
      <modal-policies-order
        v-if="modal.policies"
        @close="modal.policies = false"
        :address="selectedaddress"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      step: "address",
      addresses: [],
      selectedaddress: null,
      modal: {
        address: false,
        policies: false,
      },
      card: {
        number: "",
        year: "",
        month: "",
        cvv: "",
      },
      policies: false,
    };
  },
  computed: {
    ...mapGetters({
      cartItems: "cartitems",
      cartTotalPrice: "carttotalprice",
      totalShippingCost: "totalshippingcost",
    }),
  },
  methods: {
    ...mapActions([
      "additem",
      "removeitem",
      "clearcart",
      "incrementitemquantity",
      "decrementitemquantity",
    ]),
    validatepayment() {
      Promise.all([
        this.$refs.cardnumber.validate(),
        this.$refs.year.validate(),
        this.$refs.month.validate(),
        this.$refs.cvv.validate(),
        this.$refs.policies.validate(),
      ]).then((results) => {
        if (results.every((result) => result.valid)) {
          console.log(this.$store.state.items);
          this.$axios
            .post("/v1/profile/customer/create-order", {
              items: this.$store.state.items,
              address: this.selectedaddress.id,
            })
            .then((response) => {
              console.log(response.data);
            });
        }
      });
    },
    getaddress() {
      this.$axios.get("/v1/profile/customer/address").then((response) => {
        if (response.data.status == "success") {
          this.addresses = response.data.addresses;
          if (response.data.addresses.length > 0) {
            this.selectedaddress = response.data.addresses[0];
          } else if (response.data.addresses.length == 0) {
            this.modal.address = true;
          }
        }
      });
    },
    getyears(start, end) {
      const years = [];
      for (let i = start; i <= end; i++) {
        years.push(i);
      }
      return years;
    },
  },

  mounted() {
    if (this.$auth.user) {
    } else {
      this.$router.push("/login?redirect=my-card+payment");
    }
    this.getaddress();
  },
};
</script>
