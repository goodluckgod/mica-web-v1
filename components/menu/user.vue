<template>
  <ul class="flex items-center gap-3 lg:gap-7 text-sm min-w-fit">
    <li>
      <div v-if="$auth.user" class="relative">
        <div
          class="flex items-center gap-1.5 cursor-pointer"
          @click="dropdown.user = !dropdown.user"
        >
          <icon-user class="stroke-black" />
          <span v-if="$device.isDesktop">{{ $t("myaccount") }}</span>
        </div>
        <transition name="menu-fade" mode="out-in">
          <div
            v-if="dropdown.user"
            class="absolute top-full left-0 w-[200px] pt-2 z-30"
          >
            <ul
              class="bg-white p-1 rounded-xl border border-gray-100 text-sm font-light flex flex-col shadow-xl shadow-black/5"
            >
              <li @click="dropdown.user = false">
                <nuxt-link
                  :to="localePath('/my-account/orders')"
                  class="p-2 flex items-center h-8 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-black transition duration-300 cursor-pointer"
                >
                  {{ $t("allmyorders") }}
                </nuxt-link>
              </li>
              <li @click="dropdown.user = false">
                <nuxt-link
                  :to="localePath('/my-account/reviews')"
                  class="p-2 flex items-center h-8 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-black transition duration-300 cursor-pointer"
                >
                  {{ $t("myreviews") }}
                </nuxt-link>
              </li>
              <!-- <li @click="dropdown.user = false">
                <nuxt-link
                  :to="localePath('/my-account/messages')"
                  class="p-2 flex items-center h-8 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-black transition duration-300 cursor-pointer"
                >
                  {{ $t("mymessages") }}
                </nuxt-link>
              </li> -->
              <li @click="dropdown.user = false">
                <nuxt-link
                  :to="localePath('/my-account/details')"
                  class="p-2 flex items-center h-8 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-black transition duration-300 cursor-pointer"
                >
                  {{ $t("myinformation") }}
                </nuxt-link>
              </li>
              <li
                @click="
                  logout();
                  dropdown.user = false;
                "
                class="p-2 flex items-center h-8 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition duration-300 cursor-pointer"
              >
                {{ $t("logout") }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <nuxt-link
        v-else
        :to="localePath('/login')"
        class="flex items-center gap-1.5"
      >
        <icon-user /> <span v-if="$device.isDesktop">{{ $t("login") }}</span>
      </nuxt-link>
    </li>
    <li>
      <nuxt-link
        :to="
          $auth.user
            ? localePath('/my-account/favorites')
            : localePath('/login')
        "
        class="flex items-center gap-1.5"
      >
        <icon-heart class="-mt-0.5 stroke-black" />
        <span v-if="$device.isDesktop">{{ $t("myfavorites") }}</span>
      </nuxt-link>
    </li>
    <li>
      <nuxt-link :to="localePath('/my-card')" class="flex items-center gap-1.5">
        <icon-shopping-bag />
        <span v-if="$device.isDesktop">{{ $t("mycard") }}</span>
        <div
          v-if="cartTotalQuantity > 0"
          class="h-6 w-6 flex items-center bg-primary-500 rounded-full text-white justify-center text-center"
        >
          <p>{{ cartTotalQuantity }}</p>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dropdown: {
        user: false,
      },
    };
  },
  computed: {
    ...mapGetters(["carttotalquantity"]),

    cartTotalQuantity() {
      return this.carttotalquantity;
    },
  },
  methods: {
    ...mapActions("cart", [
      "additem",
      "removeitem",
      "clearcart",
      "incrementitemquantity",
      "decrementitemquantity",
    ]),
    logout() {
      this.$auth.logout();
      this.$router.push(this.localePath("/"));
    },
  },
};
</script>

<style>
/* Stillerinizi buraya ekleyin */
</style>
