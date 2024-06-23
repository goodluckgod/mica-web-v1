<template>
  <div class="container mx-auto flex items-center justify-between">
    <div></div>
    <ul class="flex h-9 items-center gap-5 text-xs font-light text-gray-500">
      <li class="hover:text-black transition duration-300 cursor-pointer">
        <nuxt-link
          :to="
            $auth.user
              ? localePath('/my-account/coupons')
              : localePath('/login')
          "
          >{{ $t("discountcoupons") }}</nuxt-link
        >
      </li>
      <li class="hover:text-black transition duration-300 cursor-pointer">
        <a href="http://192.168.1.5:3001" target="_blank">
          {{ $t("selldinazors") }}
        </a>
      </li>
      <li class="hover:text-black transition duration-300 cursor-pointer">
        {{ $t("helpandsupoort") }}
      </li>
      <li
        class="hover:text-black transition duration-300 cursor-pointer relative"
      >
        <div @click="dropdown.locale = !dropdown.locale">
          <span>{{ $t("selectlanguage") }}:</span>
          <span>{{
            this.$i18n.locales.find((lang) => lang.code == this.$i18n.locale)
              .name
          }}</span>
        </div>
        <transition name="menu-fade" mode="out-in">
          <div v-if="dropdown.locale" class="absolute top-full pt-2 w-full">
            <ul
              class="p-2 gap-2 flex flex-col bg-white border border-gray-200 rounded-xl"
            >
              <li
                v-for="(lang, index) in this.$i18n.locales"
                :key="index"
                @click="
                  $i18n.setLocale(lang.code);
                  dropdown.locale = false;
                "
              >
                {{ lang.name }}
              </li>
            </ul>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdown: {
        locale: false,
      },
    };
  },
};
</script>
