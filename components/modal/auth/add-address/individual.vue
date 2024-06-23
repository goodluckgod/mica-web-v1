<template>
  <ValidationObserver
    tag="form"
    ref="form"
    @submit.prevent="send"
    v-slot="{ invalid }"
    v-if="(form.type = 'CORPORATE')"
    class="flex flex-col gap-3 p-5 border-t border-gray-100"
  >
    <div
      v-if="form.error"
      class="bg-red-50 text-red-500 text-xs p-3 rounded-xl"
    >
      <span>{{ form.error }}</span>
    </div>

    <ValidationProvider
      rules="required"
      :name="$t('addresstitle')"
      v-slot="{ errors }"
    >
      <div class="border border-gray-100 rounded-xl">
        <input-primary
          :error="errors[0]"
          :label="$t('addresstitle')"
          v-model="form.title"
          autofocus="true"
        />
      </div>
    </ValidationProvider>
    <div class="grid grid-cols-2 gap-3">
      <ValidationProvider
        rules="required"
        :name="$t('firstname')"
        v-slot="{ errors }"
      >
        <div class="border border-gray-100 rounded-xl">
          <input-primary
            :error="errors[0]"
            :label="$t('yourfirstname')"
            v-model="form.firstname"
          />
        </div>
      </ValidationProvider>
      <ValidationProvider
        rules="required"
        :name="$t('lastname')"
        v-slot="{ errors }"
      >
        <div class="border border-gray-100 rounded-xl">
          <input-primary
            :error="errors[0]"
            :label="$t('yourlastname')"
            v-model="form.lastname"
          />
        </div>
      </ValidationProvider>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <ValidationProvider
        rules="required|min:18"
        :name="$t('phone')"
        v-slot="{ errors }"
      >
        <div class="border border-gray-100 rounded-xl">
          <input-primary
            :error="errors[0]"
            :label="$t('yourphone')"
            v-model="form.phone"
            mask="+90 (5##) ### ####"
          />
        </div>
      </ValidationProvider>
      <ValidationProvider
        rules="required"
        :name="$t('city')"
        v-slot="{ errors }"
      >
        <div class="border border-gray-100 rounded-xl">
          <select-primary
            :error="errors[0]"
            :label="$t('city')"
            v-model="form.city"
          >
            <option value="" disabled selected></option>
            <option
              :value="city.id"
              v-for="(city, index) in cities"
              :key="index"
            >
              {{ city.name }}
            </option>
          </select-primary>
        </div>
      </ValidationProvider>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <ValidationProvider
        rules="required"
        :name="$t('district')"
        v-slot="{ errors }"
      >
        <div class="border border-gray-100 rounded-xl">
          <select-primary
            :error="errors[0]"
            :label="$t('district')"
            v-model="form.district"
          >
            <option value="" disabled selected></option>
            <option
              :value="district.id"
              v-for="(district, index) in districts"
              :key="index"
            >
              {{ district.name }}
            </option>
          </select-primary>
        </div>
      </ValidationProvider>
      <ValidationProvider
        rules="required"
        :name="$t('neighborhood')"
        v-slot="{ errors }"
      >
        <div class="border border-gray-100 rounded-xl">
          <select-primary
            :error="errors[0]"
            :label="$t('neighborhood')"
            v-model="form.neighborhood"
          >
            <option value="" disabled selected></option>
            <option
              :value="neighborhood.id"
              v-for="(neighborhood, index) in neighborhoods"
              :key="index"
            >
              {{ neighborhood.name }}
            </option>
          </select-primary>
        </div>
      </ValidationProvider>
    </div>
    <ValidationProvider
      rules="required|min:10|max:250"
      :name="$t('address')"
      v-slot="{ errors }"
    >
      <div class="border border-gray-100 rounded-xl">
        <input-textarea
          :error="errors[0]"
          :label="$t('youraddress')"
          v-model="form.address"
        />
      </div>
    </ValidationProvider>
    <div class="text-xs font-light text-gray-500">
      <span>{{ $t("addaddressdescription") }}</span>
    </div>
    <button-primary
      :title="$t('addaddress')"
      :loading="form.loading"
      :disabled="invalid"
    />
  </ValidationObserver>
</template>

<script>
export default {
  data() {
    return {
      cities: [],
      districts: [],
      neighborhoods: [],
      form: {
        loading: false,
        error: "",
        title: "",
        type: "INDIVIDUAL",
        firstname: "",
        lastname: "",
        phone: "",
        city: "",
        district: "",
        neighborhood: "",
        address: "",
      },
    };
  },
  methods: {
    send() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.form.loading = true;
          this.$axios
            .post("/v1/profile/customer/address/create", {
              type: "INDIVIDUAL",
              title: this.form.title,
              firstname: this.form.firstname,
              lastname: this.form.lastname,
              phone: this.form.phone,
              city: parseInt(this.form.city),
              district: parseInt(this.form.district),
              neighborhood: parseInt(this.form.neighborhood),
              address: this.form.address,
            })
            .then((response) => {
              if (response.data.status == "success") {
                this.$emit("close");
              } else {
                this.form.error = response.data.message;
              }
            });
        }
      });
    },
    getdistricts(city) {
      this.$turkey.get("/v1/provinces/" + city).then((response) => {
        if (response.data.status == "OK") {
          this.districts = response.data.data.districts;
        }
      });
    },
    getneighborhoods(district) {
      this.$turkey.get("/v1/districts/" + district).then((response) => {
        if (response.data.status == "OK") {
          this.neighborhoods = response.data.data.neighborhoods;
        }
      });
    },
  },
  mounted() {
    this.$turkey.get("/v1/provinces").then((response) => {
      if (response.data.status == "OK") {
        this.cities = response.data.data;
      }
    });
  },
  watch: {
    "form.city": function (city) {
      this.getdistricts(city);
    },
    "form.district": function (city) {
      this.getneighborhoods(city);
    },
  },
};
</script>
