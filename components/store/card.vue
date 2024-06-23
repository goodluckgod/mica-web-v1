<template>
  <div
    class="border border-gray-100 rounded-xl p-3 flex items-center justify-between"
  >
    <div class="flex items-center gap-3">
      <div class="h-12 w-12 border border-gray-100 rounded-full"></div>
      <div>
        <p>{{ store.store.name.toUpperCase() }}</p>
      </div>
    </div>
    <div @click="$router.push('/store/' + store.store.slug)">
      <button-secondary title="Mağazaya Git" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["store"],
};
</script>
