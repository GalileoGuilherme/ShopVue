<template>
  <div id="app">
    <nav class="header" :style="{ marginLeft: userIsLoggedIn ? '170px' : '0' }">
      <div class="left-header">
        <router-link to="/" class="header-link">ViewClient</router-link> |
        <router-link to="/backOffice" class="header-link"
          >BackOffice</router-link
        >
      </div>
      <div class="right-header">
        <button
          v-if="!userIsLoggedIn && $route.path !== '/login'"
          @click="login"
          class="login-button"
          :disabled="$route.path === '/login'"
        >
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
      userIsLoggedIn: false,
    };
  },
  watch: {
    $route(to) {
      if (to.path === "/login") {
        // Você está na página de login, desative o botão de login
        this.userIsLoggedIn = false;
      } else {
        // Não está na página de login, verifique o localStorage para atualizar o estado do usuário
        const userIsLoggedIn = localStorage.getItem("userIsLoggedIn");
        this.userIsLoggedIn = userIsLoggedIn === "true";
      }
    },
  },
  methods: {
    login() {
      const validUser = true;

      if (validUser) {
        localStorage.setItem("userIsLoggedIn", "true");
        this.userIsLoggedIn = true;

        // Verifique se o usuário não está já na rota raiz
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      } else {
        alert("Login falhou. Verifique suas credenciais.");
      }
    },

    logout() {
      this.userIsLoggedIn = false;
      localStorage.removeItem("userIsLoggedIn");
      this.$router.push("/login");
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
  /* margin-left: 170px; */
}

<style scoped>
/* Estilo quando o usuário está logado */
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


