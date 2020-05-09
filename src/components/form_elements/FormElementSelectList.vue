<template>
  <div>
    <label
      :style="'color:'+currentField.labelColor"
      v-show="currentField.showLabel"
    >{{currentField.label}}</label>
    <v-select
      :items="currentField.options"
      :hide-details="true"
      :value="currentField.options[0]"
      v-bind="attributesBinding"
      solo
    />
  </div>
</template>

<script>
export default {
  name: "SelectList",
  props: ["currentField"],
  data() {
    return {
      // update: true,
      // value: "",
      // loading: false
    };
  },
  computed: {
    attributesBinding() {
      var attr = {};
      if (this.currentField.disabled) {
        attr.disabled = this.currentField.disabled;
        attr["background-color"] = "rgba(0, 0, 0, 0.03)";
      }
      if (this.currentField.placeholder) {
        attr.placeholder = this.currentField.placeholder;
      }
      return attr;
    }
  }
};
</script>
