import "./styles/main.pcss";

if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/works";
import "./scripts/reviews";

window.onload = function () {
  let sliderReviews = () => { //слайдер в поле отзывов
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

  let scroll = () => { //плавный переход якарей
    const requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame

    document.querySelectorAll('a[href^="#"').forEach(link => {

      link.addEventListener('click', function (e) {
        e.preventDefault();

        let href = this.getAttribute('href');

        const scrollTarget = document.querySelector(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;

        requestAnimationFrame(window.scrollTo({
            top: elementPosition < 100 ? scrollTarget.offsetTop + scrollTarget.parentElement.offsetTop : elementPosition,
            behavior: 'smooth'
          })
        );
      });
    });
  }
  scroll();

  // let smoothSlide = () => { //плавный переход якарей
  //   const smoothLinks = document.querySelectorAll('a[href^="#"]');
  //   for (let smoothLink of smoothLinks) {
  //     smoothLink.addEventListener('click', function (e) {
  //       e.preventDefault();
  //       const id = smoothLink.getAttribute('href');
  //       const elemToMove = document.querySelector(id);
  //
  //       elemToMove.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start'
  //       });
  //     });
  //   }
  // }
  // smoothSlide();

  // let scroll = () => { //плавный переход якарей
  //   const requestAnimationFrame = window.requestAnimationFrame ||
  //     window.webkitRequestAnimationFrame ||
  //     window.mozRequestAnimationFrame ||
  //     window.oRequestAnimationFrame ||
  //     window.msRequestAnimationFrame
  //
  //   function scrollTo(to) {
  //     const start = window.scrollY || window.pageYOffset;
  //     const time = Date.now();
  //     const duration = Math.abs(start - to) / 3;
  //     (function step() {
  //       let dx = Math.min(1, (Date.now() - time) / duration)
  //       let pos = start + (to - start) * dx
  //       window.scrollTo(0, pos)
  //       if (dx < 1) {
  //         requestAnimationFrame(step)
  //       }
  //     })()
  //   }
  //
  //   const links = document.querySelectorAll('a[href^="#"]');
  //
  //   Array.from(links).forEach(link => {
  //     link.addEventListener("click", (e) => {
  //       e.preventDefault();
  //
  //       const target = e.target.getAttribute("href");
  //       const scrollTarget = document.querySelector(target);
  //       const elementPosition = scrollTarget.getBoundingClientRect().top;
  //
  //       // console.log(elementPosition)
  //       scrollTo(elementPosition)
  //     })
  //   })
  // };
  // scroll();

  let parallaxEffect = () => {//эфект паралакса

    let parallaxMain = (function () {
      const sky = document.querySelector(".parallax__sky");
      const mountain = document.querySelector(".parallax__mountain");
      const balloon = document.querySelector(".parallax__balloon");
      const cloud = document.querySelector(".parallax__cloud");

      return {
        move: function (block, windowScroll, strafeAmount) {
          let strafe = windowScroll / -strafeAmount + "%";
          let style = block.style;
          let transformString = "translate3d(0, " + strafe + ", 0)";

          style.transform = transformString;
          style.webkitTransform = transformString;
        },
        init: function (wScroll) {
          this.move(sky, wScroll, 100);
          this.move(mountain, wScroll, 55);
          this.move(balloon, wScroll, 4);
          this.move(cloud, wScroll, 35);
        }
      }
    }());

    let parallaxBuddha = (function () {
      const mountainBuddha = document.querySelector(".parallax__buddha-mountains");
      const buddha = document.querySelector(".parallax__buddha-big");

      return {
        move: function (block, windowScroll, strafeAmount) {
          let strafe = windowScroll / -strafeAmount + "%";
          let style = block.style;
          let transformString = "translate3d(0, " + strafe + ", 0)";

          style.transform = transformString;
          style.webkitTransform = transformString;
        },
        init: function (wScroll) {
          this.move(mountainBuddha, wScroll, 40);
          this.move(buddha, wScroll, 35);
        }
      }
    }());

    window.onscroll = function () {
      const blockBuddha = document.querySelector(".reviews");
      let wScroll = window.pageYOffset;
      let clientHeight = document.documentElement.clientHeight;
      parallaxMain.init(wScroll);

      let blockBuddhaTop = blockBuddha.getBoundingClientRect().top + pageYOffset;
      if (blockBuddhaTop < wScroll + clientHeight) {
        let wScroll = window.pageYOffset - blockBuddhaTop;
        parallaxBuddha.init(wScroll);
      }
    };
  }
  parallaxEffect();
}

