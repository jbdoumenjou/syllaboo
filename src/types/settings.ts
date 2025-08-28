export interface SoundConfig {
  id: string
  name: string
  description: string
  pattern: string
  examples: string[]
  enabled: boolean
  color: string
  defaultColor: string
}

export interface UserSettings {
  sounds: Record<string, SoundConfig>
  globalEnabled: boolean
  showLegend: boolean
  fontSize: number
  lineHeight: number
  wordSpacing: number
  letterSpacing: number
}

export const defaultSoundConfigs: Record<string, SoundConfig> = {
  'ou': {
    id: 'ou',
    name: 'Son "ou"',
    description: 'Le son "ou" comme dans rouge',
    pattern: 'ou',
    examples: ['rouge', 'jouer', 'courir', 'sous'],
    enabled: true,
    color: '#ff0000',
    defaultColor: '#ff0000'
  },
  'oi': {
    id: 'oi',
    name: 'Son "oi"',
    description: 'Le son "oi" comme dans noir',
    pattern: 'oi',
    examples: ['noir', 'trois', 'point', 'froid'],
    enabled: true,
    color: '#000000',
    defaultColor: '#000000'
  },
  'eu': {
    id: 'eu',
    name: 'Son "eu"',
    description: 'Le son "eu" comme dans bleu',
    pattern: 'eu',
    examples: ['bleu', 'deux', 'feuille', 'heureux'],
    enabled: true,
    color: '#0066cc',
    defaultColor: '#0066cc'
  },
  'e-accent': {
    id: 'e-accent',
    name: 'Son "é"',
    description: 'Le son "é" comme dans rosé',
    pattern: 'é',
    examples: ['été', 'café', 'bébé', 'réussir'],
    enabled: true,
    color: '#ff69b4',
    defaultColor: '#ff69b4'
  },
  'e-grave': {
    id: 'e-grave',
    name: 'Sons "è/ê/ai"',
    description: 'Les sons "è", "ê" et "ai" comme dans violet',
    pattern: 'è|ê|ai',
    examples: ['père', 'mère', 'aimait', 'maison'],
    enabled: true,
    color: '#8a2be2',
    defaultColor: '#8a2be2'
  },
  'au': {
    id: 'au',
    name: 'Sons "au/eau"',
    description: 'Les sons "au" et "eau" comme dans jaune',
    pattern: 'au|eau',
    examples: ['jaune', 'auto', 'oiseau', 'tableau'],
    enabled: true,
    color: '#ffff00',
    defaultColor: '#ffff00'
  },
  'on': {
    id: 'on',
    name: 'Sons "on/om"',
    description: 'Les sons "on" et "om" comme dans marron',
    pattern: 'on|om',
    examples: ['marron', 'bonbon', 'pompier', 'compter'],
    enabled: true,
    color: '#8b4513',
    defaultColor: '#8b4513'
  },
  'an': {
    id: 'an',
    name: 'Sons "an/en/am/em"',
    description: 'Les sons "an", "en", "am" et "em" comme dans orange',
    pattern: 'an|en|am|em',
    examples: ['orange', 'enfant', 'dans', 'temps'],
    enabled: true,
    color: '#ffa500',
    defaultColor: '#ffa500'
  },
  'in': {
    id: 'in',
    name: 'Sons "in/ain/ein/im/aim/ien"',
    description: 'Les sons "in", "ain", "ein", "im", "aim" et "ien" comme dans vert sapin',
    pattern: 'in|ain|ein|im|aim|ien',
    examples: ['sapin', 'main', 'pain', 'chien', 'bien'],
    enabled: true,
    color: '#228b22',
    defaultColor: '#228b22'
  }
}

export const defaultSettings: UserSettings = {
  sounds: defaultSoundConfigs,
  globalEnabled: true,
  showLegend: true,
  fontSize: 24,
  lineHeight: 2.4,
  wordSpacing: 8,
  letterSpacing: 1
}