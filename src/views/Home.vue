<template>
  <div class="container">
    <h1>Bienvenue sur Syllaboo!</h1>
    <p class="welcome-text">
      Une application conçue spécialement pour aider les enfants dyslexiques à apprendre à lire.
    </p>
    
    <div class="disclaimer">
      ⚠️ Cette application est expérimentale. Les méthodes utilisées n'ont pas encore été validées par des spécialistes. 
      Consultez un professionnel pour un accompagnement adapté.
    </div>
    
    <div class="features">
      <div class="feature">
        <h3>🎨 Couleurs des Sons</h3>
        <p>Chaque son a sa propre couleur pour faciliter l'apprentissage</p>
      </div>
      
      <div class="feature">
        <h3>🔊 Lecture Audio</h3>
        <p>Écoutez les mots et les phrases pour mieux comprendre</p>
      </div>
      
      <div class="feature">
        <h3>👁️ Police Adaptée</h3>
        <p>Police OpenDyslexic spécialement conçue pour la dyslexie</p>
      </div>
    </div>
    
    <div class="action-buttons">
      <router-link to="/reading">
        <button class="start-button">Commencer la lecture</button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home page component
</script>

<style scoped>
.welcome-text {
  font-size: 20px;
  text-align: center;
  margin: 2rem 0;
  color: var(--text-secondary);
}

.disclaimer {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: var(--border-radius);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 600px;
  font-size: 0.95rem;
  color: #856404;
  text-align: center;
  line-height: 1.5;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.feature {
  background-color: var(--bg-secondary);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
}

.feature h3 {
  color: var(--accent-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.action-buttons {
  text-align: center;
  margin: 3rem 0;
}

.start-button {
  font-size: 20px;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border: none;
  border-radius: var(--border-radius);
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.start-button:hover {
  transform: scale(1.05);
}

a {
  text-decoration: none;
}
</style>