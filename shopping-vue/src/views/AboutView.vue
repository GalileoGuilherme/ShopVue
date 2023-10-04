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
      <h2>{{ editMode ? "Editar Produto" : "Adicionar Produto" }}</h2>
      <form @submit.prevent="saveProduct">
        <div class="form-group">
          <label for="title">Título:</label>
          <input type="text" v-model="product.title" id="title" required />
        </div>
        <div class="form-group">
          <label for="description">Descrição:</label>
          <textarea v-model="product.description" id="description"></textarea>
        </div>
        <div class="form-group">
          <label for="price">Preço:</label>
          <input type="text" v-model="product.price" id="price" required />
        </div>
        <div class="form-group">
          <label for="image">Imagem:</label>
          <input type="file" @change="onImageChange" id="image" accept="image/*" />
          <img :src="product.image" alt="Imagem do produto" class="product-image" />
        </div>
        <button type="submit">{{ editMode ? "Salvar" : "Adicionar" }}</button>
        <button @click="closeProductForm">Cancelar</button>
      </form>
    </div>

    <!-- Botão para enviar os dados -->
    <button @click="sendSelectedProducts">Enviar Produtos Selecionados</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      selectedProducts: [],
      loading: false,
      isProductFormVisible: false,
      product: {
        id: null,
        title: "",
        description: "",
        price: 0,
        image: "", // Adicionando a propriedade image
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
        id: null,
        title: "",
        description: "",
        price: 0,
        image: "",
      };
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.product.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveProduct() {
      if (this.editMode) {
        const editedProductIndex = this.products.findIndex(
          (p) => p.id === this.product.id
        );
        if (editedProductIndex !== -1) {
          this.products[editedProductIndex] = { ...this.product };
          localStorage.setItem("products", JSON.stringify(this.products));
        }
      } else {
        const newProduct = { ...this.product, id: Date.now() };
        this.products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(this.products));
      }
      this.closeProductForm();
    },
    editProduct(product) {
      this.product = { ...product };
      this.editMode = true;
      this.isProductFormVisible = true;
    },
    sendSelectedProducts() {
  // Filtrar apenas os produtos selecionados
  const selectedProducts = this.products.filter((product) =>
    this.selectedProducts.includes(product)
  );

  // Agora você pode enviar a lista de produtos selecionados para onde precisar,
  // como armazenamento local (LocalStorage) ou para o Vuex, dependendo da sua aplicação.
  console.log(selectedProducts);
  this.$store.dispatch("products/updateSelectedProducts", selectedProducts);
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
  flex-direction: column; /* Centralizar verticalmente */
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

.product-image {
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
}
</style>
