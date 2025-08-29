/**
 * French Phonetic Dictionary
 * Maps French words to their phonetic breakdown for accurate color coding
 * Based on French educational phonetic methods
 */

export interface PhoneticEntry {
  word: string
  phonetic: string // IPA transcription for reference
  segments: PhoneticSegment[]
}

export interface PhoneticSegment {
  letters: string // The actual letters in the word
  sound: 'ou' | 'oi' | 'eu' | 'e-accent' | 'e-grave' | 'au' | 'on' | 'an' | 'in' | 'vowel-simple' | 'consonant' | 'none'
}

// Common French words with accurate phonetic segmentation
export const phoneticDictionary: Record<string, PhoneticEntry> = {
  // Verbs - imperfect tense (common mistakes)
  "aimait": {
    word: "aimait",
    phonetic: "/ɛmɛ/",
    segments: [
      { letters: "ai", sound: "e-grave" }, // ai = è sound
      { letters: "m", sound: "consonant" },
      { letters: "ai", sound: "e-grave" }, // ai = è sound  
      { letters: "t", sound: "consonant" }
    ]
  },
  "jouait": {
    word: "jouait",
    phonetic: "/ʒwɛ/",
    segments: [
      { letters: "j", sound: "consonant" },
      { letters: "ou", sound: "ou" },
      { letters: "ai", sound: "e-grave" }, // ai = è sound
      { letters: "t", sound: "consonant" }
    ]
  },
  "avait": {
    word: "avait",
    phonetic: "/avɛ/",
    segments: [
      { letters: "a", sound: "vowel-simple" },
      { letters: "v", sound: "consonant" },
      { letters: "ai", sound: "e-grave" }, // ai = è sound
      { letters: "t", sound: "consonant" }
    ]
  },
  
  // Common words with complex sounds
  "maison": {
    word: "maison",
    phonetic: "/mɛzɔ̃/",
    segments: [
      { letters: "m", sound: "consonant" },
      { letters: "ai", sound: "e-grave" }, // ai = è sound
      { letters: "s", sound: "consonant" },
      { letters: "on", sound: "on" }
    ]
  },
  "oiseau": {
    word: "oiseau",
    phonetic: "/wazo/",
    segments: [
      { letters: "oi", sound: "oi" },
      { letters: "s", sound: "consonant" },
      { letters: "eau", sound: "au" }
    ]
  },
  "feuille": {
    word: "feuille",
    phonetic: "/fœj/",
    segments: [
      { letters: "f", sound: "consonant" },
      { letters: "eu", sound: "eu" },
      { letters: "i", sound: "vowel-simple" },
      { letters: "ll", sound: "consonant" },
      { letters: "e", sound: "vowel-simple" }
    ]
  },
  
  // Colors (used in the method)
  "rouge": {
    word: "rouge",
    phonetic: "/ʁuʒ/",
    segments: [
      { letters: "r", sound: "consonant" },
      { letters: "ou", sound: "ou" },
      { letters: "g", sound: "consonant" },
      { letters: "e", sound: "vowel-simple" }
    ]
  },
  "noir": {
    word: "noir",
    phonetic: "/nwaʁ/",
    segments: [
      { letters: "n", sound: "consonant" },
      { letters: "oi", sound: "oi" },
      { letters: "r", sound: "consonant" }
    ]
  },
  "bleu": {
    word: "bleu",
    phonetic: "/blø/",
    segments: [
      { letters: "b", sound: "consonant" },
      { letters: "l", sound: "consonant" },
      { letters: "eu", sound: "eu" }
    ]
  },
  "jaune": {
    word: "jaune",
    phonetic: "/ʒon/",
    segments: [
      { letters: "j", sound: "consonant" },
      { letters: "au", sound: "au" },
      { letters: "n", sound: "consonant" },
      { letters: "e", sound: "vowel-simple" }
    ]
  },
  "marron": {
    word: "marron",
    phonetic: "/maʁɔ̃/",
    segments: [
      { letters: "m", sound: "consonant" },
      { letters: "a", sound: "vowel-simple" },
      { letters: "r", sound: "consonant" },
      { letters: "r", sound: "consonant" },
      { letters: "on", sound: "on" }
    ]
  },
  "orange": {
    word: "orange",
    phonetic: "/ɔʁɑ̃ʒ/",
    segments: [
      { letters: "o", sound: "vowel-simple" },
      { letters: "r", sound: "consonant" },
      { letters: "an", sound: "an" },
      { letters: "g", sound: "consonant" },
      { letters: "e", sound: "vowel-simple" }
    ]
  },
  "vert": {
    word: "vert",
    phonetic: "/vɛʁ/",
    segments: [
      { letters: "v", sound: "consonant" },
      { letters: "e", sound: "e-grave" }, // e = è sound in "vert"
      { letters: "r", sound: "consonant" },
      { letters: "t", sound: "consonant" }
    ]
  },
  "violet": {
    word: "violet",
    phonetic: "/vjɔlɛ/",
    segments: [
      { letters: "v", sound: "consonant" },
      { letters: "i", sound: "vowel-simple" },
      { letters: "o", sound: "vowel-simple" },
      { letters: "l", sound: "consonant" },
      { letters: "e", sound: "e-grave" }, // e = è sound
      { letters: "t", sound: "consonant" }
    ]
  },
  
  // Common conjunctions and words
  "dans": {
    word: "dans",
    phonetic: "/dɑ̃/",
    segments: [
      { letters: "d", sound: "consonant" },
      { letters: "an", sound: "an" },
      { letters: "s", sound: "consonant" }
    ]
  },
  "enfant": {
    word: "enfant",
    phonetic: "/ɑ̃fɑ̃/",
    segments: [
      { letters: "en", sound: "an" },
      { letters: "f", sound: "consonant" },
      { letters: "an", sound: "an" },
      { letters: "t", sound: "consonant" }
    ]
  },
  "chien": {
    word: "chien",
    phonetic: "/ʃjɛ̃/",
    segments: [
      { letters: "ch", sound: "consonant" },
      { letters: "ien", sound: "in" }
    ]
  },
  "bien": {
    word: "bien",
    phonetic: "/bjɛ̃/",
    segments: [
      { letters: "b", sound: "consonant" },
      { letters: "i", sound: "vowel-simple" }, // forms glide /j/ with following vowel
      { letters: "en", sound: "in" } // "en" makes the /ɛ̃/ sound (nasal vowel like "in")
    ]
  },
  "main": {
    word: "main",
    phonetic: "/mɛ̃/",
    segments: [
      { letters: "m", sound: "consonant" },
      { letters: "ain", sound: "in" }
    ]
  },
  "pain": {
    word: "pain",
    phonetic: "/pɛ̃/",
    segments: [
      { letters: "p", sound: "consonant" },
      { letters: "ain", sound: "in" }
    ]
  },
  "point": {
    word: "point",
    phonetic: "/pwɛ̃/",
    segments: [
      { letters: "p", sound: "consonant" },
      { letters: "oin", sound: "in" }, // "oin" makes the /wɛ̃/ sound, not "oi" 
      { letters: "t", sound: "consonant" }
    ]
  },
  
  // Days of the week
  "lundi": {
    word: "lundi",
    phonetic: "/lœ̃di/",
    segments: [
      { letters: "l", sound: "consonant" },
      { letters: "un", sound: "in" },
      { letters: "d", sound: "consonant" },
      { letters: "i", sound: "vowel-simple" }
    ]
  },
  "mardi": {
    word: "mardi",
    phonetic: "/maʁdi/",
    segments: [
      { letters: "m", sound: "consonant" },
      { letters: "a", sound: "vowel-simple" },
      { letters: "r", sound: "consonant" },
      { letters: "d", sound: "consonant" },
      { letters: "i", sound: "vowel-simple" }
    ]
  },
  
  // Numbers
  "deux": {
    word: "deux",
    phonetic: "/dø/",
    segments: [
      { letters: "d", sound: "consonant" },
      { letters: "eu", sound: "eu" },
      { letters: "x", sound: "consonant" }
    ]
  },
  "trois": {
    word: "trois",
    phonetic: "/tʁwa/",
    segments: [
      { letters: "t", sound: "consonant" },
      { letters: "r", sound: "consonant" },
      { letters: "oi", sound: "oi" },
      { letters: "s", sound: "consonant" }
    ]
  },
  "quatre": {
    word: "quatre",
    phonetic: "/katʁ/",
    segments: [
      { letters: "qu", sound: "consonant" },
      { letters: "a", sound: "vowel-simple" },
      { letters: "t", sound: "consonant" },
      { letters: "r", sound: "consonant" },
      { letters: "e", sound: "vowel-simple" }
    ]
  },
  
  // Family
  "père": {
    word: "père",
    phonetic: "/pɛʁ/",
    segments: [
      { letters: "p", sound: "consonant" },
      { letters: "è", sound: "e-grave" },
      { letters: "r", sound: "consonant" },
      { letters: "e", sound: "vowel-simple" }
    ]
  },
  "mère": {
    word: "mère",
    phonetic: "/mɛʁ/",
    segments: [
      { letters: "m", sound: "consonant" },
      { letters: "è", sound: "e-grave" },
      { letters: "r", sound: "consonant" },
      { letters: "e", sound: "vowel-simple" }
    ]
  },
  "frère": {
    word: "frère",
    phonetic: "/fʁɛʁ/",
    segments: [
      { letters: "f", sound: "consonant" },
      { letters: "r", sound: "consonant" },
      { letters: "è", sound: "e-grave" },
      { letters: "r", sound: "consonant" },
      { letters: "e", sound: "vowel-simple" }
    ]
  }
}

// Function to normalize words (remove accents, lowercase, etc.) for lookup
export function normalizeWord(word: string): string {
  return word.toLowerCase()
    .replace(/[àâä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ùûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .trim()
}

// Function to get phonetic breakdown for a word
export function getPhoneticBreakdown(word: string): PhoneticEntry | null {
  const normalizedWord = normalizeWord(word)
  return phoneticDictionary[normalizedWord] || null
}

// Function to check if a word exists in the dictionary
export function hasPhoneticEntry(word: string): boolean {
  return normalizeWord(word) in phoneticDictionary
}