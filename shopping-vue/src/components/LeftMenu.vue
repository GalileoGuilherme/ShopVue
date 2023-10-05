<template>
    <div class="left-menu">
      <h3>Produtos Selecionados</h3>
      <ul>
        <li v-for="product in selectedProducts" :key="product.id">
          {{ product.title }}
        </li>
      </ul>
  
      <!-- Botão para enviar produtos selecionados -->
      <button class="send-button" @click="sendSelectedProducts">Enviar Produtos Selecionados</button>
      <button class="send-button" @click="updateDataWithApi">Atualizar dados com a API</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedProducts: Array,
    },
    methods: {
      sendSelectedProducts() {
        // Emita um evento para notificar o componente pai (onde o método `sendSelectedProducts` será chamado)
        this.$emit("send-products");
      },
      updateDataWithApi() {
      // Implemente a lógica para atualizar os dados com a API aqui
      this.$emit('update-data-with-api'); // Emita um evento para notificar o componente pai
    },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para o componente LeftMenu */
  .left-menu {
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
  
  .send-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .send-button:hover {
    background-color: #0056b3;
  }
  </style>
  