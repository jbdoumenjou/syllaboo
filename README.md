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

### 📚 Base scientifique

Les méthodes utilisées s'appuient sur des recherches récentes en neurosciences et dyslexie. 
Consultez notre [documentation de recherche](./dyslexia-research.md) pour les références académiques complètes.

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

## ⚠️ Avertissement important

**Cette application est en cours de développement et à des fins de recherche éducative uniquement.**

- Les algorithmes de coloration phonétique et de découpage syllabique sont **expérimentaux**
- Le contenu n'a **pas encore été validé** par des orthophonistes ou spécialistes de la dyslexie
- Cette application **ne remplace pas** un diagnostic ou suivi professionnel
- L'efficacité des méthodes utilisées varie selon chaque enfant
- **Consultation recommandée** : Demandez l'avis d'un professionnel de santé avant utilisation

## Licence

MIT

---

*Application à des fins éducatives et de recherche. Consultation d'un spécialiste recommandée.*