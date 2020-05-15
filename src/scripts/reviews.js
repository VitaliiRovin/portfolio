import Vue from "vue";

const btns = {
  template: "#reviews-btns",
  methods: {
    clickReviews(direction) {
      this.$emit("click", direction)
    }
  }
};

const review = {
  template: "#reviews-list",
  props: ["way"],
  data() {
    return {
      reviews: []
    }
  },
  methods: {
    makeRequireImagesReviews(array) { //перешили путь картинок
      return array.map((item) => {
        item.img = require(`../images/reviews/${item.img}`);

        return item;
      })
    },
  },
  watch: {

  },
  created() { //подгружаем json и прогоняем через функцию makeRequireImages
    const data = require("../data/reviews.json");
    this.reviews = this.makeRequireImagesReviews(data);
  }
};

new Vue({
  el: "#reviews-component",
  template: "#reviews-container",
  data: {
    way: {},
  },
  components: {btns, review},
  methods: {
    slideReviews(direction) {
      return this.way = direction;
    },
  }
});