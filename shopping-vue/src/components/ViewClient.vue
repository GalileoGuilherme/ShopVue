<template>
  <div>
    <div class="product-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item"
      >
        <h3 class="product-title">{{ product.title }}</h3>
        <img :src="product.image" :alt="product.title" class="product-image" />
        <button @click="showProductDetails(product)" class="show-details-button">
          Mostrar Detalhes
        </button>
        
        <!-- Botão "Adicionar ao Carrinho" -->
        <button @click="addToCart(product)" class="show-details-button">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
    <LeftMenuCart :cartProducts="cartProducts" :totalPrice="totalPrice" @clear-cart="clearCart" ref="leftMenuCart" />

    <!-- Modal de detalhes do produto -->
    <div class="modal" v-if="selectedProduct">
      <div class="modal-content">
        <span class="close" @click="closeProductDetails">&times;</span>
        <img :src="selectedProduct.image" :alt="selectedProduct.title" class="modal-image" />
        <h3>{{ selectedProduct.title }}</h3>
        <p>{{ selectedProduct.description }}</p>
        <p>Preço: R$ {{ selectedProduct.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LeftMenuCart from './LeftMenuCart.vue';

export default {
  components: { LeftMenuCart },
  data() {
    return {
      selectedProduct: null,
      cartProducts: [],
      showLeftMenuCart: false,
    };
  },
  computed: {
    products() {
      // Recupera os produtos selecionados do localStorage
      const storedSelectedProducts = localStorage.getItem("selectedProducts");
      return storedSelectedProducts ? JSON.parse(storedSelectedProducts) : [];
    },
    totalPrice() {
    let total = 0;
    for (const product of this.cartProducts) {
      total += product.price;
    }
    return total;
  },
  },
  methods: {
    ...mapActions("products", ["updateSelectedProducts"]),
    showProductDetails(product) {
      this.selectedProduct = product;
      document.body.style.overflow = "hidden";
    },
    closeProductDetails() {
      this.selectedProduct = null;
      document.body.style.overflow = "auto";
    },
    addToCart(product) {
  // Verifica se o produto já está no carrinho
  const existingProduct = this.cartProducts.find(item => item.id === product.id);

  if (existingProduct) {
    // O produto já está no carrinho, crie um novo ID aleatório para ele
    const randomId = Math.random().toString(36).substr(2, 9);
    product.id = randomId;

    // Adicione o produto com o novo ID ao carrinho
    this.cartProducts.push(product);
  } else {
    // O produto não está no carrinho, adicione-o diretamente
    this.cartProducts.push(product);
  }

  // Emitir um evento para enviar o produto para o componente LeftMenuCart
  this.$root.$emit("addToCart", product);

  console.log("Produto adicionado ao carrinho:", product);

  // Mostrar o componente LeftMenuCart
  this.showLeftMenuCart = true;
},

    calculateTotalPrice() {
    let total = 0;
    for (const product of this.cartProducts) {
      total += product.price;
    }
    return total;
  },
  clearCart() {
    this.cartProducts = [];
  },
  },
};
</script>

<style scoped>
.product-grid {
  margin-left: 170px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-item {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
}

.product-title {
  font-size: 18px;
  margin-top: 10px;
}

.show-details-button {
  background-color: #42b983;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 5px;
}

.show-details-button:hover {
  background-color: #2e865f;
}

/* Estilos para o modal */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  max-width: 400px;
  position: relative;
  border-radius: 5px;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
}

.modal-image {
  max-width: 50%;
  height: auto;
}
</style>
