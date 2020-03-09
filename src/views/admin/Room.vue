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
            label="房号"
            placeholder="请输入房号进行查询"
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
            <v-card-text v-for="tip in selected" :key="tip.name">房号： {{tip.name}}</v-card-text>
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
                    <v-text-field v-model="editedItem.name" label="房号"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.category"
                      :items="RoomCategoryItems"
                      label="分类名"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.state"
                      :items="RoomStateItems"
                      label="客房状态"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-file-input
                      v-model="editedItem.picture"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="上传客房图片"
                      prepend-icon
                      label="客房图片"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.price" label="价格" prefix="￥"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      v-model="editedItem.remark"
                      label="备注"
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
  name: "Room",
  data () {
    return {
      dialog: false,
      multDeleteDialog: false,
      selected: [],
      searchRoomNo: "",
      formTitle: '客房管理',
      isUpdate: false,
      headers: [
        {
          text: '房号',
          align: 'start',
          value: 'name',
        },
        { text: '分类名', value: 'category' },
        { text: '客房状态', value: 'state' },
        { text: '客房图片', value: 'picture', sortable: false },
        { text: '价格', value: 'price' },
        { text: '备注', value: 'remark', sortable: false },
        { text: '操作', value: 'action', sortable: false },
      ],

      RoomStateItems: [
        { value: '0', text: '未使用' },
        { value: '1', text: "使用中" }
      ],

      RoomCategoryItems: [
        { value: '1', text: '标准房' },
        { value: '2', text: '大床房' },
        { value: '3', text: '双人房' },
        { value: '4', text: '电脑房' },
        { value: '5', text: '麻将房' },
        { value: '6', text: '豪华套房' },
      ],

      desserts: [
        {
          name: '1001',
          category: '1',
          state: '0',
          picture: undefined,
          price: '168',
          remark: '光线好'
        },
        {
          name: '1002',
          category: '1',
          state: '1',
          picture: undefined,
          price: '168',
          remark: '光线好'
        },
        {
          name: '1003',
          category: '2',
          state: '0',
          picture: undefined,
          price: '188',
          remark: '光线好'
        },
        {
          name: '1004',
          category: '3',
          state: '1',
          picture: undefined,
          price: '238',
          remark: '光线好'
        },
        {
          name: '1005',
          category: '5',
          state: '1',
          picture: undefined,
          price: '268',
          remark: '光线好'
        },
        {
          name: '1006',
          category: '3',
          state: '0',
          picture: undefined,
          price: '238',
          remark: '光线好'
        },
        {
          name: '1007',
          category: '1',
          state: '0',
          picture: undefined,
          price: '168',
          remark: '光线好'
        },
      ],

      editedItem: {
        name: '',
        category: '',
        picture: undefined,
        price: '',
        remark: '',
      },

      defaultItem: {
        name: '',
        category: '',
        picture: undefined,
        price: '',
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
          categoryName = '标准房';
          break;
        case '2':
          categoryName = '大床房';
          break;
        case '3':
          categoryName = '双人房';
          break;
        case '4':
          categoryName = "电脑房";
          break;
        case '5':
          categoryName = "麻将房";
          break;
        case '6':
          categoryName = "豪华套房";
          break;
        default:
          categoryName = '标准房';
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
      confirm(`您是否确定删除房号为：【${item.name}】的记录？`) && this.desserts.splice(index, 1);
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
