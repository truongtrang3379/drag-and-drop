<template>
  <div class="el-tabs__inner">
    <draggable
      :list="fields"
      :clone="clone"
      class="dragArea row ma-4"
      :group="{ name:'formbuilder', pull:'clone', put:false }"
      :sort="false"
    >
      <v-col
        :cols="6"
        :class="{ 'is-disabled': checkStopDragCondition(field) }"
        v-for="(field, index) in fields"
        :key="index"
      >
        <v-btn class="button__sidebar">{{ field.text }}</v-btn>
      </v-col>
    </draggable>
  </div>
</template>


<script>
import { FormBuilder } from "@/components/form_elements/formbuilder";
import draggable from "vuedraggable";

export default {
  name: "Elements",
  store: ["forms"],
  components: {
    draggable
  },
  data() {
    return {
      fields: FormBuilder.$data.fields,
      dropElementOptions: FormBuilder.$data.dropElementOptions
    };
  },
  methods: {
    clone(field) {
      console.log("field: ", field);

      return this._.cloneDeep(field);
    },
    checkStopDragCondition(field) {
      var form = this.forms,
        formArray = [];

      for (var key in form) {
        formArray.push(form[key]["fieldType"]);
      }
      // Check if the fieldname exist in formArray
      // And when the field.isUnique too
      return this._.includes(formArray, field.name) && field.isUnique;
    }
  }
};
</script>

<style lang="scss" scoped>
.button__sidebar {
  width: 100%;
  margin-bottom: 5px;

  .is-disabled & {
    opacity: 0.4;
  }
}

// Display this ghost in <main> only
.sortable__ghost {
  position: relative;
  width: 33.33%;
  border-bottom: 2px solid #3a8ee6;
  margin-top: 2px;
  margin-bottom: 2px;

  [type="button"] {
    display: none;
  }

  &:before {
    content: "Drag it here";
    background-color: #ecf5ff;
    color: #3a8ee6;
    position: absolute;
    left: 50%;
    font-size: 10px;
    border-radius: 10px;
    line-height: 15px;
    padding: 0 10px;
    top: -6px;
    transform: translateX(-50%);
  }
}
</style>
