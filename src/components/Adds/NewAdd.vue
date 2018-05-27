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
              @click = "triggerUpload"
            >
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change = "onFileChange"
            >
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <img :src="imgSrc" height="150" alt="" v-if=" imgSrc">

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
              :disabled="!valid || !image || loading"
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
        valid: false,
        image: null,
        imgSrc: ''
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      CreateAD () {
        if (this.$refs.form.validate() && this.image) {
          const ad = {
            title: this.title,
            description: this.description,
            promo: this.promo,
            image: this.image
          }

          this.$store.dispatch('createAd', ad)
            .then(() => {
              this.$router.push('/list')
            })
            .catch(() => {})
        }
      },
      triggerUpload () {
        this.$refs.fileInput.click()
      },
      onFileChange (event) {
        const file = event.target.files[0]

        const reader = new FileReader()
        reader.onload = e => {
          this.imgSrc = reader.result
        }
        reader.readAsDataURL(file)
        this.image = file
      }
    }
  }
</script>

<style scoped>

</style>
