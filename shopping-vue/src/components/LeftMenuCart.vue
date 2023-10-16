<template>
  <div class="left-menu-cart">
    <h2 class="title">Carrinho de Compras</h2>
    <ul>
      <li v-for="product in cartProducts" :key="product.id" class="product-item">
        <span class="remove-item" @click="removeFromCart(product.id)">X</span>
        {{ product.title }}<br> <h4>R$ {{ formatPrice(product.price) }}</h4>
      </li>
    </ul>
    <div class="emptyCart" v-if="cartProducts < 1">
    <h3>O carrinho de compras está vazio</h3>
  </div>
    <h4 v-show="cartProducts > ''">Total: R$ {{ formatPrice(totalPrice) }}</h4>
    <button v-if="cartProducts > ''" @click="finalizePurchase">Finalizar Compras</button>
  </div>
</template>

<script>
export default {
  props: {
    selectedProducts: Array,
    totalPrice: Number,
    cartProducts: Array,
  },
  methods: {
    finalizePurchase() {
      // Implementar a lógica para finalizar a compra aqui
      this.$emit("clear-cart");
    },
    removeFromCart(productId) {
      // Encontrar o índice do produto com base no productId
      const index = this.cartProducts.findIndex(product => product.id === productId);
      
      if (index !== -1) {
        // Remover o produto da lista cartProducts diretamente
        this.cartProducts.splice(index, 1);
        
        // Emitir um evento para informar ao componente pai que o carrinho foi atualizado
        this.$emit("update-cart", this.cartProducts);
      }
    },
    formatPrice(price) {
      return price.toFixed(2);
    },
  },
};
</script>

<style scoped>

.title{
  margin-bottom: 15px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  
}

.emptyCart {
  color: #969696;
  margin-top: 155px;
}
.left-menu-cart {
  background-color: #f0f0f0;
  padding: 10px;
  border-right: 1px solid #ccc;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 150px;
  overflow-y: auto;
}

.left-menu-cart h2 {
  font-size: 20px;
}

.left-menu-cart ul {
  list-style-type: none;
  padding: 0;
}

.left-menu-cart li {
  margin-bottom: 10px;
  position: relative;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.remove-item {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: red;
  font-weight: bold;
  padding: 3px;
}

.left-menu-cart button {
  background-color: #42b983;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.left-menu-cart button:hover {
  background-color: #2e865f;
}
</style>
