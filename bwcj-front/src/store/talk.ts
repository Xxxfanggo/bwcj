import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import axios from "axios";
import { reactive } from "vue";

// export const useTalkStore = defineStore('talk', {
//   state: () => {
//     return {
//       talkList:  JSON.parse(localStorage.getItem('talkList') as string) || []
//     }
//   },
//   actions: {
//     async getTalk() {
//       let { data: { data: { title } } } = await axios.get('https://api.apiopen.top/api/articles/random')
//       const obj = {
//         id: nanoid(),
//         title
//       }
//       this.talkList.unshift(obj)
//     }
//   }
// })



export const useTalkStore = defineStore('talk', () => {
  const talkList = reactive(
    JSON.parse(localStorage.getItem('talkList') as string) || []
  )

  async function getTalk() {
    let { data: { data: { title } } } = await axios.get('https://api.apiopen.top/api/articles/random')
    const obj = {
      id: nanoid(),
      title
    }
    talkList.unshift(obj)
  }
  return { talkList, getTalk}
})