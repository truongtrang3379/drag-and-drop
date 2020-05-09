<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-btn class="mr-3" @click="main = 'Home'">Home</v-btn>
        <v-btn class @click="main = 'Preview'">Preview</v-btn>
      </v-row>
      <v-row v-if="main == 'Home'">
        <v-col>
          <template v-for="(eachFormObj, eachFormIndex) in forms">
            <div :key="`div-${eachFormIndex}`" class="section-block">
              <div class="meta">
                <draggable
                  :list="eachFormObj.fields"
                  class="dragArea row ma-0"
                  :group="{ name:'formbuilder', pull:false, put:true }"
                  :sort="true"
                  ghost-class="sortable__ghost"
                >
                  <!-- The form elements starts (on the right) -->
                  <!-- <div> -->
                  <v-col
                    v-for="(field, index) in eachFormObj.fields"
                    :key="index"
                    v-bind="field"
                    :cols="field.cols"
                    class="form__group"
                    :class="{ 'is--active': field === activeField }"
                    @click="editElementProperties(field)"
                  >
                    <span class="form__selectedlabel">{{ field.fieldType }}</span>

                    <div>
                      <component :is="field.fieldType" :currentField="field" class="form__field"></component>
                    </div>

                    <!-- Actions list -->
                    <div class="form__actiongroup">
                      <v-icon class="form__actionitem--move">fas fa-arrows-alt</v-icon>
                      <div class="form__actionlist">
                        <v-btn class="mr-4" @click="cloneElement(index, field, eachFormObj.fields)">
                          <v-icon small>fas fa-plus</v-icon>
                        </v-btn>

                        <v-btn @click="deleteElement(index, eachFormObj.fields)">
                          <v-icon small>fas fa-trash-alt</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                </draggable>
              </div>
            </div>
          </template>
        </v-col>
        <v-col>
          <v-card>
            <v-tabs
              v-model="tab"
              background-color="deep-purple accent-4"
              centered
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#Elements">Elements</v-tab>

              <v-tab
                href="#Properties"
                v-if="Object.keys($store.activeField).length > 0 && forms[0].fields.length > 0"
              >Properties</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item value="Elements">
                <v-card flat>
                  <elements />
                </v-card>
              </v-tab-item>
              <v-tab-item
                value="Properties"
                v-if="Object.keys($store.activeField).length > 0 && forms[0].fields.length > 0"
              >
                <v-card flat>
                  <properties />
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="main == 'Preview'">
        <div class="iphone-x overflow-y-auto">
          <div class="bunny-ear">
            <i>Speaker</i>
            <b>Camera</b>
          </div>

          <template v-for="(eachFormObj, eachFormIndex) in forms">
            <div :key="`div-${eachFormIndex}`">
              <v-row class="ma-0">
                <!-- The form elements starts (on the right) -->
                <!-- <div> -->
                <v-col
                  v-for="(field, index) in eachFormObj.fields"
                  :key="index"
                  v-bind="field"
                  :cols="field.cols"
                  :class="{ 'is--active': field === activeField }"
                  @click="editElementProperties(field)"
                >
                  <component :is="field.fieldType" :currentField="field" class="form__field"></component>
                </v-col>
              </v-row>
            </div>
          </template>
        </div>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { FormBuilder } from "@/components/form_elements/formbuilder";
export default {
  name: "App",
  store: ["forms", "activeField", "activeTabForFields"],
  data() {
    return {
      sortElementOptions: FormBuilder.$data.sortElementOptions,
      tab: null,
      main: "Home"
    };
  },
  mounted() {
    console.log("form ->", this.forms);
    console.log("activeField ->", this.activeField);
  },
  components: FormBuilder.$options.components,
  created() {
    this.addSection();
  },
  methods: {
    deleteElement(index, form) {
      FormBuilder.deleteElement(index, form);
      console.log("thisForms: ", this.forms);
    },
    cloneElement(index, field, form) {
      FormBuilder.cloneElement(index, field, form);
    },
    editElementProperties(field) {
      console.log("form ->", this.forms);
      FormBuilder.editElementProperties(field);
      console.log("activeField ->", this.activeField);
    },
    addSection() {
      const formObj = {
        title: "",
        fields: []
      };
      this.forms.push(formObj);
    },
    deleteSection(formIndex, formTitle) {
      this.$confirm(
        `Are you sure to delete the section ${formTitle}?`,
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      ).then(() => {
        this.$delete(this.forms, formIndex);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-row:after,
.el-row:before {
  display: table;
}
.el-row:after {
  clear: both;
}
.empty-section {
  text-align: center;
  font-size: 40px;
  background: linear-gradient(to bottom, #fff, #409eff);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.dragArea {
  position: relative;
  min-height: 10rem;
  width: 100%;
  z-index: 2;
}

.el-main-left {
  height: calc(90vh);
}

.form__selectedlabel {
  display: none;
  background: #ecf5ff;
  padding: 3px 5px;
  color: black;
  font-size: 10px;
  position: absolute;
  top: -17px;
  right: 15px;
}

.form__actionitem--move {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  visibility: hidden;

  &:active,
  &:focus,
  &:hover {
    border-color: #409eff;
    background: #ecf5ff;
  }
}

.form__actionlist {
  position: absolute;
  margin-top: 10px;
  visibility: hidden;
  z-index: 3;
  right: 0;
  border-radius: 2px;
}

.form__group {
  margin-bottom: 25px;
  border: 1px solid transparent;
  position: relative;

  &:hover {
    border-color: #409eff;

    .form__actionitem--move {
      visibility: visible;
    }
  }

  &.is--active {
    border-color: #409eff;
    background: #ecf5ff;

    .form__actionlist {
      visibility: visible;
    }
    .form__selectedlabel {
      display: inline-block;
    }
  }
}

.section-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
}

.section-block .source {
  padding: 10px;
}

.section-block .meta {
  background-color: #fafafa;
  border-top: 1px solid #eaeefb;
}

.iphone-x {
  position: fixed;
  margin: 40px auto;
  left: 40%;
  right: 40%;
  width: 360px;
  height: 780px;
  background-color: #7371ee;
  background-image: linear-gradient(60deg, #7371ee 1%, #a1d9d6 100%);
  border-radius: 40px;
  -webkit-box-shadow: 0px 0px 0px 11px #1f1f1f, 0px 0px 0px 13px #191919,
    0px 0px 0px 20px #111;
  box-shadow: 0px 0px 0px 11px #1f1f1f, 0px 0px 0px 13px #191919,
    0px 0px 0px 20px #111;
  // &:before,
  // &:after {
  //   content: "";
  //   position: absolute;
  //   left: 50%;
  //   transform: translateX(-50%);
  // }

  // // home button indicator
  // &:after {
  //   bottom: 7px;
  //   width: 140px;
  //   height: 4px;
  //   background-color: #f2f2f2;
  //   border-radius: 10px;
  // }

  // // frontal camera/speaker frame
  // &:before {
  //   top: 0px;
  //   width: 56%;
  //   height: 30px;
  //   background-color: #1f1f1f;
  //   border-radius: 0px 0px 40px 40px;
  // }

  // bunny-ear
  .bunny-ear {
    width: 13rem;
    left: 33.4rem;
    height: 30px;
    background-color: #1f1f1f;
    border-radius: 0px 0px 40px 40px;
    position: fixed;
    z-index: 999;
  }

  i,
  b,
  s {
    position: absolute;
    display: block;
    color: transparent;
  }

  // speaker
  i {
    top: 0px;
    left: 50%;
    transform: translate(-50%, 6px);
    height: 8px;
    width: 15%;
    background-color: #101010;
    border-radius: 8px;
    box-shadow: inset 0px -3px 3px 0px rgba(256, 256, 256, 0.2);
  }

  // camera
  b {
    left: -5%;
    top: 0px;
    transform: translate(180px, 4px);
    width: 12px;
    height: 12px;
    background-color: #101010;
    border-radius: 12px;
    box-shadow: inset 0px -3px 2px 0px rgba(256, 256, 256, 0.2);

    &:after {
      content: "";
      position: absolute;
      background-color: #2d4d76;
      width: 6px;
      height: 6px;
      top: 2px;
      left: 2px;
      top: 3px;
      left: 3px;
      display: block;
      border-radius: 4px;
      box-shadow: inset 0px -2px 2px rgba(0, 0, 0, 0.5);
    }
  }

  // time
  s {
    top: 50px;
    color: #fff;
    text-align: center;
    text-decoration: none;
    width: 100%;
    font-size: 70px;
    font-weight: 100;
    padding-top: 60px;
  }

  // action buttons
  span {
    bottom: 50px;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    left: 30px;

    & + span {
      left: auto;
      right: 30px;
    }
  }
}
</style>
