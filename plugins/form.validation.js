import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en.json";
import tr from "vee-validate/dist/locale/tr.json";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

extend("policies", {
  validate: (value) => value === true,
  message: "Sözleşmeleri kabul etmeniz gerekmektedir.",
});

localize({
  en,
  tr,
});

export default ({ app }) => {
  localize(app.i18n.locale);
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    localize(newLocale);
  };
};

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
