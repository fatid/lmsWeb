<template>
        <div class="item-word text-right align-right"  >
          <div class="side-panel">
         
            
            <div
              class="degree-show"
              v-if="dt.dict_degree && dt.level"
              :style="{ background: dt && dt.level ? dt.level.color : '' }"
            >
              {{ dt.level.name }} 
            </div> 
              <a
              class="like"
              title=""
             
              @click="openLikeModal(dt, null, 'Word')"
            >
              <span class="text-black"  :class="isLiked(dt.id) ? 'selected' : ''">
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

          <a style="font-size:24px; font-weight: 500;line-height: 1.5;"  @click="openWord(dt.dict_word)" >{{dt.dict_word}}</a>
          <a @click="goPathBlank('word/'+dt.dict_word)"><i class="fa fa-link"></i></a>
          <div class="font-13" v-html="HtmlEncode(dt.dict_mean)"></div>
       
        
           
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
    props:{
        dt:[Object,Array]
    }
}
</script>
<style lang="scss">
.fcrse_img {
    width img {
      max-width: 100%;
      height: 200px;
    }
  }
  .selected{
    color: #007bff;
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
  .head-search{
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
  
      .input-std{
        border: 1px solid #eeeeee;
        border-radius: 20px;
        padding: 8px 10px;
        height: 40px;
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
        font-size: 14px;
        font-weight: 500;
        color: rgb(107, 107, 107);
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