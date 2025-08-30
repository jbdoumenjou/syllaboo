<template>
  <div class="phonetic-text-container">
    <div class="controls">
      <button @click="toggleHighlighting" class="control-btn">
        {{ isHighlightingEnabled ? '🎨 Masquer les couleurs' : '🎨 Afficher les couleurs' }}
      </button>
      
      <button @click="speakText" :disabled="isSpeaking" class="control-btn">
        {{ isSpeaking ? '🔊 En cours...' : '🔊 Écouter' }}
      </button>
      
      <button @click="speakSlowly" :disabled="isSpeaking" class="control-btn">
        🐢 Écouter lentement
      </button>
      
      <button v-if="isSpeaking" @click="stopSpeaking" class="control-btn stop">
        ⏹️ Arrêter
      </button>
    </div>
    
    <div class="reading-text" :class="{ 'no-highlighting': !isHighlightingEnabled }">
      <template v-for="(word, wordIndex) in processedWords" :key="wordIndex">
        <span v-if="word.isSpace" class="word-space">{{ word.text }}</span>
        <span v-else class="word-container">
          <span 
            v-for="(segment, segIndex) in word.segments" 
            :key="segIndex"
            :class="getSegmentClass(segment)"
            :style="getSegmentStyle(segment)"
            class="sound-segment"
          >{{ segment.text }}</span>
        </span>
      </template>
    </div>
    
    <div v-if="showPhoneticLegend && isHighlightingEnabled && settings.showLegend && settings.globalEnabled" class="phonetic-legend">
      <h4>Légende des couleurs (méthode française) :</h4>
      <div class="legend-items">
        <span 
          v-for="sound in enabledSounds" 
          :key="sound.id"
          class="legend-item"
        >
          <span 
            class="legend-color" 
            :style="{ backgroundColor: sound.color }"
          ></span> 
          {{ sound.name }} → {{ sound.description.split('comme dans ')[1] || sound.examples[0] }}
        </span>
      </div>
      <div class="legend-footer">
        <router-link to="/configuration" class="config-link">
          ⚙️ Personnaliser les couleurs
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePhoneticHighlighting } from '@/composables/usePhoneticHighlighting'
import { useTextToSpeech } from '@/composables/useTextToSpeech'
import { useSettings } from '@/composables/useSettings'
import { getPhoneticBreakdown, hasPhoneticEntry } from '@/data/phoneticDictionary'
import type { PhoneticSegment } from '@/data/phoneticDictionary'

interface Props {
  text: string
  showPhoneticLegend?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPhoneticLegend: true
})

const { isHighlightingEnabled, toggleHighlighting } = usePhoneticHighlighting()
const { speak, speakWordByWord, stop, isSpeaking, isSupported, loadVoices } = useTextToSpeech()
const { settings, shouldHighlight, getSoundColor, enabledSounds } = useSettings()

// French complex phonetic patterns (prioritized by length)
const phoneticPatterns = [
  { pattern: /eau/gi, soundType: 'au' },
  { pattern: /ain/gi, soundType: 'in' },
  { pattern: /ein/gi, soundType: 'in' },
  { pattern: /aim/gi, soundType: 'in' },
  { pattern: /oin/gi, soundType: 'oi' }, // Special case: oin combines oi+in
  { pattern: /ien/gi, soundType: 'in' },
  { pattern: /ion/gi, soundType: 'on' },
  { pattern: /ou/gi, soundType: 'ou' },
  { pattern: /oi/gi, soundType: 'oi' },
  { pattern: /eu/gi, soundType: 'eu' },
  { pattern: /au/gi, soundType: 'au' },
  { pattern: /on/gi, soundType: 'on' },
  { pattern: /om/gi, soundType: 'on' },
  { pattern: /an/gi, soundType: 'an' },
  { pattern: /en/gi, soundType: 'an' },
  { pattern: /am/gi, soundType: 'an' },
  { pattern: /em/gi, soundType: 'an' },
  { pattern: /in/gi, soundType: 'in' },
  { pattern: /im/gi, soundType: 'in' },
  { pattern: /é/gi, soundType: 'e-accent' },
  { pattern: /è/gi, soundType: 'e-grave' },
  { pattern: /ê/gi, soundType: 'e-grave' },
  { pattern: /ë/gi, soundType: 'e-grave' },
  { pattern: /à/gi, soundType: 'vowel-simple' },
  { pattern: /â/gi, soundType: 'vowel-simple' },
  { pattern: /î/gi, soundType: 'vowel-simple' },
  { pattern: /ô/gi, soundType: 'vowel-simple' },
  { pattern: /û/gi, soundType: 'vowel-simple' }
]

interface ProcessedSegment {
  text: string
  soundType: string
  isSpace: boolean
}

// Process words as complete units to prevent word breaking
const processedWords = computed(() => {
  if (!isHighlightingEnabled.value || !settings.value.globalEnabled) {
    return props.text.split(/(\s+)/).map(word => ({
      text: word,
      isSpace: /^\s+$/.test(word),
      segments: [{ text: word, soundType: 'none', isSpace: false }]
    }))
  }
  
  const words = props.text.split(/(\s+)/) // Split but keep separators
  
  return words.map(word => {
    // Handle whitespace
    if (/^\s+$/.test(word)) {
      return {
        text: word,
        isSpace: true,
        segments: [{ text: word, soundType: 'none', isSpace: true }]
      }
    }
    
    const segments: ProcessedSegment[] = []
    
    // Try dictionary lookup first
    const phoneticEntry = getPhoneticBreakdown(word)
    if (phoneticEntry) {
      // Use dictionary phonetic breakdown, but check if sound is enabled
      for (const segment of phoneticEntry.segments) {
        const soundType = shouldHighlight(segment.sound) ? segment.sound : 'none'
        segments.push({
          text: segment.letters,
          soundType,
          isSpace: false
        })
      }
    } else {
      // Fallback to pattern matching for unknown words
      let remainingText = word
      while (remainingText.length > 0) {
        let matchFound = false
        
        // Try to match complex patterns first
        for (const { pattern, soundType } of phoneticPatterns) {
          // Skip if this sound is disabled in settings
          if (!shouldHighlight(soundType)) continue
          
          pattern.lastIndex = 0 // Reset regex
          const match = pattern.exec(remainingText)
          
          if (match && match.index === 0) {
            segments.push({ 
              text: match[0], 
              soundType, 
              isSpace: false 
            })
            remainingText = remainingText.substring(match[0].length)
            matchFound = true
            break
          }
        }
        
        // If no complex pattern matches, take one character without color
        if (!matchFound) {
          const char = remainingText[0]
          segments.push({ 
            text: char, 
            soundType: 'none', // No color for simple letters
            isSpace: false 
          })
          remainingText = remainingText.substring(1)
        }
      }
    }
    
    return {
      text: word,
      isSpace: false,
      segments
    }
  })
})

function getSegmentClass(segment: ProcessedSegment): string {
  if (!isHighlightingEnabled.value || segment.soundType === 'none') return ''
  return `sound-${segment.soundType}`
}

function getSegmentStyle(segment: ProcessedSegment): Record<string, string> {
  if (!isHighlightingEnabled.value || segment.soundType === 'none') return {}
  
  const color = getSoundColor(segment.soundType)
  if (!color) return {}
  
  // Simple function to determine if text should be white or black based on background
  const getTextColor = (backgroundColor: string): string => {
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? '#000000' : '#FFFFFF'
  }
  
  return {
    backgroundColor: color,
    color: getTextColor(color)
  }
}

async function speakText() {
  if (!isSupported.value) {
    alert('La synthèse vocale n\'est pas supportée par votre navigateur')
    return
  }
  speak(props.text, { rate: 0.9 })
}

async function speakSlowly() {
  if (!isSupported.value) {
    alert('La synthèse vocale n\'est pas supportée par votre navigateur')
    return
  }
  speakWordByWord(props.text, 1200)
}

function stopSpeaking() {
  stop()
}

onMounted(() => {
  if (isSupported.value) {
    loadVoices()
  }
})
</script>

<style scoped>
.phonetic-text-container {
  margin: 2rem 0;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.control-btn {
  padding: 0.75rem 1.5rem;
  font-size: 16px;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--accent-primary);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow);
}

.control-btn:hover:not(:disabled) {
  background-color: #219a52;
  transform: translateY(-2px);
}

.control-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
  transform: none;
}

.control-btn.stop {
  background-color: #e74c3c;
}

.control-btn.stop:hover {
  background-color: #c0392b;
}

.reading-text {
  font-size: v-bind('settings.fontSize + "px"');
  line-height: v-bind('settings.lineHeight');
  letter-spacing: v-bind('settings.letterSpacing + "px"');
  word-spacing: v-bind('settings.wordSpacing + "px"');
  padding: 2rem;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.word-container {
  display: inline-block;
  white-space: nowrap; /* Prevent word breaking */
}

.sound-segment {
  display: inline-block;
  white-space: nowrap;
  margin-right: 1px;
}

.word-space {
  display: inline-block;
  min-width: 12px;
  width: 12px;
}

/* Dynamic sound styles based on user settings */
.sound-segment {
  padding: 0 3px;
  border-radius: 2px;
  margin: -2px 1px;
  font-weight: bold;
  transition: all 0.1s ease;
  line-height: 1.2;
}

.sound-segment:not([style*="background-color"]) {
  /* Unstyled segments (no background color) */
  padding: 0 2px;
  margin: -2px 1px;
  line-height: 1.2;
}

.phonetic-legend {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.phonetic-legend h4 {
  margin-bottom: 1rem;
  color: var(--text-primary);
  text-align: center;
}

.legend-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  font-weight: bold;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: inline-block;
}

.config-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--accent-primary);
  color: white;
  text-decoration: none;
  border-radius: var(--border-radius);
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.config-link:hover {
  background-color: #219a52;
}

.legend-footer {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

/* Responsive design for mobile */
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .control-btn {
    width: 100%;
    max-width: 300px;
  }
  
  .reading-text {
    font-size: 20px;
    padding: 1.5rem;
  }
  
  .legend-items {
    grid-template-columns: 1fr;
  }
}
</style>