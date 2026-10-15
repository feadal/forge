#!/bin/bash
# Builds ../index.html from index.template.html, style.css and the three scripts.
set -e
D="$(cd "$(dirname "$0")" && pwd)"
OUT="$D/../index.html"
TMP="$(mktemp)"
{
  echo '<script>'
  echo 'var FORGE=(function(){'
  grep -v '^if(typeof module' "$D/engine.js"
  grep -v '^if(typeof module' "$D/nutrition.js"
  echo 'return {generateProgram:generateProgram, generateNutrition:generateNutrition, MUSCLE_RU:MUSCLE_RU, splitOptionsFor:splitOptionsFor};'
  echo '})();'
  cat "$D/ui.js"
  echo '</script>'
} > "$TMP"
python3 - "$D/index.template.html" "$D/style.css" "$TMP" "$OUT" <<'PY'
import sys
tpl, css, js, out = sys.argv[1:5]
t = open(tpl, encoding="utf-8").read()
t = t.replace("<!--STYLE-->", "<style>\n" + open(css, encoding="utf-8").read() + "</style>")
t = t.replace("<!--SCRIPT-->", open(js, encoding="utf-8").read().rstrip("\n"))
open(out, "w", encoding="utf-8").write(t)
PY
rm -f "$TMP"
echo "built: $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes)"
