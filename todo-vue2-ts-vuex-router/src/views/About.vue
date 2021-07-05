<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn elevation="2" @click="triggerAlert('YAY!')">Alert me!</v-btn>
  </div>
</template>

<script lang="ts">
import AlertMixin from "@/mixins/Alert.mixin";
import { mixins } from "vue-class-component";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class About extends mixins(AlertMixin) {}
</script>

<style lang="scss" scoped></style>
