<template>
    <div
            :class="'more-info-panel'"
            class="item-panel" v-if="dt"
			:lang="LOCALE"
          >
            <div class="item-row" v-if="dt.dict_w_similar_arr">
              <div class="item-row-title">
                <span> {{ l("Synonims", "g") }} </span>
              </div>
              <div class="item-row-content" >
                <a
                  @click="openWord(item)"
                  v-for="item in dt.dict_w_similar_arr"
                >
                  {{ item }}
                </a>
              </div>
            </div>
            <div class="item-row" v-if="dt.dict_w_opposites_arr">
              <div class="item-row-title">
                <span>{{ l("Opposites", "g") }} </span>
              </div>
              <div class="item-row-content" >
                <a
                  @click="openWord(item)"
                  v-for="item in dt.dict_w_opposites_arr"
                >
                  {{ item }}
                </a>
              </div>
            </div>
            <div class="item-row" v-if="dt.dict_usage_mix_arr">
              <div class="item-row-title">
                <span> {{ l("Daily Usage", "g") }} </span>
              </div>
              <div class="item-row-content" >
                <a
                  @click="openWord(item)"
                  v-for="item in dt.dict_usage_mix_arr"
                >
                  {{ item }}
                </a>
              </div>
            </div>
            <div class="item-row" v-if="dt.dict_same_root">
              <div class="item-row-title">
                <span> {{ l("Words in Same Root", "g") }} </span>
              </div>
              <div class="item-row-content" >
                <a
                  @click="openWord(item)"
                  v-for="item in dict_same_root"
                >
                  {{ item }}
                </a>
              </div>
            </div>
            <div class="item-row" v-if="dt.dict_root">
              <div class="item-row-title">
                <span> {{ l("Root", "g") }} </span>
              </div>
              <div class="item-row-content">{{ dt.dict_root }}</div>
            </div>
            <div class="item-row" v-if="dt.dict_type">
              <div class="item-row-title">
                <span> {{ l("Type", "g") }} </span>
              </div>
              <div class="item-row-content">{{ dt.dict_type }}</div>
            </div>
            <div class="item-row">
              <div class="item-row-title" v-if="dt.dict_singular">
                <span> {{ l("Singular", "g") }} </span>
              </div>
              <div class="item-row-content">{{ dt.dict_singular }}</div>
            </div>
            <div class="item-row" v-if="dt.dict_plural">
              <div class="item-row-title">
                <span> {{ l("Plural", "g") }} </span>
              </div>
              <div class="item-row-content">{{ dt.dict_plural }}</div>
            </div>
            <div class="item-row" v-if="dt.dict_verb">
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

            <div class="item-row" v-if="dt.dict_verb_type">
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
</template>
<script>
import general from "@/mixins/general";
import word from "@/mixins/word";
import axios from "axios";
import wordModel from "@/components/utils/word.vue";

export default {
  mixins: [general, word],
    props:{
        dt:Object
    }
}
</script>
<style lang="scss">
.more-info-panel{
  .item-panel { 
        height: auto;
        min-height: 50px;
        overflow: visible;
        transition: 0.5s all; 
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
		 &:lang(ar) {  
				  flex-flow: row;
		 }
      .item-row-title {
        width: 100px;
        font-weight: 500;
        color: rgb(109, 109, 109);
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
}
</style>