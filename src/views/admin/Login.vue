<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12 mb-6">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="账号"
                    v-model="username"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  />
                  <v-text-field
                    label="密码"
                    v-model="password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login()">登陆</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import authApi from "@/api/auth";
export default {
  name: "Login",
  components: {},
  data: function () {
    return {
      title: "酒店管理系统登陆",
      username: "",
      password: ""
    };
  },

  methods: {
    async login () {
      const { username, password } = this;
      if (username && password) {
        await authApi.login({ username, password });
      }
    }
  }
};
</script>
