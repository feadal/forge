<div align="center">

<img src="icon.svg" width="96" alt="FORGE">

# FORGE

**A workout program and meal plan made for you, then a log for the gym.**

English · [Русский](README.ru.md)

[Open the app](https://feadal.github.io/forge/) (the interface is in Russian)

<img src="screenshots/train.png" width="240" alt="Workout: the current set with the loaded bar"> <img src="screenshots/rest.png" width="240" alt="Rest: time runs down the knurling of the bar"> <img src="screenshots/progress.png" width="240" alt="Progress: estimated one-rep max">

</div>

## What it does

A questionnaire of 9 short screens builds an 8-week program. The app picks a split for you (full body, upper/lower, push/pull/legs or a body-part split) or uses the one you choose. Volume, phases and exercises follow your experience, goal, training days, equipment and injuries.

In the gym a set takes one tap: weight and reps are already filled in from your previous set or from last week. To change them there is a custom keypad with 2.5 kg steps. The app also tells warm-up, drop and to-failure sets apart.

The current set is drawn. At 72.5 kg you see what to load: 20, 5 and 1.25 per side. Dumbbells, cable stacks and weighted pull-ups get their own drawings.

During rest the knurling on the drawn bar runs down with the time. The timer counts from a timestamp, so a locked screen does not reset it. The screen stays awake during a workout, and a chime marks the end of rest.

After a workout the app shows your records, and the Progress tab has an estimated one-rep max for every exercise.

Nutrition covers calories, protein, fat, carbs and a daily menu. The menu respects 16 restrictions, from allergies and intolerances to vegetarian diets.

If you have an injury, risky exercises stay out of the program. If you report warning symptoms in the questionnaire, the app sends you to a doctor first.

## Install

Open [feadal.github.io/forge](https://feadal.github.io/forge/) and add it to your home screen.

- iPhone: in Safari tap Share, then Add to Home Screen.
- Android: in Chrome open the menu and tap Install app.

The first launch needs an internet connection. After that the app works offline.

## Privacy

The app has no server and no accounts, and it makes no network requests. Your profile, program and workout history stay on your phone, in `localStorage`.

## Evidence behind the rules

- 10 to 20 hard sets per muscle per week, with each muscle trained twice a week: Schoenfeld's meta-analyses.
- Exercises loaded at long muscle lengths come first: Maeo, 2023.
- Protein at 1.6 to 2.2 g per kg of body weight: the ISSN position stand and Morton's 2018 meta-analysis.
- In trained lifters, stopping 1 or 2 reps short of failure builds as much muscle as going to failure.
- On a cut, heavy compound work keeps muscle in a deficit.
- Exercise swaps for injuries follow clinical guidelines.

## Development

```
index.html                the built app, a single file
sw.js                     service worker, offline cache
manifest.webmanifest      PWA manifest
src/
  engine.js               training: splits, volume, exercise selection, injuries
  nutrition.js            nutrition: calories, macros, menu, restrictions
  ui.js                   interface and log
  style.css               styles
  index.template.html     page template
  build.sh                builds index.html
```

Build with `bash src/build.sh`. There are no dependencies.

## Disclaimer

FORGE helps you plan. It does not replace a doctor, a dietitian or a coach. If you have a condition or an injury, or take medication, check the program and the meal plan with a specialist.
