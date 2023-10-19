<template>
    <div class="right-menu">
      <h3>Comparas finalizadas</h3>
      <ul>
        <li v-for="(product, index) in addedProducts" :key="index" class="added-product-item">
          <!-- <img :src="product.image" alt=""> -->
          {{ product.title }}
          <br> 
          <h4>R$ {{ formatPrice(product.price) }}</h4>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            addedProducts: []
        }
    },
    mounted() {
    // Recupera os produtos do localStorage ao carregar o componente
    const cartProductsJSON = localStorage.getItem("cartProducts");
    if (cartProductsJSON) {
      this.addedProducts = JSON.parse(cartProductsJSON);
    }
  },
    methods: {
      formatPrice(price) {
        return price.toFixed(2);
      },
    },
  };
  </script>
  
  <style scoped>
  .right-menu {
    background-color: #f0f0f0;
    padding: 10px;
    border-left: 1px solid #ccc;
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;
    width: 150px;
    overflow-y: auto;
    margin-bottom: 15px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  }
  
  .added-product-item {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  
  .added-product-item img {
    max-width: 80px;
  }
  </style>
  