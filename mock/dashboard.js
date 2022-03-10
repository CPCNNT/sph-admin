const data = require('./data.json')

module.exports = [
  {
    url: '/dashboard/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data
      }
    }
  }
]
