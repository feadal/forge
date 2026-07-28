#!/bin/bash
set -e
D="$(cd "$(dirname "$0")" && pwd)"
OUT="$D/app-body.html"
{
  echo '<style>'
  cat "$D/style.css"
  echo '</style>'
  echo '<div id="app"></div>'
  echo '<div id="toast"></div>'
  echo '<script>'
  echo 'var FORGE=(function(){'
  grep -v '^if(typeof module' "$D/engine.js"
  grep -v '^if(typeof module' "$D/nutrition.js"
  echo 'return {generateProgram:generateProgram, generateNutrition:generateNutrition, MUSCLE_RU:MUSCLE_RU, FOODS:FOODS, RESTRICTIONS:RESTRICTIONS};'
  echo '})();'
  cat "$D/ui.js"
  echo '</script>'
} > "$OUT"
echo "built: $OUT ($(wc -c < "$OUT") bytes)"
