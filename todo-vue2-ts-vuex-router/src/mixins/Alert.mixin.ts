import Vue from "vue";
import Component from "vue-class-component";

// You can declare mixins as the same style as components.
@Component
export default class AlertMixin extends Vue {
  alertPrefix = "Alert: ";

  triggerAlert(message: string): void {
    alert(this.alertPrefix + message);
  }

  created(): void {
    console.log("AlertMixin Mixin");
  }
}
