<template>
  <div class="config-layout">
    <div class="config-panel">
      <h1>⚙️ Configuration des Sons</h1>
      <p class="subtitle">Personnalisez les couleurs et les sons</p>
    
    <!-- Global Settings -->
    <div class="settings-section">
      <h2>🎛️ Paramètres Généraux</h2>
      
      <div class="setting-row">
        <label class="setting-label">
          <input 
            type="checkbox" 
            v-model="settings.globalEnabled"
            class="checkbox"
          />
          Activer la coloration des sons
        </label>
      </div>
      
      <div class="setting-row">
        <label class="setting-label">
          <input 
            type="checkbox" 
            v-model="settings.showLegend"
            class="checkbox"
          />
          Afficher la légende des couleurs
        </label>
      </div>
      
      <div class="setting-row">
        <label class="setting-label">
          Mode de coloration:
        </label>
        <select v-model="settings.colorMode" class="font-selector">
          <option value="zone">🎨 Zone colorée (arrière-plan)</option>
          <option value="character">✏️ Caractères colorés</option>
        </select>
      </div>
      
      <div class="setting-row">
        <label class="setting-label">
          Taille de police: {{ settings.fontSize }}px
        </label>
        <input 
          type="range" 
          min="12" 
          max="48" 
          v-model.number="settings.fontSize"
          class="slider"
        />
      </div>
      
      <div class="setting-row">
        <label class="setting-label">
          Espacement des lignes: {{ settings.lineHeight.toFixed(1) }}
        </label>
        <input 
          type="range" 
          min="1.0" 
          max="4.0" 
          step="0.1"
          v-model.number="settings.lineHeight"
          class="slider"
        />
      </div>
      
      <div class="setting-row">
        <label class="setting-label">
          Espacement entre les mots: {{ settings.wordSpacing }}px
        </label>
        <input 
          type="range" 
          min="4" 
          max="20" 
          v-model.number="settings.wordSpacing"
          class="slider"
        />
      </div>
      
      <div class="setting-row">
        <label class="setting-label">
          Espacement entre les lettres: {{ settings.letterSpacing.toFixed(1) }}px
        </label>
        <input 
          type="range" 
          min="0" 
          max="3" 
          step="0.1"
          v-model.number="settings.letterSpacing"
          class="slider"
        />
      </div>
      
      <div class="setting-row">
        <label class="setting-label">
          Police de caractères
        </label>
        <select v-model="selectedFont" @change="updateFont" class="font-selector">
          <option value="OpenDyslexic">OpenDyslexic ⭐ (Dyslexie)</option>
          <option value="Comic Neue">Comic Neue ⭐ (Dyslexie)</option>
          <option value="Verdana">Verdana (Recommandée)</option>
          <option value="Arial">Arial</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>
      
      <div class="setting-row">
        <label class="setting-label">
          Thème de couleurs (recherche scientifique)
        </label>
        <select v-model="selectedTheme" @change="updateTheme" class="theme-selector">
          <option value="cream">🧈 Crème (par défaut)</option>
          <option value="turquoise">🌊 Turquoise ⭐ (Durée de lecture optimale)</option>
          <option value="yellow">🌞 Jaune ⭐ (Vitesse de lecture améliorée)</option>
          <option value="blue-pastel">💙 Bleu pastel ⭐ (Recherche française)</option>
          <option value="green-brown">🌲 Vert-Marron (Alternative)</option>
        </select>
      </div>
    </div>
    
    <!-- Sound Configuration -->
    <div class="settings-section">
      <h2>🎨 Configuration des Sons</h2>
      <p class="section-description">
        Choisissez quels sons colorier et personnalisez leurs couleurs. 
        Les sons sont basés sur la méthode française d'apprentissage phonétique.
      </p>
      
      <div class="sounds-grid">
        <div 
          v-for="sound in Object.values(settings.sounds)" 
          :key="sound.id"
          class="sound-card"
          :class="{ 'disabled': !sound.enabled }"
        >
          <div class="sound-header">
            <h3>{{ sound.name }}</h3>
            <label class="switch">
              <input 
                type="checkbox" 
                v-model="sound.enabled"
              />
              <span class="switch-slider"></span>
            </label>
          </div>
          
          <p class="sound-description">{{ sound.description }}</p>
          
          <div class="sound-examples">
            <strong>Exemples:</strong>
            <div class="examples-list">
              <span 
                v-for="example in sound.examples" 
                :key="example"
                class="example-word"
                :style="{ 
                  backgroundColor: sound.enabled ? sound.color : '#ccc',
                  color: getTextColor(sound.color)
                }"
              >
                {{ example }}
              </span>
            </div>
          </div>
          
          <div v-if="sound.enabled" class="color-picker-section">
            <label class="color-label">Couleur:</label>
            <div class="color-controls">
              <input 
                type="color" 
                v-model="sound.color"
                @input="(e) => updateSoundConfig(sound.id, { color: (e.target as HTMLInputElement).value })"
                class="color-picker"
              />
              <button 
                @click="resetSoundColor(sound.id)"
                class="reset-color-btn"
                title="Remettre la couleur par défaut"
              >
                🔄
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    <!-- Actions -->
    <div class="settings-section">
      <h2>🔧 Actions</h2>
      <div class="action-buttons">
        <button @click="resetAllSettingsWithTheme" class="reset-btn">
          🔄 Remettre par défaut
        </button>
        <button @click="exportSettings" class="export-btn">
          📥 Exporter la configuration
        </button>
        <button @click="importSettings" class="import-btn">
          📤 Importer une configuration
        </button>
      </div>
    </div>
    </div>
    
    <div class="preview-panel">
      <div class="preview-header">
        <h2>👀 Aperçu en direct</h2>
        <p class="preview-description">Les modifications s'appliquent immédiatement</p>
      </div>
      
      <div class="live-preview">
        <PhoneticText 
          :text="previewText"
          :show-phonetic-legend="settings.showLegend"
        />
      </div>
      
      <div class="preview-info">
        <h3>Paramètres actuels :</h3>
        <ul>
          <li>Police : {{ currentFont }}</li>
          <li>Thème : {{ currentTheme }}</li>
          <li>Mode couleur : {{ settings.colorMode === 'zone' ? 'Zone colorée' : 'Caractères colorés' }}</li>
          <li>Taille : {{ settings.fontSize }}px</li>
          <li>Espacement mots : {{ settings.wordSpacing }}px</li>
          <li>Espacement lettres : {{ settings.letterSpacing }}px</li>
          <li>Hauteur lignes : {{ settings.lineHeight }}</li>
          <li>Sons actifs : {{ enabledSoundsCount }}/{{ totalSoundsCount }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useSettings } from '@/composables/useSettings'
import { useTheme } from '@/composables/useTheme'
import PhoneticText from '@/components/PhoneticText.vue'

const { 
  settings, 
  updateSoundConfig, 
  toggleSound, 
  resetSoundColor, 
  resetAllSettings,
  enabledSounds 
} = useSettings()

const { setTheme, applyCurrentTheme } = useTheme()

// Preview text for live demonstration
const previewText = ref("Il était une fois un petit chat qui aimait jouer dans sa maison rouge. L'oiseau bleu chantait près du point d'eau, tandis que les enfants couraient dans le jardin.")

const selectedFont = ref("OpenDyslexic")
const selectedTheme = ref(settings.value.theme)

const currentFont = computed(() => {
  const fontMap: Record<string, string> = {
    'OpenDyslexic': 'OpenDyslexic ⭐ (Dyslexie)',
    'Comic Neue': 'Comic Neue ⭐ (Dyslexie)', 
    'Verdana': 'Verdana (Recommandée)',
    'Arial': 'Arial',
    'Tahoma': 'Tahoma',
    'Georgia': 'Georgia',
    'Times New Roman': 'Times New Roman'
  }
  return fontMap[selectedFont.value] || selectedFont.value
})

const currentTheme = computed(() => {
  const themeMap: Record<string, string> = {
    'cream': '🧈 Crème (par défaut)',
    'turquoise': '🌊 Turquoise ⭐ (Durée de lecture optimale)',
    'yellow': '🌞 Jaune ⭐ (Vitesse de lecture améliorée)', 
    'blue-pastel': '💙 Bleu pastel ⭐ (Recherche française)',
    'green-brown': '🌲 Vert-Marron (Alternative)'
  }
  return themeMap[selectedTheme.value] || selectedTheme.value
})

const enabledSoundsCount = computed(() => enabledSounds.value.length)
const totalSoundsCount = computed(() => Object.keys(settings.value.sounds).length)

function updateFont() {
  // This will be handled by CSS custom properties
  document.documentElement.style.setProperty('--reading-font-family', selectedFont.value)
}

function updateTheme() {
  // Use the centralized theme system
  setTheme(selectedTheme.value)
}

function resetAllSettingsWithTheme() {
  // Reset settings to defaults
  resetAllSettings()
  
  // Update UI state to match defaults
  selectedTheme.value = 'cream'
  selectedFont.value = 'OpenDyslexic'
  
  // Apply default theme immediately
  applyCurrentTheme()
  
  // Show confirmation
  alert('✅ Configuration remise aux valeurs par défaut!')
}


const previewStyles = computed(() => ({
  fontSize: `${settings.value.fontSize}px`,
  lineHeight: settings.value.lineHeight.toString(),
  wordSpacing: `${settings.value.wordSpacing}px`,
  letterSpacing: `${settings.value.letterSpacing}px`
}))

function getTextColor(backgroundColor: string): string {
  // Simple function to determine if text should be white or black based on background
  const hex = backgroundColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#000000' : '#FFFFFF'
}

function exportSettings() {
  try {
    const settingsJson = JSON.stringify(settings.value, null, 2)
    const blob = new Blob([settingsJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'syllaboo-configuration.json'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    // Show success message
    alert('✅ Configuration exportée avec succès!')
  } catch (error) {
    console.error('Export error:', error)
    alert('❌ Erreur lors de l\'exportation')
  }
}

function importSettings() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.style.display = 'none'
  
  input.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string)
          
          // Validate imported settings structure
          if (typeof importedSettings !== 'object' || !importedSettings.sounds) {
            throw new Error('Format de fichier incorrect')
          }
          
          // Update settings and apply theme immediately
          Object.assign(settings.value, importedSettings)
          selectedTheme.value = settings.value.theme || 'cream'
          applyCurrentTheme()
          
          alert('✅ Configuration importée avec succès!')
          
        } catch (error) {
          console.error('Import error:', error)
          alert(`❌ Erreur lors de l'importation: ${error instanceof Error ? error.message : 'fichier non valide'}`)
        }
      }
      
      reader.onerror = () => {
        alert('❌ Erreur lors de la lecture du fichier')
      }
      
      reader.readAsText(file)
    }
  }
  
  document.body.appendChild(input)
  input.click()
  document.body.removeChild(input)
}

// Apply saved theme on component mount
onMounted(() => {
  applyCurrentTheme()
})
</script>

<style scoped>
.config-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  min-height: 100vh;
}

.config-panel {
  padding: 2rem;
  overflow-y: auto;
  background-color: var(--bg-primary);
}

.preview-panel {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background-color: var(--bg-secondary);
  border-left: 2px solid var(--accent-primary);
  padding: 2rem;
}

.subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.preview-header h2 {
  color: var(--accent-primary);
  margin-bottom: 0.5rem;
}

.preview-description {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 2rem;
}

.live-preview {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
}

.preview-info {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.preview-info h3 {
  color: var(--accent-primary);
  margin-bottom: 1rem;
  font-size: 18px;
}

.preview-info ul {
  list-style: none;
  padding: 0;
}

.preview-info li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  color: var(--text-primary);
  font-weight: 500;
}

.preview-info li:last-child {
  border-bottom: none;
}

.settings-section {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: var(--shadow);
}

.settings-section h2 {
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.section-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 16px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 0.5rem 0;
}

.setting-label {
  font-weight: bold;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox {
  width: 20px;
  height: 20px;
  accent-color: var(--accent-primary);
}

.slider {
  width: 200px;
  accent-color: var(--accent-primary);
}

.sounds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.sound-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.sound-card:not(.disabled) {
  border-color: var(--accent-primary);
}

.sound-card.disabled {
  opacity: 0.6;
  background-color: #f0f0f0;
}

.sound-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sound-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 24px;
  transition: 0.2s;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.2s;
}

.switch input:checked + .switch-slider {
  background-color: var(--accent-primary);
}

.switch input:checked + .switch-slider:before {
  transform: translateX(26px);
}

.sound-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 14px;
}

.sound-examples {
  margin-bottom: 1rem;
}

.examples-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.example-word {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
}

.color-picker-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.color-label {
  font-weight: bold;
  color: var(--text-primary);
}

.color-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-picker {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reset-color-btn {
  padding: 0.5rem;
  background-color: var(--accent-secondary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.reset-color-btn:hover {
  background-color: #2980b9;
}

.preview-text {
  background-color: var(--bg-primary);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  border: 2px dashed var(--accent-primary);
  color: var(--text-primary);
  font-family: 'OpenDyslexic', sans-serif;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-buttons button {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn {
  background-color: #e74c3c;
  color: white;
}

.reset-btn:hover {
  background-color: #c0392b;
}

.export-btn, .import-btn {
  background-color: var(--accent-primary);
  color: white;
}

.export-btn:hover, .import-btn:hover {
  background-color: #219a52;
}

@media (max-width: 768px) {
  .sounds-grid {
    grid-template-columns: 1fr;
  }
  
  .setting-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .action-buttons button {
    width: 100%;
    max-width: 300px;
  }
  
  .config-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .preview-panel {
    position: relative;
    height: auto;
  }
}

.font-selector, .theme-selector {
  width: 250px;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 14px;
  background-color: white;
}

.font-selector:focus, .theme-selector:focus {
  border-color: var(--accent-primary);
  outline: none;
}

</style>