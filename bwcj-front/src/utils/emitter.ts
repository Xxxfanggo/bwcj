import mitt from "mitt";

const emitter = mitt();

// 绑定 、触发 、解绑、清除
// emitter.on('getDog', () => {
//   console.log('getDog');
// })

// setTimeout(() => {
//   emitter.emit('getDog')
// }, 1000)

// setTimeout(() => {
//   emitter.off('getDog')
// }, 2000);

// setTimeout(() => {
//   emitter.all.clear()
// }, 3000);

export default emitter;