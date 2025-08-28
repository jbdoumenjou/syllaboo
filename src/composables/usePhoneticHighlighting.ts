import { ref } from 'vue'
import type { PhoneticSound } from '@/types'

export function usePhoneticHighlighting() {
  const isHighlightingEnabled = ref(true)
  
  // French phonetic patterns mapping
  const phoneticPatterns: Record<string, 'a' | 'e' | 'i' | 'o' | 'u' | 'consonant'> = {
    // Vowel sounds
    'a': 'a', 'à': 'a', 'â': 'a', 'ä': 'a',
    'e': 'e', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'i': 'i', 'î': 'i', 'ï': 'i', 'y': 'i',
    'o': 'o', 'ô': 'o', 'ö': 'o',
    'u': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
    
    // Common French consonant combinations
    'ch': 'consonant',
    'th': 'consonant',
    'ph': 'consonant',
    'gn': 'consonant',
    'll': 'consonant',
    'tion': 'consonant',
    'sion': 'consonant'
  }
  
  const soundColors = {
    'a': '#ff6b6b',      // Red
    'e': '#4ecdc4',      // Teal
    'i': '#45b7d1',      // Blue
    'o': '#f9ca24',      // Yellow
    'u': '#6c5ce7',      // Purple
    'consonant': '#2d3436' // Dark gray
  }
  
  function highlightPhonetics(text: string): string {
    if (!isHighlightingEnabled.value) return text
    
    let highlightedText = text
    
    // Process longer patterns first (like 'tion', 'ch', etc.)
    const sortedPatterns = Object.keys(phoneticPatterns).sort((a, b) => b.length - a.length)
    
    for (const pattern of sortedPatterns) {
      const soundType = phoneticPatterns[pattern]
      const regex = new RegExp(pattern, 'gi')
      const color = soundColors[soundType]
      
      highlightedText = highlightedText.replace(regex, (match) => {
        return `<span class="sound-${soundType}" style="background-color: ${color}; color: white; padding: 2px 4px; border-radius: 4px; margin: 0 1px;">${match}</span>`
      })
    }
    
    return highlightedText
  }
  
  function toggleHighlighting() {
    isHighlightingEnabled.value = !isHighlightingEnabled.value
  }
  
  function getPhoneticBreakdown(text: string): PhoneticSound[] {
    const sounds: PhoneticSound[] = []
    const words = text.toLowerCase().split(/\s+/)
    
    words.forEach(word => {
      for (let i = 0; i < word.length; i++) {
        const char = word[i]
        const soundType = phoneticPatterns[char] || 'consonant'
        
        sounds.push({
          letter: char,
          sound: soundType,
          color: soundColors[soundType]
        })
      }
    })
    
    return sounds
  }
  
  return {
    isHighlightingEnabled,
    highlightPhonetics,
    toggleHighlighting,
    getPhoneticBreakdown,
    soundColors
  }
}