<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn elevation="2" @click="triggerAlert('YAY!')">Alert me!</v-btn>
    <div class="narrow">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore aspernatur veritatis nesciunt excepturi
      distinctio quasi odio voluptatibus exercitationem minus consequuntur! Omnis libero corrupti ad mollitia saepe
      culpa repellendus ipsum laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore aspernatur
      veritatis nesciunt excepturi distinctio quasi odio voluptatibus exercitationem minus consequuntur! Omnis libero
      corrupti ad mollitia saepe culpa repellendus ipsum laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing
      elit. Labore aspernatur veritatis nesciunt excepturi distinctio quasi odio voluptatibus exercitationem minus
      consequuntur! Omnis libero corrupti ad mollitia saepe culpa repellendus ipsum laudantium. Lorem ipsum dolor, sit
      amet consectetur adipisicing elit. Labore aspernatur veritatis nesciunt excepturi distinctio quasi odio
      voluptatibus exercitationem minus consequuntur! Omnis libero corrupti ad mollitia saepe culpa repellendus ipsum
      laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore aspernatur veritatis nesciunt
      excepturi distinctio quasi odio voluptatibus exercitationem minus consequuntur! Omnis libero corrupti ad mollitia
      saepe culpa repellendus ipsum laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
      aspernatur veritatis nesciunt excepturi distinctio quasi odio voluptatibus exercitationem minus consequuntur!
      Omnis libero corrupti ad mollitia saepe culpa repellendus ipsum laudantium. Lorem ipsum dolor, sit amet
      consectetur adipisicing elit. Labore aspernatur veritatis nesciunt excepturi distinctio quasi odio voluptatibus
      exercitationem minus consequuntur! Omnis libero corrupti ad mollitia saepe culpa repellendus ipsum laudantium.
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore aspernatur veritatis nesciunt excepturi
      distinctio quasi odio voluptatibus exercitationem minus consequuntur! Omnis libero corrupti ad mollitia saepe
      culpa repellendus ipsum laudantium.
    </div>
    <router-link to="/">Home</router-link>
  </div>
</template>

<script lang="ts">
import AlertMixin from "@/mixins/Alert.mixin";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

@Component
export default class About extends mixins(AlertMixin) {
  created(): void {
    console.log("About Comp");
  }
}
</script>

<style lang="scss" scoped>
.narrow {
  width: 200px;
  margin: 20px auto;
}
</style>
