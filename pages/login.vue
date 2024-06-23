<template>
  <ValidationObserver
    tag="form"
    ref="form"
    @submit="send"
    v-slot="{ invalid }"
    class="flex flex-col gap-3"
  >
    <div
      v-if="form.error"
      class="bg-red-50 text-red-500 text-xs p-3 rounded-xl"
    >
      <span>{{ form.error }}</span>
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
          v-model="form.email"
          autofocus="true"
        />
      </div>
    </ValidationProvider>
    <ValidationProvider rules="required" name="password" v-slot="{ errors }">
      <div class="border border-gray-100 rounded-xl">
        <input-primary
          :error="errors[0]"
          :label="$t('yourpassword')"
          :name="$t('password')"
          type="password"
          v-model="form.password"
        />
      </div>
    </ValidationProvider>
    <p class="text-xs font-light text-gray-500">
      {{ $t("logindescription") }}
    </p>
    <button-primary
      :title="$t('login')"
      :loading="form.loading"
      :disabled="invalid"
    />
  </ValidationObserver>
</template>

<script>
export default {
  layout: "authentication",
  data() {
    return {
      redirect: null,
      form: {
        loading: false,
        email: "",
        password: "",
      },
    };
  },
  methods: {
    send(event) {
      event.preventDefault();
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.form.loading = true;
          setTimeout(() => {
            this.$axios
              .post("/v1/auth/login/customer", {
                email: this.form.email,
                password: this.form.password,
              })
              .then(async (response) => {
                this.form.loading = false;
                if (response.data.status == "success") {
                  await this.$auth.setUserToken(response.data.access_token);
                  await this.$auth.setUser(response.data.user);
                  this.redirect
                    ? this.$router.push(this.redirect)
                    : this.$router.push("/");
                } else {
                  this.form.error = response.data.message;
                }
              });
          }, 1000);
        }
      });
    },
  },
  mounted() {
    if (this.$route.query.redirect) {
      this.redirect = this.$route.query.redirect
        .replace("%20", " ")
        .replace(" ", "/");
    }
  },
};
</script>
