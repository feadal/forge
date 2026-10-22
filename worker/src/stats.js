// The owner's stats page, in the app's own look: cool white ground, one cobalt accent, no outlines.

const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const NB = " ";

const CSS = `:root{color-scheme:light dark;--ground:#F7F8FA;--band:#EAEEF3;--ink:#0E131B;--ink-2:#485263;--ink-3:#5E6879;--accent:#1546BE;--bar:#7C8799;--danger:#B42318;--sel:#D6DEE9;
  --font:-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display",system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
@media (prefers-color-scheme:dark){:root{--ground:#0E1116;--band:#181C23;--ink:#EEF1F5;--ink-2:#A3ADBC;--ink-3:#8A94A4;--accent:#5A83EC;--bar:#5F6876;--danger:#F97066;--sel:#2C333F}}
*{box-sizing:border-box}
html{background:var(--ground)}
body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--font);font-size:17px;line-height:22px;letter-spacing:-.022em;
  font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased}
main{max-width:520px;margin:0 auto;padding:max(env(safe-area-inset-top),24px) 20px 40px}
h1{margin:0;font-size:28px;line-height:34px;font-weight:800;letter-spacing:-.025em}
.sub{margin:4px 0 0;color:var(--ink-2);font-size:15px;line-height:20px}
.active{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:28px 0 0}
.stat{display:grid;gap:2px}
.stat b{font-size:56px;line-height:52px;font-weight:800;letter-spacing:-.04em}
.stat span{color:var(--ink-2);font-size:15px;line-height:20px}
.stat.is-main b{color:var(--accent)}
.chart{margin:32px -20px 0;padding:20px 20px 16px;background:var(--band)}
.chart h2{margin:0;font-size:15px;line-height:20px;font-weight:600;color:var(--ink-2)}
.bars{list-style:none;margin:16px 0 0;padding:0;height:120px;display:grid;grid-template-columns:repeat(30,1fr);gap:3px;align-items:end}
.bar{height:100%;display:flex;align-items:flex-end}
.bar span{display:block;width:100%;min-height:2px;border-radius:3px 3px 1px 1px;background:var(--bar)}
.bar.is-today span{background:var(--accent)}
.axis{display:flex;justify-content:space-between;margin-top:8px;color:var(--ink-3);font-size:13px;line-height:18px}
.rows{margin:20px 0 0}
dl{margin:10px 0 0}
.row{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:12px 0}
dt{color:var(--ink)}
dd{margin:0;font-weight:600}
.fine{margin:28px 0 0;color:var(--ink-3);font-size:13px;line-height:18px}
.login{display:grid;gap:12px;margin:28px 0 0}
.login label{color:var(--ink-2);font-size:15px;line-height:20px}
.login input{width:100%;min-height:56px;padding:0 16px;border:1px solid transparent;border-radius:16px;background:var(--band);color:var(--ink);font:inherit;font-size:17px}
.login input:focus{outline:none;background:var(--sel);caret-color:var(--accent)}
.login button{min-height:56px;border:1px solid transparent;border-radius:16px;background:var(--ink);color:var(--ground);font:inherit;font-weight:600;cursor:pointer}
.err{margin:0;color:var(--danger);font-size:15px;line-height:20px}
`;

function dayLabel(day) {
  const [, m, d] = day.split("-").map(Number);
  return d + NB + MONTHS[m - 1];
}
function num(n) {
  return String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, NB);
}
function plural(n, one, few, many) {
  const a = Math.abs(n) % 100, b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b > 1 && b < 5) return few;
  if (b === 1) return one;
  return many;
}

export function statsPage(s) {
  const max = Math.max(1, ...s.series.map((x) => x.users));
  const any = s.series.some((x) => x.users);
  const asks30 = s.series.reduce((t, x) => t + x.asks, 0);
  const last = s.series[s.series.length - 1];
  const bars = s.series
    .map((x, i) => {
      const h = Math.round((x.users / max) * 100);
      const label = dayLabel(x.day) + ": " + x.users + " " + plural(x.users, "пользователь", "пользователя", "пользователей");
      return `<li class="bar${i === s.series.length - 1 ? " is-today" : ""}" title="${label}" aria-label="${label}"><span style="height:${Math.max(h, x.users ? 4 : 0)}%"></span></li>`;
    })
    .join("");

  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>FORGE · пользователи</title>
<style>${CSS}</style>
</head>
<body>
<main>
<h1>Пользователи</h1>
<p class="sub">FORGE · ${dayLabel(last.day)}, по Москве</p>

<section class="active" aria-label="Активные пользователи">
  <div class="stat${s.today ? " is-main" : ""}"><b>${num(s.today)}</b><span>сегодня</span></div>
  <div class="stat"><b>${num(s.week)}</b><span>за 7 дней</span></div>
  <div class="stat"><b>${num(s.month)}</b><span>за 30 дней</span></div>
</section>

<section class="chart">
  <h2>По дням${any ? ", максимум " + num(max) : ""}</h2>
  <ol class="bars">${bars}</ol>
  <div class="axis"><span>${dayLabel(s.series[0].day)}</span><span>сегодня</span></div>
</section>

<section class="rows">
  <dl>
    <div class="row"><dt>Установок всего</dt><dd>${num(s.total)}</dd></div>
    <div class="row"><dt>Из них собрали программу</dt><dd>${num(s.ready)}</dd></div>
    <div class="row"><dt>Новых за 7 дней</dt><dd>${num(s.new7)}</dd></div>
    <div class="row"><dt>Вопросов помощнику за 30 дней</dt><dd>${num(asks30)}</dd></div>
  </dl>
</section>

<p class="fine">Каждый телефон или браузер считается отдельным пользователем. Учитываются только запуски с интернетом.</p>
</main>
</body>
</html>`;
}

// The frame shared by the sign-in form and the outage message.
function shell(title, inner) {
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>${title}</title>
<style>${CSS}</style>
</head>
<body>
<main>
<h1>Пользователи</h1>
${inner}
</main>
</body>
</html>`;
}

// Shown when the counts cannot be read.
export function noticePage(text) {
  return shell("FORGE · пользователи", `<p class="sub" role="alert">${text}</p>`);
}

// Shown until the owner signs in. The password manager on the phone can fill it.
export function loginPage(error) {
  return shell("FORGE · вход", `<form class="login" method="post" action="/stats">
  <label for="pw">Пароль</label>
  <input id="pw" name="password" type="password" autocomplete="current-password" autofocus required${error ? ' aria-invalid="true" aria-describedby="err"' : ""}>
  ${error ? `<p class="err" id="err" role="alert">${error}</p>` : ""}
  <button type="submit">Войти</button>
</form>`);
}
