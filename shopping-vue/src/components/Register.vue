<template>
    <div>
      <h2>Registrar</h2>
      <input v-model="username" type="text" placeholder="Nome de usuário" />
      <input v-model="password" type="password" placeholder="Senha" />
      <button @click="register">Registrar</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      register() {
        // Armazena os dados do usuário no localStorage
        localStorage.setItem('userIsLoggedIn', 'true');
        localStorage.setItem('username', this.username);
        // Redireciona para a página inicial
        this.$router.push('/');
      },
    },
  };
  </script>
  