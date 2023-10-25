<template>
  <div class="left-menu">
    <h3>Produtos Selecionados</h3>
    <ul>
      <!-- Itera sobre os produtos selecionados e exibe cada um -->
      <li v-for="(product, index) in selectedProducts" :key="product.id">
        <div class="marker">{{ index + 1 }}</div> {{ product.title }}
      </li>
    </ul>

    <!-- Botão para enviar produtos selecionados -->
    <button class="send-button" @click="sendSelectedProducts">
      Enviar Produtos Selecionados
    </button>

    <!-- Botão para adicionar um novo produto -->
    <button class="send-button" @click="addNewProduct">
      Adicionar Produto
    </button>

    <!-- Botão para atualizar a lista de produtos com dados da API -->
    <button class="send-button" @click="updateDataWithApi">
      Atualizar lista de produtos com a API
    </button>
  </div>
</template>

<script>
export default {
  props: {
    selectedProducts: Array, // Define uma prop chamado selectedProducts que é um array
  },
  data() {
    return {
      // Cria uma cópia de selectedProducts para trabalhar com ela
      selectedProductsCopy: [...this.selectedProducts],
    };
  },
  methods: {
    addNewProduct() {
      // Cria um novo produto
      const newProduct = {
        id: Date.now(),
        title: "Novo Produto",
        description: "Descrição do Novo Produto",
        price: 0,
        image: "",
      };

      // Modifica a cópia, não a prop original
      this.selectedProductsCopy.push(newProduct);

      // Emite um evento para atualizar o componente pai
      this.$emit("add-product", newProduct);
    },

    sendSelectedProducts() {
      // Emite um evento para notificar o componente pai
      this.$emit("send-products");
    },

    updateDataWithApi() {
      // Emite um evento para notificar o componente pai
      this.$emit("update-data-with-api");
    },
  },
  mounted() {
    // Recupera a lista de produtos selecionados do localStorage quando o componente é montado
    const storedSelectedProducts = localStorage.getItem("selectedProducts");
    if (storedSelectedProducts) {
      this.selectedProductsCopy = JSON.parse(storedSelectedProducts);
    }
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
  width: 150px;
  overflow-y: auto;
}

.left-menu h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.left-menu ul {
  list-style-type: none;
  padding: 0;
}

.left-menu li {
  margin-bottom: 5px;
}

.send-button {
  background-color: #42b983;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.send-button:hover {
  background-color: #2e865f;
}

.marker {
  width: 20px;
  height: 20px;
  background-color: #42b983;
  color: #fff;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
