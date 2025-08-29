<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/reading">Lecture</router-link></li>
        <li><router-link to="/custom-text">Texte Personnalisé</router-link></li>
        <li><router-link to="/configuration">Configuration</router-link></li>
      </ul>
    </nav>
    
    <main>
      <router-view />
    </main>
    
    <footer class="app-footer">
      <p>
        ⚠️ Application expérimentale • 
        <a href="https://github.com/jbdoumenjou/syllaboo" target="_blank" rel="noopener">Code source</a> • 
        Consultation d'un spécialiste recommandée
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

const { applyCurrentTheme } = useTheme()

// Apply saved theme on app startup
onMounted(() => {
  applyCurrentTheme()
})
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

.app-footer {
  background-color: var(--bg-secondary);
  padding: 1rem 2rem;
  text-align: center;
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.app-footer p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.app-footer a {
  color: var(--accent-primary);
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}
</style>