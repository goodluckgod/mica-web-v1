<template>
  <div>
    <div
      class="p-5 border border-gray-100 border-b-0 rounded-t-xl flex justify-between items-center"
    >
      <div>
        <p class="text-xl">
          {{ $t("myaddresses") }}
        </p>
      </div>
      <div @click="modal.address = true">
        <button-secondary :title="$t('addnewaddress')" />
      </div>
    </div>
    <div class="border border-gray-100 p-5 rounded-b-xl">
      <transition name="fade" mode="out-in">
        <div v-if="addresses.length > 0">
          <ul class="grid grid-cols-3 gap-5">
            <li
              v-for="(address, index) in addresses"
              :key="index"
              class="border border-gray-100 rounded-xl p-3 flex flex-col gap-2"
            >
              <div class="grid grid-cols-2 gap-2">
                <div class="text-xs font-light text-gray-500">
                  <p class="text-black font-medium">{{ $t("billingtype") }}</p>
                  <p>{{ $t(address.type) }}</p>
                </div>
                <div
                  class="text-xs font-light text-gray-500 flex gap-3 justify-end"
                >
                  <p
                    class="cursor-pointer hover:text-black transition duration-300"
                    @click="deleteadress(address.id)"
                  >
                    {{ $t("delete") }}
                  </p>
                  <p
                    class="cursor-pointer hover:text-black transition duration-300"
                  >
                    {{ $t("edit") }}
                  </p>
                </div>
              </div>
              <div class="text-xs font-light text-gray-500">
                <p class="text-black font-medium">
                  {{ $t("firstname") }} / {{ $t("lastname") }}
                </p>
                <p>{{ address.firstname }} {{ address.lastname }}</p>
              </div>
              <div class="text-xs font-light text-gray-500">
                <p class="text-black font-medium">{{ $t("phone") }}</p>
                <p>{{ address.phone }}</p>
              </div>
              <div class="text-xs font-light text-gray-500">
                <p class="text-black font-medium">{{ $t("address") }}</p>
                <p>{{ address.address }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="flex items-center justify-center">
          <div class="w-6/12 flex flex-col text-center gap-5">
            <div class="flex items-center justify-center">
              <icon-location class="fill-primary h-24 w-24" />
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-xl font-medium">
                {{ $t("yourregisteredaddresswasnotfound") }}
              </p>
              <p class="font-light text-sm text-gray-500">
                {{ $t("addresswasnotfountdescription") }}
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade" mode="out-in">
      <modal-auth-add-address
        v-if="modal.address"
        @close="
          modal.address = false;
          getaddress();
        "
      />
    </transition>
  </div>
</template>

<script>
export default {
  layout: "account",
  data() {
    return {
      addresses: [],
      modal: {
        address: false,
      },
    };
  },
  methods: {
    getaddress() {
      this.$axios.get("/v1/profile/customer/address").then((response) => {
        if (response.data.status == "success") {
          this.addresses = response.data.addresses;
        }
      });
    },
    deleteadress(id) {
      this.$axios
        .delete("/v1/profile/customer/address/delete/" + id)
        .then((response) => {
          if (response.data.status == "success") {
            this.getaddress();
          }
        });
    },
  },
  mounted() {
    this.getaddress();
  },
};
</script>
