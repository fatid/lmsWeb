<template>
  <div class="modal-word">
    <b-modal
      hide-footer
      id="modal-xl"
      size="xl"
      class="modal-word "
      scrollable
      v-model="wordModalShow"
      :title="wordModal.word"
    >
      <a
        class="like"
        v-if="data && data[0] && data[0].dict_sound"
        @click="playSound(data[0].dict_sound)"
      >
        <i class="fas fa-volume-up"></i
      ></a>
      <div style="min-height:200px;" v-if="!loading">
        <template v-for="dt in data" v-if="data[0]">
          <wordModel :dt="dt"></wordModel>
        </template>

        <div class="more-examples" v-if="bank && bank[0] && data[0]">
          <h4>{{ l("More Examples", "g") }} :</h4>
          <a style="text-align:right; " v-for="d in bank">
            {{ d.sb_sentence }} <br
          /></a>
        </div>
        <div class="share-network-list" v-if="data[0]">
          <!-- {{sharing}} -->
          <ShareNetwork
            v-for="network in networks"
            :network="network.network"
            :key="network.network"
            :style="{ backgroundColor: network.color }"
            :url="sharing.url"
            :title="sharing.title"
            :description="sharing.description"
            :quote="sharing.quote"
            :hashtags="sharing.hashtags"
            :twitterUser="sharing.twitterUser"
          >
            <i :class="network.icon"></i>
            <!-- <span>{{ network.name }}</span> -->
          </ShareNetwork>

          <a
            @click="goPath('word/' + wordModal.word)"
            class="share-network-paw"
            style="background-color: #2529d8;"
            ><i class="fas fah fa-lg fa-search"></i
          ></a>
          <a
            @click="goPathBlank('word/' + wordModal.word)"
            class="share-network-buffer"
            style="background-color: #323b43;"
            ><i class="fas fah fa-lg fa-link"></i
          ></a>
        </div>
        <div v-if="!loading && !data[0]" class="not-found">
          <img class="not-found-image" src="/img/not-found.gif" />
          <h5>
            {{ wordModal.word }} <span>{{ l("can not found.", "g") }}</span>
          </h5>
          <div class="not-found-suggestion">
            <a  @click="$store.state.suggestWord.word = wordModal.word; $store.state.suggestWord.show = true">{{ l("Suggest this word", "g") }}</a>
          </div>
        </div>
      </div>
      <div style="min-height:200px; text-align:center; padding: 30px;" v-else="loading">
            <img class="not-found-image" src="/img/loading.gif" /> 
      </div>
    </b-modal>
  </div>
</template>

<script>
import general from "@/mixins/general";
import word from "@/mixins/word";
import axios from "axios";
import wordModel from "@/components/utils/word.vue";

export default {
  mixins: [general, word],
  data: () => ({
    bank: [],
    data: [],
    loading: false,

    networks: [
      // { network: 'baidu', name: 'Baidu', icon: 'fas fah fa-lg fa-paw', color: '#2529d8' },
      // { network: 'buffer', name: 'Buffer', icon: 'fab fah fa-lg fa-buffer', color: '#323b43' },
      {
        network: "email",
        name: "Email",
        icon: "far fah fa-lg fa-envelope",
        color: "#333333"
      },
      {
        network: "evernote",
        name: "Evernote",
        icon: "fab fah fa-lg fa-evernote",
        color: "#2dbe60"
      },
      {
        network: "facebook",
        name: "Facebook",
        icon: "fab fah fa-lg fa-facebook-f",
        color: "#1877f2"
      },
      // { network: 'flipboard', name: 'Flipboard', icon: 'fab fah fa-lg fa-flipboard', color: '#e12828' },
      // { network: 'hackernews', name: 'HackerNews', icon: 'fab fah fa-lg fa-hacker-news', color: '#ff4000' },
      // { network: 'instapaper', name: 'Instapaper', icon: 'fas fah fa-lg fa-italic', color: '#428bca' },
      // { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
      {
        network: "linkedin",
        name: "LinkedIn",
        icon: "fab fah fa-lg fa-linkedin",
        color: "#007bb5"
      },
      // { network: 'messenger', name: 'Messenger', icon: 'fab fah fa-lg fa-facebook-messenger', color: '#0084ff' },
      // { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki', color: '#ed812b' },
      {
        network: "pinterest",
        name: "Pinterest",
        icon: "fab fah fa-lg fa-pinterest",
        color: "#bd081c"
      },
      // { network: 'pocket', name: 'Pocket', icon: 'fab fah fa-lg fa-get-pocket', color: '#ef4056' },
      {
        network: "quora",
        name: "Quora",
        icon: "fab fah fa-lg fa-quora",
        color: "#a82400"
      },
      {
        network: "reddit",
        name: "Reddit",
        icon: "fab fah fa-lg fa-reddit-alien",
        color: "#ff4500"
      },
      // { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
      {
        network: "sms",
        name: "SMS",
        icon: "far fah fa-lg fa-comment-dots",
        color: "#333333"
      },
      // { network: 'stumbleupon', name: 'StumbleUpon', icon: 'fab fah fa-lg fa-stumbleupon', color: '#eb4924' },
      {
        network: "telegram",
        name: "Telegram",
        icon: "fab fah fa-lg fa-telegram-plane",
        color: "#0088cc"
      },
      {
        network: "tumblr",
        name: "Tumblr",
        icon: "fab fah fa-lg fa-tumblr",
        color: "#35465c"
      },
      {
        network: "twitter",
        name: "Twitter",
        icon: "fab fah fa-lg fa-twitter",
        color: "#1da1f2"
      },
      // { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
      // { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
      // { network: 'weibo', name: 'Weibo', icon: 'fab fah fa-lg fa-weibo', color: '#e9152d' },
      {
        network: "whatsapp",
        name: "Whatsapp",
        icon: "fab fah fa-lg fa-whatsapp",
        color: "#25d366"
      }
      // { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
      // { network: 'xing', name: 'Xing', icon: 'fab fah fa-lg fa-xing', color: '#026466' },
      // { network: 'yammer', name: 'Yammer', icon: 'fab fah fa-lg fa-yammer', color: '#0072c6' },
      // { network: 'fakeblock', name: 'Custom Network', icon: 'fab fah fa-lg fa-vuejs', color: '#41b883' }
    ]
  }),
  watch: {
    "wordModal.word"(val) {
      this.getDictionary();
      this.getSentenceBank();
    }
  },
  async created() {},
  components: {
    wordModel
  },
  computed: {
    url() {
      let query = {};
      return this.$router.resolve({
        path: "/" + this.LOCALE + "/word/" + this.wordModal.word,
        query
      });
    },
    sharing() {
      let data = this.data;
      return {
        url: process.env.baseDomain + "" + this.url.href,
        title: this.wordModal.word,
        description: data && data[0] ? this.HtmlEncode(data[0].dict_mean) : "",
        quote: " ",
        hashtags: this.wordModal.word,
        twitterUser: "youyuxi"
      };
    },
    wordModalShow: {
      get() {
        return this.$store.state.wordModal.show;
      },
      set(val) {
        this.$store.state.wordModal.show = val;
      }
    }
  },

  methods: {
    async getSentenceBank() {
      let fields = `sb_sentence,id,status,created_on,created_by,id,status`;
      let filters = { sb_sentence: ["LIKE", this.wordModal.word] };
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "SentenceBank",
          method: "get",
          params: {
            limit: 20,
            offset: 0,
            fields,
            lang: this.$store.state.locale,
            sort: ["pdb_date,DESC"],
            filter: filters
          }
        })
          .then(response => {
            if (
              response.data &&
              response.data.formattedData &&
              response.data.formattedData[0]
            ) {
              this.bank = response.data.formattedData;
            }
          })
          .catch(e => {
            this.d = {};
            console.log(e);
          });
      });
    },
    async getDictionary() {
      this.loading = true;

      let fields = `dict_sound,dict_degree,dict_mean,dict_goole_image_search,dict_usage_mix,dict_daily_usage,dict_verb_type,dict_pattern,dict_root,dict_same_root,dict_example,dict_type,dict_verb,dict_plural,dict_singular,dict_w_opposites,dict_word,dict_mean,dict_image,dict_link,dict_tag,dict_w_similar,dict_tag,id,status,created_on,created_by,id,status`;
      let filters = { dict_word: ["=", this.wordModal.word] };
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "dict_word",
          method: "get",
          params: {
            limit: 20,
            offset: 0,
            fields,
            lang: this.$store.state.locale,
            sort: ["pdb_date,DESC"],
            filter: filters
          }
        })
          .then(response => {
            if (
              response.data &&
              response.data.formattedData &&
              response.data.formattedData[0]
            ) {
              let words = response.data.formattedData;
              let data = words.map(d => {
                if (d.dict_tag) {
                  d.labels = d.dict_tag.split(",");
                }
                if (d.dict_w_opposites) {
                  d.dict_w_opposites_arr = d.dict_w_opposites.split(",");
                }

                if (d.dict_same_root) {
                  d.dict_same_root_arr = d.dict_same_root.split(",");
                }
                if (d.dict_w_similar) {
                  d.dict_w_similar_arr = d.dict_w_similar.split(",");
                }
                if (d.dict_example) {
                  d.dict_example_arr = d.dict_example.split("\r");
                }
                if (d.dict_usage_mix) {
                  d.dict_usage_mix_arr = d.dict_usage_mix.split("\r");
                }
                d.level = this.getLevel(d.dict_degree);
                d.show = false;

                return d;
              });
              this.loading = false;

              this.data = data;
            } else {
              this.data = [];
              this.loading = false;
            }
          })
          .catch(e => {
            this.d = {};
            console.log(e);
          });
      });
    }
  }
};
</script>
<style>
.modal-xl .modal-body {
  padding: 10px 16px;
  height: 90vh !important;
  overflow: auto;
}
.modal-xl .modal-header {
  flex-direction: row-reverse !important;
  justify-content: space-between !important;
}

.modal-xl .modal-header .close {
  padding: 1rem 1rem;
  margin: -1rem auto -1rem -1rem !important;
}
.modal-title {
  font-size: 25px;
}
.modal-dialog {
  left: 5%;
  right: 5%;
  margin-right: 0px;

  position: absolute;
  width: 100%;
}
.custom-select {
  padding: 6px;
  border-radius: 4px;
  font-size: 12px;
  width: 100%;
}
.addnewlist {
  padding: 10px 0px;
}
.more-examples {
  text-align: right;
  direction: rtl;
}
.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
  margin-top: 30px;
}
a[class^="share-network-"] {
  flex: none;
  color: #ffffff !important;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  font-size: 12px;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
  text-decoration: none;
}
a[class^="share-network-"]:hover {
  color: #ffffff;
}
a:hover[class^="share-network-"] {
  color: #ffffff;
}
a[class^="share-network-"] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 6px;
  flex: 0 1 auto;
}

a[class^="share-network-"] span {
  padding: 0 10px;
  flex: 1 1;
  font-weight: 500;
}
.not-found {
  width: 100%;
  padding: 30px;
  text-align: center;
}
.not-found h5 {
  width: 100%;
  font-size: 16px;
  font-size: 16px;
}
.not-found h5 span {
  font-size: 16px;
  font-weight: 400;
}
.not-found-image {
  width: 200px;
  text-align: center;
}
.not-found-suggestion {
  width: 100%;
  text-align: center;
}
</style>
<style lang="scss" href="./style.scss"></style>
