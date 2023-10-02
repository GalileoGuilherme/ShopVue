<template>
  <div>
    <h1 class="header">{{ msg }}</h1>
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <div class="product-image">
          <img
            :src="product.image"
            :alt="product.title"
            width="100"
            height="100"
          />
        </div>
        <div class="product-details">
          <h2 class="product-title">{{ product.title }}</h2>
          <p class="product-price">Preço: R$ {{ product.price }}</p>
          <button @click="showProductDetails(product)">Mostrar Detalhes</button>
        </div>
      </li>
    </ul>

    <!-- Modal para -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h2>{{ selectedProduct.title }}</h2>
        <p>{{ selectedProduct.description }}</p>
        <button @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
      showModal: false,
      selectedProduct: null,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = response.data;
      } catch (error) {
        console.error("Erro ao buscar a lista de produtos:", error);
      }
    },
    showProductDetails(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },
    closeModal() {
      this.selectedProduct = null;
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.header {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.product-list {
  list-style: none;
  padding: 0;
  width: 50%;
  margin: 0 auto;
}

.product-item {
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.product-image img {
  border-radius: 5px;
  margin-right: 20px;
}

.product-title {
  font-size: 18px;
  margin-bottom: 5px;
}

.product-price {
  font-weight: bold;
  color: #007bff;
}

.product-description {
  font-size: 14px;
  color: #555;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  width: 70%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
</style>
