export const state = () => ({  
  alerts: [
  ]
})

export const mutations = {
  show(state, alert) {
    alert.show = true
    state.alerts.push(alert)
  },
  close(state, index) {
    state.alerts[index].show = false
  },
  reset(state) {
    state.alerts = []
  }
}