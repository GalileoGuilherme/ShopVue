<template>
  <div class="view">
    <h3 class="page-title">BackOffice</h3>
    <!-- Exibição do título "BackOffice" -->
    
    <div v-if="loading" class="loader">Carregando...</div>
    <!-- Se a variável 'loading' for verdadeira, exibe "Carregando..." -->
    
    <!-- Grid de produtos -->
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <!-- Loop por cada produto em 'products', usando 'product' como item atual -->
        
        <input
          type="checkbox"
          v-model="selectedProducts"
          :value="product"
          class="product-checkbox"
        />
        <!-- Cria um checkbox com 'v-model' vinculado a 'selectedProducts' e 'value' definido como 'product' -->
        
        <div class="product-details">
          <img
            :src="product.image"
            alt="Imagem do produto"
            class="product-image"
          />
          <!-- Exibe a imagem do produto com o atributo 'src' baseado em 'product.image' -->
          
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <!-- Exibe o título do produto -->
            
            <p class="product-description">{{ product.description }}</p>
            <!-- Exibe a descrição do produto -->
            
            <p class="product-price">R$ {{ product.price }}</p>
            <!-- Exibe o preço do produto com "R$" antes do valor -->
          </div>
        </div>
        
        <button @click="editProduct(product)" class="edit-button">
          Editar
        </button>
        <!-- Cria um botão 'Editar' que chama a função 'editProduct' com o produto como parâmetro ao ser clicado -->
      </div>
    </div>

    <LeftMenu
      v-if="!userIsLoggedIn"
      :selectedProducts="selectedProducts"
      @send-products="sendSelectedProducts"
      @update-data-with-api="fetchProductsFromApi"
      @add-product="addProduct"
    />
    <!-- Componente personalizado 'LeftMenu' com propriedades condicionais e eventos personalizados -->

    <RightMenu />
    <!-- Componente personalizado 'RightMenu' -->

    <!-- Modal de adição/edição de produtos -->
    <div v-if="isProductFormVisible" class="product-form">
      <!-- Se 'isProductFormVisible' for verdadeira, exibe o formulário -->
      
      <div class="modal-content">
        <h2>{{ editMode ? "Editar Produto" : "Adicionar Produto" }}</h2>
        <!-- Exibe "Editar Produto" se 'editMode' for verdadeira, senão exibe "Adicionar Produto" -->
        
        <form @submit.prevent="saveProduct">
          <!-- Formulário com evento para prevenir a submissão padrão -->
          
          <div class="form-group">
            <label for="title">Título:</label>
            <input type="text" v-model="product.title" id="title" required />
            <!-- Campo de entrada de texto para o título do produto -->
          </div>
          
          <div class="form-group">
            <label for="description">Descrição:</label>
            <textarea v-model="product.description" id="description"></textarea>
            <!-- Campo de entrada de texto (área de texto) para a descrição do produto -->
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
            <!-- Campo de entrada de texto para o preço do produto com validação no evento 'input' -->
          </div>
          
          <div class="form-group">
            <label for="image">Imagem:</label>
            <input
              type="file"
              @change="onImageChange"
              id="image"
              accept="image/*"
            />
            <!-- Campo de entrada para seleção de imagem -->
            <img
              :src="product.image"
              alt="Imagem do produto"
              class="product-image"
            />
          </div>
          
          <div class="form-actions">
            <button type="submit" class="edit-button">
              {{ editMode ? "Salvar" : "Adicionar" }}
            </button>
            <!-- Botão 'Salvar' ou 'Adicionar' com base na variável 'editMode' -->
            
            <button class="edit-button-cancel" @click="closeProductForm">
              Cancelar
            </button>
            <!-- Botão para fechar o formulário de produto -->
          </div>
        </form>
      </div>
    </div>
    
    <div class="snackbar" :class="{ show: snackbarVisible }">
      {{ snackbarText }}
    </div>
    <!-- Exibe uma barra de notificação ('snackbar') com base na variável 'snackbarVisible' -->
  </div>
</template>


<script>
import axios from "axios";
import LeftMenu from "@/components/LeftMenu.vue";
import RightMenu from "@/components/RightMenu.vue";

export default {
  components: {
    LeftMenu,
    RightMenu,
  },
  data() {
    return {
      addedProducts: [],
      products: [],
      selectedProducts: [],
      loading: false,
      isProductFormVisible: false,
      product: {
        id: null,
        title: "",
        description: "",
        price: 0,
        image: "",
      },
      snackbarText: "",
      snackbarVisible: false,
      editMode: false,
      shouldUpdateData: false,
      userIsLoggedIn: false,
    };
  },
  mounted() {
    // Recupera os produtos(compras finalizadas) do localStorage ao carregar a página
    const storedAddedProducts = localStorage.getItem("addedProducts");
    if (storedAddedProducts) {
      this.addedProducts = JSON.parse(storedAddedProducts);
    }

    // Carregue os produtos da API
    this.fetchProductsFromApi();

    // Carregar produtos selecionados do localStorage
    const storedSelectedProducts = localStorage.getItem("selectedProducts");
    if (storedSelectedProducts) {
      this.selectedProducts = JSON.parse(storedSelectedProducts);
    }
  },
  methods: {
    async fetchProducts() {
      // método para buscar produtos
      this.loading = true;
      try {
        if (this.shouldUpdateData) {
          const response = await axios.get("https://fakestoreapi.com/products");
          this.products = response.data;
          localStorage.setItem("products", JSON.stringify(this.products));
        } else {
          // Se shouldUpdateData for falso, busque os dados do localStorage
          const storedProducts = localStorage.getItem("products");
          if (storedProducts) {
            this.products = JSON.parse(storedProducts);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar a lista de produtos:", error);
      } finally {
        this.loading = false;
      }
    },

    addProductToLocalStorage(product) {
      //método para adicionar produtos ao localStorage
      this.addedProducts.push(product);
      localStorage.setItem("addedProducts", JSON.stringify(this.addedProducts));
    },

    updateSelectedProducts() {
      // método para atualizar produtos selecionados no localStorage
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(this.selectedProducts)
      );
    },

    addProduct(newProduct) {
      // Adicionar o novo produto ao início da lista de produtos
      this.products.unshift(newProduct);

      // Salvar a lista atualizada no localStorage
      localStorage.setItem("products", JSON.stringify(this.products));
    },

    openProductForm() {
      // método para abrir o formulário de produto
      this.isProductFormVisible = true;
      this.editMode = false;
      this.resetForm();
    },
    closeProductForm() {
      // método para fechar o formulário de produto
      this.isProductFormVisible = false;
      this.resetForm();
    },
    resetForm() {
      // método para redefinir o formulário de produto
      this.product = {
        id: null,
        title: "",
        description: "",
        price: 0,
        image: "",
      };
    },
    onImageChange(event) {
      // método para lidar com a mudança de imagem
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
      // método para salvar um produto
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
      //método para editar um produto
      this.product = { ...product };
      this.editMode = true;
      this.isProductFormVisible = true;
    },
    validatePrice() {
      //método para validar o preço
      //verificar se o valor é um número válido
      const validPricePattern = /^\d+(\.\d{1,2})?$/;
      if (!validPricePattern.test(this.product.price)) {
        this.product.price = "0";
      }
    },
    showSnackbar(message) {
      //método para exibir a barra de notificação
      this.snackbarText = message;
      this.snackbarVisible = true;

      // Esconder a Snackbar após 4 segundos
      setTimeout(() => {
        this.snackbarVisible = false;
      }, 4000);
    },
    sendSelectedProducts() {
      //método para enviar produtos selecionados

      // console.log("sendSelectedProducts");
      // Filtra apenas os produtos selecionados
      const selectedProducts = this.products.filter((product) =>
        this.selectedProducts.includes(product)
      );

      // Armazena os produtos selecionados no localStorage
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(selectedProducts)
      );

      // Atualiza a variável selectedProducts local
      this.selectedProducts = selectedProducts;
      console.log("produtos enviados", this.selectedProducts);

      // Exibe a Snackbar com a mensagem de sucesso
      this.showSnackbar("Produtos selecionados enviados com sucesso!");
    },

    async fetchProductsFromApi() {
      // método para buscar produtos da API
      this.loading = true;
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = response.data;

        // Atualiza os dados armazenados localmente
        localStorage.setItem("products", JSON.stringify(this.products));
      } catch (error) {
        console.error("Erro ao buscar a lista de produtos da API:", error);
      } finally {
        this.loading = false;
      }
    },
    handleSendProducts() {
      // lógica para enviar os produtos selecionados
      const selectedProducts = this.products.filter((product) =>
        this.selectedProducts.includes(product)
      );
      this.$store.dispatch("products/updateSelectedProducts", selectedProducts);
    },
  },
};
</script>

<style scoped>
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

.page-title {
  text-align: center; /* Centraliza o texto horizontalmente */
  margin-top: 0; /* Remove a margem superior padrão */
  padding-top: 20px; /* Adiciona espaço superior para centralizar verticalmente */
  padding-bottom: 20px;
  margin-right: 170px;
}


.form-group button {
  margin-top: 10px;
}

.product-grid {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-right: 170px;
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
  color: #42b983;
}

.edit-button {
  margin-top: 10px;
  background-color: #42b983;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}

.loader {
  margin-right: 170px;
}
.edit-button-cancel {
  margin-top: 10px;
  background-color: #42b983;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 5px;
}

.edit-button:hover {
  background-color: #2e865f;
}
.view {
  margin-left: 170px;
}

.snackbar {
  display: none;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #42b983;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.snackbar.show {
  display: block;
}
</style>
