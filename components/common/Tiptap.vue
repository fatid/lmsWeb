<template>
  <div
    style="
      border: 1px solid #dddbda;
      height: calc(100vh - 150px);
      padding: 0px;
      border-radius: 10px;
    "
  >
    <div v-if="editor">
      <bubble-menu
        class="bubble-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
        v-if="editor"
      >
        <select v-model="data.fontFamily">
          <option value="Inter">
            <a
              @click="editor.chain().focus().setFontFamily('Inter').run()"
              :class="{
                'is-active': editor.isActive('textStyle', {
                  fontFamily: 'Inter',
                }),
              }"
              value="Inter"
            >
              Inter</a
            >
          </option>
          <option value="Comic Sans MS, Comic Sans">
            <a
              @click="
                editor
                  .chain()
                  .focus()
                  .setFontFamily('Comic Sans MS, Comic Sans')
                  .run()
              "
              :class="{
                'is-active': editor.isActive('textStyle', {
                  fontFamily: 'Comic Sans MS, Comic Sans',
                }),
              }"
              value="Comic Sans"
            >
              Comic Sans</a
            >
          </option>
          <option value="serif">
            <a
              @click="editor.chain().focus().setFontFamily('serif').run()"
              :class="{
                'is-active': editor.isActive('textStyle', {
                  fontFamily: 'serif',
                }),
              }"
              value="serif"
              >serif
            </a>
          </option>
          <option value="cursive">
            <a
              @click="editor.chain().focus().setFontFamily('monospace').run()"
              :class="{
                'is-active': editor.isActive('textStyle', {
                  fontFamily: 'monospace',
                }),
              }"
              value="monospace"
              >monospace
            </a>
          </option>
          <option value="cursive">
            <a
              @click="editor.chain().focus().setFontFamily('cursive').run()"
              :class="{
                'is-active': editor.isActive('textStyle', {
                  fontFamily: 'cursive',
                }),
              }"
              value="cursive"
            >
              cursive</a
            >
          </option>
          <option value="remove">
            <a
              @click="editor.chain().focus().unsetFontFamily().run()"
              value="remove"
            >
              Remove font-family</a
            >
          </option>
        </select>

        <select v-model="data.fontSize">
          <option v-for="size in fontSizes" :value="size.value"
            :selected="editor.isActive('textStyle', {  fontSize: size.value  })"
          >  {{ size.label }}
          </option>
        </select>
 <a
         
          @click="editor.chain().focus().unsetAllMarks().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <svg-icon icon="kv-icon-trash"></svg-icon>
        </a>


        <a
          class="first group"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bold"
            class="svg-inline--fa fa-bold fa-w-12"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M333.49 238a122 122 0 0 0 27-65.21C367.87 96.49 308 32 233.42 32H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h31.87v288H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h209.32c70.8 0 134.14-51.75 141-122.4 4.74-48.45-16.39-92.06-50.83-119.6zM145.66 112h87.76a48 48 0 0 1 0 96h-87.76zm87.76 288h-87.76V288h87.76a56 56 0 0 1 0 112z"
            ></path>
          </svg>
        </a>
       
        <a
          class="group"
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.72308 6.06923C3.66154 5.76154 3.63077 5.39231 3.63077 5.02308C3.63077 4.62308 3.72308 4.16154 3.90769 3.73077C4.09231 3.26923 4.36923 2.83846 4.76923 2.46923C5.13846 2.1 5.66154 1.76154 6.24616 1.51539C6.86154 1.26923 7.56923 1.11539 8.43077 1.11539C9.2 1.11539 9.93846 1.20769 10.6462 1.42308C11.2 1.60769 11.7231 1.91539 12.1846 2.34616C12.3692 2.53077 12.3692 2.83846 12.1538 3.02308L11.3231 3.79231C11.1385 3.94616 10.8615 3.97693 10.6769 3.79231C10.4615 3.57693 10.2154 3.39231 9.93846 3.23846C9.50769 3.02308 9.01539 2.9 8.43077 2.9C7.90769 2.9 7.44616 2.96154 7.10769 3.11539C6.76923 3.26923 6.46154 3.42308 6.24616 3.66923C6.03077 3.91539 5.87693 4.13077 5.78462 4.37693C5.69231 4.62308 5.66154 4.86923 5.66154 5.05385C5.66154 5.39231 5.72308 5.66923 5.81539 5.91539C5.90769 6.13077 5.75385 6.34616 5.53846 6.34616H4.03077C3.87693 6.34616 3.75385 6.19231 3.72308 6.06923V6.06923ZM12.2769 10.6538H10.7385C10.5231 10.6538 10.3692 10.8692 10.4615 11.0538C10.5538 11.2385 10.5846 11.4846 10.5846 11.7308C10.5846 12.1 10.4923 12.4385 10.3385 12.7462C10.1538 13.0538 9.93846 13.2692 9.66154 13.4846C9.38462 13.6692 9.07692 13.8231 8.73846 13.9154C8.4 14.0077 8.09231 14.0692 7.75385 14.0692C7.16923 14.0692 6.61539 13.9462 6.09231 13.7C5.69231 13.5154 5.35385 13.2692 5.04616 12.9308C4.89231 12.7462 4.58462 12.7154 4.4 12.8692L3.53846 13.6077C3.35385 13.7615 3.32308 14.0692 3.50769 14.2538C3.93846 14.7462 4.49231 15.1154 5.13846 15.3615C5.93846 15.6692 6.8 15.8231 7.72308 15.8231C8.4 15.8231 9.04616 15.7308 9.63077 15.5154C10.2154 15.3308 10.7385 15.0231 11.2 14.6538C11.6308 14.2846 12 13.8231 12.2462 13.2692C12.4923 12.7154 12.6462 12.1308 12.6462 11.4538C12.6462 11.2077 12.6462 11.0538 12.6154 10.8385C12.5538 10.7769 12.4308 10.6538 12.2769 10.6538V10.6538ZM15.3538 7.85385C15.2923 7.66923 15.1077 7.57693 14.9231 7.57693H1.07693C0.861541 7.57693 0.707695 7.66923 0.646156 7.85385C0.615387 7.91539 0.615387 7.94616 0.615387 8.00769V8.93077C0.615387 9.17693 0.830772 9.42308 1.07693 9.42308H14.9231C15.1692 9.42308 15.3846 9.17693 15.3846 8.93077V8.00769C15.3846 7.94616 15.3846 7.91539 15.3538 7.85385Z"
              fill="CurrentColor"
            />
          </svg>
        </a>
        <a
          class="group"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="italic"
            class="svg-inline--fa fa-italic fa-w-10"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M320 48v32a16 16 0 0 1-16 16h-62.76l-80 320H208a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h62.76l80-320H112a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z"
            ></path>
          </svg>
        </a>
        <a
          class="last group"
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.6923 12.8077H2.30769C2.06154 12.8077 1.84615 13.0231 1.84615 13.2692V14.1923C1.84615 14.4385 2.06154 14.6538 2.30769 14.6538H13.6923C13.9385 14.6538 14.1538 14.4385 14.1538 14.1923V13.2692C14.1538 13.0231 13.9385 12.8077 13.6923 12.8077ZM7.78462 11.5769C5.47692 11.4538 3.69231 9.45385 3.69231 7.14616V2.96154C3.69231 2.62308 3.96923 2.34616 4.30769 2.34616H4.92308C5.26154 2.34616 5.53846 2.62308 5.53846 2.96154V7.17693C5.53846 8.5 6.52308 9.63846 7.84615 9.73077C9.29231 9.82308 10.4615 8.68462 10.4615 7.26923V2.96154C10.4615 2.62308 10.7385 2.34616 11.0769 2.34616H11.6923C12.0308 2.34616 12.3077 2.62308 12.3077 2.96154V7.26923C12.3077 9.73077 10.2462 11.7 7.78462 11.5769Z"
              fill="CurrentColor"
            />
          </svg>
        </a>

        <a
          class="first group"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <svg-icon icon="kv-icon-tt-richtextbulletedlist"></svg-icon>
        </a>
        <a
          class="group"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <svg-icon icon="kv-icon-tt-richtextnumberedlist"></svg-icon>
        </a>
        <a
          class="group"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <svg-icon icon="kv-icon-tt-richtextindent"></svg-icon>
        </a>
        <a
          class="last group"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <svg-icon icon="kv-icon-tt-richtextoutdent"></svg-icon>
        </a>

        <a
          class="first group"
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <svg-icon icon="kv-icon-tt-left_align_text"></svg-icon>
        </a>
        <a
          class="group"
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <svg-icon icon="kv-icon-tt-center_align_text"></svg-icon>
        </a>
        <a
          class="last group"
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <svg-icon icon="kv-icon-tt-right_align_text"></svg-icon>
        </a>

        <b-popover target="popover-3" triggers="hover focus">
          <compact-picker
            @input="color.highlight = $event"
            :value="color.highlight"
            :palette="palette"
          ></compact-picker>
        </b-popover>
          <a class="first group single" id="popover-3" variant="primary">
            <svg-icon icon="fa-marker" class="fas"></svg-icon
          ></a>

         <b-popover target="popover-4" triggers="click focus">
          <compact-picker
            @input="color.text = $event"
            :value="color.text"
            :palette="palette"
          ></compact-picker>
        </b-popover>
          <a class="last group single" id="popover-4" variant="primary"
            ><svg-icon icon="fa-palette" class="fas"></svg-icon
          ></a>
      </bubble-menu>
      <floating-menu
        class="floating-menu"
        :tippy-options="{ duration: 100 }"
        v-if="editor"
        :editor="editor"
      >
        <a
          @click.stop="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </a>
        <a
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </a>
        <a
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          H3
        </a>
        <a
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4}) }"
        >
          H4
        </a>
        <a
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          Bullet List
        </a>
          <a
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          Order List
        </a>
          <a
           @click="editor.chain().focus().toggleBlockquote().run()" 
        >
          Blockquote
        </a>
      </floating-menu>
      <div class="header-buttons">
        <!-- <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
    
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button> -->
        <a
          class="single-button"
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="16" height="16" fill="white" fill-opacity="0.01" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.33333 4.66666H8.66666V12H7.33333V4.66666ZM3.99999 3.33333H12V4.66666H3.99999V3.33333Z"
              fill="CurrentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.33333 3.33333H4.66666V5.33333H3.33333V3.33333ZM6.66666 12H9.33333V13.3333H6.66666V12ZM11.3333 3.33333H12.6667V5.33333H11.3333V3.33333Z"
              fill="CurrentColor"
            />
          </svg>
        </a>
        <a
          class="single-button"
          @click="addOpen()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6693 11.3333C12.6667 11.3333 12.6667 4.67066 12.6667 4.67066C12.6667 4.66666 3.33067 4.66666 3.33067 4.66666C3.33334 4.66666 3.33334 11.3293 3.33334 11.3293C3.33334 11.3333 12.6693 11.3333 12.6693 11.3333ZM2.00001 4.67066C1.99948 4.49551 2.03347 4.32197 2.10003 4.15996C2.16659 3.99795 2.26443 3.85064 2.38794 3.72644C2.51145 3.60225 2.65822 3.50361 2.81986 3.43616C2.9815 3.36871 3.15485 3.33377 3.33001 3.33333H12.67C12.8452 3.33377 13.0185 3.36871 13.1802 3.43616C13.3418 3.50361 13.4886 3.60225 13.6121 3.72644C13.7356 3.85064 13.8334 3.99795 13.9 4.15996C13.9665 4.32197 14.0005 4.49551 14 4.67066V11.3293C14.0005 11.5045 13.9665 11.678 13.9 11.84C13.8334 12.002 13.7356 12.1494 13.6121 12.2735C13.4886 12.3977 13.3418 12.4964 13.1802 12.5638C13.0185 12.6313 12.8452 12.6662 12.67 12.6667H3.33001C3.15485 12.6662 2.9815 12.6313 2.81986 12.5638C2.65822 12.4964 2.51145 12.3977 2.38794 12.2735C2.26443 12.1494 2.16659 12.002 2.10003 11.84C2.03347 11.678 1.99948 11.5045 2.00001 11.3293V4.67066Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.66667 3.99999H13.3333V7.33333H2.66667V3.99999ZM6.00001 5.33333C6.00001 5.70399 6.29734 5.99999 6.66334 5.99999H12.0033C12.3633 5.99999 12.6667 5.70133 12.6667 5.33333C12.6667 4.96266 12.3693 4.66666 12.0033 4.66666H6.66334C6.30334 4.66666 6.00001 4.96533 6.00001 5.33333ZM3.33334 5.33333C3.33334 5.70399 3.63201 5.99999 4.00001 5.99999C4.37067 5.99999 4.66667 5.70133 4.66667 5.33333C4.66667 4.96266 4.36801 4.66666 4.00001 4.66666C3.62934 4.66666 3.33334 4.96533 3.33334 5.33333Z"
              fill="CurrentColor"
            />
          </svg> 
        </a>
        <a
          class="single-button"
          @click="editor.chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66667 13.3333L9.33334 2.66667M12 5.33334L14.6667 8L12 10.6667M4 10.6667L1.33334 8L4 5.33334"
              stroke="CurrentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a> 
        

        <el-dropdown :hide-on-click="false" >
          <span class="el-dropdown-link single-button">
             <svg-icon icon="kv-icon-tt-info"></svg-icon>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span> 
          <el-dropdown-menu slot="dropdown" > 
            <el-dropdown-item v-for="size in infoBoxes" :key="size.value" :value="size.value"
              ><a @click="data.info=size.value">
                 {{ size.label }}
              </a></el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>


        <a class="single-button" @click="openImageBox()">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="16" height="16" fill="white" fill-opacity="0.01" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 3.33C2 2.59533 2.59533 2 3.33 2H12.67C13.4047 2 14 2.59533 14 3.33V12.67C14 13.0227 13.8599 13.361 13.6105 13.6105C13.361 13.8599 13.0227 14 12.67 14H3.33C2.97726 14 2.63897 13.8599 2.38955 13.6105C2.14012 13.361 2 13.0227 2 12.67V3.33ZM7 11L6 10L4 12H12V10.2L10 8L7 11ZM5.33333 6.66667C5.68696 6.66667 6.02609 6.52619 6.27614 6.27614C6.52619 6.02609 6.66667 5.68696 6.66667 5.33333C6.66667 4.97971 6.52619 4.64057 6.27614 4.39052C6.02609 4.14048 5.68696 4 5.33333 4C4.97971 4 4.64057 4.14048 4.39052 4.39052C4.14048 4.64057 4 4.97971 4 5.33333C4 5.68696 4.14048 6.02609 4.39052 6.27614C4.64057 6.52619 4.97971 6.66667 5.33333 6.66667V6.66667Z"
              fill="CurrentColor"
            />
          </svg>
        </a>



   <el-popover placement="right" width="250" trigger="hover">
                <div class="table-chooser">
                  <div
                    v-for="col in tableColumns"
                    @click="
                      editor
                        .chain()
                        .focus()
                        .insertTable({
                          rows: col.row,
                          cols: col.col,
                          withHeaderRow: true,
                        })
                        .run()
                    "
                  >
                    {{ col.label }}
                  </div>
                </div>
                <a slot="reference" class="single-button"  v-show="!editor.can().deleteTable()">
                    <svg-icon icon="kv-icon-tt-table"></svg-icon>
                </a>
              </el-popover>
        <el-dropdown :hide-on-click="false" v-if="editor.can().deleteTable()">
          <span class="el-dropdown-link single-button">
            <svg-icon icon="kv-icon-tt-table"></svg-icon>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>

       
          <el-dropdown-menu slot="dropdown" >
          
            <el-dropdown-item v-if="editor.can().addColumnBefore()"
              ><a @click="editor.chain().focus().addColumnBefore().run()">
                Add Column Before
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().addColumnAfter()"
              ><a @click="editor.chain().focus().addColumnAfter().run()">
                Add Column After
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().deleteColumn()"
              ><a @click="editor.chain().focus().deleteColumn().run()">
                Delete Column
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().addRowBefore()"
              ><a @click="editor.chain().focus().addRowBefore().run()">
                Addd Row Before
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().addRowAfter()"
              ><a @click="editor.chain().focus().addRowAfter().run()">
                Add Row After
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().deleteRow()"
              ><a @click="editor.chain().focus().deleteRow().run()">
                Delete Row
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().deleteTable()"
              ><a @click="editor.chain().focus().deleteTable().run()">
                Delete Table
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().mergeCells()">
              <a @click="editor.chain().focus().mergeCells().run()">
                Merge Cells
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().splitCell()"
              ><a @click="editor.chain().focus().splitCell().run()">
                Split Cell
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().toggleHeaderColumn()"
              ><a @click="editor.chain().focus().toggleHeaderColumn().run()">
                Toggle Header Column
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().toggleHeaderRow()"
              ><a @click="editor.chain().focus().toggleHeaderRow().run()">
                Toggle Header Row
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().toggleHeaderCell()"
              ><a @click="editor.chain().focus().toggleHeaderCell().run()">
                Toggle Header Cell
              </a></el-dropdown-item
            >
            <el-dropdown-item v-if="editor.can().mergeOrSplit()"
              ><a @click="editor.chain().focus().mergeOrSplit().run()">
                Merge or Split
              </a></el-dropdown-item
            >
            <el-dropdown-item
              v-if="editor.can().setCellAttribute('backgroundColor', '#FAF594')"
              ><a
                @click="
                  editor
                    .chain()
                    .focus()
                    .setCellAttribute('backgroundColor', '#FAF594')
                    .run()
                "
              >
                Set Cell Atributes
              </a></el-dropdown-item
            >
            <!-- <el-dropdown-item v-if="editor.can().fixTables()"><a  @click="editor.chain().focus().fixTables().run()"  >
      Fix Tables
    </a></el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>

        <a
          class="single-button"
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="16" height="16" fill="white" fill-opacity="0.01" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 1.994C0 0.893 0.895 0 1.994 0H14.006C15.107 0 16 0.895 16 1.994V14.006C15.9997 14.5348 15.7896 15.0418 15.4157 15.4157C15.0418 15.7896 14.5348 15.9997 14.006 16H1.994C1.46524 15.9997 0.958212 15.7896 0.584322 15.4157C0.210432 15.0418 0.000264976 14.5348 0 14.006L0 1.994ZM6.639 10.411L4.253 8.1L6.842 5.59C7.0181 5.4192 7.11914 5.18544 7.1229 4.94014C7.12665 4.69484 7.0328 4.4581 6.862 4.282C6.6912 4.1059 6.45744 4.00486 6.21214 4.0011C5.96684 3.99735 5.7301 4.0912 5.554 4.262L2.281 7.435C2.19209 7.52123 2.12141 7.62443 2.07314 7.73849C2.02487 7.85255 1.99999 7.97515 1.99999 8.099C1.99999 8.22285 2.02487 8.34545 2.07314 8.45951C2.12141 8.57357 2.19209 8.67677 2.281 8.763L5.351 11.739C5.4382 11.8236 5.5412 11.8901 5.65412 11.9349C5.76705 11.9797 5.88768 12.0018 6.00914 11.9999C6.1306 11.998 6.25051 11.9723 6.36201 11.9241C6.47351 11.8759 6.57443 11.8062 6.659 11.719C6.74357 11.6318 6.81014 11.5288 6.8549 11.4159C6.89967 11.303 6.92175 11.1823 6.9199 11.0609C6.91804 10.9394 6.89228 10.8195 6.84408 10.708C6.79588 10.5965 6.7262 10.4956 6.639 10.411ZM13.842 7.238L10.77 4.26C10.6827 4.17556 10.5796 4.10915 10.4666 4.06455C10.3536 4.01996 10.2329 3.99806 10.1114 4.0001C9.86615 4.00423 9.63253 4.10563 9.462 4.282C9.29147 4.45837 9.19798 4.69526 9.2021 4.94056C9.20623 5.18585 9.30763 5.41947 9.484 5.59L11.869 7.903L9.281 10.413C9.10503 10.5837 9.00406 10.8172 9.00031 11.0624C8.99656 11.3075 9.09033 11.544 9.261 11.72C9.43167 11.896 9.66525 11.9969 9.91036 12.0007C10.1555 12.0044 10.392 11.9107 10.568 11.74L13.842 8.567C13.9309 8.48077 14.0016 8.37757 14.0499 8.26351C14.0981 8.14945 14.123 8.02685 14.123 7.903C14.123 7.77915 14.0981 7.65655 14.0499 7.54249C14.0016 7.42843 13.9309 7.32523 13.842 7.239V7.238Z"
              fill="CurrentColor"
            />
          </svg>
        </a>
        <a
          class="single-button"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.7007 4C9.65334 4 8.80267 4.87467 8.80267 5.95333C8.80267 7.03133 9.65334 7.90667 10.7007 7.90667C12.5 7.90667 11.4573 11.2987 9.188 11.652C9.08093 11.6682 8.98321 11.7223 8.91253 11.8043C8.84185 11.8864 8.80288 11.991 8.80267 12.0993C8.80267 12.3767 9.05067 12.596 9.32534 12.554C13.45 11.9287 14.9167 4.00067 10.7007 4.00067V4ZM5.232 4C4.18334 4 3.33334 4.874 3.33334 5.95333C3.33334 7.03067 4.18334 7.90533 5.232 7.90533C7.03067 7.90533 5.988 11.2987 3.71867 11.652C3.61171 11.6682 3.51408 11.7222 3.44341 11.8041C3.37275 11.886 3.3337 11.9905 3.33334 12.0987C3.33334 12.376 3.58134 12.5953 3.85534 12.5533C7.98134 11.928 9.448 4 5.232 4Z"
              fill="CurrentColor"
            />
          </svg>
        </a>
       
        <a
          class="single-button"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.90666 11.936L11.936 2.90666C12.0112 2.82721 12.1016 2.76364 12.2018 2.7197C12.3019 2.67576 12.4099 2.65235 12.5193 2.65085C12.6287 2.64935 12.7373 2.66979 12.8386 2.71096C12.94 2.75213 13.0321 2.8132 13.1094 2.89055C13.1868 2.96791 13.2479 3.05999 13.289 3.16135C13.3302 3.2627 13.3506 3.37129 13.3491 3.48067C13.3476 3.59006 13.3242 3.69804 13.2803 3.79823C13.2364 3.89842 13.1728 3.98879 13.0933 4.06399L4.06399 13.0933C3.98879 13.1728 3.89842 13.2364 3.79823 13.2803C3.69804 13.3242 3.59006 13.3476 3.48067 13.3491C3.37129 13.3506 3.2627 13.3302 3.16135 13.289C3.05999 13.2479 2.96791 13.1868 2.89055 13.1094C2.8132 13.0321 2.75213 12.94 2.71096 12.8386C2.66979 12.7373 2.64935 12.6287 2.65085 12.5193C2.65235 12.4099 2.67576 12.3019 2.7197 12.2018C2.76364 12.1016 2.82721 12.0112 2.90666 11.936V11.936Z"
              fill="CurrentColor"
            />
          </svg>
        </a>

        <el-popover placement="right" width="275" trigger="click">
          <compact-picker
            @input="color.highlight = $event"
            :value="color.highlight"
            :palette="palette"
          ></compact-picker>
          <a class="single-button" slot="reference"
            ><i class="fas fa-marker"></i
          ></a>
        </el-popover>
        <el-popover placement="right" width="275" trigger="click">
          <compact-picker
            @input="color.text = $event"
            :value="color.text"
            :palette="palette"
          ></compact-picker>
          <a class="single-button" slot="reference"
            ><i class="fas fa-palette"></i
          ></a>
        </el-popover>

        <a class="single-button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="editor.commands.deleteSelection()"
          >
            <path
              d="M5.93714 12.62H5.51428C5.45821 12.62 5.40443 12.5979 5.36478 12.5585C5.32513 12.5191 5.30285 12.4657 5.30285 12.41V5.27C5.30285 5.2143 5.32513 5.16089 5.36478 5.12151C5.40443 5.08212 5.45821 5.06 5.51428 5.06H5.93714C5.99321 5.06 6.04699 5.08212 6.08664 5.12151C6.12629 5.16089 6.14857 5.2143 6.14857 5.27V12.41C6.14857 12.4657 6.12629 12.5191 6.08664 12.5585C6.04699 12.5979 5.99321 12.62 5.93714 12.62ZM10.1657 12.62H9.74285C9.68678 12.62 9.633 12.5979 9.59335 12.5585C9.5537 12.5191 9.53142 12.4657 9.53142 12.41V5.27C9.53142 5.2143 9.5537 5.16089 9.59335 5.12151C9.633 5.08212 9.68678 5.06 9.74285 5.06H10.1657C10.2218 5.06 10.2756 5.08212 10.3152 5.12151C10.3549 5.16089 10.3771 5.2143 10.3771 5.27V12.41C10.3771 12.4657 10.3549 12.5191 10.3152 12.5585C10.2756 12.5979 10.2218 12.62 10.1657 12.62ZM2.13142 2.96H4.87999L5.76799 1.784C5.88616 1.62751 6.03938 1.5005 6.21553 1.41302C6.39168 1.32554 6.58591 1.28 6.78285 1.28L8.89714 1.28C9.09408 1.28 9.28831 1.32554 9.46446 1.41302C9.64061 1.5005 9.79383 1.62751 9.91199 1.784L10.8 2.96H13.5486C13.6046 2.96 13.6584 2.98212 13.6981 3.02151C13.7377 3.06089 13.76 3.1143 13.76 3.17V3.59C13.76 3.64569 13.7377 3.69911 13.6981 3.73849C13.6584 3.77787 13.6046 3.8 13.5486 3.8H12.9143V13.46C12.9143 13.7942 12.7806 14.1147 12.5427 14.351C12.3048 14.5872 11.9822 14.72 11.6457 14.72H4.03428C3.69783 14.72 3.37517 14.5872 3.13726 14.351C2.89936 14.1147 2.76571 13.7942 2.76571 13.46V3.8H2.13142C2.07535 3.8 2.02157 3.77787 1.98192 3.73849C1.94227 3.69911 1.91999 3.64569 1.91999 3.59V3.17C1.91999 3.1143 1.94227 3.06089 1.98192 3.02151C2.02157 2.98212 2.07535 2.96 2.13142 2.96ZM9.23542 2.288C9.19589 2.23599 9.14479 2.19376 9.08611 2.16461C9.02742 2.13547 8.96275 2.1202 8.89714 2.12H6.78285C6.71724 2.1202 6.65257 2.13547 6.59388 2.16461C6.5352 2.19376 6.4841 2.23599 6.44457 2.288L5.93714 2.96H9.74285L9.23542 2.288ZM3.61142 13.46C3.61142 13.5714 3.65597 13.6782 3.73527 13.757C3.81458 13.8357 3.92213 13.88 4.03428 13.88H11.6457C11.7579 13.88 11.8654 13.8357 11.9447 13.757C12.024 13.6782 12.0686 13.5714 12.0686 13.46V3.8H3.61142V13.46ZM8.05142 12.62H7.62857C7.57249 12.62 7.51871 12.5979 7.47906 12.5585C7.43941 12.5191 7.41714 12.4657 7.41714 12.41V5.27C7.41714 5.2143 7.43941 5.16089 7.47906 5.12151C7.51871 5.08212 7.57249 5.06 7.62857 5.06H8.05142C8.1075 5.06 8.16128 5.08212 8.20093 5.12151C8.24058 5.16089 8.26285 5.2143 8.26285 5.27V12.41C8.26285 12.4657 8.24058 12.5191 8.20093 12.5585C8.16128 12.5979 8.1075 12.62 8.05142 12.62Z"
              fill="#465669"
            />
          </svg>
        </a>
      </div>
    </div>
    <editor-content :editor="editor" :contentEditable="false"/>
    <image-upload
      v-if="imageDilaog"
      @close="imageDilaog=false;"
      @setImage="imageDilaog=false; editor.chain().focus().setImage({ src:  $event }).run();"
    ></image-upload>
  </div>
</template>

<script>
import {
  Editor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  VueNodeViewRenderer,
} from "@tiptap/vue-2";
import { Node } from '@tiptap/core'

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import FontColor from "@/fd-tiptap/extension/extension-font-color2";
import infoBox from "@/fd-tiptap/extension/extension-box";
import exBox from "@/fd-tiptap/extension/extension-infobox";
import FontSize from "@/fd-tiptap/extension/extension-font-size";
import CustomImage from '@/fd-tiptap/extension/kv-image';
// import kvImage from "@/fd-tiptap/extension/extension-image/src";
import FontFamily from "@tiptap/extension-font-family";
 import Document from '@tiptap/extension-document'
import BulletList from "@tiptap/extension-bullet-list";
import SvgIcon from "@/components/common/svgIcon.vue";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import imageUpload from "@/components/common/imageUpload"; 
 
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Compact } from "vue-color";
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
//   import { allowedMimeTypes } from '@/constants/allowedMimeTypes'

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => {
          return {
            backgroundColor: element.getAttribute("data-background-color"),
          };
        },
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

export default {
  components: {
    EditorContent,
    FloatingMenu,
    BubbleMenu,
    SvgIcon,
    compactPicker: Compact,
    imageUpload,
    infoBox,
    exBox,
    CustomImage
  },

  props: {
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      editor: null,
      loaded: false,
      imageDilaog:false,
      imageUrl:'',
      data: {
        fontFamily: "serif",
        fontSize: "12px",
        info: "",
      },
      color: {
        text: "",
        highlight: "",
        background: "",
      }, 
      palette:[
              '#E3ABEC',
              '#C2DBF7',
              '#9FD6FF',
              '#9DE7DA',
              '#9DF0C0',
              '#FFF099',
              '#FED49A',
              '#D073E0',
              '#86BAF3',
              '#5EBBFF',
              '#44D8BE',
              '#3BE282',
              '#FFE654',
              '#FFB758',
              '#BD35BD',
              '#5779C1',
              '#3E8EDE',
              '#00AEA9',
              '#F5BC25',
              '#F99221',
              '#580D8C',
              '#001970',
              '#0A2399',
              '#0B7477',
              '#0B6B50',
              '#B67E11',
              '#B85D0D',
              '#FFF',
              '#000',
            ],
      fontSizes: [
        { value: "8px", label: "8px" },
        { value: "9px", label: "9px" },
        { value: "10px", label: "10px" },
        { value: "11px", label: "11px" },
        { value: "12px", label: "12px" },
        { value: "14px", label: "14px" },
        { value: "16px", label: "16px" },
        { value: "18px", label: "18px" },
        { value: "20px", label: "20px" },
        { value: "22px", label: "22px" },
        { value: "24px", label: "24px" },
        { value: "30px", label: "30px" },
      ],
      tableColumns: [
        { value: "1x1", col: 1, row: 1, label: "1x1" },
        { value: "1x2", col: 2, row: 1, label: "1x2" },
        { value: "1x3", col: 3, row: 1, label: "1x3" },
        { value: "1x4", col: 4, row: 1, label: "1x4" },

        { value: "2x1", col: 1, row: 2, label: "2x1" },
        { value: "2x2", col: 2, row: 2, label: "2x2" },
        { value: "2x3", col: 3, row: 2, label: "2x3" },
        { value: "1x4", col: 4, row: 2, label: "2x4" },

        { value: "3x1", col: 1, row: 3, label: "3x1" },
        { value: "3x2", col: 2, row: 3, label: "3x2" },
        { value: "3x3", col: 3, row: 3, label: "3x3" },
        { value: "3x4", col: 4, row: 3, label: "3x4" },
      ],
      infoBoxes: [
        { value: "success", label: "Success" },
        { value: "warning", label: "Warning" },
        { value: "info", label: "Info" },
      ],
    };
  },
  methods: {
    addOpen(){
 
        var editorHtml = this.editor.getHTML()
        editorHtml += `<status-component status="${status}"</status-component>`
        this.editor.commands.setContent(editorHtml)
    },
    openImageBox(){
        this.imageDilaog = true;
    }, 
    addContent(status){ 
        let editorHtml = `<status-component status="${status}"</info-status>`
        this.editor.commands.insertContent(editorHtml) 
    },
  
  },
  watch: {
    "color.text"(val) {
      //   console.log("color.highlight",this.color.highlight)
      let color = val && val.hex ? val.hex : "";
      console.log(color)
      this.editor.chain().focus().setFontColor(color).run();
    },
    "color.highlight"(val) {
      //   console.log("color.highlight",this.color.highlight)
      let color = val && val.hex ? val.hex : "";
      this.editor.chain().focus().toggleHighlight({ color }).run();
    },
    "data.fontFamily"(val) {
      if (val != "remove") {
        this.editor.chain().focus().setFontFamily(val).run();
      } else {
        this.editor.chain().focus().unsetFontFamily().run();
      }
    },
    "data.fontSize"(val) {
      if (val != "remove") {
        this.editor.chain().focus().setFontSize(val).run();
      } else {
        this.editor.chain().focus().setFontSize().run();
        this.data.fontSize = ''
      }
    },
    "data.info"(val) {
     this.addContent(val);

    },
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = this.editor.getJSON().toString() === value.toString()

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(this.value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Underline,
        TextStyle,
        FontFamily,
        FontColor,
        FontSize,
        CustomImage,  
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Table.configure({ 
          resizable: true,
        }),
        
        TableRow,
        TableHeader,
        Image,
        Dropcursor, 
        CustomTableCell,
        infoBox,
        exBox,
        Highlight.configure({ multicolor: true }),
      ],
      content: this.value,
      onUpdate: () => { 
        this.$emit("input", this.editor.getHTML()); 
        // this.$emit("input2", this.editor.generateHTML()); 
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script> 
<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  padding: 0px 10px;
  height: calc(100vh - 210px);
  line-height: 1.1;
  overflow: auto;
  > * + * {
    margin-top: 0.75em;
  }


  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  .underline {
    text-decoration: underline;
  }
  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
  mark {
    background-color: #ff0;
    color: inherit!important;
   
  }

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;

  td,
  th {
    min-width: 1em;
    border: 2px solid #ced4da;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;

    > * {
      margin-bottom: 0;
    }
  }

  th {
    font-weight: bold;
    text-align: left;
    background-color: #f1f3f5;
  }

  .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
  }

  .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: -2px;
    width: 4px;
    background-color: #adf;
    pointer-events: none;
  }
}
}
.bubble-menu {
  display: inline-flex;
  min-width: 200px;
  padding: 4px 5px;
  height: 39px;

  /* kiva sol men bcg P 50 */

  background: #f6f8fc;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  select {
    background: none;
    //  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    border: 1px solid #d9e1ee;
    margin-right: 10px;
    height: 32px;
  }
  span {
    margin-top: 7px;
  }
  a {
    width: 32px;
    height: 32px;
    padding: 5px;
    text-align: center;
    /* kiva sol men bcg P 50 */
    margin-right: 5px;
    background: #f6f8fc;
    // box-shadow: inset 1px 1px 0px #DDDBDA, inset 1px -1px 0px #DDDBDA;
    border: 1px solid #d9e1ee;
    border-radius: 4px;
    &.first {
      border-radius: 4px 0px 0px 4px !important;
      margin-left: 5px !important;

      // box-shadow: inset 1px 1px 0px #DDDBDA, inset 1px -1px 0px #DDDBDA;
    }
    &.last {
      border-radius: 0px 4px 4px 0px !important;
      margin-right: 5px !important;

      // box-shadow: inset 1px 1px 0px #DDDBDA, inset 1px -1px 0px #DDDBDA;
    }
    &.group {
      margin: 0;
      border-radius: 0px;
    }
    &.single {
      margin: 0;
      padding: 3px 5px;
    }
    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
.header-buttons {
  width: 100%;
  height: 48px;
  padding: 7px;
  background: #f6f8fc;
  border-bottom: 1ps solid #afafaf;
  display: inline-flex;
  .single-select {
    border: 1px solid #d9e1ee;
    background: none;
    background: #ffffff;
    margin-right: 5px;
    border-radius: 4px;
  }
  .single-button {
    min-width: 32px;
    height: 32px;
    padding: 0px 6px;
    line-height: 32px;
    text-align: center;
    /* white */

    background: #ffffff;
    /* kiva app line P 50 */

    border: 1px solid #d9e1ee;
    box-sizing: border-box;
    border-radius: 4px;

    margin: 0px 8px 0px 0px;
    display: inline-flex;
    svg{
      font-size: 17px;
      height: 17px;
      width: 17px;
      line-height: 35px;
      margin-top: 7px;
      text-align: center;
    }
    i{
      font-size: 17px;
      height: 17px;
      width: 17px;
      line-height: 35px;
      margin-top: 0px;
      text-align: center;
      cursor: pointer;
    }
    span {
      line-height: 32px;
    }
    &:hover {
      border: 1px solid #9b9b9b;
    }
  }
}
.table-chooser {
  display: grid;
  grid-template-columns: 45px 45px 45px 45px;
  margin-left: 6px;
  a {
    width: 100%;
    text-align: left;
    height: 35px;
  }
  div {
    height: 35px;
    border: 1px solid #f9f9f9;
    text-align: center;
    padding: 7px 0px;
    font-size: 10px;
    cursor: pointer;
    &:hover {
      border: 1px solid #efefef;
    }
  }
}
.el-dropdown-menu__item:hover {
  background: none;
}
.floating-menu {
  display: flex;
  background-color: #9f9f9f00;
  padding: 0.5rem;
  border-radius: 0.5rem;

  button,a {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }

}

</style>
