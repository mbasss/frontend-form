<template></template>
<script>
import * as Cookies from "js-cookie";
export default {
  middleware: ['authenticated'],
  mounted () {
    // Cara 1
    // Cookies.remove('mbasss-form-auth');
    // window.location.href = '/login';

    // Cara 2
    this.$store.commit('auth/logout')
    this.$router.push({name: 'login___' + this.$i18n.locale})
  }
}
</script>