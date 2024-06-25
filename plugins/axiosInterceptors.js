export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    if (store.state.auth.accessToken) {
      config.headers['Authorization'] = `Bearer ${store.state.auth.accessToken}`
    }

    if (config.headers.Autosave) {
      console.log('Mulai menyimpan otomatis');
    }
  })

  $axios.onResponse((response) => {
    if (response.config.headers.Autosave) {
      console.log('Selesai menyimpan otomatis');
    }
  })

  $axios.onResponseError(async (error) => {
    try {
      if(error.response.data.message === 'REFRESH_TOKEN_EXPIRED' || error.response.data.message === 'INVALID_REFRESH_TOKEN') {
        throw new Error('LOGOUT')
      }

      if(error.response.status === 401 || error.response.status.message === 'ACCESS_TOKEN_EXPIRED') { //authentication error
        let refreshToken = store.state.auth.refreshToken

        const response = await $axios.$post('/refresh-token', {'refreshToken': refreshToken})
        if(!response) { throw new Error('LOGOUT') }

        // menyimpan token baru ke store/auth
        store.commit('auth/setAccessToken', response.data.accessToken)
        store.commit('auth/setRefreshToken', response.data.refreshToken)

        // jalankan ulang permintaan terakhir
        let originalRequest = error.config;
        originalRequest.headers['Authorization'] = `Bearer ${response.accessToken}`
        return $axios(originalRequest)
      } else {
        
        return Promise.reject(error) // error yang lain
      }
    } catch (error) {
      if( error.message === 'LOGOUT' ) {
        return redirect( '/logout' )
      }
    }
  })
}