import Vue from "vue";

Vue.directive("striked", function(element, binding) {
  if (binding.value) {
    element.style.textDecoration = "line-through";
  } else {
    element.style.textDecoration = "none";
  }
});
