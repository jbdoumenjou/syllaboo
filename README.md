# Syllaboo - Application de lecture pour enfants dyslexiques

Une application web conçue spécialement pour aider les enfants dyslexiques à apprendre à lire le français, en utilisant des méthodes pédagogiques éprouvées et des technologies d'assistance.

## 🎯 Objectifs

- Faciliter l'apprentissage de la lecture pour les enfants dyslexiques
- Utiliser des codes couleur basés sur des méthodes pédagogiques françaises reconnues
- Proposer une interface adaptée aux besoins spécifiques des apprenants dyslexiques
- Offrir un support audio avec synthèse vocale française

## 📚 Références scientifiques et pédagogiques

### Méthodes pédagogiques françaises pour la dyslexie

#### 1. Méthode des couleurs phonétiques
**Source :** [Dys é moi - Moyens mnémotechniques pour lire les sons en couleur](https://www.dysemoizazoo.fr/chenille-des-lettres-papillon-et-palette-des-sons-pour-lire-en-couleur/)

Cette méthode associe chaque son complexe à une couleur mnémotechnique :
- **"ou" → Rouge** (le son "ou" est contenu dans le mot "rouge")
- **"oi" → Noir** (le son "oi" est contenu dans le mot "noir")  
- **"eu" → Bleu** (le son "eu" est contenu dans le mot "bleu")
- **"é" → Rosé** (le son "é" est contenu dans le mot "rosé")
- **"è/ê" → Violet** (le son "è" est contenu dans le mot "violet")
- **"au/eau" → Jaune** (le son "au" est contenu dans le mot "jaune")
- **"on/om" → Marron** (le son "on" est contenu dans le mot "marron")
- **"an/en" → Orange** (le son "an" est contenu dans le mot "orange")
- **"in/ain/ein" → Vert** (le son "in" est contenu dans le mot "vert sapin")

#### 2. Approche multisensorielle
**Source :** [Blog Hop'Toys - La couleur, alliée du dyslexique](https://www.bloghoptoys.fr/la-couleur-alliee-du-dyslexique)

L'utilisation de couleurs combinée aux gestes et à l'audio constitue "un tremplin vers la lecture" en sollicitant plusieurs canaux sensoriels simultanément.

#### 3. Méthode syllabique colorée
**Source :** [DYS - mais pas que... - Les sons complexes en couleurs](https://unefamilledysfferente.eklablog.com/les-sons-complexes-en-couleurs-dys-a130062212)

Le découpage syllabique du mot, grâce à l'utilisation de deux couleurs distinctes, facilite l'appréhension de la frontière syllabique et permet de distinguer visuellement les syllabes d'un coup d'œil.

### Recherches sur la dyslexie et la lecture

#### 4. Traitement phonétique en lecture
**Source :** [Thèse Lyon 2 - Traitement phonétique en lecture : lecture normale et dyslexie développementale](http://theses.univ-lyon2.fr/documents/lyon2/2010/krifi_s)

Recherches sur les processus phonétiques impliqués dans la lecture normale et chez les dyslexiques, justifiant l'approche phonétique par couleurs.

#### 5. Méthode Davis pour la dyslexie
**Source :** [Davis Method - Les méthodes de lecture de 1930 à nos jours](https://www.dyslexie-tda-dyscalculie.eu/articles/les-m%C3%A9thodes-de-lecture/)

Approche globale prenant en compte les particularités perceptuelles des dyslexiques.

## 🔬 Principes scientifiques appliqués

### 1. Soulagement de la mémoire de travail
Dominique Garnier-Lasek, orthophoniste française, a observé l'échec des méthodes globales et phonétiques classiques avec ses patients dyslexiques et dysphasiques. Elle a développé une méthode visant à soulager la mémoire de travail.

### 2. Reconnaissance des polygraphes
La méthode aide à la mémorisation des sons complexes (évite les confusions entre sons complexes) et à la reconnaissance des polygraphes (l'enfant prend en compte l'ensemble du graphème).

### 3. Association visuo-auditive
Chaque graphème est coloré selon un code couleur bien défini, créant une association mnémotechnique entre le visuel et l'auditif.

## 🎨 Design adapté à la dyslexie

### Police de caractères
- **OpenDyslexic** : Police spécialement conçue pour les personnes dyslexiques
- Caractères avec base lourde pour éviter les retournements
- Espacement optimisé entre les lettres

### Mise en page
- **Fond crème** (#f5f5dc) : Réduit la fatigue oculaire par rapport au blanc pur
- **Espacement augmenté** : Entre les lettres, mots et lignes
- **Taille de police importante** : 24px minimum pour faciliter la lecture
- **Contraste élevé** : Entre le texte et l'arrière-plan

### Couleurs
- **Palette limitée** : Évite la surcharge cognitive
- **Couleurs contrastées** : Facilitent la distinction des sons
- **Cohérence** : Même couleur = même son dans toute l'application

## 🔊 Synthèse vocale adaptée

### Paramètres optimisés pour la dyslexie
- **Vitesse réduite** : 0.8x la vitesse normale
- **Mode mot par mot** : Avec pauses de 1.2 secondes entre chaque mot
- **Voix française** : Priorité aux voix françaises disponibles
- **Volume modéré** : 0.9 pour éviter l'agression auditive

## 🛠️ Technologies utilisées

- **Vue.js 3** avec TypeScript : Framework réactif moderne
- **Vite** : Build tool rapide et efficace  
- **Web Speech API** : Synthèse vocale native du navigateur
- **Local Storage** : Sauvegarde des progrès côté client
- **CSS Grid/Flexbox** : Mise en page responsive

## 📖 Dictionnaire phonétique intégré

L'application inclut un dictionnaire phonétique français curé pour une segmentation précise des mots courants :

### Fonctionnalités du dictionnaire
- **Mots du quotidien** : Plus de 50 mots avec leur segmentation phonétique précise
- **Conjugaisons courantes** : Formes verbales comme "aimait", "jouait", "avait" 
- **Couleurs de référence** : Tous les mots-couleurs utilisés dans la méthode
- **Famille et nombres** : Vocabulaire de base pour enfants
- **Transcription IPA** : Référence phonétique scientifique pour chaque mot

### Exemples de corrections apportées
| Mot | Segmentation automatique | Segmentation correcte (dictionnaire) |
|-----|-------------------------|-----------------------------------|
| "aimait" | ai-m-ai-t | **ai** (/è/) - m - **ai** (/è/) - t |
| "maison" | m-ai-s-on | m - **ai** (/è/) - s - **on** |
| "oiseau" | oi-s-eau | **oi** - s - **eau** |

### Fonctionnement
1. **Lookup prioritaire** : Vérification dans le dictionnaire en premier
2. **Normalisation** : Gestion des accents et variantes orthographiques
3. **Fallback intelligent** : Analyse par motifs si mot non trouvé
4. **Extensibilité** : Ajout facile de nouveaux mots

Cette approche hybride garantit une précision maximale pour les mots courants tout en conservant la flexibilité pour les mots inconnus.

## 📖 Contenu pédagogique

Les textes proposés sont adaptés aux différents niveaux :
- **Niveau facile** : Phrases courtes, vocabulaire simple
- **Niveau moyen** : Textes narratifs avec sons complexes
- **Niveau difficile** : Histoires élaborées pour lecteurs confirmés

Chaque texte contient des sons complexes ciblés pour un apprentissage progressif.

## 🔬 Validation scientifique

Cette application s'appuie sur :
- **Méthodes pédagogiques éprouvées** en France depuis plusieurs décennies
- **Recherches en neurosciences** sur la dyslexie
- **Retours d'expérience** d'orthophonistes et enseignants spécialisés
- **Principes d'accessibilité** reconnus par les organismes internationaux

## 📚 Bibliographie complémentaire

- Sprenger-Charolles, L. & Colé, P. (2013). *Lecture et dyslexie : Approche cognitive*. Dunod.
- Habib, M. (2018). *La constellation des dys*. De Boeck Supérieur.
- Mazeau, M. & Pouhet, A. (2014). *Neuropsychologie et troubles des apprentissages chez l'enfant*. Elsevier Masson.

## 🎯 Perspectives d'évolution

- Ajout de nouveaux exercices interactifs
- Intégration de méthodes gestuelles (Borel-Maisonny)
- Système de progression gamifié
- Adaptation pour d'autres troubles dys
- Version mobile native

---

*Cette application a été développée dans un but éducatif et ne remplace pas un accompagnement professionnel par un orthophoniste ou un enseignant spécialisé.*