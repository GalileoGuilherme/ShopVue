<template>
  <div>
    <div class="product-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item"
      >
        <img :src="product.image" :alt="product.title" class="product-image" />
        <h3 class="product-title">{{ product.title }}</h3>
        <button @click="showProductDetails(product)" class="show-details-button">
          Mostrar Detalhes
        </button>
        
        <!-- Adicione o botão "Adicionar ao Carrinho" -->
        <button @click="addToCart(product)" class="add-to-cart-button">
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
      // Adicione o produto ao carrinho
      this.updateSelectedProducts(product);
      
      // Atualize a propriedade cartProducts com os produtos no carrinho
      // this.cartProducts = this.products; // Ou a lógica que você usa para gerenciar o carrinho

        // Emita um evento para enviar o produto para o componente LeftMenuCart
      this.$root.$emit("addToCart", product);

      // Exiba no console o produto que está sendo adicionado ao carrinho
      console.log("Produto adicionado ao carrinho:", product);

      // Adicione o produto ao array cartProducts
    this.cartProducts.push(product);

      // Mostrar os produtos no carrinho no console
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
    // Implemente a lógica para limpar o carrinho aqui
    // Por exemplo, você pode definir this.cartProducts como um array vazio
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
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 5px;
}

.show-details-button:hover {
  background-color: #0056b3;
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
