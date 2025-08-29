import { ref, computed, watch } from 'vue'
import type { UserSettings, SoundConfig } from '@/types/settings'
import { defaultSettings } from '@/types/settings'
import { useLocalStorage } from './useLocalStorage'

const { getItem, setItem } = useLocalStorage()
const SETTINGS_KEY = 'syllaboo_settings'

// Load settings from localStorage or use defaults
const loadSettings = (): UserSettings => {
  const saved = getItem<UserSettings>(SETTINGS_KEY)
  if (saved) {
    // Merge with defaults to handle new settings
    return {
      ...defaultSettings,
      ...saved,
      sounds: {
        ...defaultSettings.sounds,
        ...saved.sounds
      }
    }
  }
  return defaultSettings
}

const settings = ref<UserSettings>(loadSettings())

export function useSettings() {
  const enabledSounds = computed(() => {
    return Object.values(settings.value.sounds).filter(sound => sound.enabled)
  })
  
  const soundColors = computed(() => {
    const colors: Record<string, string> = {}
    Object.values(settings.value.sounds).forEach(sound => {
      if (sound.enabled) {
        colors[sound.id] = sound.color
      }
    })
    return colors
  })
  
  // Watch for changes and save to localStorage
  watch(settings, (newSettings) => {
    setItem(SETTINGS_KEY, newSettings)
  }, { deep: true })
  
  function updateSoundConfig(soundId: string, updates: Partial<SoundConfig>) {
    if (settings.value.sounds[soundId]) {
      settings.value.sounds[soundId] = {
        ...settings.value.sounds[soundId],
        ...updates
      }
    }
  }
  
  function toggleSound(soundId: string) {
    if (settings.value.sounds[soundId]) {
      settings.value.sounds[soundId].enabled = !settings.value.sounds[soundId].enabled
    }
  }
  
  function resetSoundColor(soundId: string) {
    if (settings.value.sounds[soundId]) {
      settings.value.sounds[soundId].color = settings.value.sounds[soundId].defaultColor
    }
  }
  
  function resetAllSettings() {
    settings.value = { ...defaultSettings }
  }
  
  function toggleGlobalHighlighting() {
    settings.value.globalEnabled = !settings.value.globalEnabled
  }
  
  function updateFontSize(size: number) {
    settings.value.fontSize = Math.max(12, Math.min(48, size))
  }
  
  function updateLineHeight(height: number) {
    settings.value.lineHeight = Math.max(1, Math.min(4, height))
  }
  
  function updateWordSpacing(spacing: number) {
    settings.value.wordSpacing = Math.max(4, Math.min(20, spacing))
  }
  
  function updateLetterSpacing(spacing: number) {
    settings.value.letterSpacing = Math.max(0, Math.min(5, spacing))
  }
  
  function updateTheme(theme: string) {
    settings.value.theme = theme
  }
  
  // Export a function to check if a sound should be highlighted
  function shouldHighlight(soundId: string): boolean {
    return settings.value.globalEnabled && 
           settings.value.sounds[soundId]?.enabled === true
  }
  
  // Get color for a sound
  function getSoundColor(soundId: string): string | null {
    if (shouldHighlight(soundId)) {
      return settings.value.sounds[soundId]?.color || null
    }
    return null
  }
  
  return {
    settings,
    enabledSounds,
    soundColors,
    updateSoundConfig,
    toggleSound,
    resetSoundColor,
    resetAllSettings,
    toggleGlobalHighlighting,
    updateFontSize,
    updateLineHeight,
    updateWordSpacing,
    updateLetterSpacing,
    updateTheme,
    shouldHighlight,
    getSoundColor
  }
}