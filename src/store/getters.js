export default {
  getCartLength(state) {
    return state.cartList.length;
  },
  getGoods(state) {
    return state.cartList;
  },
  getCheckedLength(state) {
    return state.cartList.filter(item => item.isCheck).length;
  },
  getTotalPrice(state) {
    return state.cartList.filter(item => item.isCheck).reduce((preValue, item) => {
      return preValue + item.price * item.count;
    }, 0);
  }
};
