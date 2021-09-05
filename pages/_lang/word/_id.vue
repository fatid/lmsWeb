<template>
  <div class="container">
    <div class="head-word" v-if="data[0]">
      <span class="head-search">
        <a @click="getWord()"> <i class="fa fa-chevron-left"></i></a>

        <input
          type="text"
          class="input-std"
          v-model="keyword"
          :placeholder="l('Search keyword', 'g')"
        />
      </span>
      <span class="head-title">{{ data[0] ? data[0].dict_word : "" }}</span>
    </div>

    <div class="row">
      <div class="col-12 col-md-4 col-lg-3">
        {{ l("Total meaning", "g") }} : {{ data.length }}<br />
        {{ l("Level", "g") }} :
        <a v-for="d in data" class="meaning-box"
          >{{ d.level ? d.level.name : "" }}
        </a>

        <hr />
        <h4>{{ l("Words in Same Category", "g") }} :</h4>
        <a v-for="d in visitedWords">{{ d.level ? d.level.name : "" }} </a>
        <a class="meaning-box"> example </a>
        <a class="meaning-box"> example 2</a>
        <a class="meaning-box"> example3</a>
        <a class="meaning-box"> example </a>
        <a class="meaning-box"> example1234</a>
        <a class="meaning-box"> ex </a>
        <hr />
        <h4>{{ l("Last Visited Words", "g") }} :</h4>
        <a v-for="d in visitedWords">{{ d.level ? d.level.name : "" }} </a>
        <hr />
      </div>

      <div class="col-12 col-md-8 col-lg-9">
        <div class="item-word text-right align-right" v-for="dt in data">
          <div class="side-panel">
            <div
              class="degree-show"
              v-if="dt.dict_degree"
              :style="{ background: dt.level.color }"
            >
              {{ dt.level.name }}
            </div>
            <a
              class="like"
              v-if="dt.dict_sound"
              @click="playSound(dt.dict_sound)"
            >
              <i class="fa fa-play"></i
            ></a>
            <a
              class="like"
              title=""
              :class="isLiked(dt.id) ? 'selected' : ''"
              @click="openLikeModal(dt, null, 'Word')"
            >
              <span class="text-black">
                <svg
                  id="bold"
                  fill="CurrentColor"
                  enable-background="new 0 0 24 24"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m14.25 0h-11.5c-1.52 0-2.75 1.23-2.75 2.75v15.5c0 1.52 1.23 2.75 2.75 2.75h6.59c-.54-1.14-.84-2.41-.84-3.75 0-1.15.22-2.25.63-3.26-.04.01-.08.01-.13.01h-5c-.55 0-1-.45-1-1s.45-1 1-1h5c.38 0 .72.22.88.54.65-1.01 1.49-1.87 2.48-2.54h-8.36c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1 0 .05 0 .09-.01.13.93-.38 1.95-.6 3.01-.62v-5.76c0-1.52-1.23-2.75-2.75-2.75zm-6.25 6h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1z"
                  />
                  <path
                    d="m17.25 10.5c-3.722 0-6.75 3.028-6.75 6.75s3.028 6.75 6.75 6.75 6.75-3.028 6.75-6.75-3.028-6.75-6.75-6.75zm2.75 7.75h-1.75v1.75c0 .552-.448 1-1 1s-1-.448-1-1v-1.75h-1.75c-.552 0-1-.448-1-1s.448-1 1-1h1.75v-1.75c0-.552.448-1 1-1s1 .448 1 1v1.75h1.75c.552 0 1 .448 1 1s-.448 1-1 1z"
                  />
                </svg>
              </span>
            </a>
          </div>

          <img
            v-if="dt.dict_image"
            :src="show_image(dt.dict_image, '300', 'auto', false)"
            class="image-inside"
            alt="..."
          />
          <!-- <img
            v-else
            src="/images/get-img.jpg"
            class="image-inside"
            alt="..."
          /> -->
          <div class="font-13" v-html="HtmlEncode(dt.dict_mean)"></div>
          <div
            v-show="!dt.show"
            @click="dt.show = !dt.show"
            class="show-details"
          >
            {{ l("more info", "g") }} <i class="fa fa-chevron-down"></i>
          </div>
          <div
            v-show="dt.show"
            @click="dt.show = !dt.show"
            class="hide-details"
          >
            Hide Details <i class="fa fa-chevron-up"></i>
          </div>
          <div
            :class="dt.show ? 'visible-panel' : 'hidden-panel'"
            class="item-panel"
          >
            <div class="item-row">
              <div class="item-row-title">
                <span> {{ l("Synonims", "g") }} </span>
              </div>
              <div class="item-row-content" v-if="dt.dict_w_similar_arr">
                <a
                  @click="openWord(item)"
                  v-for="item in dt.dict_w_similar_arr"
                >
                  {{ item }}
                </a>
              </div>
            </div>
            <div class="item-row">
              <div class="item-row-title">
                <span>{{ l("Opposites", "g") }} </span>
              </div>
              <div class="item-row-content" v-if="dt.dict_w_opposites_arr">
                <a
                  @click="openWord(item)"
                  v-for="item in dt.dict_w_opposites_arr"
                >
                  {{ item }}
                </a>
              </div>
            </div>
            <div class="item-row">
              <div class="item-row-title">
                <span> {{ l("Daily Usage", "g") }} </span>
              </div>
              <div class="item-row-content" v-if="dt.dict_usage_mix_arr">
                <a
                  @click="openWord(item)"
                  v-for="item in dt.dict_usage_mix_arr"
                >
                  {{ item }}
                </a>
              </div>
            </div>
            <div class="item-row">
              <div class="item-row-title">
                <span> {{ l("Root", "g") }} </span>
              </div>
              <div class="item-row-content">{{ dt.dict_root }}</div>
            </div>
            <div class="item-row">
              <div class="item-row-title">
                <span> {{ l("Singular", "g") }} </span>
              </div>
              <div class="item-row-content">{{ dt.dict_singular }}</div>
            </div>
            <div class="item-row">
              <div class="item-row-title">
                <span> {{ l("Plural", "g") }} </span>
              </div>
              <div class="item-row-content">{{ dt.dict_plural }}</div>
            </div>
            <div class="item-row">
              <div class="item-row-title">
                <span>{{ l("Verb", "g") }} </span>
              </div>
              <div class="item-row-content">{{ dt.dict_verb }}</div>
            </div>
            <div class="item-row" v-if="dt.dict_verb_type">
              <div class="item-row-title">
                <span>{{ l("Verb Type", "g") }} </span>
              </div>
              <div class="item-row-content">{{ dt.dict_verb_type }}</div>
            </div>

            <div class="item-row">
              <div class="item-row-title">
                <span>{{ l("Examples", "g") }} </span>
              </div>

              <div class="item-row-content">
                <div
                  v-if="dt.dict_example_arr"
                  v-for="v in dt.dict_example_arr"
                >
                  {{ v }}
                </div>
              </div>
              <br />
              <br />
              <div class="tags">
                <div
                  v-if="dt.labels"
                  class="ui red horizontal label cursor-pointer"
                  @click="goPath('filter/Word', { keyword: label })"
                  v-for="label in dt.labels"
                >
                  {{ label }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="more-examples">
          <h4>{{ l("More Examples", "g") }} :</h4>
          <a style="text-align:right; " v-for="d in bank">
            {{ d.sb_sentence }} <br
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
import word from "@/mixins/word";
import axios from "axios";
const play = require("audio-play");
const load = require("audio-loader");

export default {
  mixins: [general, word],
  data: () => ({
    data: [],
    bank: [],
    meanings: [],
    id: "",
    keyword: ""
  }),
  async created() {
    this.id =
      this.$route.params && this.$route.params.id ? this.$route.params.id : "";
    this.getDictionary();
    this.getSentenceBank();
  },
  computed: {},
  methods: {
    getWord() {
      this.goPath("/filter/Word", { word: this.keyword });
    },

    async getSentenceBank() {
      let fields = `sb_sentence,id,status,created_on,created_by,id,status`;
      let filters = { sb_sentence: ["LIKE", this.id] };
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
      let fields = `dict_sound,dict_degree,dict_mean,dict_goole_image_search,dict_usage_mix,dict_daily_usage,dict_verb_type,dict_pattern,dict_root,dict_same_root,dict_example,dict_type,dict_verb,dict_plural,dict_singular,dict_w_opposites,dict_word,dict_mean,dict_image,dict_link,dict_tag,dict_w_similar,dict_tag,id,status,created_on,created_by,id,status`;
      let filters = { dict_word: ["=", this.id] };
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
              this.data = data;
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
<style lang="scss" href="./style.scss"></style>
<style lang="scss">
.fcrse_img {
  width img {
    max-width: 100%;
    height: 200px;
  }
}

.tags {
  display: inline-flex;
}
.list-group-item {
  margin-bottom: 10px;
  border: 0;
  border-radius: 10px;
  border: 0.1em solid #f7f7f7;
  .title-item {
    display: inline-flex;
    margin-bottom: 10px;
  }
  transition: 1s all;

  &:hover {
    background: #fff;
    border: 0.1em solid #000;
    transition: 1s all;
  }
}
.image-inside {
  width: 80px;
  height: auto;
  margin-right: 0px;
  float: right;
  margin-left: 20px;
  margin-bottom: 5px;
}
.box-inside {
  background: #efefef;
  border-radius: 0.35rem;
  height: 40px;
  margin-right: 10px;
  width: 40px;
}
.toolbar-cart {
  position: absolute;
  top: 20px;
  right: 20px;
}
.cursor-pointer {
  cursor: pointer;
}

.head-word {
  display: inline-flex;
  width: 100%;
  padding: 10px 0px;
  justify-content: space-between;
  border-bottom: 1px solid #d0d0d0;
  margin-bottom: 10px;
}
.head-search {
  width: 250px;
  display: inline-flex;
}
.head-title {
  font-size: 42px;
  font-weight: 500;
  line-height: 1.1;
}
.head-search a {
  background: #fff;
  width: 40px;
  height: 40px;
  text-align: center;
  padding: 10px 0;
  border-radius: 50%;
  margin-top: 0px;
  margin-right: 20px;
}

.input-std {
  border: 1px solid #eeeeee;
  border-radius: 20px;
  padding: 8px 10px;
  height: 40px;
}
.meaning-box {
  border: 1px solid #efefef;
  background: #fff;
  border-radius: 4px;
  padding: 5px;
  text-align: center;
  margin-right: 7px;
  margin-top: 4px;
  display: inline-block;
}
.item-word {
  padding: 10px 10px 10px 55px;
  margin-bottom: 5px;
  border: 1px solid #efefef;
  border-radius: 10px;
  position: relative;
  background: #fff;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.3;
  .item-panel {
    &.visible-panel {
      height: auto;
      min-height: 50px;
      overflow: visible;
      transition: 0.5s all;
    }
    &.hidden-panel {
      height: 0px;
      min-height: 0px;
      overflow: hidden;
      transition: 0.5s all;
    }
  }
  .show-details {
    border-top: 1px dotted #efefef;
    width: 100%;
    text-align: center;
    font-size: 14px;
    transition: 0.5s all;
    cursor: pointer;
    padding: 4px 0;
    margin: 3px 0px;
  }
  .hide-details {
    padding: 4px 0;
    margin: 3px 0px;
    border-top: 1px dotted #f6f6f6;
    border-bottom: 1px dotted #f6f6f6;
    width: 100%;
    text-align: center;
    font-size: 14px;
    transition: 0.5s all;
    cursor: pointer;
  }
  .item-row {
    width: 100%;
    display: inline-flex;
    text-align: right;
    flex-flow: row-reverse;
    font-size: 16px;
    margin-bottom: 5px;
    padding-bottom: 5px;
    .item-row-title {
      width: 100px;
      font-weight: 500;
      color: rgb(112, 112, 112);
      font-size: 14px;
      span {
        border-bottom: 1px solid #efefef;
      }
    }
    .item-row-content {
      a {
        padding: 0px 5px;
        text-decoration: underline;
          font-size: 14px;
        &:hover,
        .selected {
          color: rgb(53, 65, 226);
        }
      }
    }
  }

  .meaning-results {
    padding: 5px 0px;
    text-align: right;
  }
  .degree-show {
    padding: 5px;
    border-radius: 10px;
    background: red;
    color: #fff;
    display: block;
    position: relative;
    width: auto;
    margin: 5px 0px;
  }
  .side-panel {
    margin-left: 10px;
    position: absolute;
    left: 0px;
    top: 10px;
  }

  a.like {
    display: block;
    text-align: center;
    &:hover,
    .selected {
      color: rgb(212, 113, 130);
    }
  }
}
</style>
