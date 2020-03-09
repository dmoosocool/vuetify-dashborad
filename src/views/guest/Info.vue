<template>
  <v-card class="mx-auto" outlined>
    <v-sheet class="pa-7 mt-n6 mx-3 mytips" dark elevation="6" color="success" tag="div">
      <h2 class="title font-weight-thin">会员管理</h2>
      <p class="subtitle-2 font-weight-thin">您可以在此页面编辑您的个人信息</p>
    </v-sheet>
    <v-list-item three-line class="pa-10">
      <v-list-item-content class="mt-10">
        <v-form>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="user.username" :counter="10" label="账号" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="user.email" label="邮箱" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="user.name" label="姓名" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-select :items="sexItems" v-model="user.sex" label="性别"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="user.id_no" :counter="18" label="身份证" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="user.contact" label="联系方式" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-textarea v-model="user.remark" clearable clear-icon="cancel" label="备注" required></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-list-item-content>
      <v-list-item-avatar size="160" color="grey">
        <v-img :src="'avatar-1.jpg'"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="green lighten-5" color="success" large tile light text>修改</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: 'zhangsan',
        email: 'zhangsan@gmail.com',
        name: '张三',
        sex: '1',
        id_no: '12345678901234567X',
        contact: '13878945612',
        remark: '哈哈啊哈'
      },

      sexItems: [
        { text: '男', value: '1' },
        { text: '女', value: '0' }
      ]
    }
  }
}
</script>