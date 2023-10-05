<template>
    <div class="left-menu">
      <h3>Produtos Selecionados</h3>
      <ul>
        <li v-for="product in selectedProducts" :key="product.id">
          {{ product.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedProducts: Array,
    },
  };
  </script>
  
  <style scoped>
  .left-menu {
    background-color: #f0f0f0;
    padding: 10px;
    border-right: 1px solid #ccc;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    width: 250px;
    overflow-y: auto;
  }
  
  .left-menu h3 {
    margin-top: 0;
  }
  
  .left-menu ul {
    list-style-type: none;
    padding: 0;
  }
  
  .left-menu li {
    margin-bottom: 5px;
  }
  </style>
  