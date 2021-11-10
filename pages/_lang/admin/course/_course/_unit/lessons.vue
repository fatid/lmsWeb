<template>
  <div class="container">
{{layout}}
    <b-modal
      id="modal-xl"
      v-model="showMass.showI"
      scrollable
      size="xl"
      :title="'Mass Addition'"
    >
      <input
        multiple
        type="file"
        name="changeFileMass"
        @change="onFileChangeMass($event, 'lesson_photo')"
      />
      <!-- {{massImageUpload}} -->
      <draggable
        v-model="massImageUpload"
        draggable=".draggable"
        class="draggable-box"
      >
        <div v-for="im in massImageUpload" class="draggable">
          <img :src="im.lesson_photo" class="g-width-200 imageUpload" />
          <br />
          <input
            type="text"
            class="modal-form-input"
            v-model="im.lesson_name"
          />
        </div>
      </draggable>

      <template #modal-footer>
        <div class="w-100">
          <div class="modal-form-row">
            <label>{{ l("Start Sort Order", "g") }}</label>
            <span
              ><input
                type="number"
                class="modal-form-input"
                v-model="massSettings.sort"
              />
            </span>
          </div>
          <!-- <select class="modal-form-input" v-model="massImageUpload">
              <option v-for="u in statusList" :key="u.value" :value="u.value">{{
                u.label
              }}</option>
          </select> -->
          <b-button
            variant="default"
            size="sm"
            class="float-right"
            @click="showMass.showI = false"
          >
            Close
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="saveMassUpload()"
          >
            {{ l("Save", "g") }}
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal
      id="modal-xl"
      v-model="show"
      scrollable
      size="xl"
      :title="edited.id ? l('Editing', 'g') : l('Create New', 'g')"
    >
      <!-- {{edited}} -->
      <b-alert :show="saveStatus.show" dismissible :variant="saveStatus.status">
        {{ l("Saved", "g") }}
      </b-alert>
      <div class="modal-form" :lang="LOCALE">
        <div class="modal-form-row">
          <label>{{ l("Title", "g") }}</label>
          <span
            ><input
              type="text"
              class="modal-form-input"
              v-model="edited.section_name"
            />
          </span>
        </div>

        <div class="modal-form-row">
          <label>{{ l("Sort Order", "g") }}</label>
          <span
            ><input
              type="number"
              class="modal-form-input"
              v-model="edited.sort"
            />
          </span>
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <select class="modal-form-input" v-model="edited.status">
            <option v-for="u in statusList" :key="u.value" :value="u.value">{{
              u.label
            }}</option>
          </select>
          <b-button
            variant="default"
            size="sm"
            class="float-right"
            @click="show = false"
          >
            Close
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="save()"
          >
            {{ l("Save", "g") }}
          </b-button>
        </div>
      </template>
    </b-modal>

    <div class="row">
      <div class="col-12 col-md-12 col-sm-12 table-header">
        <div>
          <h3>
            {{ l("Courses", "g") }} >
            <a @click="goPath('admin/course/list')">{{ course.cou_name }}</a> >
            <a @click="goPath('admin/course/' + courseId + '/units')">{{
              unite.unit_name
            }}</a>
            >
            {{ l("Lessons", "g") }}
          </h3>
        </div>
        <div>
          <select
            class="modal-form-input"
            v-model="filter.status"
            @change="selectedLesson ? getTopics() : getList()"
          >
            <option v-for="u in statusList" :key="u.value" :value="u.value">{{
              u.label
            }}</option>
          </select>
          <div
            class="btn btn-danger"
            v-if="selected && selected[0]"
            @click="removeSelected()"
          >
            + {{ l("Remove Selected", "g") }}
          </div>
          <div
            class="btn btn-success"
            v-if="selectedLesson"
            @click="openModalTopic({ id: null })"
          >
            + {{ l("Add New Topic", "g") }}
          </div>
          <div  v-if="!selectedLesson" class="btn btn-primary" @click="openModal({ id: null })">
            + {{ l("Add New Lesson", "g") }}
          </div>
        </div>
      </div>
      <div v-show="selectedLesson" class="col-12 col-md-12 col-sm-12">
        <div class="topic_container">
          <div>
            <ul class="my_lists">
              <li
                v-for="d in data"
                :class="selectedLesson == d.id ? 'selected' : ''"
              >
                <a @click="selectedLesson = d.id">{{ d.section_name }} </a>
                {{ count ? count[d.id] : "" }}
              </li>
              <li>
                 <a   @click="openModal({ id: null })">   + {{ l("Add New Lesson", "g") }}  </a>
              </li>
            </ul>
            <br />
            <div class="btn btn-danger"   @click="openModalMass({type:'question' })">
            + {{ l("Add Multiple Questions", "g") }}
          </div>
              <!-- <br />
              <br />
   <div class="btn btn-danger"    @click="openModalMass({type:'image' })">
            + {{ l("Add Multiple Images", "g") }}
          </div> -->
          </div>
          


      <div    v-if="showMass.showQ"  class="edit_topic">
            
              <h3>
                {{   l("Create Multi Question", "g") }}
              </h3>
      <span style="width: 100%; display: block;">
        
        <span style="width: 100%; display: inline-flex; justify-content: space-between; border-bottom: 1px solid #efefef; padding-bottom : 5px;">
          <span > <input  type="checkbox"    />  Select All </span>
          <div>
            Choose Question
          <input
            type="text"
        
            v-model="qs.name"
            @change="getQuestions()"
             class="mini-select"
            placeholder="Text"
          />
          <select 
            v-model="qs.type"
            @change="getQuestions()"
            class="mini-select"
            placeholder="Type"
          ><option value="">-</option>
            <option
              v-for="(opt, key) in l('cat.QuestionTypes.list', 'g')"
              :key="key"
              :value="key"
              >{{ opt.name }}</option
            >
          </select>
          <select  
            v-model="qs.level"
            @change="getQuestions()"
             class="mini-select"
                                    placeholder="Level"
          >
            <option value="">-</option>

            <option v-for="u in levels" :key="u.id" :value="u.id">{{
              u.cou_level_name
            }}</option>
          </select>
          <select  
            v-model="qs.skills"
            @change="getQuestions()"
             class="mini-select"  placeholder="Skills"
          > 
            <option value="">-</option>
            <option  v-for="(u, key) in l('cat.QuestionSkills.list', 'g')" :key="key" :value="key">{{
              u.name
            }}</option>
          </select>
                               <select  
            v-model="qs.category"
            @change="getQuestions()"
             class="mini-select"  placeholder="Category"
          > <option value="">-</option>
            <option  v-for="u in  options['co_labels']" :key="u.id" :value="u.id">{{
              u.cou_label_name
            }}</option>
          </select>
          </div>
   
        </span>
      </span>
      <span style="width: 100%; display: block;      overflow: auto;
    height: calc(100vh - 300px);">
        <span
          class="question-border"
          v-for="q in questions"
          :class="
            q && q.q && massQuestion.includes(q.q.id) ? 'green-border' : ''
          "
          v-if="q && q.q"
        >

          <input  type="checkbox" :checked="massQuestion.includes(q.q.id)"  /> 
          <!-- <a v-if="massQuestion.includes(q.q.id)" @click="deselect(q.q.id)"
            >Deselect this question</a
          >
          <a v-else @click="massQuestion.push(q.q.id)">Select this question </a> -->

          <question :question="q" :isAnswered="false"></question>
        </span>
      </span>
 
        <div class="w-100">
          <div class="modal-form-row">
            <label>{{ l("Start Sort Order", "g") }}</label>
            <span
              ><input
                type="number"
                class="modal-form-input"
                v-model="massSettings.sort"
              />
            </span>
          </div>
          <!-- <select class="modal-form-input" v-model="massImageUpload">
              <option v-for="u in statusList" :key="u.value" :value="u.value">{{
                u.label
              }}</option>
          </select> -->
          <b-button
            variant="default"
            size="sm"
            class="float-right"
            @click="showMass.show = false"
          >
            Close
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="saveMassQuestion()"
          >
            {{ l("Save", "g") }}
          </b-button>
        </div> 
    </div>
          <div v-else-if="showTopic" class="edit_topic">
            <div>
              <h3>
                {{ editedTopic.id ? l("Editing", "g") : l("Create New", "g") }}
              </h3>
              <!-- {{editedTopic}} -->
              <b-alert
                :show="saveStatus.show"
                dismissible
                :variant="saveStatus.status"
              >
                {{ l("Saved", "g") }}
              </b-alert>
              <div class="modal-form" :lang="LOCALE">
                <!-- <div class="modal-form-row">
                  <label>{{ l("Title", "g") }}</label>
                  <span >
                    <select
                      class="modal-form-input"
                      v-model="editedTopic.lesson_layout"
                      @change="setLayout()"
                    >
                      <option
                        v-for="u in lessonLayout"
                        :key="u.value"
                        :value="u.value"
                        >{{ u.label }}</option
                      >
                    </select>
                    <select class="modal-form-input" v-model="editedTopic.lesson_type">
              <option v-for="u in lessonType" :key="u.value" :value="u.value">{{
                u.label
              }}</option>
          </select>
                  </span>
                </div> -->
                <div class="container">
                  <draggable
                    v-model="layout"
                    draggable=".draggable"
                    class="row "
                  >
                    <div
                      class="draggable"
                      :class="'col-' + lt.size"
                      v-for="(lt,i) in layout"
                    >
                      <div class="layout-container" :class="lt.class">
                        <template v-if="lt.class == 'text-T'">
                          <span class="placeholder">{{
                            editedTopic.lesson_name
                          }}</span>
                        </template>
                        <template v-else-if="lt.class == 'text-B'">
                          <div v-if="lt.type">
                            <span class="tem-header-content">

                                {{lt.type}} - 

                              <select class="mini-select" v-model="lt.size">
                                <option
                                  v-for="u in 12"
                                  :key="u + 'sizes'"
                                  :value="u"
                                  >{{ u }}</option
                                >
                              </select>
                              <select
                                class="mini-select"
                                v-model="lt.alignment"
                              >
                                <option
                                  v-for="u in alignments"
                                  :key="u + 'sizes'"
                                  :value="u.value"
                                  >{{ u.label }}</option
                                >
                              </select>

                                <a style="margin-left: 20px;float: right;" @click="lt.type = ''"> Change Type </a>
                            </span>
                             <div
                                class="modal-form-row"
                                v-show="lt.type == 'Title'"
                              >
                                <input
                                type="text"
                                class="modal-form-input width-100"
                                v-model="editedTopic.lesson_name"
                                />
                            </div>
                            <div
                              class="modal-form-row"
                              v-show="lt.type == 'Exam'"
                            >
                              <span style="width: 100%; display: block; ">
                               
                                <span
                                  style="width: 100%; display: inline-flex; border-bottom: 1px solid #aaa; padding-bottom: 5px; margin-bottom: 3px;"
                                >
                                  <input
                                    type="text"
                                    v-model="qs.name"
                                    class="mini-select"
                                    placeholder="Text"
                                    @change="getQuestions()"
                                  />
                                  <select
                                    v-model="qs.type"
                                    class="mini-select"
                                    placeholder="Type"
                                    @change="getQuestions()"
                                  >
                                    <option
                                      v-for="(opt, key) in l(
                                        'cat.QuestionTypes.list',
                                        'g'
                                      )"
                                      :key="key"
                                      :value="key"
                                      >{{ opt.name }}</option
                                    >
                                  </select>
                                  <select
                                    class="mini-select"
                                    placeholder="Level"
                                    v-model="qs.level"
                                    @change="getQuestions()"
                                  >
                                    <option
                                      v-for="u in levels"
                                      :key="u.id"
                                      :value="u.id"
                                      >{{ u.cou_level_name }}</option
                                    >
                                  </select>
             
          <select  
            v-model="qs.skills"
            @change="getQuestions()"
             class="mini-select"  placeholder="Skills"
          > 
            <option value="">-</option>
            <option  v-for="(u, key) in l('cat.QuestionSkills.list', 'g')" :key="key" :value="key">{{
              u.name
            }}</option>
          </select>
          <select  
            v-model="qs.category"
            @change="getQuestions()"
             class="mini-select"  placeholder="Category"
          > <option value="">-</option>
            <option  v-for="u in  options['co_labels']" :key="u.id" :value="u.id">{{
              u.cou_label_name
            }}</option>
          </select>
                                </span>
                                <span
                                  style="width: 100%; display: block; height: 300px;     overflow: hidden;
    overflow-y: auto;"
                                >
                                  <span
                                    class="question-border" style="background: #fff"
                                    :class="
                                      lt.content == q.q.id ? 'green-border' : ''
                                    "
                                    v-for="q in questions"
                                  > 
                                     <input  type="checkbox" :checked="lt.questions.includes(q.q.id)"  /> 
                                      
                                      <a v-if="lt.questions.includes(q.q.id)" @click="deselectStd(lt.questions,q.q.id)"
                                      >Deselect this question</a>
                                      <a v-else @click="lt.questions.push(q.q.id)">Select this question </a> 

                                    <question
                                      :question="q"
                                      :isAnswered="false"
                                     
                                    ></question>
                                  </span>
                                </span>
                              </span>
                            </div>
                            <div
                              style="width: 100%; display: block;"
                              v-show="lt.type == 'Video'"
                            >
                              <div style="width: 100%; display: block;">
                                <textarea v-model="lt.content"></textarea>
                              </div>
                              <div
                                v-if="lt.content"
                                style="width: 100%; display: block;"
                              >
                                <iframe
                                  width="100%"
                                  height="315"
                                  :src="lt.content"
                                ></iframe>
                                <!-- <video width="400" controls>
                                                              <source :src="lt.content" type="video/mp4">
                                                              <source :src="lt.content" type="video/ogg">
                                                              Your browser does not support HTML video.
                                                            </video>  -->
                              </div>
                            </div>
                            <div
                              class="modal-form-row"
                              v-show="lt.type == 'Content'"
                            >
                              <span style="width: 100%; display: block;">
                                <!-- <tiptap    /> -->
                                <tiptap
                                  v-model="lt.content"
                                  @updated="lt.content = $event"
                                />
                              </span>
                            </div>
                            <div
                              class="ui left icon input swdh11 swdh19"
                              v-show="lt.type == 'Image'"
                            >
                              <div v-if="!lt.content">
                                <p>
                                  <a>{{ l("Upload image", "g") }}</a>
                                </p>
                                <input
                                  type="file"
                                  name="changeFile"
                                  @change="
                                    onFileChange2($event, 'lesson_photo', lt)
                                  "
                                />
                                <p>{{ lt }}</p>
                              </div>
                              <div v-else>
                                <img
                                  :src="lt.content"
                                  class="g-width-200 imageUpload"
                                />
                                <p class="margin-top-10 mt-10 g-mt-10">
                                  <a @click="removeImage2('lesson_photo', lt)"
                                    ><i class="fa fa-times"></i>
                                    {{ l("Remove image", "g") }}</a
                                  >
                                </p>
                                <p class="margin-top-10 mt-10 g-mt-10">
                                  Width:
                                  <input
                                    type="text"
                                    class="modal-form-input"
                                    v-model="lt.width"
                                  />
                                </p>
                                <p class="margin-top-10 mt-10 g-mt-10">
                                  Height:
                                  <input
                                    type="text"
                                    class="modal-form-input"
                                    v-model="lt.height"
                                  />
                                </p>
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <span class="tem-header-content"
                              >Add Item

                              <select class="mini-select" v-model="lt.size">
                                <option
                                  v-for="u in 12"
                                  :key="u + 'sizes'"
                                  :value="u"
                                  >{{ u }}</option
                                >
                              </select>
                              <select
                                class="mini-select"
                                v-model="lt.alignment"
                              >
                                <option
                                  v-for="u in alignments"
                                  :key="u + 'sizes'"
                                  :value="u.value"
                                  >{{ u.label }}</option
                                >
                              </select>
                            </span>
                            <ul>
                              <li    v-for="item in lessonType" >
                                <a  @click="lt.type = item.value"  >
                                  + {{ item.label }}
                                </a>
                              </li>
                              <li>
                                  <a @click="removeLayout(i)"> x Remove </a>
                              </li>
                            </ul>
                          </div>
                        </template>
                      </div>
                    </div>
                  </draggable>
                </div>
                <div class="addition_field"  v-show="showAddition==false"> 
                    <a class="text-align new-addition" @click="showAddition=true">+ {{l('Add New Row','g')}}</a>
                </div>
                <div class="addition_field" v-show="showAddition==true">
                    <div class="row">
                        <div class="col-2" >
                            <div class="addition_item" @click="editedTopic.lesson_layout='12B';setLayout(true)"> 
                                <div class="addition_col c12" ></div> 
                            </div>
                        </div>
                         <div class="col-2" >
                            <div class="addition_item" @click="editedTopic.lesson_layout='6B+6B';setLayout(true)"> 
                                <div class="addition_col c6" ></div>
                                <div class="addition_col c6" ></div>
                            </div>
                        </div>
                         <div class="col-2" >
                            <div class="addition_item" @click="editedTopic.lesson_layout='3B+3B+3B+3B';setLayout(true)"> 
                                <div class="addition_col c3" ></div>
                                <div class="addition_col c3" ></div>
                                <div class="addition_col c3" ></div>
                                <div class="addition_col c3" ></div>
                            </div>
                        </div>
                        <div class="col-2" >
                            <div class="addition_item" @click="editedTopic.lesson_layout='3B+6B+3B';setLayout(true)"> 
                                <div class="addition_col c3" ></div>
                                <div class="addition_col c6" ></div>
                                <div class="addition_col c3" ></div> 
                            </div>
                        </div>
                        <div class="col-2" >
                            <div class="addition_item" @click="editedTopic.lesson_layout='3B+9B';setLayout(true)"> 
                                <div class="addition_col c3" ></div>
                                <div class="addition_col c9" ></div> 
                            </div>
                        </div>
                         <div class="col-2" >
                            <div class="addition_item" @click="editedTopic.lesson_layout='4B+4B+4B';setLayout(true)"> 
                                <div class="addition_col c4" ></div>
                                <div class="addition_col c4" ></div> 
                                <div class="addition_col c4" ></div> 
                            </div>
                        </div>
                      </div>
                </div>
                <div class="modal-form-row">
                  <label>{{ l("Sort Order", "g") }}</label>
                  <span
                    ><input
                      type="number"
                      class="modal-form-input"
                      v-model="editedTopic.sort"
                    />
                  </span>
                </div>
              </div>

              <div class="w-100">
                <select class="modal-form-input" v-model="editedTopic.status">
                  <option
                    v-for="u in statusList"
                    :key="u.value"
                    :value="u.value"
                    >{{ u.label }}</option
                  >
                </select>
                <b-button
                  variant="default"
                  size="sm"
                  class="float-right"
                  @click="showTopic = false"
                >
                  Close
                </b-button>
                <b-button
                  variant="primary"
                  size="sm"
                  class="float-right"
                  @click="saveTopic()"
                >
                  {{ l("Save", "g") }}
                </b-button>
              </div>
            </div>
          </div>
          <div v-else class="table_topic">
            <!-- selected: {{selected}} -->

            <vue-good-table
              :columns="columns2"
              :rows="dataLesson"
              :search-options="{
                enabled: true,
                trigger: 'enter'
              }"
              :isDraggable="true"
              @on-dragged="dragged"
              :sort-options="{
                enabled: true,
                initialSortBy: { field: 'sort', type: 'asc' }
              }"
              :rtl="LOCALE == 'ar' ? true : false"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                  <a class="table-buttons" @click="openModalTopic(props.row)"
                    ><i class="fa fa-pen"></i
                  ></a>
                  <!-- <a
                            class="table-buttons"
                            @click="selectedLesson=props.row.id"
                            @click.middle="
                              goPathBlank('admin/course/' + courseId + '/' + uniteId +'/lessons?lesson='+props.row.id)
                            "
                            ><i class="fas fa-list-alt"></i
                          ></a> -->
                  <a
                    class="table-buttons"
                    @click="
                      goPathBlank(
                        'course/' + props.row.prev_id + '/' + props.row.id
                      )
                    "
                    @click.middle="
                      goPathBlank(
                        'course/' + props.row.prev_id + '/' + props.row.id
                      )
                    "
                    ><i class="fa fa-eye"></i
                  ></a>
                  <a class="table-buttons" @click="duplicate(props.row)"
                    ><i class="fa fa-copy"></i
                  ></a>
                </span>
                <span v-else-if="props.column.field == 'lesson_photo'">
                  <img
                    v-if="props.row.lesson_photo"
                    :src="
                      show_image(props.row.lesson_photo, '50', '50', '', '90')
                    "
                    alt=""
                  />
                </span>
                <span v-else-if="props.column.field == 'sort'">
                  <input
                    type="checkbox"
                    :value="props.row.id"
                    v-model="selected"
                  />
                  {{ props.row[props.column.field] }}
                </span>
                <span v-else-if="props.column.field == 'count'">
                  {{ count ? count[props.row.id] : "" }}
                </span>
                <span v-else>
                  {{ props.row[props.column.field] }}
                </span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
      <div v-show="!selectedLesson" class="col-12 col-md-12 col-sm-12">
        <vue-good-table
          :columns="columns"
          :rows="data"
          :search-options="{
            enabled: true,
            trigger: 'enter'
          }"
          :sort-options="{
            enabled: true,
            initialSortBy: { field: 'sort', type: 'asc' }
          }"
          :rtl="LOCALE == 'ar' ? true : false"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <a class="table-buttons" @click="openModal(props.row)"
                ><i class="fa fa-pen"></i
              ></a>
              <a
                class="table-buttons"
                @click="selectedLesson = props.row.id"
                @click.middle="
                  goPathBlank(
                    'admin/course/' +
                      courseId +
                      '/' +
                      uniteId +
                      '/lessons?lesson=' +
                      props.row.id
                  )
                "
                ><i class="fas fa-list-alt"></i
              ></a>
              <a
                class="table-buttons"
                @click="
                  goPathBlank(
                    'course/' + props.row.prev_id + '/' + props.row.id
                  )
                "
                @click.middle="
                  goPathBlank(
                    'course/' + props.row.prev_id + '/' + props.row.id
                  )
                "
                ><i class="fa fa-eye"></i
              ></a>
            </span>
            <span v-else-if="props.column.field == 'unit_image'">
              <img
                v-if="props.row.unit_image"
                :src="show_image(props.row.unit_image, '50', '50', '', '90')"
                alt=""
              />
            </span>
            <span v-else-if="props.column.field == 'count'">
              {{ count ? count[props.row.id] : "" }}
            </span>
            <span v-else>
              <a @click="selectedLesson = props.row.id">{{
                props.row[props.column.field]
              }}</a>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
import admin_course from "@/mixins/admin_course";
import axios from "axios";
import { VueGoodTable } from "vue-good-table";
import banners from "@/components/common/banner.vue";
import tiptap from "@/components/common/Tiptap.vue";
import "vue-good-table/dist/vue-good-table.css";
import VueGoodTablePlugin from "vue-good-table";
import question from "@/components/utils/question.vue";
import draggable from "vuedraggable";
export default {
  mixins: [general, admin_course],
  components: {
    banners,
    VueGoodTable,
    tiptap,
    draggable,
    question
  },
  computed: {
    lessonId() {
      return this.$route.query.lesson;
    },
    levels() {
      return this.$store.state.core.options["co_level"];
    },
    labels() {
      return this.$store.state.core.options["co_labels"];
    }
  },
  data: () => ({
    edited: {
      id: null
    },
    search: {
      keyword: ""
    },
    selectedLesson: null,
    selected: [],
    topics: [],
    dataLesson: [],
    showTopic: false,
    showAddition: false,
    editedTopic: {
      status: 1,
      lesson_layout: "12T+12B"
    },
    lessonLayout: [
      { label: "1 Field", value: "12T" },
      { label: "Title & 1 Field", value: "12T+12B" },
      { label: "Title & 2 Field", value: "12T+6B+6B" },
      { label: "Title & 4 Field", value: "12T+6B+6B+6B+6B" },
      { label: "4 Field", value: "6B+6B+6B+6B" }
    ],
    alignments: [
      { label: "Left", value: "align-left" },
      { label: "Center", value: "align-center" },
      { label: "Right", value: "align-right" }
    ],
    layout: [],
    lessonType: [
      { label: "Title", value: "Title" },
      { label: "Question", value: "Exam" },
      // {label:'Course',value:'Course'},
      { label: "Video", value: "Video" },
      { label: "Image", value: "Image" },
      { label: "Content", value: "Content" },
      { label: "Audio", value: "Audio" }
    ],
    showMass: {
      showI: false,
      showQ: false
    },
    qs: {
      name: "",
      type: "",
      level: "",
      skills:"",
      category:"",
    },
    questions: [],
    columns: [
      {
        label: "Sort",
        field: "sort",
        width: "60px",
        type: "number"
      },

      {
        label: "Lesson Name",
        field: "section_name"
      },
      {
        label: "Lesson",
        field: "count",
        width: "60px",
        sortable: false
      },
      {
        label: "Action",
        field: "action",
        width: "120px",
        sortable: false
      }
    ],
    columns2: [
      {
        label: "Sort",
        field: "sort",
        width: "60px",
        type: "number"
      },
      {
        label: "Image",
        field: "lesson_photo",
        width: "100px",
        sortable: false
      },
      {
        label: "Topic Name",
        field: "lesson_name"
      },
      {
        label: "Type",
        field: "lesson_type"
      },

      {
        label: "Action",
        field: "action",
        width: "120px",
        sortable: false
      }
    ],
    fileList: [],
    massImageUpload: [],
    massQuestion: [],
    massSettings: {
      sort: 1,
      status: 1
    }
  }),
  watch: {
    selectedLesson(val) {
      this.getTopics();
      this.setDefaultTopic();
    },
    "editedTopic.lesson_question"(val) {
      this.getQuestions(val);
    }
  },
  async created() {
    this.setDefault();

    this.$store.dispatch("search/groupFields", {
      module: "lesson",
      group: "prev_id",
      lang: this.LOCALE
    });
    this.setLayout();
    this.getList();
    this.getCourseName();
    this.getUniteName();

    await this.$store.dispatch("core/getOptions", {
      slang: this.$store.state.locale,
      group: "co_level",
      fields: "id,cou_level_name,cou_level_color"
    });
    await this.$store.dispatch("core/getOptions", {
      slang: this.$store.state.locale,
      group: "co_labels",
      fields: "id,cou_label_name"
    });
    await this.$store.dispatch("core/getOptions", {
      slang: this.$store.state.locale,
      group: "cou_settings",
      fields: "id,cou_setting_image"
    });
  },

  methods: {
    dragged(e) {
      console.log("e", e);
    },
    removeLayout(i){
        this.layout = this.layout.filter((a,index)=> index!=i)
    },
    duplicate(row) {
      let r = { ...row };
      r.id = "duplicate";
      this.openModalTopic(r);
    },
    setLayout(addition=false) {
   
      let saved_layout =  addition ? [...this.layout] : [];
      if(!addition){
        this.layout = [];
      }
      let t = this.editedTopic.lesson_layout;
      let ta = t.split("+");
      console.log("ta",t,ta)
 
      ta.forEach((k, i) => {
        let width =
          saved_layout[i] && saved_layout[i].width ? saved_layout[i].width : "";
        let height =
          saved_layout[i] && saved_layout[i].height
            ? saved_layout[i].height
            : "";
        let alignment =
          saved_layout[i] && saved_layout[i].alignment
            ? saved_layout[i].alignment
            : "";
        let type = saved_layout[i] ? saved_layout[i].type : l=='T' ? "Title" : '';
        let content = saved_layout[i] ? saved_layout[i].content : "";
        let l = k.slice(-1);
        let t = k.slice(0, -1);
        l='B'
        this.layout.push({
          class: "text-" + l,
          size: t,
          height: height,
          alignment: alignment,
          width: width,
          type: type,
          content: content,
          questions: []
        });
      });

      // console.log("this.layout",this.layout);
    },
    deselect(id) {
      this.massQuestion = this.massQuestion.filter(k => k != id); 
    },
    deselectStd(data,id) {
      data = data.filter(k => k != id); 
    },
    removeSelected() {
      let s = this.selected;
      if (s && s[0]) {
        let length = s.length;

        s.forEach(async (id, i) => {
          await axios({
            url: process.env.baseURL + "lesson/" + id,
            method: "put",
            data: {
              id: id,
              status: 3
            }
          }).then(response => {
            if (i == length - 1) {
              this.getTopics();
            }
          });
        });
      }
    },
    onFileChangeMass(e, field) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      // console.log("files",files)
      let length = files.length;
      for (let i = 0; i <= length; i++) {
        if (files[i]) {
          this.createImageMass(files[i], field);
        }
      }
    },
    createImageMass(file, field) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = e => {
        console.log("e created", field);
        this.massImageUpload.push({ lesson_photo: e.target.result });
      };
      reader.readAsDataURL(file);
    },
    removeImageMass: function(e) {
      this.massImageUpload[e] = "";
    },


/// dosya yüklenir gösterimi için content dolar.
/// fileList blob olarak yüklenir.
/// 
    onFileChange2(e, field, lt) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage2(files[0], field, lt);
    },
    createImage2(file, field, lt) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      const blob = new Blob([file],{type: file.type})
      this.fileList.push(blob);
      console.log("file",typeof blob,blob)

      reader.onload = e => {
        lt.content = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage2: function(e, lt) {
      lt.content = "";
    },

    setDefault() {
      this.edited = {
        id: null,
        section_name: "",
        lesson_course: null,
        status: 1,
        prev_id: this.uniteId,
        sort: this.data.length + 1
      };
    },
    setDefaultTopic() {
      this.editedTopic = {
        id: null,
        lesson_name: "",
        lesson_video: "",
        lesson_video_url: "",
        lesson_photo: "",
        lesson_type: "",
        lesson_question: [],
        lesson_acc_type: "",
        lesson_subject: "",
        lesson_description: "",
        lesson_layout: "12T:12B",
        lesson_content: [],
        lesson_total_time: "",
        lesson_counter: "",
        status: 1,
        prev_id: this.selectedLesson,
        sort: this.dataLesson.length + 1,
        
      };
    },
    openModalMass(type) {
      if (type.type == "question") {
        this.showMass.showQ = true;
      } else if (type.type == "image") {
        this.showMass.showI = true;
      }
    },
    openModal(row) {
      this.show = true;
      if (!row.id) {
        this.setDefault();
      } else {
        this.edited = { ...row };
      }
    },
    openModalTopic(row) {
      this.showTopic = true;
      if (row.id == "duplicate") {
        row.id = null;
        this.editedTopic = { ...row };
        this.layout = row.lesson_content;
      } else if (!row.id) {
        this.setDefaultTopic();
      } else {
        this.editedTopic = { ...row };
        // this.setLayout();
        this.layout = row.lesson_content;
      }
    },

    saveMassQuestion() {
      // massQuestion
      let massQuestion = this.massQuestion;
      if (massQuestion && massQuestion[0]) {
        let total = parseInt(this.massSettings.sort);
        massQuestion.forEach((k, i) => {
          this.layout=[{size:12,class:'text-B',content:k,type:"Exam"}];
          let content=JSON.stringify(this.layout);
          let data = {
            id: null,
            status: 1,
            lesson_name: k.lesson_name,
            lesson_photo: "",
            lesson_description: "",
            lesson_content: content,
            lesson_layout: "12B",
            lesson_type: "Exam",
            lesson_question: k,
            lesson_video_url: "",
            lesson_subject: this.sectionId,
            prev_id: this.selectedLesson,
            sort: total + i
          };
          let updatePage = i == massQuestion.length - 1 ? true : false;
         
          this.saveTopic(data, updatePage);
          if (updatePage) {
            massQuestion = [];
            this.showMass.show = false
          }
        });
      }
    },
    saveMassUpload() {
      let massImageUpload = this.massImageUpload;

      if (massImageUpload && massImageUpload[0]) {
        let total = parseInt(this.massSettings.sort);
        massImageUpload.forEach((k, i) => {
          let data = {
            id: null,
            status: 1,
            lesson_name: k.lesson_name,
            lesson_photo: k.lesson_photo,
            lesson_description: "",
            lesson_content: "",
            lesson_layout: "12B",
            lesson_type: "Image",
            lesson_question: "",
            lesson_video_url: "",
            lesson_subject: this.sectionId,
            prev_id: this.selectedLesson,
            sort: total + i
          };
          let updatePage = i == massImageUpload.length - 1 ? true : false;

          this.saveTopic(data, updatePage);
          if (updatePage) {
            massImageUpload = [];
          }
        });
      }
    },
    async saveTopic(d, updatePage = true) {
      d = d ? d : this.editedTopic;
      let method = "post";
      let url = process.env.baseURL + "lesson";
      if (d.id && d.id != "new") {
        method = "put";
        url = process.env.baseURL + "lesson/" + d.id;
      }

      d.lesson_description = "";
      d.lesson_question = "";
      d.lesson_photo = null;
      d.lesson_video_url = "";
      d.lesson_type = "";
      let vg = "";
      if (this.layout && this.layout[0]) {
        this.layout.forEach(a => {
          // console.log("a.questions",a.questions);
          if (a.type == "Exam") {
            d.lesson_question = a.questions ? JSON.stringify(a.questions) : JSON.stringify([]);
            d.lesson_type = d.lesson_type + vg + a.type;
            vg = ",";
          } else if (a.type == "Course") {
            d.lesson_type = d.lesson_type + vg + a.type;
            vg = ",";
          } else if (a.type == "Video") {
            d.lesson_video_url = a.content;
            d.lesson_type = d.lesson_type + vg + a.type;
            vg = ",";
          } else if (a.type == "Image") {
            d.lesson_photo = a.content;
            d.lesson_type = d.lesson_type + vg + a.type;
            vg = ",";
          } else if (a.type == "Content") {
            d.lesson_description = a.content;
            d.lesson_type = d.lesson_type + vg + a.type;
            vg = ",";
          }
        });
      }
      let lesson_content = JSON.stringify(this.layout);
      await axios({
        url,
        method,
        data: {
          id: d.id && d.id != "new" ? d.id : null,
          status: d.status,
          lesson_name: d.lesson_name,
          lesson_photo: d.lesson_photo,
          lesson_content: lesson_content,
          lesson_description: d.lesson_description,
          lesson_type: d.lesson_type,
          lesson_layout: d.lesson_layout,
          lesson_question: d.lesson_question,
          lesson_subject: this.sectionId,
          lesson_video_url: d.lesson_video_url,
          prev_id: this.selectedLesson,
          sort: d.sort
        }
      })
        .then(response => {
          if (updatePage) {
            this.saveStatus = { show: true, status: "success" };

            this.getTopics();
            this.setDefaultTopic();
            this.$store.dispatch("search/groupFields", {
              module: "lesson",
              group: "prev_id",
              lang: this.LOCALE
            });
            setTimeout(() => {
              this.showTopic = false;
              this.saveStatus = { show: false, status: "success" };
            }, 500);
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    async save() {
      let d = this.edited;
      let method = "post";
      let url = process.env.baseURL + "sections";
      if (d.id && d.id != "new") {
        method = "put";
        url = process.env.baseURL + "sections/" + d.id;
      }
      await axios({
        url,
        method,
        data: {
          id: d.id && d.id != "new" ? d.id : null,
          section_name: d.section_name,
          lesson_course: this.courseId,
          prev_id: this.uniteId,
          status: d.status,
          sort: d.sort
        }
      }).then(response => {
        this.saveStatus = { show: true, status: "success" };
        this.getList();
        setTimeout(() => {
          this.show = false;
          this.saveStatus = { show: false, status: "success" };
        }, 500);
      });
    },
    async getQuestions(id) {
      let fields =
        "id,sort,status,exa_type,rs_Question,exa_image,exa_sound,exa_video,exa_timer,exa_ready";
      let filter = {};
      if (id) {
        let idp = JSON.parse(id);
        filter.id = ["in", idp];
      } else { 

        if (this.qs.skills) {
          filter.exa_skills = ["in", [this.qs.skills]];
        }
        if (this.qs.category) {
          filter.exa_categories = ["in", [this.qs.category]]; 
        }
        if (this.qs.name) {
          filter.rs_Question = ["LIKE", this.qs.name];
        }
        if (this.qs.level) {
          filter.exa_degree = ["=", this.qs.level];
        }
        if (this.qs.type) {
          filter.exa_type = ["=", this.qs.type];
        }
      }
      axios({
        url: process.env.baseURL + "exam_q",
        method: "get",
        params: {
          limit: 20,
          offset: 0,
          fields,
          lang: this.$store.state.locale,
          sort: ["random,ASC"],
          filter
        }
      })
        .then(response => {
          if (
            response.data &&
            response.data.formattedData &&
            response.data.formattedData[0]
          ) {
            this.questions = response.data.formattedData.map(k => {
              return { a: null, q: k };
            });
          }else{
            this.questions = null;
          }
        })
        .catch(e => {
          this.questions = null;
        });
    },
    async getList() {
      let fields = `sort,section_name,lesson_course,id,status,created_on,created_by,id,status`;
      // let prev = this.$route.params.course;
      let filters = { prev_id: ["=", this.uniteId] };
      filters.status = ["=", this.filter.status ? this.filter.status : 1];
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "sections",
          method: "get",
          params: {
            limit: 100,
            offset: 0,
            fields,
            lang: this.$store.state.locale,
            sort: ["sort,ASC"],
            filter: filters
          }
        })
          .then(response => {
            if (
              response.data &&
              response.data.formattedData &&
              response.data.formattedData[0]
            ) {
              let d = response.data.formattedData;

              this.data = d.map(element => {
                element.sort = parseInt(element.sort);
                return { ...element };
              });
            } else {
              this.data = [];
            }
          })
          .catch(e => {
            console.log(e);
          });
      });
    },
    async getTopics() {
      let fields = `sort,prev_id,lesson_name,lesson_photo,lesson_question,lesson_video,lesson_type,lesson_content,lesson_layout,lesson_description,lesson_video_url,created_on,created_by,id,status`;
      // let prev = this.$route.params.course;
      let filters = { prev_id: ["=", this.selectedLesson] };
      filters.status = ["=", this.filter.status ? this.filter.status : 1];
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.baseURL + "lesson",
          method: "get",
          params: {
            limit: 100,
            offset: 0,
            fields,
            lang: this.$store.state.locale,
            sort: ["sort,ASC"],
            filter: filters
          }
        })
          .then(response => {
            if (
              response.data &&
              response.data.formattedData &&
              response.data.formattedData[0]
            ) {
              let d = response.data.formattedData;

              this.dataLesson = d.map(element => {
                element.sort = parseInt(element.sort);
                if (element.lesson_content) {
                  element.lesson_content = JSON.parse(element.lesson_content);
                }
                return { ...element };
              });
            } else {
              this.dataLesson = [];
            }
          })
          .catch(e => {
            this.dataLesson = [];
            console.log(e);
          });
      });
    }
  }
};
</script>
<style lang="scss" src="@/pages/_lang/admin/course/style.scss"></style>
<style lang="scss">
.draggable-box {
  display: inline-flex;
  width: 100%;
  .draggable {
    display: block;
    margin: 5px;
    border: 0.1em solid #efefef;
    padding: 5px;
  }
}
.edit_topic {
  border-radius: 5px;
  background: #fff;
  padding: 10px;
}

 
.addition_item{
  border: 1px solid #f9f9f9;
    height: 40px;

}
.addition_col{
    width: 100%;
    height: 40px;
    &.c3{
      width: 25%;
    }
    &.c4{
      width: 33%;
    }
    &.c6{
      width: 50%;
    }
    &.c12{
      width: 100%;
    }
    &.c2{
      width: 18%;
    }
}
</style>
