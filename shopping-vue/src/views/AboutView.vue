<template>
  <div class="view">
    <div v-if="loading" class="loader">Carregando...</div>

    <!-- Grid de produtos -->
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <input
          type="checkbox"
          v-model="selectedProducts"
          :value="product"
          class="product-checkbox"
        />
        <div class="product-details">
          <img :src="product.image" alt="Imagem do produto" class="product-image" />
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">R$ {{ product.price }}</p>
          </div>
        </div>
        <button @click="editProduct(product)" class="edit-button">Editar</button>
      </div>
    </div>

    <!-- Botão para enviar os dados -->
    <button class="edit-button" @click="sendSelectedProducts">Enviar Produtos Selecionados</button>
    <LeftMenu :selectedProducts="selectedProducts" @send-products="handleSendProducts"/>
    <!-- Modal de adição/edição de produtos -->
    <div v-if="isProductFormVisible" class="product-form">
      <div class="modal-content">
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
            <input
              type="text"
              v-model="product.price"
              id="price"
              required
              @input="validatePrice"
            />
          </div>
          <div class="form-group">
            <label for="image">Imagem:</label>
            <input type="file" @change="onImageChange" id="image" accept="image/*" />
            <img :src="product.image" alt="Imagem do produto" class="product-image" />
          </div>
          <div class="form-actions">
            <button type="submit">{{ editMode ? "Salvar" : "Adicionar" }}</button>
            <button @click="closeProductForm">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LeftMenu from "@/components/LeftMenu.vue";

export default {
  components: {
    LeftMenu,
  },
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
    validatePrice() {
      // Use uma expressão regular para verificar se o valor é um número válido
      const validPricePattern = /^\d+(\.\d{1,2})?$/;
      if (!validPricePattern.test(this.product.price)) {
        // Se não for um número válido, você pode exibir uma mensagem de erro ou tomar a ação apropriada.
        // Neste exemplo, apenas definimos o valor de preço para 0.
        this.product.price = "0";
      }
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
    handleSendProducts() {
    // Implemente a lógica para enviar os produtos selecionados aqui
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
}

.modal-content {
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
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

.product-grid {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-checkbox {
  margin-bottom: 10px;
}

.product-details {
  text-align: center;
}

.product-image {
  max-width: 100px;
  max-height: 100px;
}

.product-title {
  font-weight: bold;
  margin: 10px 0;
}

.product-price {
  font-weight: bold;
  color: #007bff; /* Cor azul para o preço */
}

.edit-button {
  margin-top: 10px;
  background-color: #007bff; /* Cor azul para o botão de editar */
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}

.edit-button:hover {
  background-color: #0056b3; /* Cor mais escura ao passar o mouse */
}
.view {
  margin-left: 170px;
}
</style>
