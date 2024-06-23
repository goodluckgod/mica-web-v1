<template>
  <div class="grid grid-cols-1 gap-5">
    <div>
      <div
        class="p-5 border border-gray-100 border-b-0 rounded-t-xl flex justify-between items-center"
      >
        <div>
          <p v-if="step == 1" class="text-xl">
            {{ $t("myinformation") }}
          </p>
          <p v-else class="text-xl">
            {{ $t("successandunsuccesslogin") }}
          </p>
        </div>
        <div class="border border-gray-100 rounded-xl">
          <select-primary :label="$t('operation')" v-model="step">
            <option value="1">{{ $t("updatemyaccountinformation") }}</option>
            <option value="2">{{ $t("successandunsuccesslogin") }}</option>
          </select-primary>
        </div>
      </div>
      <div
        v-if="step == 1"
        class="grid grid-cols-2 gap-5 p-5 border border-gray-100 rounded-b-xl"
      >
        <div class="flex flex-col gap-5">
          <div>
            <p>{{ $t("updatemyaccountinformation") }}</p>
          </div>
          <ValidationObserver
            tag="form"
            ref="form"
            @submit.prevent="updateuser"
            v-slot="{ invalid }"
            class="flex flex-col gap-3"
          >
            <div
              v-if="user.error"
              class="bg-red-50 text-red-500 text-xs p-3 rounded-xl"
            >
              <span>{{ user.error }}</span>
            </div>
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
                    v-model="user.firstname"
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
                    v-model="user.lastname"
                  />
                </div>
              </ValidationProvider>
            </div>
            <ValidationProvider
              rules="required|email"
              :name="$t('email')"
              v-slot="{ errors }"
            >
              <div class="border border-gray-100 rounded-xl">
                <input-primary
                  :error="errors[0]"
                  :label="$t('youremailaddress')"
                  v-model="user.email"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              rules="required|min:18"
              :name="$t('phone')"
              v-slot="{ errors }"
            >
              <div class="border border-gray-100 rounded-xl">
                <input-primary
                  :error="errors[0]"
                  :label="$t('yourphone')"
                  v-model="user.phone"
                  mask="+90 (5##) ### ####"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              rules="required|min:10"
              :name="$t('birthday')"
              v-slot="{ errors }"
            >
              <div class="border border-gray-100 rounded-xl">
                <input-primary
                  :error="errors[0]"
                  :label="$t('yourbirthday')"
                  v-model="user.birthdate"
                  mask="##/##/####"
                />
              </div>
            </ValidationProvider>
            <button-primary
              :title="$t('update')"
              :loading="user.loading"
              :disabled="invalid"
            />
          </ValidationObserver>
        </div>
        <div class="flex flex-col gap-5">
          <div>
            <p>{{ $t("updatepassword") }}</p>
          </div>
          <ValidationObserver
            tag="form"
            ref="password"
            v-slot="{ invalid }"
            class="flex flex-col gap-3"
          >
            <div
              v-if="password.error"
              class="bg-red-50 text-red-500 text-xs p-3 rounded-xl"
            >
              <span>{{ password.error }}</span>
            </div>
            <ValidationProvider
              rules="required"
              :name="$t('currentpassword')"
              v-slot="{ errors }"
            >
              <div class="border border-gray-100 rounded-xl">
                <input-primary
                  :error="errors[0]"
                  :label="$t('yourcurrentpassword')"
                  v-model="password.current"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              rules="required|min:6"
              :name="$t('password')"
              v-slot="{ errors }"
            >
              <div class="border border-gray-100 rounded-xl">
                <input-primary
                  :error="errors[0]"
                  :label="$t('yourpassword')"
                  v-model="password.new"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              rules="required|min:6|confirmed:password.new"
              :name="$t('repassword')"
              v-slot="{ errors }"
            >
              <div class="border border-gray-100 rounded-xl">
                <input-primary
                  :error="errors[0]"
                  :label="$t('yourrepassword')"
                  v-model="password.renew"
                />
              </div>
            </ValidationProvider>
            <button-primary
              :title="$t('update')"
              :loading="password.loading"
              :disabled="invalid"
            />
          </ValidationObserver>
        </div>
      </div>
      <div v-else class="border border-gray-100 rounded-b-xl p-5">
        <table class="w-full">
          <tr v-for="(attemp, index) in attemps" :key="index">
            <td>
              <div class="p-1.5">
                <p class="text-sm">{{ $t("operationtype") }}</p>
                <p class="text-sm font-light text-gray-500">
                  {{
                    attemp.success
                      ? $t(attemp.type)
                      : attemp.type == "LOGIN"
                      ? "Giriş Denemesi"
                      : $t(attemp.type)
                  }}
                </p>
              </div>
            </td>
            <td>
              <div>
                <p class="text-sm">İşlem Tarihi</p>
                <p class="text-sm font-light text-gray-500">
                  {{
                    new Date(attemp.createdat)
                      .toLocaleString("en-GB")
                      .replace(",", "")
                  }}
                </p>
              </div>
            </td>
            <td>
              <div>
                <p class="text-sm">{{ $t("ipaddress") }}</p>
                <p class="text-sm font-light text-gray-500">
                  {{ attemp.ipaddress.replace(/^.*:/, "") }}
                </p>
              </div>
            </td>
            <td>
              <div>
                <div>
                  <p class="text-sm">{{ $t("operatingsystem") }}</p>
                  <p class="text-sm font-light text-gray-500">
                    {{ $parseuseragent(attemp.useragent).operatingSystem }}
                    {{ $parseuseragent(attemp.useragent).browser }}
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div
                v-if="attemp.success"
                class="bg-green-50 p-3 text-green-500 flex items-center justify-center text-sm rounded-xl"
              >
                <p>{{ $t("successfull") }}</p>
              </div>
              <div
                v-else
                class="bg-red-50 p-3 text-red-500 flex items-center justify-center text-sm rounded-xl"
              >
                <p>{{ $t("unsuccessfull") }}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "account",
  data() {
    return {
      step: 1,
      attemps: [],
      user: {
        error: "",
        loading: false,
        firstname: this.$auth.user.firstname,
        lastname: this.$auth.user.lastname,
        email: this.$auth.user.email,
        phone: this.$auth.user.phone,
        birthdate: new Date(this.$auth.user.birthdate)
          .toISOString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/"),
      },
      password: {
        error: "",
        loading: false,
        current: "",
        new: "",
        renew: "",
      },
    };
  },
  methods: {
    updateuser() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.user.loading = true;
          this.$axios
            .post("/v1/profile/customer/update", {
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              email: this.user.email,
              phone: this.user.phone,
              birthdate: this.user.birthdate,
            })
            .then((response) => {
              setTimeout(() => {
                this.user.loading = false;
              }, 1000);
              if (response.data.status == "success") {
                this.$auth.fetchUser();
              } else {
                this.user.error = response.data.message;
              }
            });
        }
      });
    },
  },
  mounted() {
    this.$axios.get("/v1/profile/customer/attemps").then((response) => {
      if (response.data.status == "success") {
        this.attemps = response.data.attemps;
      }
    });
    this.$auth.fetchUser();
  },
};
</script>
