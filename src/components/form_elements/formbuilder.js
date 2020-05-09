import Vue from 'vue';

import draggable from 'vuedraggable'

import TextInput from '@/components/form_elements/FormElementTextInput'
import Textarea from '@/components/form_elements/FormElementTextarea'
import Elements from '@/components/form_elements/Elements'
import Properties from '@/components/form_elements/properties/Properties'
import DatePicker from '@/components/form_elements/FormElementDatePicker'
import TimePicker from '@/components/form_elements/FormElementTimePicker'
import SelectList from '@/components/form_elements/FormElementSelectList'
import Checkbox from '@/components/form_elements/FormElementCheckbox'
import RadioButton from '@/components/form_elements/FormElementRadioButton'
import NumberInput from '@/components/form_elements/FormElementNumberInput'
import Divider from "@/components/form_elements/FormElementDivider"
import Chips from "@/components/form_elements/FormElementChips"

import vm from '@/main'

export const FormBuilder = new Vue({
  components: {
    draggable,
    Properties,
    Textarea,
    TextInput,
    Checkbox,
    NumberInput,
    DatePicker,
    SelectList,
    TimePicker,
    Elements,
    Divider,
    Chips,
    RadioButton
  },
  data() {
    return {
      fields: [
        {
          fieldType: 'TextInput',
          label: 'Text',
          labelColor: "#000000",
          text: 'Text field',
          placeholder: '',
          cols: 8,
          disabled: false,
        },
        {
          fieldType: 'Textarea',
          label: 'Text',
          labelColor: "#000000",
          text: 'Textarea',
          placeholder: '',
          cols: 8,
          disabled: false,
          rowDefault: 2
        },
        {
          fieldType: 'NumberInput',
          label: 'Number',
          text: 'Number',
          cols: 8,
          disabled: false,
          hasMinValue: false,
          min: 1,
          hasMaxValue: false,
          max: 10,
        },
        {
          fieldType: 'SelectList',
          label: 'Select',
          text: 'Select',
          cols: 8,
          showLabel: false,
          labelColor: "#000000",
          options: [
            {
              text: "Option Label 1",
              value: "Option 1",
            },
            {
              text: "Option Label 2",
              value: "Option 2",
            }
          ],
        },
        {
          fieldType: 'RadioButton',
          label: 'Radio',
          text: 'Radio',
          cols: 8,
          showLabel: false,
          options: [
            {
              text: "Option Label 1",
              value: "Option 1"
            },
            {
              text: "Option Label 2",
              value: "Option 2"
            }
          ],
        },
        {
          fieldType: 'Checkbox',
          label: 'Checkbox',
          text: 'Checkbox',
          cols: 8,
          showLabel: false,
          options: [
            {
              text: "Option Label 1",
              value: "Option 1"
            },
            {
              text: "Option Label 2",
              value: "Option 2"
            }
          ],
        },
        {
          fieldType: 'TimePicker',
          label: 'Time',
          text: 'TimePicker',
          showLabel: false,
          cols: 8,
          disabled: false,
        },
        {
          fieldType: 'DatePicker',
          label: 'Date',
          text: 'DatePicker',
          showLabel: false,
          cols: 8,
          disabled: false,
        },
        {
          fieldType: 'Divider',
          text: 'Divider',
          cols: 12,
          disabled: false,
        },
        {
          fieldType: 'Chips',
          label: 'Chips',
          text: 'Chips',
          cols: 12,
          showLabel: false,
          labelColor: "#000000",
          options: [
            {
              text: "Option Label 1",
              value: "Option 1",
              color: "#E91E63"
            },
            {
              text: "Option Label 2",
              value: "Option 2",
              color: "#9C27B0"
            }
          ],
        }
        // {
        //   fieldType: 'Button',
        //   text: 'Button',
        //   group: 'button',
        //   buttonText: 'Submit your form',
        //   isRequired: false,
        //   isHelpBlockVisible: false,
        //   isPlaceholderVisible: false,
        //   isUnique: true,
        //   cols: 8,
        //  
        // },
        // {
        //   fieldType: 'Upload',
        //   text: 'UploadFiles',
        //  
        //   isUnique: false,
        //   cols: 24,
        //   uploadURL: 'https://jsonplaceholder.typicode.com/posts/'
        // },
      ],

      sortElementOptions: {
        group: {
          name: 'formbuilder',
          pull: false,
          put: true
        },
        sort: true
      },

      dropElementOptions: {
        group: {
          name: 'formbuilder',
          pull: 'clone',
          put: false
        },
        sort: false,
        filter: ".is-disabled"
      }
    }
  },
  methods: {
    deleteElement(index, form) {
      vm.$store.activeField = [];
      vm.$store.activeTabForFields = "elements";
      vm.$delete(form, index);
    },

    cloneElement(index, field, form) {
      var cloned = this._.cloneDeep(field) // clone deep lodash
      form.splice(index, 0, cloned)
    },

    editElementProperties(field) {
      vm.$store.activeField = field;
      vm.$store.activeTabForFields = "properties";
    }
  }
});
