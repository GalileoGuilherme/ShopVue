<template>
  <div>
    <!-- Renderize os produtos selecionados aqui -->
    <ul>
      <li v-for="product in getSelectedProducts" :key="product.id">
        {{ product.title }}
      </li>
    </ul>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    // Use mapActions para chamar a ação do Vuex para atualizar os produtos selecionados
    ...mapActions('products', ['updateSelectedProducts']),
  },
  computed: {
    // Use mapGetters para acessar os produtos selecionados do Vuex
    ...mapGetters('products', ['getSelectedProducts']),
  },
};
</script>
