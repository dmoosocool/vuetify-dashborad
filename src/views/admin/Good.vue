<template>
  <v-data-table
    v-model="selected"
    :search="searchRoomNo"
    show-select
    :headers="headers"
    :items="desserts"
    :items-per-page="15"
    class="elevation-1"
    item-key="name"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <div class="mt-6">
          <v-text-field
            dense
            outlined
            v-model="searchRoomNo"
            append-outer-icon="mdi-magnify"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="商品名"
            placeholder="请输入商品名进行查询"
            type="text"
          ></v-text-field>
        </div>
        <v-divider class="mx-4" inset vertical></v-divider>
        <!-- 批量删除对话框 -->
        <v-dialog
          v-model="multDeleteDialog"
          :disabled="selected.length===0"
          persistent
          max-width="500px"
        >
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2 mr-4" v-on="on" @click="multDelete">批量删除</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">您确定删除这些吗？</v-card-title>
            <v-card-text v-for="tip in selected" :key="tip.name">商品： {{tip.name}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="darken-1" text @click="multDeleteDialog = false">取消</v-btn>
              <v-btn color="red darken-1" text @click="multDeleteDialog = false">确定</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- 客房对话框 -->
        <v-dialog v-model="dialog" persistent max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on" @click="changeIsUpdate">新增</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }} - {{ isUpdate ? '修改' : '新增'}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="商品名"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.category"
                      :items="GoodsCategoryItems"
                      label="分类名"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.number" label="数量"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-file-input
                      v-model="editedItem.picture"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="上传商品图片"
                      prepend-icon
                      label="商品图片"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.price" label="价格" prefix="￥"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      v-model="editedItem.remark"
                      label="描述"
                      clearable
                      clear-icon="cancel"
                      counter="50"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">取消</v-btn>
              <v-btn color="blue darken-1" text @click="save">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>

    <template v-slot:item.category="{ item }">
      <v-chip dark>{{ getCategoryName(item.category) }}</v-chip>
    </template>

    <template v-slot:item.state="{ item }">
      <v-chip dark :color=" item.state==='0' ? 'green': 'red'">{{ getStateName(item.state) }}</v-chip>
    </template>

    <template v-slot:item.picture="{item}">
      <v-img v-if="item.picture" height="40px" :src="item.picture"></v-img>
      <span v-else>暂无图片</span>
    </template>

    <template v-slot:item.price="{item}">￥{{ Number(item.price).toFixed(2) }}</template>
  </v-data-table>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Good",
  data () {
    return {
      dialog: false,
      multDeleteDialog: false,
      selected: [],
      searchRoomNo: "",
      formTitle: '商品管理',
      isUpdate: false,
      headers: [
        { text: '采购人', value: 'purchaser' },
        { text: '商品名', value: 'name' },
        { text: '商品数量', value: 'number', sortable: false },
        { text: '商品分类', value: 'category', sortable: false },
        { text: '价格', value: 'price', sortable: false },
        { text: '商品图片', value: 'picture' },
        { text: '描述', value: 'remark' },
        { text: '操作', value: 'action', sortable: false },
      ],

      GoodsCategoryItems: [
        { value: '1', text: '香烟' },
        { value: '2', text: '饮料' },
        { value: '3', text: '零食' },
      ],

      desserts: [
        {
          purchaser: 'superadmin',
          name: '香烟1',
          number: 200,
          category: '1',
          price: 20,
          picture: undefined,
          remark: '吸烟有害健康，请勿在禁烟场所吸烟。'
        },
        {
          purchaser: 'superadmin',
          name: '香烟2',
          number: 100,
          category: '1',
          price: 10,
          picture: undefined,
          remark: '吸烟有害健康，请勿在禁烟场所吸烟。'
        },
        {
          purchaser: 'admin',
          name: '可口可乐',
          number: 300,
          category: '2',
          price: 3,
          picture: undefined,
          remark: '',
        },
        {
          purchaser: 'admin',
          name: '百事可乐',
          number: 300,
          category: '2',
          price: 3,
          picture: undefined,
          remark: '',
        },
        {
          purchaser: 'admin',
          name: '乐事薯片',
          number: 300,
          category: '3',
          price: 4,
          picture: undefined,
          remark: '',
        },
        {
          purchaser: 'admin',
          name: 'xx瓜子',
          number: 300,
          category: '3',
          price: 4,
          picture: undefined,
          remark: '',
        },
        {
          purchaser: 'admin',
          name: 'xxx泡面',
          number: 300,
          category: '3',
          price: 4,
          picture: undefined,
          remark: '',
        },
        {
          purchaser: 'admin',
          name: 'xxx泡面1',
          number: 300,
          category: '3',
          price: 4,
          picture: undefined,
          remark: '',
        },
        {
          purchaser: 'admin',
          name: 'xxx泡面2',
          number: 300,
          category: '3',
          price: 4,
          picture: undefined,
          remark: '',
        },
        {
          purchaser: 'admin',
          name: 'xxx泡面3',
          number: 300,
          category: '3',
          price: 4,
          picture: undefined,
          remark: '',
        },
        {
          purchaser: 'admin',
          name: 'xxx泡面4',
          number: 300,
          category: '3',
          price: 4,
          picture: undefined,
          remark: '',
        },
        {
          purchaser: 'admin',
          name: '绿箭口香糖',
          number: 300,
          category: '3',
          price: 5,
          picture: undefined,
          remark: '',
        },
      ],

      editedItem: {
        purchaser: '',
        name: '',
        number: 0,
        category: '',
        price: 0,
        picture: undefined,
        remark: '',
      },

      defaultItem: {
        purchaser: '',
        name: '',
        number: 0,
        category: '',
        price: 0,
        picture: undefined,
        remark: '',
      },
    }
  },
  methods: {
    changeIsUpdate () {
      this.isUpdate = false
    },
    getCategoryName (category) {
      let categoryName = '';
      switch (category) {
        case '1':
          categoryName = '香烟';
          break;
        case '2':
          categoryName = '饮料';
          break;
        case '3':
          categoryName = '零食';
          break;
        default:
          categoryName = '未分类';
          break;
      }

      return categoryName;
    },

    getStateName (state) {
      if (state === '0') {
        return '未使用';
      } else {
        return '使用中';
      }
    },


    editItem (item) {

      this.isUpdate = true;
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)

      this.editedItem.price = Number(this.editedItem.price).toFixed(2);
      this.dialog = true
    },

    multDelete () {
      console.log(this.selected)
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item);

      console.log(item)
      confirm(`您是否确定删除商品为：【${item.name}】的记录？`) && this.desserts.splice(index, 1);
    },

    close () {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  }
}
</script>
