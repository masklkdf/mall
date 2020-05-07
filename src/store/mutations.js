export default {
  addShop(state, payload) {
    payload.count = 1;
    payload.isCheck = true;
    state.cartList.push(payload);
  },
  addCount(state, payload) {
    payload.count++;
  },
  checkClick(state, payload) {
    payload.isCheck = !payload.isCheck;
  }
}
