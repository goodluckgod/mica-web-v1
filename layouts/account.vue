<template>
  <div>
    <Header />
    <div class="container mx-auto flex py-5 gap-5">
      <div class="w-2/12 flex flex-col gap-5">
        <div class="w-full flex flex-col gap-2">
          <p class="font-medium">{{ $t("myorders") }}</p>
          <ul class="text-sm font-light text-gray-500 flex flex-col gap-1">
            <li>
              <nuxt-link :to="localePath('/my-account/orders')">{{
                $t("allmyorders")
              }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/my-account/reviews')">{{
                $t("myreviews")
              }}</nuxt-link>
            </li>
            <!-- <li>
              <nuxt-link :to="localePath('/my-account/messages')">{{
                $t("mymessages")
              }}</nuxt-link>
            </li> -->
          </ul>
        </div>
        <div class="w-full flex flex-col gap-2">
          <p class="font-medium">{{ $t("specialforyou") }}</p>
          <ul class="text-sm font-light text-gray-500 flex flex-col gap-1">
            <!-- <li>
              <nuxt-link :to="localePath('/my-account/coupons')">{{
                $t("mycoupons")
              }}</nuxt-link>
            </li> -->
            <li>
              <nuxt-link :to="localePath('/my-account/view-history')">{{
                $t("viewinghistory")
              }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/my-account/follow-stores')">{{
                $t("storesifollow")
              }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="w-full flex flex-col gap-2">
          <p class="font-medium">{{ $t("myaccountandsupport") }}</p>
          <ul class="text-sm font-light text-gray-500 flex flex-col gap-1">
            <li>
              <nuxt-link :to="localePath('/my-account/details')">{{
                $t("myinformation")
              }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/my-account/address')">{{
                $t("myaddresses")
              }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/help-support')">{{
                $t("help")
              }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-10/12 h-[calc(100vh-185px)] overflow-y-auto scrollbar pr-2">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
};
</script>
