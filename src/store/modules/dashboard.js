import mockRequest from '@/utils/mockRequest'

const state = {
  dashboardData: {}
}

const mutations = {
  GETDATA(state, dashboardData) {
    state.dashboardData = dashboardData
  }
}

const actions = {
  async getData({ commit }) {
    const res = await mockRequest.get('/dashboard/list')
    commit('GETDATA', res.data)
  }
}

const getters = {
  salesTotal: state => state.dashboardData.salesTotal,
  salesToday: state => state.dashboardData.salesToday,
  salesGrowthLastDay: state => state.dashboardData.salesGrowthLastDay,
  salesGrowthLastMonth: state => state.dashboardData.salesGrowthLastMonth,

  visitTotal: state => state.dashboardData.visitTotal,
  visitToday: state => state.dashboardData.visitToday,
  visitTrend: state => state.dashboardData.visitTrend,

  payTotal: state => state.dashboardData.payTotal,
  payRate: state => state.dashboardData.payRate,
  payTrend: state => state.dashboardData.payTrend,

  activityRate: state => state.dashboardData.activityRate,
  activityGrowthLastDay: state => state.dashboardData.activityGrowthLastDay,
  activityGrowthLastMonth: state => state.dashboardData.activityGrowthLastMonth,

  orderFullYearAxis: state => state.dashboardData.orderFullYearAxis,
  orderFullYear: state => state.dashboardData.orderFullYear,
  userFullYearAxis: state => state.dashboardData.userFullYearAxis,
  userFullYear: state => state.dashboardData.userFullYear,

  orderRank: state => state.dashboardData.orderRank,
  userRank: state => state.dashboardData.userRank,

  searchWord: state => state.dashboardData.searchWord,

  saleRank: state => state.dashboardData.saleRank
}

export default {
  state,
  mutations,
  actions,
  getters
}
