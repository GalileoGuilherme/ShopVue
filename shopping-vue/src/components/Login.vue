<template>
    <div class="login-container">
      <h2>Login</h2>
      <input v-model="username" type="text" placeholder="Nome de usuário" />
      <input v-model="password" type="password" placeholder="Senha" />
      <button @click="login">Login</button>
  
      <!-- Snackbar para exibir a mensagem de login realizado com sucesso -->
      <div class="snackbar" :class="{ show: loginSuccess }">{{ snackbarMessage }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        loginSuccess: false, // Adicione esta variável
        snackbarMessage: 'Login realizado com sucesso!', // Mensagem da snackbar
      };
    },
    methods: {
      login() {
        // Verifique as credenciais do usuário (substitua por sua lógica real)
        const validUser = true; // Substitua por sua lógica real
  
        if (validUser) {
          // Defina o usuário como autenticado no localStorage
          localStorage.setItem('userIsLoggedIn', 'true');
          // Redirecione para a página inicial ou para a rota original
          this.$router.push('/');
  
          // Mostrar o snackbar
          this.loginSuccess = true;
  
          // Ocultar o snackbar após 3 segundos (3000 milissegundos)
          setTimeout(() => {
            this.loginSuccess = false;
          }, 3000);
        } else {
          alert('Login falhou. Verifique suas credenciais.');
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
  
  /* Estilos para o snackbar */
  .snackbar {
    display: none;
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #42b983;
    color: white;
    padding: 15px;
    border-radius: 5px;
    z-index: 1;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
  
  .snackbar.show {
    display: block;
  }
  </style>
  