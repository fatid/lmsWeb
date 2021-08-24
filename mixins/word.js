import general from "@/mixins/general";
import axios from "axios";
const play = require("audio-play");
const load = require("audio-loader");

export default {
  mixins: [general],

  data() {
    return {};
  },
  async created() {
    await this.$store.dispatch("core/getOptions", {
      slang: this.$store.state.locale,
      group: "co_level",
      fields: "id,cou_level_name,cou_level_color"
    });
  },
  computed: {
    levels() {
      return this.options["co_level"];
    },
    visitedWords() {
      return [];
    },
    wordModal: {
      get() {
        return this.$store.state.wordModal;
      },
      set(val) {
        this.$store.state.wordModal = val;
      }
    }
  },
  methods: {
    playSound(file) {
      file = file.replace("/visual/", "/");
      load(file).then(play);
    },

    openWord(word) {
      this.wordModal.word = word;
      this.wordModal.show = true;
      // alert(word)
    },
    openWordBlank(word) {
      this.wordModal.word = word;
      this.wordModal.show = true; 
    },
    getLevel(q) {
      if (this.levels && q && q) {
        let a = q
          ? this.levels.find(k => k.id == q)
            ? this.levels.find(k => k.id == q)
            : {}
          : {};
        return { color: a.cou_level_color, name: a.cou_level_name };
      } else {
        return { color: "#000", name: "-" };
      }
    }
  }
};
