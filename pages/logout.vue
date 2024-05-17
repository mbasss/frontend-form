<script>
export default {
  middleware: ['authenticated'],
  mounted () {
    this.$store.commit('auth/logout')
    this.$router.push({name: 'index___' + this.$i18n.locale})
  }
}
</script>