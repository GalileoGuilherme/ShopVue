<template>
    <div class="login-container">
      <h2 class="login-title">Login</h2>
      <form class="login-form">
        <div class="form-group">
          <label for="username">Nome de Usuário:</label>
          <input v-model="username" type="text" id="username" placeholder="Nome de usuário" />
        </div>
        <div class="form-group">
          <label for password>Senha:</label>
          <input v-model="password" type="password" id="password" placeholder="Senha" />
        </div>
        <button @click="login" class="login-button">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      login() {
        const validUser = true;
  
        if (validUser) {
          // Defina o usuário como autenticado no localStorage
          localStorage.setItem("userIsLoggedIn", true);
  
          // Redirecione para a página inicial ou para a rota original
          this.$router.push("/");
        } else {
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
  