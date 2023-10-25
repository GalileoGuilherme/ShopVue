<template>
  <div id="app">
    <nav class="header" :style="headerStyles">
      <div class="left-header">
        <!-- Links de navegação para diferentes páginas -->
        <router-link to="/" class="header-link">ViewClient</router-link> |
        <router-link to="/backOffice" class="header-link">BackOffice</router-link>
      </div>
      <div class="right-header">
        <!-- Botão de login, exibido se o usuário não estiver logado -->
        <button
          v-if="!userIsLoggedIn && $route.path !== '/login'"
          @click="login"
          class="login-button"
          :disabled="$route.path === '/login'"
        >
          Login
        </button>
        <!-- Botão de logout, exibido se o usuário estiver logado -->
        <button v-if="userIsLoggedIn" @click="logout" class="logout-button">
          Logout
        </button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userIsLoggedIn: false, // Inicializa a variável que verifica se o usuário está logado
    };
  },
  watch: {
    $route(to) {
      if (to.path === "/login") {
        // Se a rota for a página de login, desativa o botão de login
        this.userIsLoggedIn = false;
      } else {
        // Se não estiver na página de login, verifica o localStorage para atualizar o estado do usuário
        const userIsLoggedIn = localStorage.getItem("userIsLoggedIn");
        this.userIsLoggedIn = userIsLoggedIn === "true";
      }
    },
  },
  computed: {
    headerStyles() {
      // Estilos condicionais do cabeçalho com base no estado do usuário e na rota atual
      return {
        marginLeft:
          this.userIsLoggedIn && this.$route.path === "/backOffice"
            ? "170px"
            : "0",
        marginRight: this.$route.path === "/backOffice" ? "170px" : "0",
      };
    },
  },
  methods: {
    login() {
      const validUser = true; // Verificar se o usuário é válido(Obs. o usuário sempre será válido)

      // Define o estado do usuário como logado
      this.userIsLoggedIn = true;

      if (validUser) {
        localStorage.setItem("userIsLoggedIn", "true"); // Armazena o estado de login no localStorage
        this.userIsLoggedIn = true;

        // Verifica se o usuário não está já na rota raiz
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      } else {
        alert("Login falhou. Verifique suas credenciais.");
      }
    },

    logout() {
      // Define o estado do usuário como deslogado
      this.userIsLoggedIn = false;

      // Remove o estado de login do localStorage
      localStorage.removeItem("userIsLoggedIn");

      // Redireciona o usuário para a página de login
      this.$router.push("/login");
    },
  },
};
</script>

<style>
/* Estilos gerais da página */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Estilos do cabeçalho */
.header {
  background-color: #42b983;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 170px; /* Adiciona margem à esquerda quando o usuário está logado */
}

.left-header {
  display: flex;
}

/* Estilos dos links de navegação no cabeçalho */
.header-link {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s;
}

.right-header {
  display: flex;
}

/* Estilos dos botões de login e logout */
.login-button,
.logout-button {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.login-button:hover,
logout-button:hover {
  color: #2c3e50; /* Cor do texto ao passar o mouse sobre os botões */
}
</style>
