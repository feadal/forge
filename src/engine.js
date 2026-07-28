"use strict";

const MUSCLES = ["chest","lats","upback","sdelt","rdelt","biceps","triceps","quads","hams","glutes","calves","traps","core"];

const MUSCLE_RU = {
  chest:"Грудь", lats:"Широчайшие", upback:"Верх спины", sdelt:"Средние дельты",
  rdelt:"Задние дельты", biceps:"Бицепс", triceps:"Трицепс", quads:"Квадрицепс",
  hams:"Бицепс бедра", glutes:"Ягодицы", calves:"Икры", traps:"Трапеции", core:"Кор"
};

const BASE_VOL = {
  chest:14, lats:14, upback:10, sdelt:14, rdelt:8, biceps:10, triceps:10,
  quads:14, hams:10, glutes:10, calves:10, traps:6, core:8
};

const GROUP = {
  push: ["chest","sdelt","triceps"],
  pull: ["lats","upback","rdelt","biceps","traps"],
  legs: ["quads","hams","glutes","calves"],
  core: ["core"]
};
const UPPER = [].concat(GROUP.push, GROUP.pull);
const ALL = [].concat(UPPER, GROUP.legs, GROUP.core);

const EX = [
  {id:"inc_db_press", n:"Жим гантелей на наклонной 30°", m:"chest", sec:["fdelt","triceps"], eq:["db"], t:"comp", pat:"hpress", stretch:true, cue:"Локти ~45°, растяжение внизу"},
  {id:"flat_bb_bench", n:"Жим штанги лёжа", m:"chest", sec:["fdelt","triceps"], eq:["bb"], t:"comp", pat:"hpress", cue:"Лопатки сведены, ноги в пол"},
  {id:"flat_db_press", n:"Жим гантелей лёжа", m:"chest", sec:["fdelt","triceps"], eq:["db"], t:"comp", pat:"hpress", stretch:true, cue:"Глубокое растяжение"},
  {id:"dip", n:"Отжимания на брусьях", m:"chest", sec:["triceps"], eq:["bw"], t:"comp", pat:"dip", stretch:true, cue:"Наклон корпуса вперёд на грудь"},
  {id:"cable_fly", n:"Сведения в кроссовере снизу-вверх", m:"chest", eq:["cable"], t:"iso", pat:"fly", stretch:true, cue:"К верху груди, сжатие 1 сек"},
  {id:"pecdeck", n:"Бабочка (пек-дек)", m:"chest", eq:["machine"], t:"iso", pat:"fly", cue:"Полное сведение"},

  {id:"pullup", n:"Подтягивания", m:"lats", sec:["biceps","upback"], eq:["bw"], t:"comp", pat:"vpull", stretch:true, cue:"Полная амплитуда, свод лопаток"},
  {id:"lat_pulldown", n:"Тяга верхнего блока", m:"lats", sec:["biceps"], eq:["cable"], t:"comp", pat:"vpull", stretch:true, cue:"Тяни локтями вниз"},
  {id:"pullover", n:"Пуловер на блоке", m:"lats", eq:["cable"], t:"iso", pat:"pullover", stretch:true, cue:"Растяжение широчайших вверху"},

  {id:"barbell_row", n:"Тяга штанги в наклоне", m:"upback", sec:["lats","biceps"], eq:["bb"], t:"comp", pat:"hpull", cue:"Спина ровная, тяни к поясу"},
  {id:"chest_row", n:"Тяга гантели в упоре (грудь в лавку)", m:"upback", sec:["lats"], eq:["db"], t:"comp", pat:"hpull", cue:"Корпус зафиксирован"},
  {id:"seated_row", n:"Горизонтальная тяга блока", m:"upback", sec:["lats","biceps"], eq:["cable"], t:"comp", pat:"hpull", cue:"Сводим лопатки"},

  {id:"facepull", n:"Тяга к лицу (face pull)", m:"rdelt", sec:["upback","traps"], eq:["cable"], t:"iso", pat:"rear", cue:"Разворот кистей наружу"},
  {id:"reverse_pecdeck", n:"Обратная бабочка", m:"rdelt", eq:["machine"], t:"iso", pat:"rear", cue:"Ведём локтями"},
  {id:"cable_rear_fly", n:"Разведение на задние дельты в кроссовере", m:"rdelt", eq:["cable"], t:"iso", pat:"rear", cue:"Без раскачки"},

  {id:"db_lat_raise", n:"Махи гантелями в стороны", m:"sdelt", eq:["db"], t:"iso", pat:"lateral", cue:"Мизинец чуть выше, контроль вниз"},
  {id:"cable_lat_raise", n:"Махи в стороны на блоке", m:"sdelt", eq:["cable"], t:"iso", pat:"lateral", stretch:true, cue:"Постоянное натяжение"},

  {id:"ohp", n:"Жим штанги стоя", m:"sdelt", sec:["triceps"], eq:["bb"], t:"comp", pat:"vpress", cue:"Кор в напряжении, без прогиба"},
  {id:"db_shoulder_press", n:"Жим гантелей сидя", m:"sdelt", sec:["triceps"], eq:["db"], t:"comp", pat:"vpress", cue:"Не заваливай локти назад"},

  {id:"incline_db_curl", n:"Сгибания на бицепс на наклонной", m:"biceps", eq:["db"], t:"iso", pat:"curl", stretch:true, cue:"Растяжка в нижней точке"},
  {id:"preacher_curl", n:"Сгибания на скамье Скотта", m:"biceps", eq:["machine","db"], t:"iso", pat:"curl_short", cue:"Не срывай с нижней точки"},
  {id:"cable_curl", n:"Сгибания на блоке", m:"biceps", eq:["cable"], t:"iso", pat:"curl_short", cue:"Постоянное натяжение"},
  {id:"bb_curl", n:"Подъём штанги на бицепс", m:"biceps", eq:["bb"], t:"iso", pat:"curl", cue:"Без читинга корпусом"},

  {id:"overhead_ext", n:"Разгибание на трицепс из-за головы", m:"triceps", eq:["cable","db"], t:"iso", pat:"tri_stretch", stretch:true, cue:"Полное растяжение, локти у головы"},
  {id:"pushdown", n:"Разгибание на трицепс вниз (канат)", m:"triceps", eq:["cable"], t:"iso", pat:"tri_short", cue:"Локти на месте, разводи внизу"},
  {id:"skullcrusher", n:"Французский жим", m:"triceps", eq:["bb","db"], t:"iso", pat:"tri_stretch", cue:"Опускай ко лбу/за голову"},
  {id:"close_grip_bench", n:"Жим узким хватом", m:"triceps", sec:["chest"], eq:["bb"], t:"comp", pat:"hpress", cue:"Локти вдоль корпуса"},

  {id:"back_squat", n:"Присед со штангой", m:"quads", sec:["glutes","hams"], eq:["bb"], t:"comp", pat:"squat", stretch:true, cue:"Глубина ниже параллели, спина ровная"},
  {id:"leg_press", n:"Жим ногами", m:"quads", sec:["glutes"], eq:["machine"], t:"comp", pat:"squat", cue:"Не отрывай таз внизу"},
  {id:"hack_squat", n:"Гакк-присед", m:"quads", sec:["glutes"], eq:["machine"], t:"comp", pat:"squat", stretch:true, cue:"Колени по носкам"},
  {id:"bulgarian_split", n:"Болгарские выпады", m:"quads", sec:["glutes"], eq:["db"], t:"comp", pat:"lunge", stretch:true, cue:"Вес на переднюю ногу"},
  {id:"leg_extension", n:"Разгибание ног", m:"quads", eq:["machine"], t:"iso", pat:"knee_ext", cue:"Пауза в верхней точке"},

  {id:"rdl", n:"Румынская тяга", m:"hams", sec:["glutes"], eq:["bb"], t:"comp", pat:"hinge", stretch:true, cue:"Таз назад, спина ровная"},
  {id:"leg_curl", n:"Сгибание ног лёжа", m:"hams", eq:["machine"], t:"iso", pat:"knee_flex", cue:"Контроль на негативе"},
  {id:"seated_leg_curl", n:"Сгибание ног сидя", m:"hams", eq:["machine"], t:"iso", pat:"knee_flex", stretch:true, cue:"Растяжение в верхней точке"},

  {id:"hip_thrust", n:"Ягодичный мост со штангой", m:"glutes", sec:["hams"], eq:["bb"], t:"comp", pat:"hinge", cue:"Сжатие ягодиц вверху"},

  {id:"standing_calf", n:"Подъёмы на носки стоя", m:"calves", eq:["machine"], t:"iso", pat:"calf", stretch:true, cue:"Полное растяжение внизу"},
  {id:"seated_calf", n:"Подъёмы на носки сидя", m:"calves", eq:["machine"], t:"iso", pat:"calf_bent", cue:"Пауза внизу и вверху"},

  {id:"shrug", n:"Шраги с гантелями", m:"traps", eq:["db"], t:"iso", pat:"shrug", cue:"Плечи строго вверх"},

  {id:"hanging_leg_raise", n:"Подъём ног в висе", m:"core", eq:["bw"], t:"iso", pat:"core_flex", cue:"Без раскачки, скручивай таз"},
  {id:"cable_crunch", n:"Скручивания на блоке", m:"core", eq:["cable"], t:"iso", pat:"core_flex", cue:"Скругляй спину"},
  {id:"plank", n:"Планка", m:"core", eq:["bw"], t:"iso", pat:"core_brace", cue:"Таз не проваливай"}
];

const LIMITS = {
  low_back: {
    ru:"Поясница",
    ban:["barbell_row","rdl","back_squat"],
    note:"Тяги — только с упором грудью в лавку (убирает нагрузку с разгибателей). Присед заменён на жим ногами/гакк. Нагрузка лечит спину — но наращивай её постепенно."
  },
  knee: {
    ru:"Колени",
    ban:["bulgarian_split","hack_squat"],
    note:"Ограничь глубину приседа на 10–15° выше угла, где начинается боль (ставь ящик). Разгибания ног — лёгкие и в частичной амплитуде. Глубину возвращай по неделям."
  },
  shoulder: {
    ru:"Плечи",
    ban:["ohp","dip"],
    note:"Никаких жимов и тяг из-за головы. Гантели вместо штанги — сустав сам выбирает траекторию. Face pull 2×/нед обязательно. Если жим болит — сузь амплитуду."
  },
  elbow: {
    ru:"Локти",
    ban:["skullcrusher","bb_curl","pullup","barbell_row"],
    note:"Вес −40–50%, повторы 12–20, негатив 3–4 сек. Лямки на всех тягах. Прямой гриф заменён на гантели/канат. Восстановление занимает 6–12 недель — это нормально."
  },
  wrist: {
    ru:"Запястья",
    ban:["bb_curl","dip"],
    note:"Кистевые бинты на жимах, лямки на тягах. Нейтральный хват (гантели, канат) вместо прямого грифа. Добавь лёгкие сгибания/разгибания запястий 2×/нед."
  },
  hernia: {
    ru:"Грыжа (в анамнезе)",
    ban:["rdl","back_squat","hanging_leg_raise","ohp"],
    note:"Без максимальных усилий и натуживания: выдох на усилии, воздух не задерживать. Пресс — только антидвижение (планка), без скручиваний и подъёмов ног в висе."
  },
  hip: {
    ru:"Тазобедренный сустав",
    ban:["back_squat","bulgarian_split","hanging_leg_raise"],
    note:"Ограничь глубину до угла без боли. Стойка шире, носки развернуть на 10–20°, пятки чуть выше (блины/штангетки). Глубину возвращай 8–12 недель."
  }
};

function round(x){ return Math.round(x); }
function clamp(x,a,b){ return Math.max(a, Math.min(b,x)); }

function chooseSplit(days, legs, goal){
  const U="upper", L="lower", F="full", P="push", Pu="pull", Lg="legs";
  const tpl = { upper: UPPER, lower: GROUP.legs, full: ALL, push: GROUP.push, pull: GROUP.pull.concat("core"), legs: GROUP.legs };
  let seq;
  if(!legs){
    const u=(k)=>({name:"Верх "+k, muscles:UPPER.concat("core")});
    if(days<=2) seq=[u("A"),u("B")];
    else if(days===3) seq=[u("A"),u("B"),u("C")];
    else if(days===4) seq=[u("A"),u("B"),u("A2"),u("B2")];
    else if(days===5) seq=[u("A"),u("B"),u("A2"),u("B2"),u("C")];
    else seq=[u("A"),u("B"),u("A2"),u("B2"),u("A3"),u("B3")];
    return {name:"Только верх ×"+days, days:seq};
  }
  const mk=(key,label)=>({name:label, muscles:tpl[key].slice()});
  if(days<=2){ seq=[mk("full","Всё тело A"),mk("full","Всё тело B")]; return splitName("Фулбади ×2",seq); }
  if(days===3){ seq=[mk("full","Всё тело A"),mk("full","Всё тело B"),mk("full","Всё тело C")]; return splitName("Фулбади ×3",seq); }
  if(days===4){ seq=[mk("upper","Верх A"),mk("lower","Низ A"),mk("upper","Верх B"),mk("lower","Низ B")]; return splitName("Верх/Низ ×2",seq); }
  if(days===5){ seq=[mk("push","Жим (пуш)"),mk("pull","Тяга (пул)"),mk("legs","Ноги"),mk("upper","Верх"),mk("lower","Низ")]; return splitName("Пуш/Пул/Ноги + Верх/Низ",seq); }
  seq=[mk("push","Жим A"),mk("pull","Тяга A"),mk("legs","Ноги A"),mk("push","Жим B"),mk("pull","Тяга B"),mk("legs","Ноги B")];
  return splitName("Пуш/Пул/Ноги ×2",seq);
}
function splitName(name,days){ return {name, days}; }

function weeklyVolume(input){
  const expMul = {beg:0.7, int:1.0, adv:1.15}[input.level] || 1.0;
  const vol = {};
  MUSCLES.forEach(m=>{
    let base = BASE_VOL[m]*expMul;
    if(input.goal==="str") base *= 0.75;
    if(input.goal==="cut") base *= 0.9;
    if(input.emphasis && input.emphasis.indexOf(m)>=0) base *= 1.4;
    if(input.exclude && input.exclude.indexOf(m)>=0) base = 0;
    if(!input.legs && GROUP.legs.indexOf(m)>=0) base = 0;
    vol[m] = base>0 ? clamp(round(base),4,26) : 0;
  });
  return vol;
}

function sessionCap(minutes){
  if(minutes<=45) return 14;
  if(minutes<=60) return 18;
  if(minutes<=75) return 22;
  return 26;
}

function maxExercises(minutes, level){
  let n = minutes<=45?4 : minutes<=60?5 : minutes<=75?6 : 7;
  if(level==="beg") n = Math.min(n, 5);
  return n;
}

function repScheme(goal, ex, isMain){
  if(goal==="str"){
    if(ex.t==="comp" && isMain) return {reps:"3–5", rir:"2"};
    if(ex.t==="comp") return {reps:"5–8", rir:"2"};
    return {reps:"6–10", rir:"1–2"};
  }
  if(goal==="hybrid"){
    if(ex.t==="comp" && isMain) return {reps:"4–6", rir:"2"};
    if(ex.t==="comp") return {reps:"6–10", rir:"1–2"};
    return {reps:"10–15", rir:"0–1"};
  }
  if(goal==="cut"){
    if(ex.t==="comp" && isMain) return {reps:"5–8", rir:"2"};
    if(ex.t==="comp") return {reps:"6–10", rir:"2"};
    return {reps:"12–20", rir:"0–1"};
  }
  if(ex.t==="comp") return {reps:"6–10", rir:"1–2"};
  return {reps:"10–15", rir:"0–1"};
}

function pickExercises(muscle, nsets, eqSet, usedPat, goal, rot, banned){
  let pool = EX.filter(e=> e.m===muscle && e.eq.some(x=>eqSet.has(x)) && !(banned && banned.has(e.id)));
  if(!pool.length) pool = EX.filter(e=> e.m===muscle && e.eq.some(x=>eqSet.has(x)));
  const score = (e)=> (e.t==="comp"?2:0) + (e.stretch?1:0);
  pool.sort((a,b)=> score(b)-score(a));
  if(rot && pool.length>1){
    const k = rot % pool.length;
    pool = pool.slice(k).concat(pool.slice(0,k));
  }
  const out=[];
  let need = nsets;
  const nEx = need<=5?1 : need<=9?2 : 3;
  const perEx = [];
  if(nEx===1) perEx.push(need);
  else if(nEx===2){ perEx.push(Math.ceil(need/2)); perEx.push(need-perEx[0]); }
  else { const a=Math.ceil(need/3); perEx.push(a,a,need-2*a); }
  let i=0;
  for(const e of pool){
    if(out.length>=nEx) break;
    if(usedPat.has(e.pat)) continue;
    usedPat.add(e.pat);
    const isMain = out.length===0 && e.t==="comp";
    const rs = repScheme(goal, e, isMain);
    out.push({id:e.id, name:e.n, muscle, sets:perEx[i]||need, reps:rs.reps, rir:rs.rir, cue:e.cue, stretch:!!e.stretch, type:e.t});
    i++;
  }
  if(out.length===0 && pool.length){
    const e=pool[0]; const rs=repScheme(goal,e,e.t==="comp");
    out.push({id:e.id,name:e.n,muscle,sets:need,reps:rs.reps,rir:rs.rir,cue:e.cue,stretch:!!e.stretch,type:e.t});
  }
  return out;
}

function generateProgram(input){
  input = Object.assign({level:"int", days:4, minutes:75, goal:"hyp", legs:true, emphasis:[], exclude:[]}, input||{});
  input.days = clamp(input.days,2,6);
  const split = chooseSplit(input.days, input.legs, input.goal);
  const vol = weeklyVolume(input);

  const dayCount = {};
  MUSCLES.forEach(m=> dayCount[m]=0);
  split.days.forEach(d=> d.muscles.forEach(m=>{ if(vol[m]>0) dayCount[m]++; }));

  const cap = sessionCap(input.minutes);
  const priority = ["quads","chest","lats","upback","hams","glutes","sdelt","triceps","biceps","rdelt","calves","traps","core"];
  const eqSet = new Set(input.equipment && input.equipment.length ? input.equipment : ["bb","db","cable","machine","bw"]);
  const banned = new Set();
  (input.limits||[]).forEach(k=>{ const L=LIMITS[k]; if(L) L.ban.forEach(id=>banned.add(id)); });

  const days = split.days.map((d, di)=>{
    const usedPat = new Set();
    const items = [];
    let dayMuscles = priority.filter(m=> d.muscles.indexOf(m)>=0 && vol[m]>0 && dayCount[m]>0);

    const maxEx = maxExercises(input.minutes, input.level);
    if(dayMuscles.length > maxEx){
      const keep = Math.min(3, maxEx);
      const head = dayMuscles.slice(0, keep);
      const tail = dayMuscles.slice(keep);
      const step = Math.max(1, maxEx - keep);
      const k = (di * step) % tail.length;
      const rotated = tail.slice(k).concat(tail.slice(0,k));
      const picked = head.concat(rotated).slice(0, maxEx);
      dayMuscles = priority.filter(m=> picked.indexOf(m)>=0);
    }

    const want = {};
    dayMuscles.forEach(m=>{ want[m] = Math.max(2, Math.round(vol[m]/dayCount[m])); });
    let sum = dayMuscles.reduce((a,m)=>a+want[m],0);

    if(sum > cap){
      const scale = cap/sum;
      dayMuscles.forEach(m=>{ want[m] = Math.max(2, Math.round(want[m]*scale)); });
      sum = dayMuscles.reduce((a,m)=>a+want[m],0);
      let guard = 0;
      while(sum > cap && guard++ < 100){
        let big = null;
        dayMuscles.forEach(m=>{ if(want[m] > 2 && (!big || want[m] > want[big])) big = m; });
        if(!big) break;
        want[big] -= 1; sum -= 1;
      }
    }

    for(const m of dayMuscles){
      if(want[m] < 2) continue;
      if(items.length >= maxEx) break;
      const chosen = pickExercises(m, want[m], eqSet, usedPat, input.goal, di, banned);
      for(const c of chosen){
        if(items.length >= maxEx) break;
        c.sets = clamp(c.sets, 2, 5);
        items.push(c);
      }
    }
    return {key:d.name, name:d.name, exercises:items};
  });

  const achieved = {};
  MUSCLES.forEach(m=> achieved[m]=0);
  days.forEach(d=> d.exercises.forEach(x=> achieved[x.muscle]+=x.sets));

  return {
    meta:{split:split.name, days:input.days, goal:input.goal, level:input.level, minutes:input.minutes, legs:input.legs},
    days,
    weeklyVolume:achieved,
    target:vol,
    progression: input.goal==="str"
      ? "Линейно-волновая: на главных базовых добавляй ~2.5 кг когда выбил все подходы в верхе диапазона при RIR 2. Аксессуары — двойная прогрессия."
      : input.goal==="cut"
      ? "На сушке цель — УДЕРЖАТЬ веса, а не расти. Держи прежние килограммы на базе; если вес на штанге падает 2 тренировки подряд — режь дефицит, а не подходы. Прибавка веса на изоляции — бонус, не требование."
      : "Двойная прогрессия: держи диапазон повторов, добавляй по повтору; выбил верх во всех подходах при RIR ≤1 → +вес (2.5 кг база / 1–2 кг изоляция). Делоад на 7–8 неделе.",
    notes: buildNotes(input, split, achieved, vol),
    limitNotes: (input.limits||[]).map(k=> LIMITS[k] ? {title:LIMITS[k].ru, note:LIMITS[k].note} : null).filter(Boolean)
  };
}

function buildNotes(input, split, achieved, target){
  const notes=[];
  notes.push("Сплит: "+split.name+" — "+input.days+" дн/нед.");
  if(!input.legs) notes.push("Ноги исключены по твоему выбору — программа только на верх.");
  const emph=(input.emphasis||[]).map(m=>MUSCLE_RU[m]).filter(Boolean);
  if(emph.length) notes.push("Акцент: "+emph.join(", ")+" (объём поднят).");
  notes.push(input.goal==="str"?"Цель — сила: мало повторов на базе, больше отдых (3–5 мин), техника в приоритете."
    : input.goal==="hybrid"?"Цель — сила+масса: тяжёлая база в 4–6 + гипертрофийная подсобка."
    : input.goal==="cut"?"Цель — сушка: база остаётся тяжёлой (5–8 повторов) — это защищает мышцы в дефиците. Изоляция уходит в 12–20 повторов. Объём чуть снижен: в дефиците восстановление хуже."
    : "Цель — гипертрофия: 6–15 повторов, RIR 0–2, отдых 1.5–3 мин.");
  if(input.goal==="cut"){
    notes.push("Кардио: 2–3 сессии по 20–30 мин или 8–10 тыс. шагов в день. Не заменяй им дефицит в еде — кардио дополняет, а не отменяет.");
    notes.push("Главный маркер, что сушка идёт правильно: вес падает, а веса на штанге стоят.");
  }
  return notes;
}

if(typeof module!=="undefined") module.exports = {generateProgram, MUSCLE_RU, MUSCLES, EX, LIMITS};
