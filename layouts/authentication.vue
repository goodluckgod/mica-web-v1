<template>
  <div>
    <Header />
    <div
      class="container mx-auto flex flex-col items-center justify-center h-[calc(100vh-132px)] gap-5 p-5 lg:p-0"
    >
      <ul
        class="lg:w-4/12 w-full flex items-center h-12 px-1 gap-1 bg-gray-50 rounded-xl relative"
      >
        <li
          @click="$router.push(localePath('/login'))"
          class="h-10 w-full flex items-center justify-center z-10 cursor-pointer"
        >
          {{ $t("login") }}
        </li>
        <li
          @click="$router.push(localePath('/register'))"
          class="h-10 w-full flex items-center justify-center z-10 cursor-pointer"
        >
          {{ $t("register") }}
        </li>
        <li
          :class="{
            'left-1': $route.path == localePath('/login'),
            'left-[49.1%]': $route.path == localePath('/register'),
          }"
          class="absolute w-6/12 h-10 bg-white rounded-lg border border-gray-100 transition-all duration-300"
        ></li>
      </ul>
      <div class="lg:w-4/12">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$auth.user ? this.$router.push("/") : null;
  },
};
</script>
