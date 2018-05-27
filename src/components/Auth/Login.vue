<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                prepend-icon="person"
                name="E-mail"
                label="E-mail"
                v-model="email"
                type="text"
                :rules="emailRules"
                required
              >

              </v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                v-model="password"
                label="Password"
                :counter="6"
                type="password"
                :rules="passwordRules"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer> </v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :loading = "loading"
              :disabled="!valid || loading"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({

      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid' // valid  mail
      ],
      passwordRules: [
        v => !!v || 'Password is required', // password is required
        v => (v && v.length >= 6) || 'Password must be less than 6 characters'  // Test length password
      ]
    }),
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSubmit () {
        // Logic
        if (this.$refs.form.validate()) {
          const user = {
            password: this.password,
            email: this.email
          }
          this.$store.dispatch('loginUser', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(err => console.log(err))
        }
      }
    },
    created () {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Please log in to access this page. ')
      }
    }
  }
</script>

<style scoped>

</style>
