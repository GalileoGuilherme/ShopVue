<template>
  <div>
    <h1 class="header">{{ msg }}</h1>
    <div v-if="loading" class="loader">Carregando...</div>

    <!-- Seletor de produtos com caixas de seleção -->
    <div class="product-selector">
      <h2>Selecione os produtos para mostrar na view do cliente:</h2>
      <ul class="product-list">
        <li v-for="product in products" :key="product.id" class="product-item">
          <label>
            <input
              type="checkbox"
              v-model="selectedProducts"
              :value="product"
            />
            {{ product.title }}
          </label>
        </li>
      </ul>
    </div>

    <button @click="sendSelectedProducts">Enviar Produtos Selecionados</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
      showModal: false,
      selectedProducts: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = response.data;
      } catch (error) {
        console.error("Erro ao buscar a lista de produtos:", error);
      } finally {
        this.loading = false;
      }
    },
    sendSelectedProducts() {
      console.log(this.selectedProducts);
      this.$store.dispatch(
        "products/updateSelectedProducts",
        this.selectedProducts
      );
      // this.selectedProducts = [];
    },
    ...mapActions("selectedProducts", ["updateSelectedProducts"]),
  },
};
</script>


<style scoped>
.product-selector {
  text-align: left;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  max-height: 50px;
}

.product-item label {
  margin-left: 10px;
}

.header {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
  padding-left: 20px; /* Adicione um recuo à esquerda para os itens da lista */
}

.loader {
  text-align: center;
  font-size: 30px;
  margin-top: 50px;
}
</style>
