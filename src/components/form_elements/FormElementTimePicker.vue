<template>
  <div>
    <label
      :style="'color:'+currentField.labelColor"
      v-show="currentField.showLabel"
    >{{currentField.label}}</label>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="time"
          readonly
          solo
          :background-color="currentField.disabled ? 'rgba(0, 0, 0, 0.03)' : undefined"
          :hide-details="true"
          :disabled="currentField.disabled"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker v-if="menu" v-model="time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
    </v-menu>
  </div>
</template>


<script>
export default {
  name: "TimePicker",
  props: ["currentField"],
  data() {
    return {
      time: null,
      menu: false
    };
  }
};
</script>
