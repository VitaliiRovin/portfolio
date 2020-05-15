import Vue from "vue";

const btns = {
  template: "#works-btns",
  methods: {
    clickWorks(direction) {
      this.$emit("slide", direction)
    }
  }
};

const thumbs = {
  template: "#works-thumbs",
  props: ["works", "currentWork"],
};

const display = {
  template: "#works-display",
  components: {thumbs, btns},
  props: ["currentWork", "works"],
  methods: {
    slideWorks(direction) {
      this.$emit("slide", direction)
    }
  },
  computed: {
    reverseWorks() {
      const works = [...this.works];
      return works.reverse()
    }
  }
};

const tags = {
  template: "#works-tags",
  props: ["currentWork"],
};

const info = {
  template: "#works-info",
  components: {tags},
  props: ["currentWork"],
};

new Vue({
  el: "#works-component",
  template: "#works-container",
  components: {display, info},
  data: {
    works: [],
    currentIndex: 0,
  },
  methods: {
    slideWorks(direction) {
      switch (direction) {
        case "next":
          this.currentIndex++;
          break;
        case "prev":
          this.currentIndex--;
          break;
      }
    },
    makeRequireImages(array) {
      return array.map((item) => {
        item.photo = require(`../images/portfolio/${item.photo}`);

        return item;
      })
    },
    makeInfiniteLoopForIndex(value) {
      const worksAmountFromZero = this.works.length - 1;
      if (value > worksAmountFromZero) this.currentIndex = 0;
      if (value < 0) this.currentIndex = worksAmountFromZero;
    }
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    },
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForIndex(value)
    }
  },
  created() {
    const data = require("../data/works.json");
    this.works = this.makeRequireImages(data);
  },
});