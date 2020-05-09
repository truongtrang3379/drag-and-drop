<template>
  <div>
    <label
      :style="'color:'+currentField.labelColor"
      v-show="currentField.showLabel"
    >{{currentField.label}}</label>
    <v-radio-group class="mt-0" v-model="radios" :mandatory="false">
      <v-radio
        v-for="item in currentField.options"
        :key="item.value"
        :label="item.text"
        :value="item.value"
      />
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: "RadioButton",
  props: ["currentField"],
  data() {
    return {
      radios: "Option 1"
    };
  }
};
</script>
