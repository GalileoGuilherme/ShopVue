<template>
    <div class="left-menu-cart">
      <h2>Carrinho de Compras</h2>
      <ul>
        <li v-for="product in cartProducts" :key="product.id">
          {{ product.title }} - R$ {{ formatPrice(product.price) }}
        </li>
      </ul>
      <p>Total: R$ {{ formatPrice(totalPrice) }}</p>
      <button @click="finalizePurchase">Finalizar Compras</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedProducts: Array,
      totalPrice: Number,
      cartProducts: Object,
    },
    methods: {
      finalizePurchase() {
        // Implemente a lógica para finalizar a compra aqui
        // Por exemplo, você pode limpar o carrinho de compras
        this.$emit("clear-cart"); // Emitir um evento para o componente pai limpar o carrinho
      },
      showAddedProductsToConsole() {
        // Mostrar os produtos no console
        console.log("Produtos no carrinho left:", this.selectedProducts);
      },
      formatPrice(price) {
        // Formate o preço para duas casas decimais
        return price.toFixed(2);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para o carrinho de compras */
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
  }
  
  .left-menu-cart button {
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .left-menu-cart button:hover {
    background-color: #0056b3;
  }
  </style>
  