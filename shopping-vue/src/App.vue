<template>
  <div id="app">
    <nav class="header">
      <router-link to="/" class="header-link">ViewClient</router-link> |
      <router-link to="/about" class="header-link">BackOffice</router-link>
    </nav>
    <router-view/>
  </div>
</template>

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
  justify-content: center; 
  align-items: center; 
  margin-bottom: 20px;
  margin-left: 170px;
}

.header-link {
  font-weight: bold;
  color: #fff; 
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s;
}

.header-link:hover {
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #529e7c;
}
</style>
