<template>
  <div class="pa-3">
    <v-row>
      <v-col>
        <div v-show="activeField.hasOwnProperty('label')">
          <label>Label Name</label>
          <v-text-field
            class="mt-2"
            :hide-details="true"
            v-model="activeField.label"
            solo
          >{{activeField.label}}</v-text-field>
        </div>
        <div class="mt-2" v-show="activeField.hasOwnProperty('placeholder')">
          <label>Placeholder</label>
          <v-text-field
            class="mt-2"
            :hide-details="true"
            v-model="activeField.placeholder"
            solo
          >{{activeField.placeholder}}</v-text-field>
        </div>
        <div class="mt-2" v-show="activeField.hasOwnProperty('cols')">
          <label>Cols</label>
          <v-text-field
            class="mt-2"
            :hide-details="true"
            type="number"
            max="12"
            min="1"
            v-model="activeField.cols"
            solo
          >{{activeField.cols}}</v-text-field>
        </div>
        <v-checkbox
          class="mt-8"
          v-model="activeField.disabled"
          label="Disabled"
          v-show="activeField.hasOwnProperty('disabled')"
        />
        <v-checkbox
          v-model="activeField.showLabel"
          label="Show label"
          v-show="activeField.hasOwnProperty('showLabel')"
        />
        <template v-show="activeField.fieldType == 'NumberInput'">
          <v-switch v-model="activeField.hasMinValue" label="Min" />
          <v-text-field
            v-show="activeField.hasMinValue"
            type="number"
            v-model="activeField.min"
            :hide-details="true"
            prepend-inner-icon="fas fa-minus"
            append-icon="fas fa-plus"
            @click:append="activeField.min++"
            @click:prepend-inner="activeField.min--"
            solo
          />
          <v-switch v-model="activeField.hasMaxValue" label="Max" />
          <v-text-field
            v-show="activeField.hasMaxValue"
            type="number"
            v-model="activeField.max"
            :hide-details="true"
            prepend-inner-icon="fas fa-minus"
            append-icon="fas fa-plus"
            @click:append="activeField.max++"
            @click:prepend-inner="activeField.max--"
            solo
          />
        </template>
      </v-col>
      <v-col v-if="activeField.hasOwnProperty('labelColor')">
        <label>Label Color</label>
        <v-color-picker v-model="activeField.labelColor" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" v-show="activeField.fieldType == 'Textarea'">
        <label>Row default</label>
        <v-text-field
          type="number"
          :min="1"
          class="mt-2"
          :hide-details="true"
          v-model="activeField.rowDefault"
          solo
        >{{activeField.rowDefault}}</v-text-field>
      </v-col>
    </v-row>
    <template v-if="activeField.options">
      <label>Options</label>
      <ul class="properties__optionsul">
        <li class="properties__optionslist">
          <v-row class="ma-0">
            <v-col :cols="5" class="pb-0">Label</v-col>
            <v-col :cols="5" class="pb-0">Value</v-col>
            <v-col :cols="2" class="pb-0"></v-col>
          </v-row>
        </li>
        <li
          v-for="(item, index) in activeField.options"
          :key="index"
          class="properties__optionslist"
        >
          <v-row>
            <v-col :cols="5">
              <v-text-field :hide-details="true" solo v-model="item.text">{{item.text}}</v-text-field>
            </v-col>
            <v-col :cols="5">
              <v-text-field :hide-details="true" solo v-model="item.value">{{item.value}}</v-text-field>
            </v-col>
            <v-col :cols="2">
              <v-avatar
                :size="35"
                :color="item.color"
                dark
                class="mt-2 mr-4"
                @click.stop="showDialogColorChip(index)"
                v-if="activeField.fieldType == 'Chips'"
              />
              <v-icon
                class="mt-3"
                v-show="activeField.options.length > 1"
                @click="deleteOption(activeField.options, index)"
              >fas fa-times</v-icon>
            </v-col>
          </v-row>
        </li>
      </ul>
      <v-btn type="text" @click="addOption(activeField.options)">
        <v-icon class="mr-2">fas fa-plus</v-icon>Add more
      </v-btn>
      <v-dialog :width="300" v-model="dialogColorChips">
        <v-card>
          <v-color-picker v-model="color" />
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
// import RatingAdvancedProps from './RatingAdvancedProps'
// import TextInputAdvancedProps from './TextInputAdvancedProps.vue'
// import HtmlAdvancedProps from './HtmlAdvancedProps.vue'
// import NumberInputAdvancedProps from './NumberInputAdvancedProps.vue'
// import OptionsAdvancedProps from './OptionsAdvancedProps.vue'
// import SelectListAdvancedProps from './SelectListAdvancedProps.vue'

export default {
  name: "Properties",
  components: {
    // RatingAdvancedProps,
    // TextInputAdvancedProps,
    // HtmlAdvancedProps,
    // NumberInputAdvancedProps,
    // OptionsAdvancedProps,
    // SelectListAdvancedProps
  },
  store: ["activeField"], // Get the form data from Home
  data() {
    return {
      labelPosition: "top",
      fieldProperties: {},
      rules: {},
      color: "",
      indexColor: null,
      dialogColorChips: false,
      advancedPropsVisible: false,
      dialogRules: {
        dataUrl: [
          { required: true, message: "Please input url", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    console.log("activeField ->", this.activeField);
  },
  watch: {
    color: function(val) {
      console.log("val: ", val);
      this.activeField.options[this.indexColor].color = val;
    }
  },
  methods: {
    showDialogColorChip(index) {
      this.color = this.activeField.options[index].color;
      this.indexColor = index;
      this.dialogColorChips = true;
    },
    deleteOption(option, index) {
      this.$delete(option, index);
    },
    addOption(option) {
      let count = option.length + 1;
      if (this.activeField.fieldType == "Chips") {
        option.push({
          text: "Option Label " + count,
          value: "Option " + count,
          color: "#9C27B0"
        });
      } else {
        option.push({
          text: "Option Label " + count,
          value: "Option " + count
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.properties__optionslist {
  margin-bottom: 5px;
  list-style: none;
  list-style-type: none;
}
.properties__optionsul {
  padding: 0;
}
</style>
