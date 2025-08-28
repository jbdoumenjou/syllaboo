export interface PhoneticSound {
  letter: string
  sound: 'a' | 'e' | 'i' | 'o' | 'u' | 'consonant'
  color: string
}

export interface ReadingText {
  id: string
  title: string
  content: string
  difficulty: 'easy' | 'medium' | 'hard'
  phonetics?: PhoneticSound[]
}

export interface UserProgress {
  textId: string
  completed: boolean
  score: number
  timeSpent: number
  lastRead: Date
}