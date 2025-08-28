import { ref } from 'vue'

export function useTextToSpeech() {
  const isSupported = ref(typeof window !== 'undefined' && 'speechSynthesis' in window)
  const isSpeaking = ref(false)
  const voices = ref<SpeechSynthesisVoice[]>([])
  const isInitialized = ref(false)
  
  // Load French voices
  function loadVoices() {
    if (!isSupported.value) return
    
    const availableVoices = speechSynthesis.getVoices()
    voices.value = availableVoices.filter(voice => 
      voice.lang.startsWith('fr') || voice.lang.includes('FR')
    )
    
    // If no French voices, use any available voice
    if (voices.value.length === 0) {
      voices.value = availableVoices.slice(0, 5) // Take first 5 voices
    }
    
    console.log('Voices loaded:', voices.value.length, 'voices available')
    isInitialized.value = true
  }
  
  // Initialize voices when they become available
  if (isSupported.value) {
    // Try to load voices immediately
    loadVoices()
    
    // Also listen for the voices changed event (some browsers need this)
    speechSynthesis.addEventListener('voiceschanged', loadVoices)
    
    // Force initialization after a delay if needed
    setTimeout(() => {
      if (!isInitialized.value) {
        loadVoices()
      }
    }, 1000)
  }
  
  function speak(text: string, options: {
    rate?: number
    pitch?: number
    volume?: number
    voiceIndex?: number
  } = {}) {
    if (!isSupported.value || !text.trim()) {
      console.warn('Speech synthesis not supported or empty text')
      return Promise.reject('Speech not supported')
    }
    
    return new Promise<void>((resolve, reject) => {
      // Stop any current speech
      speechSynthesis.cancel()
      
      // Wait a moment for cancel to complete
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text)
        
        // Force reload voices if empty
        if (voices.value.length === 0) {
          loadVoices()
        }
        
        // Set French voice if available
        const availableVoices = speechSynthesis.getVoices()
        const frenchVoice = availableVoices.find(voice => 
          voice.lang.includes('fr') || voice.lang.includes('FR')
        )
        
        if (frenchVoice) {
          utterance.voice = frenchVoice
          console.log('Using French voice:', frenchVoice.name)
        } else if (availableVoices.length > 0) {
          utterance.voice = availableVoices[0]
          console.log('Using default voice:', availableVoices[0].name)
        }
        
        // Configure speech parameters (optimized for dyslexic users)
        utterance.rate = options.rate ?? 0.8     // Slightly slower than normal
        utterance.pitch = options.pitch ?? 1.0   // Normal pitch
        utterance.volume = options.volume ?? 0.9 // Slightly quieter
        utterance.lang = 'fr-FR'
        
        utterance.onstart = () => {
          isSpeaking.value = true
          console.log('Speech started:', text.substring(0, 50) + '...')
        }
        
        utterance.onend = () => {
          isSpeaking.value = false
          console.log('Speech ended')
          resolve()
        }
        
        utterance.onerror = (event) => {
          isSpeaking.value = false
          console.error('Speech synthesis error:', event.error)
          reject(event.error)
        }
        
        try {
          speechSynthesis.speak(utterance)
          console.log('Speech command sent, available voices:', availableVoices.length)
        } catch (error) {
          console.error('Error starting speech:', error)
          isSpeaking.value = false
          reject(error)
        }
      }, 100) // Small delay to ensure cancel completes
    })
  }
  
  function stop() {
    if (isSupported.value) {
      speechSynthesis.cancel()
      isSpeaking.value = false
    }
  }
  
  function pause() {
    if (isSupported.value && speechSynthesis.speaking) {
      speechSynthesis.pause()
    }
  }
  
  function resume() {
    if (isSupported.value && speechSynthesis.paused) {
      speechSynthesis.resume()
    }
  }
  
  // Word-by-word reading for better comprehension
  function speakWordByWord(text: string, wordDelay: number = 800) {
    if (!isSupported.value) return
    
    const words = text.split(/\s+/)
    let currentIndex = 0
    
    function speakNextWord() {
      if (currentIndex >= words.length) {
        isSpeaking.value = false
        return
      }
      
      const word = words[currentIndex]
      speak(word, { rate: 0.7 }) // Slower for individual words
      
      currentIndex++
      setTimeout(speakNextWord, wordDelay)
    }
    
    isSpeaking.value = true
    speakNextWord()
  }
  
  return {
    isSupported,
    isSpeaking,
    voices,
    speak,
    stop,
    pause,
    resume,
    speakWordByWord,
    loadVoices
  }
}