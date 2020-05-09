<template>
  <div>
    <label :style="'color:'+currentField.labelColor">{{currentField.label}}</label>
    <v-text-field
      type="number"
      v-model="number"
      :hide-details="true"
      prepend-inner-icon="fas fa-minus"
      append-icon="fas fa-plus"
      @click:append="plus"
      @click:prepend-inner="minus"
      solo
      v-bind="attributesBinding"
    />
  </div>
</template>


<script>
export default {
  name: "NumberInput",
  props: ["currentField"],
  data() {
    return {
      number: 1
    };
  },
  methods: {
    plus() {
      if (this.currentField.hasMaxValue) {
        if (this.number < this.currentField.max) {
          this.number++;
        }
      } else {
        this.number++;
      }
    },
    minus() {
      if (this.currentField.hasMinValue) {
        if (this.number > this.currentField.min) {
          this.number--;
        }
      } else {
        this.number--;
      }
    }
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
      if (this.currentField.hasMinValue) {
        attr.min = this.currentField.min;
      }
      if (this.currentField.hasMaxValue) {
        attr.max = this.currentField.max;
      }
      return attr;
    }
  }
};
</script>
<style>
input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>