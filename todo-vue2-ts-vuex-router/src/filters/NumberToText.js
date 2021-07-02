import Vue from "vue";

// 10 and up is number
Vue.filter("numberToText", function (value) {
  if (isNaN(value) || value < 0 || value >= 10) return value;
  const texts = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  return texts[value].toLowerCase();
});
