import request from '@/utils/request'

export function sendEmail(email: string, type: string) {
  return request({
    url: '/public/ask-code',
    params: { email, type },
    method: 'get'
  })
}