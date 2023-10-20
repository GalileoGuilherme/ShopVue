<template>
  <div class="home">
    <ViewCLient msg="Lista de Produtos"/>
  </div>
</template>

<script>
import ViewCLient from '@/components/ViewClient.vue'

export default {
  name: 'HomeView',
  components: {
    ViewCLient
  }
}
</script>
