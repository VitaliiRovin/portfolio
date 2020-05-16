import "./styles/main.pcss";

if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/works";
import "./scripts/reviews";

let sliderReviews = () => {
  const left = document.querySelector(".reviews__btn-left");
  const right = document.querySelector(".reviews__btn-right");
  const reviewsList = document.querySelector(".reviews__list");
  const reviewsItemArr = document.querySelectorAll(".reviews__item");
  const reviewsBlock = document.querySelector(".reviews__block");

  const computed = getComputedStyle(reviewsBlock);
  let currentItem = 0;

  const calkWidthList = () => { //присвоение ширины блоку list
    const width = parseInt(computed.width) / 2; //половина ширины блока

    for (let i = 0; i < reviewsItemArr.length - 1; i++) { //присвоение ширины item
      reviewsItemArr[i].style.width = width + "px";
    }

    reviewsList.style.width = width * reviewsItemArr.length + "px"; //присвоение ширины list
  };

  const render = () => { //функция сдвига в стороны на шаг
    let step = parseInt(computed.width) / 2;
    const currentRight = step * currentItem;

    reviewsList.style.right = currentRight + "px";
  }

  right.addEventListener("click", function (e) {
    e.preventDefault();
    currentItem += 2;

    if (currentItem < reviewsItemArr.length) {
      render();
    } else {
      currentItem = reviewsItemArr.length - 1;
    }
  });

  left.addEventListener("click", function (e) {
    e.preventDefault();
    currentItem -= 2;

    if (currentItem >= 0 && currentItem < reviewsItemArr.length) {
      render();
    } else {
      currentItem = 0;
    }
  });

  document.addEventListener("resize", function () { //вызывать при изменении размера окна
    calkWidthList();
    render();
  })
};

sliderReviews();
