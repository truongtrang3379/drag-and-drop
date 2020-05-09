<template>
  <div>
    <label
      :style="'color:'+currentField.labelColor"
      v-show="currentField.showLabel"
    >{{currentField.label}}</label>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateFormatted"
          persistent-hint
          solo
          :background-color="currentField.disabled ? 'rgba(0, 0, 0, 0.03)' : undefined"
          :hide-details="true"
          :disabled="currentField.disabled"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title @input="date = false"></v-date-picker>
    </v-menu>
  </div>
</template>


<script>
export default {
  name: "DatePicker",
  props: ["currentField"],
  data(vm) {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${year}/${month}/${day}`;
    }
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    }
  }
};
</script>
