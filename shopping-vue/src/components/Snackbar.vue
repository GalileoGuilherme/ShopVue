<template>
  <div class="snackbar" :class="{ show: isVisible }">{{ message }}</div>
</template>
  
  <script>
export default {
  data() {
    return {
      isVisible: false,
      message: "Logado com sucesso",
    };
  },
  created() {
    this.$root.$on("showSnackbar", () => {
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
      }, 3000);
    });
  },
};
</script>
  
  <style scoped>
.snackbar {
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
  display: none;
}

.snackbar.show {
  display: block;
}
</style>
  