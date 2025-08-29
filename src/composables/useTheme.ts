import { useSettings } from './useSettings'

export function useTheme() {
  const { settings, updateTheme } = useSettings()

  // Define research-backed theme colors
  const themes = {
    cream: {
      '--bg-primary': '#f5f5dc',
      '--bg-secondary': '#fff8dc', 
      '--text-primary': '#2c3e50',
      '--text-secondary': '#34495e'
    },
    turquoise: {
      '--bg-primary': '#40E0D0',
      '--bg-secondary': '#48E6D6',
      '--text-primary': '#1a1a1a',
      '--text-secondary': '#2c3e50'
    },
    yellow: {
      '--bg-primary': '#FFFF99',
      '--bg-secondary': '#FFFFB3',
      '--text-primary': '#1a1a1a',
      '--text-secondary': '#2c3e50'
    },
    'blue-pastel': {
      '--bg-primary': '#E6F3FF',
      '--bg-secondary': '#F0F8FF',
      '--text-primary': '#2F2F2F',
      '--text-secondary': '#34495e'
    },
    'green-brown': {
      '--bg-primary': '#2F5233',
      '--bg-secondary': '#3A6B3F',
      '--text-primary': '#8B4513',
      '--text-secondary': '#A0522D'
    }
  }

  function applyTheme(themeName: string) {
    const selectedColors = themes[themeName as keyof typeof themes]
    if (selectedColors) {
      Object.entries(selectedColors).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value)
      })
    }
  }

  function setTheme(themeName: string) {
    applyTheme(themeName)
    updateTheme(themeName)
  }

  // Apply current theme from settings
  function applyCurrentTheme() {
    applyTheme(settings.value.theme)
  }

  return {
    themes,
    applyTheme,
    setTheme,
    applyCurrentTheme,
    currentTheme: settings.value.theme
  }
}