<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark>LOGIN</v-toolbar>

        <v-card-text>
          <v-alert color="red lighten-2" dark v-if="isError">{{ $t(message) }}</v-alert>
          <v-form ref="form">
            <v-text-field
             label= "Email"
             :rules="rules.email"
             v-model="form.email"
             required
            />
            <v-text-field
             label= "Password" 
             :rules="rules.password"
             v-model="form.password"
             type="password"
             required
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn 
          :loading="isLoading"
          color="primary" 
          @click="onSubmit"
          >Login</v-btn>
        </v-card-actions>
      </v-card>
      <div class="d-flex align-baseline">
        <p>
          Belum punya akun? 
          <v-btn 
          text
          plain
          to="/register"
          color="primary"
          :ripple="false"
          class="pl-1"
          >Register</v-btn>
        </p>
        <p>Nama Kamu : {{ fullname }}</p>
    </div>
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from 'vuex';
export default {
  middleware: ['unauthenticated'],
  layout:  'auth',
  data() {
    return {
      isLoading: false,
      isError: false,
      message: null,
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          val => !!val || this.$t('FIELD_REQUIRED', {field: 'email'}),
          val => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) || this.$t('EMAIL_INVALID'),
        ],
        password: [
          val => !!val || this.$t('FIELD_REQUIRED', {field: 'password'}),
          val => val.length >= 6 || this.$t('FIELD_MIN', {field: 'password', min: 6})
        ],
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true
        await this.$store.dispatch('auth/login', this.form)
        this.$router.push({name: 'index___' + this.$i18n.locale})
        this.isLoading = false
      } catch (error) {
        this.isError = true
        this.message = error.response? error.response.data.message : 'SERVER_ERROR'
        this.isLoading = false
      }
    }
  },
  computed: {
    ...mapState('auth', ['fullname'])
  }
}
</script>