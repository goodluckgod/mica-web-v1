export default {
  ssr: false,
  loading: false,
  head: {
    title: "partner",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
      },
    ],
  },

  css: ["@/assets/css/style.min.css"],

  plugins: [
    { src: "@/plugins/helper.js", mode: "client" },
    { src: "@/plugins/input.mask.js", mode: "client" },
    { src: "@/plugins/form.validation.js", mode: "client" },
    { src: "@/plugins/form.dropzone.js", mode: "client" },
    { src: "@/plugins/masonry.js", mode: "client" },
    { src: "@/plugins/category.js", mode: "client" },
    { src: "@/plugins/useragent.js", mode: "client" },
    { src: "@/plugins/turkey.js", mode: "client" },
    { src: "@/helpers/favorites.js", mode: "client" },
  ],

  components: true,

  buildModules: ["@nuxtjs/device"],

  device: {
    refreshOnResize: true,
  },

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/auth-next", "nuxt-i18n"],

  axios: {
    // baseURL: "http://151.250.206.51:3002",
    baseURL: "https://api.micayazilim.web.tr",
  },

  pwa: {
    manifest: {
      lang: "tr",
    },
  },

  build: {},
  server: {
    host: "0.0.0.0",
    port: 3005
  },

  // Auth yapılandırması
  auth: {
    strategies: {
      local: {
        token: {
          property: "access_token",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/v1/auth/login/customer", method: "post" },
          logout: { url: "/v1/auth/logout", method: "post" },
          user: { url: "/v1/profile/customer", method: "get" },
        },
      },
    },
  },

  // i18n yapılandırması
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.js", name: "English" },
      { code: "tr", iso: "tr-TR", file: "tr.js", name: "Türkçe" },
    ],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "tr",
    strategy: "prefix_and_default", // Dil kodlarını URL'ye ekler ve varsayılan dil için prefix kullanır
    vueI18n: {
      fallbackLocale: "tr",
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      onlyOnRoot: true,
      alwaysRedirect: true,
      fallbackLocale: "tr",
    },
  },
};
