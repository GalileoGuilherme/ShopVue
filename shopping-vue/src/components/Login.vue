<template>
  <!-- Container para a página de login -->
  <div class="login-container">
    <!-- Título da página de login -->
    <h2 class="login-title">Login</h2>
    <!-- Formulário de login -->
    <form class="login-form">
      <!-- Campo de entrada para o nome de usuário -->
      <div class="form-group">
        <label for="username">Nome de Usuário:</label>
        <input
          v-model="username"
          type="text"
          id="username"
          placeholder="Nome de usuário"
        />
      </div>
      <!-- Campo de entrada para a senha -->
      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Senha"
        />
      </div>
      <!-- Botão para acionar a função de login -->
      <button @click="login" class="login-button">Login</button>
    </form>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      // Dados do formulário de login
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const validUser = true; // Simula a autenticação bem-sucedida

      if (validUser) {
        // Definir o usuário como autenticado no localStorage
        localStorage.setItem("userIsLoggedIn", true);

        // Redirecionar para a página inicial (rota "/")
        this.$router.push("/");
      } else {
        // Exibir um alerta em caso de falha no login
        alert("Login falhou. Verifique suas credenciais.");
      }
    },
  },
};
</script>
  
<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.login-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.login-button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #2e865f;
}
</style>
