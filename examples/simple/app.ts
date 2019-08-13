import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: {abc: 'fsdfsdf'},
    b: [1,2,3]
  }
})





