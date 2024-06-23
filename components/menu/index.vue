<template>
  <ul
    class="container mx-auto flex items-center justify-between text-sm relative"
  >
    <li
      v-for="(item, index) in items"
      :key="index"
      @click="active.menu = index"
      class="h-11 flex items-center cursor-pointer"
      v-on:mouseleave="active.menu = null"
    >
      <span>{{ item.title }}</span>
      <transition name="menu-fade" mode="out-in">
        <masonry
          :cols="{ default: 6, 700: 2, 400: 1 }"
          :gutter="{ default: '0px', 700: '0px' }"
          v-if="active.menu == index"
          class="absolute top-full left-0 w-full py-3 text-sm bg-white z-20"
        >
          <div
            v-for="(children, bindex) in item.children"
            :key="bindex"
            class="flex flex-col gap-2.5 mb-3"
          >
            <span class="text-primary-600">
              {{ children.title }}
            </span>
            <ul class="flex flex-col gap-1">
              <li
                v-for="(sub, cindex) in children.children"
                :key="cindex"
                class="text-xs text-gray-500 font-light hover:text-black transition duration-300"
              >
                <nuxt-link v-if="sub.slug" :to="sub.slug">{{
                  sub.title
                }}</nuxt-link>
              </li>
            </ul>
          </div>
        </masonry>
      </transition>
    </li>
  </ul>
</template>

<script>
import items from "@/assets/json/categories.json";
import itemsen from "@/assets/json/categories-en.json";

export default {
  data() {
    return {
      items: this.$i18n.locale == "tr" ? items : itemsen,
      active: {
        menu: null,
      },
    };
  },
  watch: {
    "$i18n.locale"(locale) {
      locale == "tr" ? (this.items = items) : (this.items = itemsen);
    },
  },
};
</script>

<style>
.category {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 30px;
  box-sizing: border-box;
}
</style>
