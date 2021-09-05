<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="view-filter">
          <div
            class="drawer"
            @click="closeDrawer()"
            :class="selectedItem.show ? 'visible' : 'hidden'"
          >
            <div class="content" @click.stop="">
              <h3>{{ selectedItem.data.dict_word }}</h3>
              <div v-html="HtmlEncode(selectedItem.data.dict_mean)"></div>

              <span class="pull-right" v-if="selectedItem.data.dict_image">
                <img
                  :src="
                    show_image(selectedItem.data.dict_image, '100', '100', true)
                  "
              /></span>
            </div>
          </div>
          <div
            class="side-bar"
            data-simplebar
            :class="customClass.textDir + ' ' + customClass.dir"
            :lang="$store.state.locale"
          >
            <div class="input-std-search">
              <i class="fa fa-search input-icon"></i>
              <input
                type="text"
                @change="getResults()"
                v-model="search.keyword"
                :placeholder="l('Search keyword', 'g')"
              />
            </div>
            <!-- <div class="serach-item">
                           
                            <div class="search-box"  :lang="$store.state.locale" @click="search.module='Course'">
								<input type="radio" tabindex="0" :checked="search.module=='Course' ? 'checked' : '' " value="Course"   />
								<label :lang="$store.state.locale"> {{(l('Lessons','g'))}}  </label>
							</div>
                              <div class="search-box" :lang="$store.state.locale"  @click="search.module='Word'">
								<input type="radio" tabindex="1"  :checked="search.module=='Word' ? 'checked' : '' " value="Word"   />
								<label :lang="$store.state.locale"> {{(l('Words','g'))}}  </label>
							</div>
                              <div class="search-box" :lang="$store.state.locale"  @click="search.module='Exam'">
								<input type="radio" tabindex="2" value="Exam"  :checked="search.module=='Exam' ? 'checked' : '' "   />
								<label :lang="$store.state.locale"> {{(l('Question','g'))}}  </label>
							</div>
                </div> -->

            <div class="serach-item">
              <div class="search-title">
                {{ l("Level", "g") }}
              </div>
              <div
                class="search-box inline"
                :lang="$store.state.locale"
                v-for="(opt, key) in op_co_level"
                @click="addSearch('level', opt.id)"
              >
                <input
                  type="checkbox"
                  :checked="search.level.includes(opt.id) ? 'checked' : false"
                />
                <label :lang="$store.state.locale">
                  {{ opt.cou_level_name }}
                  {{
                    counts["degree"][opt.id]
                      ? "(" + counts["degree"][opt.id] + ")"
                      : ""
                  }}
                </label>
              </div>
            </div>
            <!-- <div class="serach-item">
                            <div class="search-title">
                                {{l('Search keyword','g')}} 
                            </div>
                            <div class="search-box"   >
								<input type="text" class="input-std" 
                                        @change="getResults()"
                                        v-model="search.keyword" :placeholder="l('Type keyword','g')"  /> 
							</div>
				</div>     -->

            <div class="serach-item" v-if="search.module == 'Exam'">
              <div class="search-title">
                {{ l("Questition Skills", "g") }}
              </div>
              <div class="search-checkbox">
                <div
                  class="search-box"
                  :lang="$store.state.locale"
                  v-for="(opt, key) in l('cat.QuestionSkills.list', 'g')"
                  @click="addSearch('skills', key)"
                >
                  <input
                    type="checkbox"
                    :checked="search.skills.includes(key) ? 'checked' : false"
                  />
                  <label :lang="$store.state.locale">
                    {{ opt.name }}
                    {{
                      counts["skills"] && counts["skills"][key]
                        ? "(" + counts["skills"][key] + ")"
                        : ""
                    }}
                  </label>
                </div>
              </div>
            </div>
            <!-- <div class="serach-item" v-if="search.module=='Exam'"> 
                
                            <div class="search-title">
                                {{l('Questition Media','g')}}  
                            </div> 
                             <div class="search-checkbox">
                                <div class="search-box"  v-for="(opt,key) in mediaTypes"    
                                @click="addSearch('media',opt.value)" >
                                    <input type="checkbox"      :checked="search.media.includes(opt.value) ? 'checked' : false "  />
                                    <label> {{opt.name}} </label>
                                </div>
							</div>
				</div> -->
            <div class="serach-item">
              <div class="search-title">
                {{ l("Categories", "g") }}
              </div>
              <div class="search-checkbox">
                <div
                  class="search-box"
                  :lang="$store.state.locale"
                  v-for="(opt, key) in options['co_labels']"
                  v-show="counts['categories'][opt.id]"
                  @click="addSearch('category', opt.id)"
                >
                  <input
                    type="checkbox"
                    :checked="
                      search.category.includes(opt.id) ? 'checked' : false
                    "
                  />
                  <label :lang="$store.state.locale">
                    {{ opt.cou_label_name }}
                    {{
                      counts["categories"][opt.id]
                        ? "(" + counts["categories"][opt.id] + ")"
                        : ""
                    }}
                  </label>
                </div>
              </div>
            </div>
            <div class="serach-item" v-if="search.module == 'Exam'">
              <div class="search-title">
                {{ l("Questition Type", "g") }}
              </div>
              <div class="search-checkbox">
                <div
                  class="search-box"
                  :lang="$store.state.locale"
                  v-for="(opt, key) in l('cat.QuestionTypes.list', 'g')"
                  @click="addSearch('qtype', key)"
                >
                  <input
                    type="checkbox"
                    :checked="search.qtype.includes(key) ? 'checked' : false"
                  />
                  <label>
                    {{ opt.name }} {{ counts["exa_type"][key] ? '('+counts["exa_type"][key]+')' : '' }}
                  </label>
                </div>
              </div>
            </div>
             <div class="serach-item" v-if="search.module == 'Word'">
              <div class="search-title">
                {{ l("Word Type", "g") }}
              </div>
              <div class="search-checkbox">
                  <!-- {{l('cat.WordTypes.list', 'g')}} -->
                <div
                  class="search-box"
                  :lang="$store.state.locale"
                  v-for="(opt, key) in l('cat.WordTypes.list', 'g')"
                  @click="addSearch('dict_type', key)"
                >
                  <input
                    type="checkbox"
                    :checked="search.dict_type.includes(key) ? 'checked' : false"
                  /> 
                  <label>
                    {{ opt.name }} {{ counts["dict_type"][key] ? '('+counts["dict_type"][key]+')' : '' }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="content" v-show="loading">

<img class="not-found-image" src="/img/loading.gif" /> 

          </div>
          <div class="content" v-show="!loading">
              <div class="filter_header">

            <div class="row">
              <div
                class="col-6 "
                :class="customClass.textDir + ' ' + customClass.dir"
              >
                <div class="tootal_results">
                    {{ l("Total results", "g") }} {{ pagination.total }}
                </div>
                <b-dropdown size="sm" variant="outline-success"  >
                  <template #button-content>
                    <a>
                      {{ "Order by:" + orderByList[orderBy].label }}
                      <i class="fas fa-chevron-down"></i>
                    </a>
                  </template>
                  <b-dropdown-item
                    @click="orderBy = i"
                    v-for="(order, i) in orderByList"
                    >{{ order.label }}
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <div class="col-3 ">
                <template
                  v-if="
                    search.module == 'Exam' &&
                      selection.selectionE &&
                      selection.selectionE.length > 0
                  "
                >
                  <a
                    @click="addSelectionAll('selectionE', 'Exam')"
                    class="addListLink"
                    >{{l('Add to list','g')}}
                    {{
                      selection.selectionE.length + " " + l("selected", "g")
                    }}</a
                  >
                </template>
                <template
                  v-if="
                    search.module == 'Course' &&
                      selection.selectionC &&
                      selection.selectionC.length > 0
                  "
                >
                  <a
                    @click="addSelectionAll('selectionC', 'Course')"
                    class="addListLink"
                    >Add to list
                    {{
                      selection.selectionC.length + " " + l("selected", "g")
                    }}</a
                  >
                </template>
                <template
                  v-if="
                    search.module == 'Word' &&
                      selection.selectionW &&
                      selection.selectionW.length > 0
                  "
                >
                  <a
                    @click="addSelectionAll('selectionW', 'Word')"
                    class="addListLink"
                    >{{ l("Add to list", "g") }}
                    {{
                      selection.selectionW.length + " " + l("selected", "g")
                    }}</a
                  >
                </template>
              </div>

              <b-dropdown
                v-if="search.module == 'Word'"
                size="sm"
                variant="outline-success" 
              >
                <template #button-content>
                  <a>
                    {{ "View Type" }} : {{ viewType.label }}
                    <i class="fas fa-chevron-down"></i>
                  </a>
                </template>
                <b-dropdown-item
                  @click="viewType = order"
                  v-for="(order, i) in viewTypes"
                  >{{ order.label }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
              </div>

            <div class="content-table">
                 <div v-if="!data[0]" class="not-found">
          <img class="not-found-image" src="/img/not-found.gif" />
          <h5>
              <span>{{ l("can not found.", "g") }}</span>
          </h5>
          <div class="not-found-suggestion">
            <a  @click="$router.push({path:'',query:{}})">{{ l("Reset Search", "g") }}</a>
          </div>
        </div> 
              <div v-else-if="search.module == 'Word'">
                <div
                  v-for="dt in data"
                  class="list_item"
                  :class="customClass.textDir + ' ' + customClass.dir"
                >
                  <div class="word-container">
                    <div class="content-side">
                      <div class="h3" @click="openDrawer('word', dt)">
                        {{ dt.dict_word }}
                        <span
                          v-html="replaceWord(dt.dict_mean)"
                          v-if="viewType.value != 'wide'"
                        ></span>
                      </div>
                      <div class="type-show">{{ dt.dict_type }}</div>
                      <div
                        class="degree-show"
                        v-if="dt.dict_degree"
                        :style="{ background: dt.level.color }"
                      >
                        {{ dt.level.name }}
                      </div>
                
                      <!-- <h3 @click="goPathBlank('word/'+dt.dict_word)">{{dt.dict_word}}</h3> -->
                      <div class="word-content" v-if="viewType.value == 'wide'">
                        <span v-html="HtmlEncode(dt.dict_mean)"></span>

                        <span class="pull-right" v-if="dt.dict_image"
                          ><img
                            :src="show_image(dt.dict_image, '100', '100', true)"
                        /></span>
                      </div>
                      <br />

                      <div class="detail-button-abs">
                        <div class="share-network-list-2" v-if="data[0]">
                          <!-- {{sharing}} -->
                          <ShareNetwork
                            v-for="network in networks"
                            :network="network.network"
                            :key="network.network"
                            :style="{ backgroundColor: network.color }"
                            :url="
                              'https://daleel-ar.com/' +
                                LOCALE +
                                '/word/' +
                                dt.dict_word
                            "
                            :title="dt.dict_word"
                            :description="replaceWord(dt.dict_mean)"
                            :quote="''"
                            :hashtags="''"
                          >
                            <i :class="network.icon"></i>
                            <!-- <span>{{ network.name }}</span> -->
                          </ShareNetwork>

                          <a
                            @click="goPath('word/' + dt.dict_word)"
                            class="share-network-paw"
                            style="background-color: #2529d8;"
                            ><i class="fas fah fa-lg fa-search"></i
                          ></a>
                          <a
                            @click="goPathBlank('word/' + dt.dict_word)"
                            class="share-network-buffer"
                            style="background-color: #323b43;"
                            ><i class="fas fah fa-lg fa-link"></i
                          ></a>
                          <a
                            @click="dt.show = !dt.show"
                            class="share-network-buffer"
                            :class="dt.show ? 'showed-selected' : ''"
                            style="background-color: #323b43;"
                            ><i class="fas fah fa-lg fa-chevron-down"></i
                          ></a>
                        </div>
                      </div>
                      <div v-if="dt.show" style="margin-top: 15px;">
                        <more-info-word :dt="dt"></more-info-word>
                      </div>
                    </div>
                    <div class="button-side" :lang="$store.state.locale">
                      <!-- <a @click="goPathBlank('word/'+dt.dict_word)">Detail</a> -->
                      <br />
                      <div v-if="!isLiked(dt.id)">
                        <a
                          href="javascript:;"
                          class="like-button"
                          @click="openLikeModal(dt, null, 'Word')"
                        >
                          <span class="text-black">
                            <svg
                              id="bold"
                              fill="CurrentColor"
                              enable-background="new 0 0 24 24"
                              height="18"
                              viewBox="0 0 24 24"
                              width="18"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m14.25 0h-11.5c-1.52 0-2.75 1.23-2.75 2.75v15.5c0 1.52 1.23 2.75 2.75 2.75h6.59c-.54-1.14-.84-2.41-.84-3.75 0-1.15.22-2.25.63-3.26-.04.01-.08.01-.13.01h-5c-.55 0-1-.45-1-1s.45-1 1-1h5c.38 0 .72.22.88.54.65-1.01 1.49-1.87 2.48-2.54h-8.36c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1 0 .05 0 .09-.01.13.93-.38 1.95-.6 3.01-.62v-5.76c0-1.52-1.23-2.75-2.75-2.75zm-6.25 6h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1z"
                              />
                              <path
                                d="m17.25 10.5c-3.722 0-6.75 3.028-6.75 6.75s3.028 6.75 6.75 6.75 6.75-3.028 6.75-6.75-3.028-6.75-6.75-6.75zm2.75 7.75h-1.75v1.75c0 .552-.448 1-1 1s-1-.448-1-1v-1.75h-1.75c-.552 0-1-.448-1-1s.448-1 1-1h1.75v-1.75c0-.552.448-1 1-1s1 .448 1 1v1.75h1.75c.552 0 1 .448 1 1s-.448 1-1 1z"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                      <!-- @click="removeLikeModal(dt,null,'Word')" -->
                      <a
                        href="javascript:;"
                        class="like-button"
                        v-else
                        @click="openLikeModal(dt, null, 'Word')"
                      >
                        <span class="text-red">
                          <svg
                            id="Layer_1"
                            enable-background="new 0 0 512 512"
                            fill="CurrentColor"
                            height="18"
                            viewBox="0 0 512 512"
                            width="18"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <path
                                fill="CurrentColor"
                                d="m274.371 408.109c0-8.444.795-16.705 2.298-24.719h-197.402c-8.284 0-15-6.716-15-15s6.716-15 15-15h206.812c5.807-12.908 13.601-24.736 22.992-35.091-1.529.526-3.163.824-4.87.824h-224.934c-19.801-.7-19.939-29.242 0-30h224.933c10.102-.193 17.633 10.415 14.176 19.871 17.952-16.282 40.331-27.762 65.091-32.406v-165.265c0-26.634-21.694-47.133-47.134-47.133h-42.012c-1.983 34.594-30.745 62.133-65.827 62.133h-73.521c-35.082 0-63.844-27.539-65.827-62.133h-42.012c-25.441 0-47.134 20.501-47.134 47.133v353.467c0 26.577 21.65 47.133 47.134 47.133h276.72c-30.172-24.556-49.483-61.97-49.483-103.814zm-195.104-247.519h224.934c8.284 0 15 6.716 15 15s-6.716 15-15 15h-224.934c-19.812-.705-19.93-29.245 0-30zm0 64.267h224.934c8.284 0 15 6.716 15 15s-6.716 15-15 15h-224.934c-19.812-.705-19.93-29.246 0-30zm80.333 222.8h-80.333c-19.854-.725-19.89-29.26 0-30h80.333c8.284 0 15 6.716 15 15s-6.716 15-15 15z"
                              />
                              <path
                                d="m154.973 96.323h73.521c49.35-2.211 46.734-73.109-2.679-71.893-11.043-32.481-57.133-32.461-68.163 0-49.214-1.306-52.202 69.559-2.679 71.893z"
                              />
                              <path
                                d="m408.185 304.294c-57.244 0-103.815 46.571-103.815 103.814 5.219 137.536 202.431 137.498 207.63-.001 0-57.242-46.571-103.813-103.815-103.813zm41.752 93.655s-41.524 41.524-41.524 41.524c-5.857 5.858-15.353 5.858-21.211.002 0 0-20.766-20.758-20.766-20.758-13.533-14.561 6.629-34.752 21.209-21.217 0 0 10.16 10.155 10.16 10.155l30.92-30.919c14.57-13.535 34.746 6.644 21.212 21.213z"
                              />
                            </g>
                          </svg>
                        </span>
                      </a>

                      <input
                        type="checkbox"
                        class="check-centered"
                        :checked="
                          selection.selectionW.includes(dt.id)
                            ? 'checked'
                            : false
                        "
                        @click="addSelection('selectionW', dt.id)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="search.module == 'Exam'">
                <div
                  v-for="dt in data"
                  class="list_item"
                  :class="customClass.textDir + ' ' + customClass.dir"
                >
                  <div class="questition-container">
                    <div class="content-side">
                      <question
                        :question="{ q: dt, a: [] }"
                        :order="1"
                        :levels="options['co_level']"
                        :isAnswered="false"
                      ></question>
                    </div>
                    <div class="button-side" :lang="$store.state.locale">
                      <!-- <a @click="goPathBlank('questionView/'+dt.id)">Detail</a><br /> -->
                      <br />
                      <div v-if="!isLiked(dt.id)">
                        <a
                          :title="dt.id"
                          href="javascript:;"
                          class="like_button"
                          @click="
                            openLikeModal(dt, { id: dt.lesson_unite }, 'Exam')
                          "
                        >
                          <span class="text-black">
                            <svg
                              id="bold"
                              enable-background="new 0 0 24 24"
                              height="18"
                              fill="CurrentColor"
                              viewBox="0 0 24 24"
                              width="18"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="CurrentColor"
                                d="m14.25 0h-11.5c-1.52 0-2.75 1.23-2.75 2.75v15.5c0 1.52 1.23 2.75 2.75 2.75h6.59c-.54-1.14-.84-2.41-.84-3.75 0-1.15.22-2.25.63-3.26-.04.01-.08.01-.13.01h-5c-.55 0-1-.45-1-1s.45-1 1-1h5c.38 0 .72.22.88.54.65-1.01 1.49-1.87 2.48-2.54h-8.36c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1 0 .05 0 .09-.01.13.93-.38 1.95-.6 3.01-.62v-5.76c0-1.52-1.23-2.75-2.75-2.75zm-6.25 6h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1z"
                              />
                              <path
                                d="m17.25 10.5c-3.722 0-6.75 3.028-6.75 6.75s3.028 6.75 6.75 6.75 6.75-3.028 6.75-6.75-3.028-6.75-6.75-6.75zm2.75 7.75h-1.75v1.75c0 .552-.448 1-1 1s-1-.448-1-1v-1.75h-1.75c-.552 0-1-.448-1-1s.448-1 1-1h1.75v-1.75c0-.552.448-1 1-1s1 .448 1 1v1.75h1.75c.552 0 1 .448 1 1s-.448 1-1 1z"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                      <!-- @click="removeLikeModal(dt,{id:dt.lesson_unite},'Exam')" -->
                      <a
                        href="javascript:;"
                        class="like_button"
                        v-else
                        @click="
                          openLikeModal(dt, { id: dt.lesson_unite }, 'Exam')
                        "
                      >
                        <span class="text-red">
                          <svg
                            id="Layer_1"
                            enable-background="new 0 0 512 512"
                            fill="CurrentColor"
                            height="18"
                            viewBox="0 0 512 512"
                            width="18"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <path
                                fill="CurrentColor"
                                d="m274.371 408.109c0-8.444.795-16.705 2.298-24.719h-197.402c-8.284 0-15-6.716-15-15s6.716-15 15-15h206.812c5.807-12.908 13.601-24.736 22.992-35.091-1.529.526-3.163.824-4.87.824h-224.934c-19.801-.7-19.939-29.242 0-30h224.933c10.102-.193 17.633 10.415 14.176 19.871 17.952-16.282 40.331-27.762 65.091-32.406v-165.265c0-26.634-21.694-47.133-47.134-47.133h-42.012c-1.983 34.594-30.745 62.133-65.827 62.133h-73.521c-35.082 0-63.844-27.539-65.827-62.133h-42.012c-25.441 0-47.134 20.501-47.134 47.133v353.467c0 26.577 21.65 47.133 47.134 47.133h276.72c-30.172-24.556-49.483-61.97-49.483-103.814zm-195.104-247.519h224.934c8.284 0 15 6.716 15 15s-6.716 15-15 15h-224.934c-19.812-.705-19.93-29.245 0-30zm0 64.267h224.934c8.284 0 15 6.716 15 15s-6.716 15-15 15h-224.934c-19.812-.705-19.93-29.246 0-30zm80.333 222.8h-80.333c-19.854-.725-19.89-29.26 0-30h80.333c8.284 0 15 6.716 15 15s-6.716 15-15 15z"
                              />
                              <path
                                d="m154.973 96.323h73.521c49.35-2.211 46.734-73.109-2.679-71.893-11.043-32.481-57.133-32.461-68.163 0-49.214-1.306-52.202 69.559-2.679 71.893z"
                              />
                              <path
                                d="m408.185 304.294c-57.244 0-103.815 46.571-103.815 103.814 5.219 137.536 202.431 137.498 207.63-.001 0-57.242-46.571-103.813-103.815-103.813zm41.752 93.655s-41.524 41.524-41.524 41.524c-5.857 5.858-15.353 5.858-21.211.002 0 0-20.766-20.758-20.766-20.758-13.533-14.561 6.629-34.752 21.209-21.217 0 0 10.16 10.155 10.16 10.155l30.92-30.919c14.57-13.535 34.746 6.644 21.212 21.213z"
                              />
                            </g>
                          </svg>
                        </span>
                      </a>
                      <br />
                      <input
                        type="checkbox"
                        class="check-centered"
                        :checked="
                          selection.selectionE.includes(dt.id)
                            ? 'checked'
                            : false
                        "
                        @click="addSelection('selectionE', dt.id)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="search.module == 'Course'">
                <div
                  v-for="dt in data"
                  class="list_item"
                  :class="customClass.textDir + ' ' + customClass.dir"
                >
                  <div class="questition-container">
                    <div class="questition-container">
                      <div
                        class="content-side"
                        @click="
                          goPathBlank(
                            'course/' +
                              (dt.from_prev ? dt.from_prev.cou_link : '')
                          )
                        "
                      >
                        <h3>{{ dt.section_name }}</h3>
                        {{ dt.from_prev ? dt.from_prev.cou_name : "" }} /
                        {{
                          dt.from_lesson_unite
                            ? dt.from_lesson_unite.unit_name
                            : ""
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="col-12 text-center"
                :class="customClass.textDir + ' ' + customClass.dir"
              >
                <b-pagination
                  v-model="pagination.page"
                  :total-rows="pagination.total"
                  :per-page="pagination.limit"
                  aria-controls="my-table"
                ></b-pagination>
              </div>
            </div>
          </div>

          <div class="right_side">
            <banners area="Filter"></banners>
            <h4>{{l('Your Lists','g')}} 

                    <a v-show="selected_list" @click="$router.push({path:'',query:{}})">
                       X
                    </a>
                
            </h4>
            <ul class="my_lists">
                <li 
                        @click="$router.push({path:'',query:{list:list.id==selected_list?'':list.id}})"
                        :class="selected_list==list.id ? 'selected' : ''"
                        v-for="list in ulists">{{list.uye_list_name}}  </li>
                </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import general from "@/mixins/general";
import filter from "@/mixins/filter";
import axios from "axios";
import question from "@/components/utils/question.vue";
import banners from "@/components/common/banner.vue";
import moreInfoWord from "@/components/word/moreInfo.vue";

export default {
  mixins: [general, filter],
  components: {
    question,
    banners,
    moreInfoWord
  },
  async created() {
    let id = this.$route.params.id;
    this.search.module = id ? id : "Word";
    if (this.auth) {
      await this.$store.dispatch("core/getOptions", {
        slang: this.$store.state.locale,
        group: "uye_Lists",
        prev_id: this.auth.id,
        fields: "id,uye_list_name,uye_list_cat"
      });
    }
    await this.getResults();
  },
  watch: {
    data(val) {
      console.log("data changed", val);
    },
    "search.module"(val) {
      if (val) {
        this.$router.push({ path: "/en/filter/" + val });
        this.getResults();
      }
    },
    "pagination.page"(val) {
      this.getResults();
    }
  },
  computed: {
    auth() {
      return this.$store.state.user.auth;
    },
    selected_list() {
      return this.$route.query.list;
    },
    ulists() {
      return this.options["uye_Lists"].filter(
        k => k.uye_list_cat == this.search.module 
      );
    },
    search() {
      return this.$store.state.search.searchFilter;
    },
    selection() {
      return this.$store.state.search.selection;
    },
    op_co_level() {
      return this.options["co_level"].sort((a, b) =>
        a.cou_level_name > b.cou_level_name
          ? 1
          : b.cou_level_name > a.cou_level_name
          ? -1
          : 0
      );
    }
  },
  data() {
    return {
      networks: [
        // { network: 'baidu', name: 'Baidu', icon: 'fas fah fa-lg fa-paw', color: '#2529d8' },
        // { network: 'buffer', name: 'Buffer', icon: 'fab fah fa-lg fa-buffer', color: '#323b43' },
        //   {
        //     network: "email",
        //     name: "Email",
        //     icon: "far fah fa-lg fa-envelope",
        //     color: "#333333"
        //   },
        //   {
        //     network: "evernote",
        //     name: "Evernote",
        //     icon: "fab fah fa-lg fa-evernote",
        //     color: "#2dbe60"
        //   },
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2"
        },
        // { network: 'flipboard', name: 'Flipboard', icon: 'fab fah fa-lg fa-flipboard', color: '#e12828' },
        // { network: 'hackernews', name: 'HackerNews', icon: 'fab fah fa-lg fa-hacker-news', color: '#ff4000' },
        // { network: 'instapaper', name: 'Instapaper', icon: 'fas fah fa-lg fa-italic', color: '#428bca' },
        // { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fab fah fa-lg fa-linkedin",
          color: "#007bb5"
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc"
        },

        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2"
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366"
        }
      ],

      lists: [],
      //   search:{
      //       module:'Word',
      //       keyword:'',
      //       qtype:[],
      //       media:[],
      //       category:[],
      //       level:[],
      //       selectionC:[],
      //       selectionW:[],
      //   },
      viewType: {
        label: "Line",
        value: "line"
      },
      selectedItem: {
        show: false,
        type: "",
        data: {}
      },
      orderBy: 0,
      orderByList: [
        { label: this.l("Recent", "g"), value: "created_on" },
        { label: this.l("Popular", "g"), value: "created_on" },
        { label: this.l("Best Rated", "g"), value: "created_on" }
      ],
      viewTypes: [
        { label: this.l("Line", "g"), value: "line" },
        { label: this.l("Wide", "g"), value: "wide" }
      ],
      mediaTypes: [
        { name: this.l("Image", "g"), value: "image" },
        { name: this.l("Video", "g"), value: "video" },
        { name: this.l("Listenin Skills", "g"), value: "audio" },
        { name: this.l("Reading Skills", "g"), value: "trext" }
      ]
    };
  },
  methods: {
    closeDrawer() {
      this.selectedItem = {
        show: false,
        type: "",
        data: {}
      };
    },

    replaceWord(word, limit = 120) {
      // let a = word.replace(/<[^>]*>/g, '');
      // a=a.replace('</br>', '');
      // return a.substring(0, 100)
      // return htmlToText(word, {
      //     wordwrap: 130
      // });
      word = this.HtmlEncode(word);
      let name = word.split(">");
      let arr = [];
    //   console.log("name", name);
      name.forEach(element => {
        let splitted = element.split("<");
        arr.push(splitted[0].trim());
      });
    //   console.log("arr", arr);

      let text = arr.join(" ").substring(0, limit);
    //   console.log("text", text);

      if (text.length > 100) {
        return text
          .split(" ")
          .slice(0, -1)
          .join(" ");
      }
      return text;
    },
    openDrawer(type, data) {
      if (type == "word") {
        this.$store.state.wordModal.word = data.dict_word;
        this.$store.state.wordModal.show = true;
      } else {
        this.selectedItem = {
          show: true,
          type,
          data
        };
      }
    },
    addSearch(field, key) {
      this.loading = true;
      if (this.search[field].includes(key)) {
        this.search[field] = this.search[field].filter(k => k != key);
      } else {
        this.search[field].push(key);
      }
      // console.log("this.search",this.search,field,key)
      this.getResults();
    },
    addSelectionAll(field, type) {
      let all = this.data.filter(a => this.selection[field].includes(a.id));
      this.openLikeModalAll(all, { id: "multi" }, type);
      // this.selection.selectionE.forEach(k=>{
      //         if(this.selection[field].includes(key)){
      //              this.selection[field] = this.selection[field].filter(k=> k!=key)
      //         }else{
      //             this.selection[field].push(k)
      //         }
      // });
    },
    addSelection(field, key) {
      if (this.selection[field].includes(key)) {
        this.selection[field] = this.selection[field].filter(k => k != key);
      } else {
        this.selection[field].push(key);
      }
    },
    getResults() {
      if (this.search.module == "Course") {
        this.getSections();
      } else if (this.search.module == "Word") {
        this.getWords();
      } else if (this.search.module == "Exam") {
        this.getQuestition();
      }
      //   let filters = { prev_id: ["=", this.auth.id] };
      // uye_languages
    }
  }
};
</script>
<style lang="scss" scoped>
.view-filter {
  margin-bottom: 0px;
  margin-top: 10px;
  font-family: Cairo;
  text-align: right;
  flex: 190px auto;
  display: inline-flex;
  width: 100%;
  .degree-show {
    padding: 5px;
    border-radius: 10px;
    background: red;
    color: #fff;
    display: inline;
    position: absolute;
    left: 10px;
    top: 0px;
    width: auto;
    margin: 5px 0px;
  }
  .type-show {
    padding: 5px;
    color: rgb(38, 38, 38);
    display: inline;
    position: absolute;
    left: 00px;
    top: 30px;
    width: auto;
    margin: 5px 0px;
  }

  .right_side {
    background: none;
    width: 190px !important;
    min-width: 190px !important;
    height: calc(100vh - 100px);
    overflow: auto;
    overflow-x: visible;
  }
  .side-bar {
    background: #fff;
    width: 190px;
    height: calc(100vh - 100px);
    min-width: 190px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 1px -1px 0px 0px rgba(186, 186, 186, 0.19);
    -webkit-box-shadow: 1px -1px 0px 0px rgba(186, 186, 186, 0.19);
    -moz-box-shadow: 1px -1px 0px 0px rgba(186, 186, 186, 0.19);
    overflow: auto;
    .serach-item {
    }
    .search-title {
      font-weight: 600;
      border-bottom: 1px solid rgb(240, 240, 240);
      padding-bottom: 5px;
      margin-bottom: 5px;
      margin-top: 7px;
      font-family: Cairo;
    }
    .search-checkbox {
      width: 100%;
      display: block;
      max-height: 109px;
      overflow: auto;
    }
    .search-box:lang(ar) {
      width: 100%;
      display: inline-flex;
      label {
        margin-left: 0px;
        margin-right: 5px;
      }
    }
    .search-box {
      width: 100%;
      display: inline-flex;
      label {
        display: inline-block;
        margin-bottom: 0.2rem;
        width: 145px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-left: 5px;
        margin-top: -2px;
      }
      &.inline {
        display: inline-flex;
        width: 50%;
        label {
          display: inline-block;
          margin-bottom: 0.2rem;
          display: inline-block;
          width: 55px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-top: 0px;
        }
      }
    }
  }
  .content {
    width: 100%;
    font-family: Cairo; 
    height: calc(100vh - 100px);
    padding: 0px 10px;
    .filter_header {
      height:  33px;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 10px;
      padding: 0px 10px;

    }
    .tootal_results{
        margin-right: 5px;
        padding-right: 5px;
        border-right: 1px solid #efefef;
        display: inline;
    }
    .content-table {
      height: calc(100vh - 195px);
      overflow: auto;
      margin-bottom: 10px;
      padding-right: 20px;
    }
    .list_item {
      margin-bottom: 10px;
      padding: 5px;
      border: 0.1em solid #efefef;
      border-radius: 5px;
      background: #fff;
      width: 100%;
      text-align: right;
      direction: rtl;
      box-shadow: 0px -1px 0px 0px rgba(186, 186, 186, 0.19);
      -webkit-box-shadow: 0px -1px 0px 0px rgba(186, 186, 186, 0.19);
      -moz-box-shadow: 0px -1px 0px 0px rgba(186, 186, 186, 0.19);
      transition: 0.5s all;
      &:hover {
        border: 0.1em solid #75aaf0;
        transition: 0.5s all;
      }
    }
  }
  .input-icon {
    position: absolute;
    left: 7px;
    top: 7px;
  }
  .input-std-search {
    position: relative;
    input {
      padding: 5px 5px 5px 26px;
      border-radius: 4px;
      border: 0.1em solid #f9f9f9;
      width: 100%;
    }
  }

  .questition-container {
    padding: 10px;
    display: inline-flex;
    flex: auto 60px;
    width: 100%;
    text-align: right;
  }
  .word-container {
    padding: 10px;
    display: inline-flex;
    flex: auto 80px;
    text-align: right;
    width: 100%;
    &:hover {
      .detail-button-abs {
        height: 22px;

        .share-network-list-2 {
          display: inline-flex !important;
        }
      }
    }
    .detail-button-abs {
      height: 18px; 
      display: inline-flex;
      .showed-selected {
         .fah {
          transform: rotate(180deg);
          transition: 0.5s all;
        }
      }
      .share-network-list-2 {
        display: none;
        width: 100%;
        font-size: 10px;
        a[class^="share-network-"] {
          flex: none;
          color: #ffffff !important;
          background-color: #333;
          border-radius: 3px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-content: center;
          align-items: center;
          cursor: pointer;
          margin: 0 5px 0px 0;
          text-decoration: none;
        }
        a[class^="share-network-"]:hover {
          color: #ffffff;
        }
        a:hover[class^="share-network-"] {
          color: #ffffff;
        }
        a[class^="share-network-"] .fah {
          background-color: rgba(0, 0, 0, 0.2);
          transition: 0.5s all;
          padding: 5px;
          flex: 0 1 auto;
        }
      }
    }
    .word-content {
      display: inline-flex;
      width: 100%;
      place-content: flex-end;
      img {
        margin-left: 20px;
      }
    }
    .h3 {
      font-weight: 600;
      font-size: 18px;
      font-family: Cairo;
      margin: 3px 0;
      cursor: pointer;
      display: inline-flex;
      width: 100%;
      overflow: hidden;
      direction: rtl;
      span {
        clear: both;
        font-size: 12px;
        line-height: 20px;
        margin-left: 10px;
        padding: 5px 10px;
        font-weight: 400;
        display: inline-block;
        overflow: hidden;
        // white-space: nowrap;
      }
    }
  }

  .content-side {
    cursor: pointer;
    width: inherit;
    position: relative;
    padding: 0px 10px;
  }
  .button-side {
    border-left: 1px solid #efefef;
    min-width: 30px;
    padding-left: 10px;
  }
  .button-side:lang(ar) {
    border-right: 1px solid #efefef;
    border-left: 0;
    min-width: 30px;
    padding-left: 0px;
    padding-right: 10px;
  }
}

.drawer {
  width: 100%;
  z-index: 1000;
  display: none;
  position: fixed;
  background: rgba(68, 68, 68, 0.508);
  height: 100vh;
  left: 0;
  top: 0;
  &.visible {
    display: block;

    .content {
      right: 0;
      top: 0;
      transition: 2s all;
    }
  }
  .content {
    width: 500px;
    height: 100vh;
    padding: 15px;
    position: fixed;
    right: -600px;
    max-width: 80%;
    background: #fff;
    transition: 2s all;
  }
}
</style>
<style>
.text-black:hover {
  color: #3283e0;
}
.text-black {
  color: #a0a0a0;
  width: 25px;
}
.text-red {
  color: #357fee;
  width: 25px;
}
.text-red:hover {
  color: #214fe4;
}
body {
  overflow: auto;
}
.check-centered {
  display: block;
  margin-left: 4px;
  margin-top: 10px;
}
.liked-item {
  border: 1px solid #e71146;
}
.pagination {
  text-align: center;
  margin: 0 auto;
  display: inline-flex;
}
a.addListLink {
  color: #e71146 !important;
  cursor: pointer;
  text-decoration: underline !important;
}
ul.my_lists{
    max-height: 200px;
    overflow: auto;
    padding-left: 8px;
    direction: rtl;
       background: #fff;
   padding: 10px;
   border-radius: 4px;
}
ul.my_lists li {
    border-bottom: 1px solid #f5f5f5;
    padding: 2px 0px;
    border-radius: 3px;
    margin-bottom: 3px;
    cursor:pointer; 
}
ul.my_lists li.selected {
    color: #b3c3f7;
    font-weight:600;
    border-radius: 3px;
    margin-bottom: 3px;
    cursor:pointer; 
}
</style>
