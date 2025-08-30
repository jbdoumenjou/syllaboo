<template>
  <div class="custom-text-page">
    <div class="page-header">
      <h1>📝 Texte Personnalisé</h1>
      <p class="page-description">
        Collez votre propre texte ici pour voir les sons colorés selon votre configuration.
      </p>
    </div>

    <div class="text-input-section">
      <div class="input-header">
        <h2>✏️ Votre Texte</h2>
        <div class="input-controls">
          <button @click="clearText" class="clear-btn" v-if="customText.length > 0">
            🗑️ Effacer
          </button>
          <button @click="loadSampleText" class="sample-btn">
            📄 Texte d'exemple
          </button>
        </div>
      </div>
      
      <textarea
        v-model="customText"
        placeholder="Tapez ou collez votre texte français ici...

Exemple : Il était une fois un petit chat qui aimait jouer dans sa maison rouge."
        class="text-input"
        rows="8"
      ></textarea>
      
      <div class="input-info">
        <span class="word-count">{{ wordCount }} mots • {{ characterCount }} caractères</span>
        <span class="tip">💡 Astuce : Utilisez Ctrl+A puis Ctrl+V pour coller rapidement</span>
      </div>
    </div>

    <div class="text-preview-section" v-if="customText.trim().length > 0">
      <div class="preview-header">
        <h2>🎨 Aperçu Coloré</h2>
        <div class="preview-controls">
          <button @click="copyColoredText" class="copy-btn">
            📋 Copier le résultat
          </button>
        </div>
      </div>
      
      <PhoneticText 
        :text="customText"
        :show-phonetic-legend="true"
      />
    </div>

    <div class="help-section" v-if="customText.trim().length === 0">
      <div class="help-card">
        <h3>🤔 Comment utiliser cette page ?</h3>
        <ol>
          <li><strong>Collez votre texte</strong> dans la zone de texte ci-dessus</li>
          <li><strong>Regardez l'aperçu</strong> avec les couleurs appliquées automatiquement</li>
          <li><strong>Personnalisez les couleurs</strong> dans la <router-link to="/configuration">page Configuration</router-link></li>
          <li><strong>Copiez le résultat</strong> si vous souhaitez l'utiliser ailleurs</li>
        </ol>
        
        <div class="examples">
          <h4>🎯 Idées de textes à essayer :</h4>
          <ul>
            <li>Textes de lecture de votre enfant</li>
            <li>Devoirs de français</li>
            <li>Livres ou histoires</li>
            <li>Exercices de phonétique</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import PhoneticText from '@/components/PhoneticText.vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

const { getItem, setItem } = useLocalStorage()
const CUSTOM_TEXT_KEY = 'syllaboo_custom_text'

// Initialize with saved text or empty string
const customText = ref(getItem<string>(CUSTOM_TEXT_KEY) || '')

const wordCount = computed(() => {
  return customText.value.trim() === '' ? 0 : customText.value.trim().split(/\s+/).length
})

const characterCount = computed(() => {
  return customText.value.length
})

function clearText() {
  customText.value = ''
}

function loadSampleText() {
  customText.value = `Il était une fois, dans un petit village près de la forêt, une jeune fille nommée Marie qui aimait beaucoup lire. Chaque jour, elle se rendait à la bibliothèque pour découvrir de nouvelles histoires.

Un matin, elle trouva un livre mystérieux aux pages jaunies. L'histoire parlait d'un château enchanté où vivaient des animaux qui pouvaient parler. Marie était si passionnée qu'elle lut le livre d'une traite.

Soudain, elle entendit une voix douce qui l'appelait : "Marie, veux-tu nous rejoindre dans notre monde magique ?" C'était le début de la plus belle aventure de sa vie.`
}

// Save text to localStorage whenever it changes
watch(customText, (newText) => {
  setItem(CUSTOM_TEXT_KEY, newText)
}, { deep: true })

async function copyColoredText() {
  try {
    await navigator.clipboard.writeText(customText.value)
    alert('✅ Texte copié dans le presse-papiers!')
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = customText.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('✅ Texte copié!')
  }
}
</script>

<style scoped>
.custom-text-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.page-description {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.text-input-section {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.input-header h2 {
  color: var(--accent-primary);
  margin: 0;
}

.input-controls {
  display: flex;
  gap: 1rem;
}

.clear-btn, .sample-btn, .copy-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.clear-btn {
  background-color: #e74c3c;
  color: white;
}

.clear-btn:hover {
  background-color: #c0392b;
}

.sample-btn, .copy-btn {
  background-color: var(--accent-primary);
  color: white;
}

.sample-btn:hover, .copy-btn:hover {
  background-color: #219a52;
}

.text-input {
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: var(--border-radius);
  font-family: var(--reading-font-family), monospace;
  font-size: 16px;
  line-height: 1.6;
  resize: vertical;
  background-color: white;
  color: var(--text-primary);
}

.text-input:focus {
  border-color: var(--accent-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
}

.input-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 14px;
  color: var(--text-secondary);
}

.word-count {
  font-weight: 500;
}

.tip {
  font-style: italic;
}

.text-preview-section {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.preview-header h2 {
  color: var(--accent-primary);
  margin: 0;
}

.preview-controls {
  display: flex;
  gap: 1rem;
}

.help-section {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow);
}

.help-card {
  max-width: 800px;
  margin: 0 auto;
}

.help-card h3 {
  color: var(--accent-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.help-card ol {
  margin-bottom: 2rem;
}

.help-card li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.examples {
  border-top: 1px solid #ddd;
  padding-top: 1.5rem;
}

.examples h4 {
  color: var(--accent-secondary);
  margin-bottom: 1rem;
}

.examples ul {
  list-style: none;
  padding: 0;
}

.examples li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.examples li::before {
  content: "•";
  color: var(--accent-primary);
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .custom-text-page {
    padding: 1rem;
  }
  
  .input-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .input-controls {
    width: 100%;
    justify-content: flex-end;
  }
  
  .preview-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .preview-controls {
    width: 100%;
    justify-content: center;
  }
  
  .input-info {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .text-input {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
</style>