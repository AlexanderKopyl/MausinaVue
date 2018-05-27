<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form ref="form" v-model="valid" validation class="mb-3">
          <v-text-field
            name="title"
            label="AD title"
            v-model="title"
            type="text"
            :rules="[v => !!v || 'Title is required']"
            required
          >

          </v-text-field>
          <v-text-field
            id="description"
            name="description"
            v-model="description"
            label="AD description"
            multi-line
            type="text"
            :rules="[v => !!v || 'Description is required']"
          >
          </v-text-field>
        </v-form>
        <v-layout class="mb-3">
          <v-flex xs12>

            <v-btn
              color="blue-grey"
              class="warning"
              @click.native="loader = 'loading3'"
            >
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>

          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <img src="" height="150" alt="">

          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-switch
              label="Ad to promo"
              v-model="promo"
              color="primary"
            >

            </v-switch>

          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-spacer></v-spacer>
            <v-btn
              :loading = "loading"
              class="success"
              @click="CreateAD"
              :disabled="!valid || loading"
            >
              CreateAD
            </v-btn>

          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        description: '',
        promo: false,
        valid: false
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      CreateAD () {
        if (this.$refs.form.validate()) {
          const ad = {
            title: this.title,
            description: this.description,
            promo: this.promo,
            imgSrc: 'https://ru-wotp.wgcdn.co/dcont/fb/image/progetto_m35_mod_46_1920x1080_noc_ru.jpg'
          }

          this.$store.dispatch('createAd', ad)
            .then(() => {
              this.$router.push('/list')
            })
            .catch(() => {})
        }
      }
    }
  }
</script>

<style scoped>

</style>
