<template>
  <div>
    <label :style="'color:'+currentField.labelColor">{{currentField.label}}</label>
    <v-text-field :hide-details="true" solo v-bind="attributesBinding"></v-text-field>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: ["currentField"],
  data() {
    return {
      input: ""
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
