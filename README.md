# Syllaboo

Une application web simple pour aider les enfants dyslexiques à apprendre à lire le français.

## Ce qui fonctionne actuellement

- **Coloration des sons complexes** : Les sons comme "ou", "oi", "eu", "an", etc. sont mis en couleur selon la méthode pédagogique française
- **Synthèse vocale** : Les textes peuvent être lus à voix haute avec une voix française
- **Configuration personnalisable** : Ajustement des couleurs, polices et espacement selon les besoins
- **Interface adaptée à la dyslexie** : Police OpenDyslexic, fond crème, espacements augmentés
- **Textes pédagogiques** : Quelques textes simples avec des sons ciblés

## Objectifs à venir

- **Découpage syllabique** : Séparation visuelle des syllabes (en développement)
- **Plus de textes** : Élargissement de la bibliothèque de contenus
- **Suivi des progrès** : Mécanisme de progression pour l'enfant

## Méthode pédagogique

L'application s'inspire de la méthode des couleurs phonétiques française :
- **"ou" → Rouge** (comme dans "rouge")
- **"oi" → Noir** (comme dans "noir")
- **"eu" → Bleu** (comme dans "bleu")
- **"an" → Orange** (comme dans "orange")
- etc.

## Installation

```bash
git clone https://github.com/jbdoumenjou/syllaboo.git
cd syllaboo
npm install
npm run dev
```

## Technologies

- Vue.js 3 avec TypeScript
- Web Speech API pour la synthèse vocale
- Vite pour le développement

## Licence

MIT

---

*Application à des fins éducatives. Ne remplace pas un suivi professionnel.*