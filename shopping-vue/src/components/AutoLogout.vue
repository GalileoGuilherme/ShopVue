<template>
    <div v-if="showLogoutWarning" class="auto-logout">
      <p>Você será desconectado em {{ timeLeft }} segundos devido à inatividade.</p>
      <button @click="loginAgain">Fazer login novamente</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showLogoutWarning: false,
        timeLeft: 60, // Tempo em segundos até o logout automático
        intervalId: null,
      };
    },
    mounted() {
      // Iniciar a contagem regressiva
      this.startCountdown();
    },
    methods: {
      startCountdown() {
        this.intervalId = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            // Tempo esgotado, solicite login novamente
            this.showLogoutWarning = true;
            clearInterval(this.intervalId);
          }
        }, 1000); // A cada 1 segundo
      },
      loginAgain() {
        // Redirecione para a página de login
        this.$router.push('/login');
      },
    },
    beforeDestroy() {
      // Limpe o intervalo quando o componente for destruído
      clearInterval(this.intervalId);
    },
  };
  </script>
  
  <style scoped>
  .auto-logout {
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: #f44336;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  