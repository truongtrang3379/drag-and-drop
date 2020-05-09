<template>
  <div>
    <label :style="'color:'+currentField.labelColor">{{currentField.label}}</label>
    <v-chip
      class="ma-2"
      close
      :color="item.color"
      text-color="white"
      @click:close="deleteOption(activeField.options, index)"
      v-for="(item,index) in currentField.options"
      :key="item.value"
    >{{item.text}}</v-chip>
  </div>
</template>

<script>
export default {
  name: "Chips",
  store: ["activeField"],
  props: ["currentField"],
  data() {
    return {
      input: ""
    };
  },
  methods: {
    deleteOption(option, index) {
      this.$delete(option, index);
    }
  }
};
</script>
