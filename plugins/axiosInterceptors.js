export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    if (store.state.auth.accessToken) {
      config.headers['Authorization'] = `Bearer ${store.state.auth.accessToken}`
    }
  })
}