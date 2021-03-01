<template>
<div class="row justify-content-lg-center justify-content-md-center">
  <div class="col-lg-6 col-md-8">
    <div class="sign_form">
      <h2>{{ l("Request a Password Reset", "g") }}</h2>

      <div class="ui search focus mt-50">
        <div class="ui left icon input swdh95">
          <input
            class="prompt srch_explore"
            type="email"
            placeholder="yourname@gmail.com"
            @blur="checkForm()"
            v-model="form.email"
            maxlength="64" 
          />
          <i class="uil uil-envelope icon icon2"></i>
        </div>
      </div>
      <button class="login-btn" type="submit">
        {{ l("Reset Password", "g") }}
      </button>

      <p class="mb-0 mt-30">
        {{ l("Go Back", "g") }}
        <a  @click="goPath('form/login')">{{
          l("Sign In", "g")
        }}</a>
      </p>
    </div>
  </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
import validate from "@/mixins/validate";

export default {
  mixins: [general, validate],
  data() {
    return {
      form: {
        email: ""
      },
      validation: [
        {
          name: "email",
          label: () => this.l("E-mail", "g"),
          check: ["required", "email"]
        }
      ]
    };
  },
  methods: {
    submit() {
      if (this.checkForm()) {
        this.$store.dispatch("user/forget_password", {
          form: this.form,
          pageData: this.pageInfo
        });
        this.form = {
          email: ""
        };
      }
    }
  },
  computed: {
    pageInfo() {
      return this.$store.state.pages.pageData;
    },
    LOCALE() {
      return this.$store.state.locale;
    },
    LANG_PACK() {
      return this.$store.state.langFile;
    }
  }
};
</script>
<style scoped>
.context-menu-form {
  background: #efefef;
  padding: 12px;
}
</style>
