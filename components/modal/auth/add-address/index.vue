<template>
  <div
    @click="$emit('close')"
    class="fixed top-0 left-0 h-screen w-screen bg-black/5 backdrop-blur-lg flex items-center justify-center"
  >
    <div class="container mx-auto flex items-center justify-center">
      <div
        class="bg-white w-5/12 border border-gray-100 rounded-xl shadow-2xl shadow-gray-500/5"
        @click.stop
      >
        <div class="flex items-center justify-between">
          <div class="px-5 py-3">
            <p class="text-lg">{{ $t("addaddress") }}</p>
          </div>
          <div class="px-5">
            <div class="bg-gray-100 rounded-xl p-1">
              <ul class="flex text-sm">
                <li
                  @click="type = 'INDIVIDUAL'"
                  class="px-3 h-7 flex items-center cursor-pointer"
                  :class="{ 'bg-white rounded-lg': type == 'INDIVIDUAL' }"
                >
                  {{ $t("INDIVIDUAL") }}
                </li>
                <li
                  @click="type = 'CORPORATE'"
                  :class="{ 'bg-white rounded-lg': type == 'CORPORATE' }"
                  class="px-3 h-7 flex items-center cursor-pointer"
                >
                  {{ $t("CORPORATE") }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <modal-auth-add-address-individual
          v-if="type == 'INDIVIDUAL'"
          @close="$emit('close')"
        />
        <modal-auth-add-address-corporate v-else @close="$emit('close')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "INDIVIDUAL",
    };
  },
};
</script>
