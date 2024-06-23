<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-black/5 backdrop-blur-md flex items-center justify-center"
    @click="$emit('close')"
  >
    <div class="container mx-auto flex items-center justify-center">
      <transition name="menu-fade" mode="out-in">
        <div
          class="w-7/12 bg-white rounded-xl border border-gray-100"
          @click.stop
        >
          <div
            class="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
          >
            <div class="leading-none">
              <p>{{ product.title }}</p>
              <p class="font-light text-sm">Soru ve Cevapları</p>
            </div>
            <div
              @click="
                $auth.user
                  ? type == 'list'
                    ? (type = 'question')
                    : (type = 'list')
                  : $emit('login')
              "
              @click.stop
            >
              <component
                :is="type == 'list' ? 'button-secondary' : 'button-error'"
                :title="type == 'list' ? 'Soru Sorun' : 'Vazgeç'"
              />
            </div>
          </div>
          <div
            class="p-5 overflow-y-auto scrollbar transition-all duration-500 grid"
            :class="{
              'min-h-[50px] max-h-[500px]': type == 'list',
              'min-h-[500px] max-h-[500px]': type == 'question',
            }"
          >
            <transition name="menu-fade" mode="out-in" delay="1000">
              <ul v-if="type == 'list'" class="flex flex-col gap-5">
                <li
                  class="flex flex-col gap-3"
                  v-for="(question, index) in questions"
                  :key="index"
                >
                  <div class="">
                    <div
                      class="pr-3 border-r leading-tight border-gray-100 text-xs font-light text-gray-600 rounded-xl flex items-center justify-between"
                    >
                      <p
                        v-if="
                          question.customer.firstname &&
                          question.customer.lastname
                        "
                      >
                        <span>{{ question.customer.firstname[0] }}**</span>
                        <span>{{ question.customer.lastname[0] }}**</span>
                      </p>
                      <p v-else>*** ***</p>
                      <p>
                        {{
                          new Date(question.createdat).toLocaleString("tr-TR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }}
                      </p>
                    </div>
                    <div>
                      <p class="font-medium text-sm">{{ question.question }}</p>
                    </div>
                  </div>
                  <div v-if="question.answers.length > 0">
                    <div
                      v-for="(answer, bindex) in question.answers"
                      :key="bindex"
                      class="bg-gray-100/75 text-xs font-light text-gray-600 p-3 rounded-xl flex gap-3"
                    >
                      <div>
                        <div
                          class="h-10 w-10 border border-gray-100 bg-white rounded-full"
                        ></div>
                      </div>
                      <div class="flex flex-col pt-1 gap-0.5">
                        <div class="flex items center gap-3">
                          <p class="text-black capitalize">
                            {{ answer.store.name }} Satıcısının Cevabı
                          </p>
                          <span class="text-gray-600"
                            >{{
                              timedifference(
                                question.createdat,
                                answer.createdat
                              )
                            }}
                            içinde cevaplandı</span
                          >
                        </div>
                        <p>{{ answer.answer }}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="bg-red-50 text-red-600 text-sm p-3 rounded-xl font-light"
                  >
                    Bu soru henüz cevaplanmadı.
                  </div>
                </li>
              </ul>
              <ValidationObserver
                v-else
                class="flex flex-col gap-5"
                tag="form"
                ref="form"
                @submit="send"
                v-slot="{ invalid }"
              >
                <ValidationProvider
                  rules="required|min:10"
                  :name="'Ürün Sorusu'"
                  v-slot="{ errors }"
                  class="border border-gray-100 rounded-xl min-h-[calc(100%-68px)]"
                >
                  <input-textarea
                    :error="errors[0]"
                    label="Satıcıya Sorunuzu Yazınız"
                    v-model="question"
                  />
                </ValidationProvider>
                <div class="h-12">
                  <button-primary
                    :loading="loading"
                    title="Soruyu Gönder"
                    :disabled="invalid"
                  />
                </div>
              </ValidationObserver>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "questions"],
  data() {
    return {
      type: "list",
      question: "",
      loading: false,
    };
  },
  methods: {
    send(event) {
      event.preventDefault();
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.loading = true;
          this.$axios
            .post("/v1/products/question/create", {
              product: this.product.id,
              question: this.question,
            })
            .then((response) => {
              setTimeout(() => {
                this.loading = false;
                if (response.data.status == "success") {
                  this.$router.push("/my-accout/messages");
                } else {
                  this.error = response.data.message;
                }
              }, 1000);
            });
        }
      });
    },
    timedifference(timestamp1, timestamp2) {
      const date1 = new Date(timestamp1);
      const date2 = new Date(timestamp2);

      let diffInMilliseconds = Math.abs(date2 - date1);
      const oneDay = 24 * 60 * 60 * 1000;
      const oneHour = 60 * 60 * 1000;
      const oneMinute = 60 * 1000;

      const days = Math.floor(diffInMilliseconds / oneDay);
      diffInMilliseconds -= days * oneDay;

      const hours = Math.floor(diffInMilliseconds / oneHour);
      diffInMilliseconds -= hours * oneHour;

      const minutes = Math.floor(diffInMilliseconds / oneMinute);

      if (days > 0) {
        return `${days} gün`;
      } else if (hours > 0) {
        return `${hours} saat`;
      } else {
        return `${minutes} dakika`;
      }
    },
  },
};
</script>
