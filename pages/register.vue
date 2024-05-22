<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark>REGISTER</v-toolbar>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
             label= "Fullname"
             :rules="rules.fullname"
             v-model="form.fullname"
             required
            />
            <v-text-field
             label= "Email" 
             :rules="rules.email"
             v-model="form.email"
             @keydown="emailExist = false"
             required
            />
            <v-text-field
             label= "Password" 
             :rules="rules.password"
             v-model="form.password"
             type="password"
             required
            />
            <v-text-field
             label= "Confirm Password"
             :rules="rules.confirmPassword"
             v-model="form.confirmPassword"
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
          >Register</v-btn>
        </v-card-actions>
      </v-card>
      <div class="d-flex align-baseline">
        <p>
          Sudah punya akun? 
          <v-btn 
          text
          plain
          to="/login"
          color="primary"
          :ripple="false"
          class="pl-1"
          >Login</v-btn>
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['unauthenticated'],
  layout:  'auth',
  data () {
    return {
      isLoading: false,
      emailExist: false,
      form : {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        fullname: [
          val => !!val || this.$t('FIELD_REQUIRED', {field: 'fullname'}),
        ],
        email: [
          val => !!val || this.$t('FIELD_REQUIRED', {field: 'email'}),
          val => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) || this.$t('FIELD_REQUIRED'),
          val => !this.emailExist || this.$t('EMAIL_EXIST')
        ],
        password: [
          val => !!val || this.$t('FIELD_REQUIRED', {field: 'password'}),
          val => val.length >= 6 || this.$t('FIELD_MIN', {field: 'password', min: 6})
        ],
        confirmPassword: [
          val => !!val || this.$t('FIELD_REQUIRED', {field: 'confirm password'}),
          val => val === this.form.password || this.$t('FIELD_CONFIRM', {fieldConfirm: 'confirm password', field: 'password'})
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        if(this.$refs.form.validate()) {
          this.isLoading = true;
          const response = await this.$axios.$post('/register', this.form);
          if(response.message= 'USER_REGISTER_SUCCESS') {
            this.$store.commit('auth/setFullname', response.data.fullname);
            this.$store.commit('auth/setAccessToken', response.data.accessToken);
            this.$store.commit('auth/setRefreshToken', response.data.refreshToken);
            
            this.$router.push({name: 'index___' + this.$i18n.locale}) //redirest to index page
          }
          this.isLoading = false;
        }
        // this.$router.push('/login')
      } catch (error) {
        if(error.response.data.message == 'EMAIL_ALREADY_EXIST') {
          this.emailExist = true,
          this.$refs.form.validate();
        }

        this.isLoading = false;
      }
    }
  }
}
</script>