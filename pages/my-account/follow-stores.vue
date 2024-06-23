<template>
  <div>
    <div
      class="p-5 border border-gray-100 border-b-0 rounded-t-xl flex justify-between items-center"
    >
      <div>
        <p class="text-xl">Takip Ettiğim Mağazalar</p>
      </div>
      <div class="h-12"></div>
    </div>
    <div class="border border-gray-100 rounded-b-xl p-5 grid grid-cols-2 gap-5">
      <div v-for="(store, index) in $auth.user.follows" :key="index">
        <store-card :store="store" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "account",
};
</script>
