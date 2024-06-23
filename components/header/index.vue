<template>
  <div class="flex flex-col gap-1">
    <header-top v-if="$device.isDesktop" />
    <div
      class="container mx-auto p-3 lg:p-0 flex items-center justify-between gap-5 lg:gap-20"
    >
      <nuxt-link :to="localePath('/')">
        <logo-dark class="h-8 lg:h-[39px] lg:-mt-4 min-w-fit" />
      </nuxt-link>
      <header-search v-if="$device.isDesktop" />
      <menu-user />
    </div>
    <Menu v-if="$device.isDesktop" />
  </div>
</template>
