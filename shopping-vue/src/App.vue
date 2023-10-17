<template>
  <div id="app">
    <nav class="header">
      <div class="left-header">
        <router-link to="/" class="header-link">ViewClient</router-link> |
        <router-link to="/backOffice" class="header-link"
          >BackOffice</router-link
        >
      </div>
      <div class="right-header">
        <button v-if="!userIsLoggedIn" @click="login" class="login-button">
          Login
        </button>
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
      userIsLoggedIn: false, // estado inicial do usuário como não logado
    };
  },
  created() {
    // Verifica o localStorage para determinar o estado do usuário no início
    
    const userIsLoggedIn = localStorage.getItem("userIsLoggedIn");
    this.userIsLoggedIn = userIsLoggedIn === "true";
  },

  methods: {
    login() {
      // Lógica de login - atualiza o estado do usuário
      this.userIsLoggedIn = true;
      localStorage.setItem("userIsLoggedIn", "true"); // Armazena o estado do usuário no localStorage
    },
    logout() {
    // Lógica de logout - atualiza o estado do usuário
    this.userIsLoggedIn = false;
    localStorage.removeItem('userIsLoggedIn'); // Remova o estado de autenticação do localStorage
    localStorage.removeItem('userCredentials'); // Limpe as credenciais do usuário, se estiverem armazenadas

    // Redirecione para a página de login
    this.$router.push('/login');
  },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  background-color: #42b983;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 170px;
}

.left-header {
  display: flex;
}

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
.logout-button:hover {
  color: #2c3e50;
}
</style>


