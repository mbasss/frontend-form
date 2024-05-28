export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    if (store.state.auth.accessToken) {
      config.headers['Authorization'] = `Bearer ${store.state.auth.accessToken}`
    }
  })

  $axios.onResponseError(async error => {
    try {
      if(error.response.status === 401) {
        let refreshToken = store.state.auth.refreshToken

        const response = await $axios.$post('/refresh-token', {'refreshToken': refreshToken})

        // menyimpan token baru ke store/auth
        store.commit('auth/setAccessToken', response.data.accessToken)
        store.commit('auth/setRefreshToken', response.data.refreshToken)

        // jalankan ulang permintaan terakhir
        let originalRequest = error.config;
        originalRequest.headers['Authorization'] = `Bearer ${response.accessToken}`

        return $axios(originalRequest)
      }
    } catch (error) {
      console.log(error);
      
    }
  })
}