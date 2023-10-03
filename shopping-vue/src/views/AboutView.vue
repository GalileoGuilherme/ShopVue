<template>
  <div>
    <div v-if="loading" class="loader">Carregando...</div>

    <!-- Seletor de produtos com caixas de seleção -->
    <div class="product-selector">
      <h2>Selecione os produtos para mostrar na view do cliente:</h2>
      <table class="product-table">
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <input
                type="checkbox"
                v-model="selectedProducts"
                :value="product"
              />
            </td>
            <td class="left-align">{{ product.title }}</td>
            <td>
              <button @click="editProduct(product)">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="openProductForm">Adicionar Produto</button>

    <!-- Modal de adição/edição de produtos -->
    <div v-if="isProductFormVisible" class="product-form">
      <!-- Resto do código do modal -->
    </div>

    <!-- Botão para enviar os dados -->
    <button @click="sendSelectedProducts">Enviar Produtos Selecionados</button>
  </div>
</template>




<script>
import axios from "axios";
// import { mapActions } from "vuex";

export default {

  data() {
    return {
      products: [],
      showModal: false,
      selectedProducts: [],
      loading: false,
      isProductFormVisible: false,
      product: {
        title: "",
        description: "",
        price: 0,
      },
      editMode: false,
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
    openProductForm() {
      this.isProductFormVisible = true;
      this.editMode = false;
      this.resetForm();
    },
    closeProductForm() {
      this.isProductFormVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.product = {
        title: "",
        description: "",
        price: 0,
      };
    },
    saveProduct() {
      if (this.editMode) {
        // Lógica para editar o produto
        // Implemente sua lógica de edição aqui
      } else {
        // Lógica para adicionar o produto
        // Implemente sua lógica de adição aqui

        // Após adicionar o produto, você pode atualizar a lista de produtos
        // Para este exemplo, vamos apenas adicionar o produto à lista
        this.products.push({ ...this.product });
      }

      // Feche o formulário após adicionar/editar o produto
      this.closeProductForm();
    },
    editProduct(product) {
      // Abra o formulário no modo de edição com os dados do produto selecionado
      this.product = { ...product };
      this.editMode = true;
      this.isProductFormVisible = true;
    },
    sendSelectedProducts() {
      // Lógica para enviar os produtos selecionados
      console.log(this.selectedProducts);
      this.$store.dispatch(
        "products/updateSelectedProducts",
        this.selectedProducts
      );
    },
  },
};
</script>

<style scoped>
/* Estilos CSS para o modal */
.product-form {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-table td:first-child {
  text-align: left;
}


.product-form h2 {
  text-align: center;
}

.product-form form {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 400px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group button {
  margin-top: 10px;
}
</style>
