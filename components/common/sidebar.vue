<template>
  <div class="fcrse_3 frc123">
    <ul class="ttrm15">
      <li v-for="similar in similars" :key="similar.id">
        <a
          :class="similar.SA_Link == getLast ? 'active' : ''"
          class="tt_item active"
          @click.prevent="
            goPath($route.path.split('/')[2] + '/' + similar.SA_Link)
          "
          :title="similar.SA_Baslik"
        >
          {{ similar.SA_Baslik }}</a
        >
      </li>
    </ul>
  </div>
</template>
<script>
import general from "@/mixins/general";

export default {
  mixins: [general],

  props: {
    title: {
      type: String
      // default: this.LANG_PACK.similarPages
    }
  },
  created() {
    this.getRelatedPages();
  },
  methods: {
    async getRelatedPages() {
      console.log("getRelatedPages");
      await this.$store
        .dispatch("pages/getRelatedPages", {
          show: "similar",
          limit: 10,
          offset: 1,
          lang: this.LOCALE
        })
        .then(response => {
          console.log("response", response);
        })
        .catch(e => {
          console.log("ERR", e);
        });
    }
  },
  watch: {
    "pageInfo.SA_UstSayfa"() {
      this.getRelatedPages();
    }
  },
  computed: {
    getLast() {
      let r = this.$route.path;
      let f = r.split("/").splice(-1, 1);
      return f[0];
    },
    pageId() {
      return this.$store.state.pages.Similar;
    },
    similars() {
      return this.$store.state.pages.Similar;
    },
    pageInfo() {
      return this.$store.state.pages.pageData;
    },
    langPack() {
      return this.$store.state.langFile;
    },
    titlePanel() {
      return this.title
        ? this.title
        : this.l("Similar Pages", "g")
        ? this.l("Similar Pages", "g")
        : "Pages";
    }
  }
};
</script>
<style lang="scss" scoped>
.card-body {
  padding: 1rem;
}
ul {
  li {
    &.liselected {
      font-weight: 600;
    }
    a {
      color: #0a0a0a;
      font-size: 13px;
      i {
        margin-right: 7px;
      }
    }
  }
}
.noWrap {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.width-100 {
  width: 100%;
}
</style>
