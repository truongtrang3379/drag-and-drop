<template>
  <div>
    <label
      :style="'color:'+currentField.labelColor"
      v-show="currentField.showLabel"
    >{{currentField.label}}</label>
    <v-checkbox
      v-for="item in currentField.options"
      :key="item.value"
      :label="item.text"
      :disabled="item.disabled"
      :hide-details="true"
      :background-color="item.disabled? 'rgba(0, 0, 0, 0.03)' : undefined"
    />
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: ["currentField"],
  data() {
    return {
      // checkList: [0]
    };
  }
};
</script>

<style>
.el-checkbox-group {
  font-size: 14px;
}
</style>
