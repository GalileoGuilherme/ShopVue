<template>
  <div class="left-menu">
    <h3>Produtos Selecionados</h3>
    <ul>
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

    <button class="send-button" @click="updateDataWithApi">
      Atualizar lista de produtos com a API
    </button>
  </div>
</template>

<script>
export default {
  props: {
    selectedProducts: Array,
  },
  data() {
    return {
      // Create a copy of selectedProducts to work with
      selectedProductsCopy: [...this.selectedProducts],
    };
  },
  methods: {
    addNewProduct() {
      const newProduct = {
        id: Date.now(),
        title: "Novo Produto",
        description: "Descrição do Novo Produto",
        price: 0,
        image: "",
      };

      // Modify the copy, not the prop
      this.selectedProductsCopy.push(newProduct);

      // Emit an event to update the parent component
      this.$emit("add-product", newProduct);
    },

    sendSelectedProducts() {
      // Emit an event to notify the parent component
      this.$emit("send-products");
    },

    updateDataWithApi() {
      // Emit an event to notify the parent component
      this.$emit("update-data-with-api");
    },
  },
  mounted() {
    // You can initialize the selectedProductsCopy here if needed.
    // Recupere a lista de produtos selecionados do localStorage quando o componente é montado
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
