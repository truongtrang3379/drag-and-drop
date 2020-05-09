<template>
  <div>
    <label :style="'color:'+currentField.labelColor">{{currentField.label}}</label>
    <v-textarea
      :hide-details="true"
      solo
      v-bind="attributesBinding"
      :rows="currentField.rowDefault"
    />
  </div>
</template>

<script>
export default {
  name: "Textarea",
  props: ["currentField"],
  data() {
    return {};
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
