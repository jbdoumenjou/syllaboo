export function useLocalStorage() {
  function setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
  
  function getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  }
  
  function removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  }
  
  function getAllProgress(): Array<{ key: string, value: any }> {
    const progressItems: Array<{ key: string, value: any }> = []
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('progress_')) {
        const value = getItem(key)
        progressItems.push({ key, value })
      }
    }
    
    return progressItems
  }
  
  function clearAllProgress(): void {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('progress_'))
    keys.forEach(key => removeItem(key))
  }
  
  return {
    setItem,
    getItem,
    removeItem,
    getAllProgress,
    clearAllProgress
  }
}