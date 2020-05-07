export default {
  addShop({state, commit}, payload) {

    return new Promise((resolve, reject) => {
      let product = state.cartList.find(item => item.id === payload.id);

      if (product) {
        commit('addCount', product);
        resolve('商品数量加一');
      } else {
        commit('addShop', payload);
        resolve('添加商品成功');
      }
    });

  }
}
