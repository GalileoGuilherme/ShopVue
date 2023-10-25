<template>
  <div class="left-menu-cart">
    <!-- Título do carrinho -->
    <h2 class="title">Carrinho de Compras</h2>
    <ul>
      <!-- Lista de produtos no carrinho -->
      <li
        v-for="(product, index) in cartProducts"
        :key="index"
        class="product-item"
      >
        <!-- Botão para remover um item do carrinho -->
        <span class="remove-item" @click="removeFromCart(product.id)">X</span>
        <!-- Imagem do produto -->
        <img :src="product.image" alt="" />
        <!-- Título do produto -->
        {{ product.title }}
        <br />
        <!-- Preço formatado do produto -->
        <h4>R$ {{ formatPrice(product.price) }}</h4>
      </li>
    </ul>
    <!-- Mensagem exibida quando o carrinho está vazio -->
    <div class="emptyCart" v-if="cartProducts.length < 1">
      <h3>O carrinho está vazio</h3>
    </div>
    <!-- Exibe o preço total apenas quando há itens no carrinho -->
    <h4 v-show="cartProducts.length > 0">
      Total: R$ {{ formatPrice(totalPrice) }}
    </h4>
    <!-- Botão para finalizar a compra, visível apenas quando há itens no carrinho -->
    <button v-if="cartProducts.length > 0" @click="finalizePurchase">
      Finalizar Compras
    </button>

    <!-- Snackbar para exibir a mensagem de compra realizada com sucesso -->
    <div class="snackbar" :class="{ show: showSnackbar }">
      {{ snackbarMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSnackbar: false, // Controla a visibilidade da barra de notificação
      snackbarMessage: "Compra realizada com sucesso!", // Mensagem da barra de notificação
    };
  },
  props: {
    cartProducts: Array, // Produtos no carrinho
    totalPrice: Number, // Preço total do carrinho
  },
  watch: {
    cartProducts: {
      handler(newCartProducts) {
        // Converte o novo array cartProducts em uma string JSON
        const cartProductsJSON = JSON.stringify(newCartProducts);

        // Armazena a string JSON no localStorage
        localStorage.setItem("cartProducts", cartProductsJSON);
      },
      deep: true, // Observa alterações profundas no array
    },
  },
  methods: {
    // Método para finalizar a compra
    finalizePurchase() {
      // Converte o array cartProducts em uma string JSON
      const cartProductsJSON = JSON.stringify(this.cartProducts);

      // Armazena a string JSON no localStorage
      localStorage.setItem("cartProducts", cartProductsJSON);

      // Exibir o Snackbar
      this.showSnackbar = true;

      // Definir um tempo limite para ocultar o Snackbar após 3 segundos
      setTimeout(() => {
        this.showSnackbar = false;
      }, 3000);

      // Limpar o carrinho emitindo um evento para o componente pai
      this.$emit("clear-cart");
    },

    // Método para remover um item do carrinho
    removeFromCart(productId) {
      // Encontrar o índice do produto com base no productId
      const index = this.cartProducts.findIndex(
        (product) => product.id === productId
      );

      if (index !== -1) {
        // Remover o produto da lista cartProducts diretamente
        this.cartProducts.splice(index, 1);

        // Emitir um evento para informar ao componente pai que o carrinho foi atualizado
        this.$emit("update-cart", this.cartProducts);
      }
    },

    // Função para formatar o preço exibido com duas casas decimais
    formatPrice(price) {
      return price.toFixed(2);
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 15px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

img {
  max-width: 80px;
}

.emptyCart {
  color: #d1cccc;
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
  margin-top: 77px;
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

.snackbar {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 1;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
}

.snackbar.show {
  display: block;
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
