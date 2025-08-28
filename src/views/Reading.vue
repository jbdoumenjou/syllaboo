<template>
  <div class="container">
    <h1>📖 Lecture Interactive</h1>
    
    <div class="text-selection">
      <h3>Choisissez un texte :</h3>
      <div class="text-cards">
        <div 
          v-for="text in readingTexts" 
          :key="text.id"
          class="text-card"
          :class="{ 'selected': selectedTextId === text.id }"
          @click="selectText(text.id)"
        >
          <h4>{{ text.title }}</h4>
          <span class="difficulty">{{ getDifficultyLabel(text.difficulty) }}</span>
        </div>
      </div>
    </div>
    
    <div v-if="selectedText" class="reading-section">
      <PhoneticText 
        :text="selectedText.content" 
        :show-phonetic-legend="true"
      />
      
      <div class="progress-section">
        <h4>Votre progression :</h4>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
        <p>{{ progressPercentage }}% complété</p>
        
        <button @click="markAsCompleted" class="complete-btn">
          ✅ Marquer comme terminé
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PhoneticText from '@/components/PhoneticText.vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { ReadingText, UserProgress } from '@/types'

// Sample reading texts for French children
const readingTexts = ref<ReadingText[]>([
  {
    id: '1',
    title: 'Le Chat et la Souris',
    difficulty: 'easy',
    content: 'Il était une fois un petit chat qui aimait jouer dans sa maison. Il courait dans le jardin rouge et sautait sur les feuilles. Un jour, il vit une petite souris grise près du point d\'eau. La souris était bien rapide et se cachait sous les fleurs.'
  },
  {
    id: '2',
    title: 'La Boulangerie du Village',
    difficulty: 'medium',
    content: 'Chaque matin, le père de famille ouvre sa boulangerie. Il prépare deux ou trois pains encore chauds. Les enfants du village adorent l\'odeur qui sort du four. Le lundi et le mardi, ils achètent du pain pour le goûter.'
  },
  {
    id: '3',
    title: 'L\'Oiseau Bleu',
    difficulty: 'hard',
    content: 'Sophie et Thomas décidèrent d\'explorer la mystérieuse forêt. Ils emportèrent une boussole dans leur main et quelques provisions. Soudain, ils virent un magnifique oiseau bleu près d\'un chien noir. L\'oiseau chantait bien fort dans le vert des arbres.'
  }
])

const selectedTextId = ref<string>('')
const { getItem, setItem } = useLocalStorage()

const selectedText = computed(() => {
  return readingTexts.value.find(text => text.id === selectedTextId.value)
})

const progressPercentage = computed(() => {
  if (!selectedTextId.value) return 0
  
  const progress = getItem<UserProgress>(`progress_${selectedTextId.value}`)
  return progress?.score ?? 0
})

function selectText(textId: string) {
  selectedTextId.value = textId
  
  // Initialize progress if not exists
  const existingProgress = getItem<UserProgress>(`progress_${textId}`)
  if (!existingProgress) {
    const newProgress: UserProgress = {
      textId,
      completed: false,
      score: 0,
      timeSpent: 0,
      lastRead: new Date()
    }
    setItem(`progress_${textId}`, newProgress)
  }
}

function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'easy': return '🟢 Facile'
    case 'medium': return '🟡 Moyen'
    case 'hard': return '🔴 Difficile'
    default: return difficulty
  }
}

function markAsCompleted() {
  if (!selectedTextId.value) return
  
  const progress: UserProgress = {
    textId: selectedTextId.value,
    completed: true,
    score: 100,
    timeSpent: 0, // Could track actual time spent
    lastRead: new Date()
  }
  
  setItem(`progress_${selectedTextId.value}`, progress)
  
  // Show success message
  alert('🎉 Félicitations ! Vous avez terminé ce texte !')
}

onMounted(() => {
  // Auto-select first text if none selected
  if (readingTexts.value.length > 0) {
    selectText(readingTexts.value[0].id)
  }
})
</script>

<style scoped>
.text-selection {
  margin: 2rem 0;
}

.text-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.text-card {
  padding: 1.5rem;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 3px solid transparent;
}

.text-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.text-card.selected {
  border-color: var(--accent-primary);
  background-color: #e8f5e8;
}

.text-card h4 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.difficulty {
  font-size: 14px;
  font-weight: bold;
}

.reading-section {
  margin-top: 3rem;
}

.progress-section {
  margin-top: 2rem;
  padding: 2rem;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #ecf0f1;
  border-radius: 10px;
  margin: 1rem 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  transition: width 0.3s ease;
  border-radius: 10px;
}

.complete-btn {
  margin-top: 1rem;
  padding: 1rem 2rem;
  font-size: 18px;
  background-color: var(--accent-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
}

.complete-btn:hover {
  background-color: #219a52;
  transform: scale(1.05);
}
</style>