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
            label="姓名"
            placeholder="请输入姓名进行查询"
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
                    <v-text-field v-model="editedItem.username" label="账号"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="editedItem.password"
                      @click:append="showPassword = !showPassword"
                      label="密码"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.sex"
                      label="性别"
                      :items="sexCategoryItems"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.id_no" label="身份证"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.contact" label="联系方式"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.address" label="地址"></v-text-field>
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

    <template v-slot:item.sex="{ item }">
      <v-chip dark>{{ getSexName(item.sex) }}</v-chip>
    </template>

    <template v-slot:item.created_at="{item}">
      <span>{{getDate(item.created_at)}}</span>
    </template>

    <template v-slot:item.price="{item}">￥{{ Number(item.price).toFixed(2) }}</template>
  </v-data-table>
</template>

<script>
// @ is an alias to /src
export default {
  name: "User",
  data () {
    return {
      dialog: false,
      showPassword: false,
      multDeleteDialog: false,
      selected: [],
      searchRoomNo: "",
      formTitle: '用户管理',
      isUpdate: false,
      headers: [
        { text: '账号', value: 'username', sortable: false },
        { text: '姓名', value: 'name', sortable: false },
        { text: '性别', value: 'sex' },
        { text: '身份证', value: 'id_no' },
        { text: '联系方式', value: 'contact', sortable: false },
        { text: '地址', value: 'address', sortable: false },
        { text: '创建时间', value: 'created_at', sortable: false },
        { text: '操作', value: 'action', sortable: false },
      ],
      sexCategoryItems: [
        { value: 0, text: '女' },
        { value: 1, text: '男' },
      ],

      desserts: [
        {
          username: 'zhangsan',
          name: '张三',
          sex: 1,
          id_no: '123456789012345678',
          contact: '1381234578',
          address: 'xx省xx市xx区xx街道xx小区xx门牌号',
          created_at: '1578030295333'
        },
        {
          username: 'lisi',
          name: '李四',
          sex: 1,
          id_no: '123456789012345678',
          contact: '1388888888',
          address: 'xx省xx市xx区xx街道xx小区xx门牌号',
          created_at: '1578278453443'
        },
        {
          username: 'wangwu',
          name: '王五',
          sex: 0,
          id_no: '123456789012345678',
          contact: '1399999999',
          address: 'xx省xx市xx区xx街道xx小区xx门牌号',
          created_at: '1578651824443'
        },
        {
          username: 'zhaosi',
          name: '赵四',
          sex: 1,
          id_no: '12345678901234567X',
          contact: '1377777777',
          address: 'xx省xx市xx区xx街道xx小区xx门牌号',
          created_at: '1580519613423'
        }
      ],

      editedItem: {
        username: '',
        password: '',
        name: '',
        sex: undefined,
        id_no: '',
        contact: '',
        address: '',
        created_at: ''
      },

      defaultItem: {
        username: '',
        password: '',
        name: '',
        sex: undefined,
        id_no: '',
        contact: '',
        address: '',
        created_at: ''
      },
    }
  },
  methods: {
    changeIsUpdate () {
      this.isUpdate = false
    },

    getSexName (state) {
      if (state == '0') {
        return '女';
      } else {
        return '男';
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

    getDate (timestamp) {

      if (typeof timestamp !== 'number') {
        timestamp = Number(timestamp);
      }

      var date = new Date(timestamp);
      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
  }
}
</script>
