import { defineStore } from "pinia";

export const useCountStore = defineStore('count', {
  state:  () => {
    return {
      sum: 0
    }
  },
  actions: {
    increment(val: number) {
      this.sum += val
    },
    decrement(val: number) {
      this.sum -= val
    }
  },
  getters: {
    doubleSum: (state) => {
      return state.sum * 2
    }
  }
})