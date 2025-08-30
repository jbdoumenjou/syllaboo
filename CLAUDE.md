# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version (runs TypeScript check + Vite build)
- `npm run preview` - Preview production build locally
- `npm test` - Run tests with Vitest
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## Application Architecture

### Core Purpose
Syllaboo is a dyslexia-friendly reading app for French children that uses **phonetic color coding** based on French educational methods. The app highlights complex French sounds (like "ou", "oi", "eu") with specific colors to aid reading comprehension.

### Key Architecture Patterns

**Vue 3 Composition API with TypeScript**: All components use `<script setup>` syntax and composables for state management.

**Composable-Based Architecture**: Business logic is separated into reusable composables:
- `useSettings.ts` - User preferences (colors, fonts, spacing) with localStorage persistence
- `usePhoneticHighlighting.ts` - Toggle phonetic color highlighting on/off
- `useTextToSpeech.ts` - Web Speech API integration for French text-to-speech
- `useTheme.ts` - CSS custom property theme management
- `useLocalStorage.ts` - Generic localStorage utility

**Phonetic Processing System**: The core innovation is the dual-layer phonetic analysis:

1. **Dictionary-based lookup** (`phoneticDictionary.ts`): Precise phonetic segmentation for common French words with accurate sound mapping
2. **Pattern-based fallback** (`PhoneticText.vue`): Regex patterns for unknown words, prioritized by complexity (longest patterns first)

**Sound Configuration System**: Each French phonetic sound has configurable properties:
- `id` - unique identifier (e.g., 'ou', 'oi', 'eu')
- `color` - hex color for highlighting
- `enabled` - whether to highlight this sound
- `pattern` - regex pattern for recognition
- `examples` - sample words for user reference

### Critical Implementation Details

**French Phonetic Rules**: The pattern matching in `PhoneticText.vue` follows French phonetic hierarchy:
- Complex patterns first (e.g., "eau", "ain", "oin")
- Prevents incorrect splitting (e.g., "eau" as "e-au")
- Handles special cases like identical consonants and R/L clusters

**Color Zone Styling**: The `.sound-segment` CSS class creates colored backgrounds for phonetic segments. Current implementation uses minimal vertical padding and negative margins for flat appearance.

**Settings Persistence**: All user preferences are automatically saved to localStorage via reactive watchers in `useSettings.ts`.

**Text Processing Flow**:
1. Split text into words (preserving whitespace)
2. Check `phoneticDictionary.ts` for exact word matches
3. If not found, apply regex patterns from `phoneticPatterns` array
4. Generate segments with sound types and colors
5. Render with appropriate CSS classes and styles

### Views Structure

- **Home** - Welcome page with app introduction
- **Reading** - Pre-selected French texts for practice
- **CustomText** - User input area with live phonetic preview
- **Configuration** - Sound colors, typography, and accessibility settings

### Scientific Foundation

The app implements methods from `dyslexia-research.md`, which contains academic references for:
- Color overlay effectiveness for dyslexic readers
- French syllabification rules
- Phonetic processing research
- Evidence-based color recommendations (turquoise, yellow backgrounds)

**Important**: This is experimental educational software that requires professional consultation before use with children.