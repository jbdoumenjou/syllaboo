<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/reading">Lecture</router-link></li>
        <li><router-link to="/configuration">Configuration</router-link></li>
      </ul>
    </nav>
    
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed for basic routing
</script>

<style>
@import './assets/main.css';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 2rem;
}
</style>