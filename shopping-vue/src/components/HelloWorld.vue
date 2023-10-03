
<template>
  <div>
    <div class="product-grid">
      <div
        v-for="product in getSelectedProducts"
        :key="product.id"
        class="product-item"
      >
        <img :src="product.image" :alt="product.title" class="product-image" />
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">R$ {{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("products", ["updateSelectedProducts"]),
  },
  computed: {
    ...mapGetters("products", ["getSelectedProducts"]),
  },
};
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-item {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
}

.product-title {
  font-size: 18px;
  margin-top: 10px;
}

.product-description {
  margin-top: 5px;
}

.product-price {
  font-weight: bold;
  margin-top: 5px;
}
</style>
