  import request from '@/utils/request';
  export function getAllUserList() {
    return request({
      url: '/user/getAllUser',
      method: 'get'
    })
  }