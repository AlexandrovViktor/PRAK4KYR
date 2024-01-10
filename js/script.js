"use strict";

/*---Header---*/
const headerMenu = document.querySelector(".header__menu");
headerMenu.addEventListener("click", function (e) {
  document.querySelector(".header__links").classList.toggle("active");
  document.querySelector("body").classList.toggle("menu");
  headerMenu.classList.toggle("active");
});
/*!---Header---!*/
/*---Scroll---*/

const animItems = document.querySelectorAll("._anim-item");
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemPoint
      ) {
        animItem.classList.add("_anim");
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  animOnScroll();
}

/*!---Scroll---!*/
/*!---Slider---!*/
// проверить сенсорный экран или мышь чтобы использовать в sliderMouseMove
const mouseSliders = document.querySelectorAll(".slider");
const mouseRows = document.querySelectorAll(".slider__row");
if (mouseRows.length > 0) {
  let sliderStart = {},
    sliderTrans = {},
    sliderActive = {};
  for (let index = 0; index < mouseRows.length; index++) {
    const mouseRow = mouseRows[index];
    if (
      mouseRow.parentNode.parentNode.getAttribute("data-slider-width") <
      window.innerWidth
    ) {
      continue;
    }
    console.log(mouseRow.clientWidth);
    sliderStart[`${index}`] = null;
    sliderTrans[`${index}`] = 0;
    sliderActive[`${index}`] = false;
    mouseRow.addEventListener("mousedown", sliderMouseDown);
    window.addEventListener("mousemove", sliderMouseMove);
    window.addEventListener("mouseup", sliderMouseUp);
    mouseRow.addEventListener("touchstart", sliderMouseDown);
    window.addEventListener("touchmove", sliderMouseMove);
    window.addEventListener("touchend", sliderMouseUp);
    function sliderMouseDown(event) {
      console.log(event.touches[0].clientX, "-----");
      if (
        mouseRow.classList.contains("_slider-return-right") ||
        mouseRow.classList.contains("_slider-return-left")
      ) {
        return;
      }
      mouseRow.classList.add("_grabbing");
      sliderStart[`${index}`] = event.clientX;
      sliderActive[`${index}`] = true;
      console.log(mouseRow.style.transform, "down");
      // console.log(sliderTrans[`${index}`])
      // console.log(sliderStart[`${index}`])
    }
    function sliderMouseMove(event) {
      if (sliderActive[`${index}`] === true) {
        console.log(mouseRow.style.transform, "move");
        console.log(event.clientX);
        mouseRow.style.transform = `translateX(${
          sliderTrans[`${index}`] + event.clientX - sliderStart[`${index}`]
        }px)`;
      }
    }
    function sliderMouseUp(event) {
      mouseRow.classList.remove("_grabbing");
      if (
        mouseRow.classList.contains("_slider-return-left") ||
        mouseRow.classList.contains("_slider-return-right") ||
        sliderActive[`${index}`] !== true
      ) {
        return;
      }
      sliderActive[`${index}`] = false;
      sliderTrans[`${index}`] =
        sliderTrans[`${index}`] + event.clientX - sliderStart[`${index}`];
      console.log(mouseRow.style.transform, "up-false");
      if (
        mouseRow.getBoundingClientRect().left -
          mouseRow.parentNode.getBoundingClientRect().left >
        0
      ) {
        console.log(mouseRow.style.transform, "up-true-left");
        mouseRow.style.transform = `translateX(0px)`;
        mouseRow.classList.add("_slider-return-left");
        setTimeout(
          sliderMouseDeleteClass,
          1000,
          mouseRow,
          "_slider-return-left"
        );
        sliderTrans[`${index}`] = 0;
      } else if (
        mouseRow.getBoundingClientRect().right -
          mouseRow.parentNode.getBoundingClientRect().right <
        0
      ) {
        console.log(mouseRow.style.transform, "up-true-right");
        mouseRow.style.transform = `translateX(${-(
          mouseRow.clientWidth - mouseRow.parentNode.clientWidth
        )}px)`;
        mouseRow.classList.add("_slider-return-right");
        setTimeout(
          sliderMouseDeleteClass,
          1000,
          mouseRow,
          "_slider-return-right"
        );
        sliderTrans[`${index}`] = -(
          mouseRow.clientWidth - mouseRow.parentNode.clientWidth
        );
      }
    }
    function sliderMouseDeleteClass(obj, className) {
      obj.classList.remove(`${className}`);
    }
  }
}
/*!---Slider---!*/

/*---Drop-down list---*/

/*!---Drop-down list---!*/
