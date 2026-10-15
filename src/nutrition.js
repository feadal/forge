"use strict";

const FOODS = [
  {id:"chicken_breast", ru:"Куриная грудка", cat:"protein", kcal:165, p:31, f:3.6, c:0, fib:0, tags:[], slot:"main", cost:1, prep:"cook"},
  {id:"turkey_fillet", ru:"Филе индейки", cat:"protein", kcal:150, p:29, f:3, c:0, fib:0, tags:[], slot:"main", cost:2, prep:"cook"},
  {id:"beef_mince_5", ru:"Говяжий фарш 5 %", cat:"protein", kcal:150, p:21, f:7, c:0, fib:0, tags:["beef"], slot:"main", cost:2, prep:"cook"},
  {id:"pork_lean", ru:"Свинина нежирная", cat:"protein", kcal:180, p:21, f:10, c:0, fib:0, tags:["pork"], slot:"main", cost:2, prep:"cook"},
  {id:"cod", ru:"Треска", cat:"protein", kcal:82, p:18, f:0.7, c:0, fib:0, tags:["fish"], slot:"main", cost:2, prep:"cook"},
  {id:"mackerel", ru:"Скумбрия", cat:"protein", kcal:191, p:18, f:13, c:0, fib:0, tags:["fish"], slot:"main", cost:1, prep:"cook"},
  {id:"salmon", ru:"Лосось", cat:"protein", kcal:208, p:20, f:13, c:0, fib:0, tags:["fish"], slot:"main", cost:3, prep:"cook"},
  {id:"tuna_can", ru:"Тунец консервированный", cat:"protein", kcal:116, p:26, f:1, c:0, fib:0, tags:["fish"], slot:"main,snack", cost:2, prep:"none"},
  {id:"shrimp", ru:"Креветки", cat:"protein", kcal:99, p:24, f:0.3, c:0, fib:0, tags:["shellfish"], slot:"main", cost:3, prep:"cook"},
  {id:"eggs", ru:"Яйца куриные", cat:"protein", kcal:143, p:13, f:10, c:0.7, fib:0, tags:["egg"], slot:"am,snack", cost:1, prep:"cook"},
  {id:"egg_whites", ru:"Яичные белки", cat:"protein", kcal:52, p:11, f:0.2, c:0.7, fib:0, tags:["egg"], slot:"am", cost:2, prep:"cook"},
  {id:"cottage_cheese", ru:"Творог 5 %", cat:"protein", kcal:121, p:17, f:5, c:3, fib:0, tags:["milk","lactose_low"], slot:"am,snack,night", cost:1, prep:"none"},
  {id:"cottage_cheese_0", ru:"Творог обезжиренный", cat:"protein", kcal:71, p:16, f:0.6, c:1.8, fib:0, tags:["milk","lactose_low"], slot:"am,snack,night", cost:1, prep:"none"},
  {id:"greek_yogurt", ru:"Греческий йогурт", cat:"protein", kcal:59, p:10, f:0.4, c:3.6, fib:0, tags:["milk","lactose_low"], slot:"am,snack,night", cost:2, prep:"none"},
  {id:"kefir", ru:"Кефир 1 %", cat:"protein", kcal:40, p:3, f:1, c:4, fib:0, tags:["milk","lactose_low"], slot:"am,snack,night", cost:1, prep:"none"},
  {id:"milk", ru:"Молоко 2,5 %", cat:"protein", kcal:52, p:2.8, f:2.5, c:4.7, fib:0, tags:["milk","lactose"], slot:"am,snack", cost:1, prep:"none"},
  {id:"hard_cheese", ru:"Сыр твёрдый", cat:"protein", kcal:364, p:25, f:29, c:0, fib:0, tags:["milk","lactose_low"], slot:"am,snack", cost:2, prep:"none"},
  {id:"whey", ru:"Сывороточный протеин", cat:"protein", kcal:400, p:80, f:5, c:8, fib:0, tags:["milk","supplement"], slot:"am,snack", cost:2, prep:"none"},
  {id:"soy_protein", ru:"Соевый протеин", cat:"protein", kcal:380, p:80, f:2, c:5, fib:2, tags:["soy","supplement","vegan"], slot:"am,snack", cost:2, prep:"none"},
  {id:"pea_protein", ru:"Гороховый протеин", cat:"protein", kcal:390, p:80, f:6, c:3, fib:3, tags:["supplement","vegan"], slot:"am,snack", cost:2, prep:"none"},
  {id:"tofu", ru:"Тофу", cat:"protein", kcal:144, p:16, f:9, c:2, fib:1, tags:["soy","vegan"], slot:"main", cost:2, prep:"quick"},
  {id:"lentils", ru:"Чечевица (сухая)", cat:"protein", kcal:352, p:25, f:1, c:60, fib:11, tags:["vegan","fodmap"], slot:"main", cost:1, prep:"cook"},
  {id:"chickpeas", ru:"Нут (сухой)", cat:"protein", kcal:364, p:19, f:6, c:61, fib:17, tags:["vegan","fodmap"], slot:"main", cost:1, prep:"cook"},
  {id:"beans_red", ru:"Фасоль красная (сухая)", cat:"protein", kcal:333, p:24, f:1, c:60, fib:15, tags:["vegan","fodmap"], slot:"main", cost:1, prep:"cook"},

  {id:"oats", ru:"Овсянка", cat:"carb", kcal:379, p:13, f:7, c:67, fib:10, tags:["gluten_trace","vegan"], slot:"am,snack", cost:1, prep:"quick"},
  {id:"rice_white", ru:"Рис белый", cat:"carb", kcal:365, p:7, f:1, c:80, fib:1, tags:["vegan","gf"], slot:"main", cost:1, prep:"cook"},
  {id:"buckwheat", ru:"Гречка", cat:"carb", kcal:343, p:13, f:3, c:72, fib:10, tags:["vegan","gf"], slot:"main", cost:1, prep:"cook"},
  {id:"pasta", ru:"Макароны твёрдых сортов", cat:"carb", kcal:371, p:13, f:1.5, c:75, fib:3, tags:["gluten","vegan"], slot:"main", cost:1, prep:"cook"},
  {id:"potato", ru:"Картофель", cat:"carb", kcal:77, p:2, f:0.1, c:17, fib:2, tags:["vegan","gf"], slot:"main", cost:1, prep:"cook"},
  {id:"sweet_potato", ru:"Батат", cat:"carb", kcal:86, p:1.6, f:0.1, c:20, fib:3, tags:["vegan","gf"], slot:"main", cost:2, prep:"cook"},
  {id:"bread_whole", ru:"Хлеб цельнозерновой", cat:"carb", kcal:247, p:9, f:3, c:41, fib:7, tags:["gluten","vegan"], slot:"am,snack,main", cost:1, prep:"none"},
  {id:"bread_gf", spec:1, ru:"Хлеб безглютеновый", cat:"carb", kcal:250, p:5, f:4, c:47, fib:4, tags:["vegan","gf"], slot:"am,snack,main", cost:3, prep:"none"},
  {id:"banana", ru:"Банан", cat:"carb", kcal:89, p:1.1, f:0.3, c:23, fib:2.6, tags:["vegan","gf"], slot:"am,snack", cost:1, prep:"none"},
  {id:"apple", ru:"Яблоко", cat:"carb", kcal:52, p:0.3, f:0.2, c:14, fib:2.4, tags:["vegan","gf","fodmap"], slot:"snack", cost:1, prep:"none"},
  {id:"berries", ru:"Ягоды", cat:"carb", kcal:57, p:0.7, f:0.3, c:14, fib:2.4, tags:["vegan","gf"], slot:"am,snack", cost:2, prep:"none"},
  {id:"honey", ru:"Мёд", cat:"carb", kcal:304, p:0.3, f:0, c:82, fib:0, tags:["vegan","gf","fodmap"], slot:"am,snack", cost:2, prep:"none"},

  {id:"olive_oil", pure:1, ru:"Оливковое масло", cat:"fat", kcal:884, p:0, f:100, c:0, fib:0, tags:["vegan","gf"], slot:"main", cost:2, prep:"none"},
  {id:"butter", pure:1, ru:"Сливочное масло", cat:"fat", kcal:717, p:0.9, f:81, c:0.1, fib:0, tags:["milk","lactose_low"], slot:"am,main", cost:2, prep:"none"},
  {id:"peanut_butter", ru:"Арахисовая паста", cat:"fat", kcal:588, p:25, f:50, c:20, fib:6, tags:["peanut","vegan"], slot:"am,snack,main", cost:1, prep:"none"},
  {id:"almonds", ru:"Миндаль", cat:"fat", kcal:579, p:21, f:50, c:22, fib:12, tags:["treenut","vegan","gf"], slot:"snack,main", cost:3, prep:"none"},
  {id:"walnuts", ru:"Грецкий орех", cat:"fat", kcal:654, p:15, f:65, c:14, fib:7, tags:["treenut","vegan","gf"], slot:"snack,main", cost:2, prep:"none"},
  {id:"avocado", ru:"Авокадо", cat:"fat", kcal:160, p:2, f:15, c:9, fib:7, tags:["vegan","gf"], slot:"am,main", cost:3, prep:"none"},
  {id:"seeds_sunflower", ru:"Семечки подсолнуха", cat:"fat", kcal:584, p:21, f:51, c:20, fib:9, tags:["vegan","gf"], slot:"snack,main", cost:1, prep:"none"},

  {id:"broccoli", ru:"Брокколи", cat:"veg", kcal:34, p:2.8, f:0.4, c:7, fib:2.6, tags:["vegan","gf"], slot:"main", cost:1, prep:"quick"},
  {id:"cucumber", ru:"Огурцы", cat:"veg", kcal:15, p:0.7, f:0.1, c:3.6, fib:0.5, tags:["vegan","gf"], slot:"main", cost:1, prep:"none"},
  {id:"tomato", ru:"Помидоры", cat:"veg", kcal:18, p:0.9, f:0.2, c:3.9, fib:1.2, tags:["vegan","gf"], slot:"main", cost:1, prep:"none"},
  {id:"carrot", ru:"Морковь", cat:"veg", kcal:41, p:0.9, f:0.2, c:10, fib:2.8, tags:["vegan","gf"], slot:"main,snack", cost:1, prep:"none"},
  {id:"cabbage", ru:"Капуста", cat:"veg", kcal:25, p:1.3, f:0.1, c:6, fib:2.5, tags:["vegan","gf"], slot:"main", cost:1, prep:"none"},
  {id:"spinach", ru:"Шпинат", cat:"veg", kcal:23, p:2.9, f:0.4, c:3.6, fib:2.2, tags:["vegan","gf"], slot:"am,main", cost:2, prep:"quick"},
  {id:"mixed_veg", ru:"Овощная смесь", cat:"veg", kcal:45, p:2, f:0.3, c:9, fib:3, tags:["vegan","gf"], slot:"main", cost:1, prep:"quick"}
];

const RESTRICTIONS = {
  lactose:      {excludeTags:["lactose"], note:"Твёрдый сыр, творог и йогурт обычно переносятся — оставлены."},
  milk_allergy: {excludeTags:["milk","lactose"], note:"Молочное исключено полностью, включая сывороточный протеин."},
  gluten:       {excludeTags:["gluten"], note:"Овсянку бери с маркировкой «без глютена»."},
  celiac:       {excludeTags:["gluten","gluten_trace"], note:"Исключены все злаки со следами глютена."},
  egg:          {excludeTags:["egg"], note:""},
  peanut:       {excludeTags:["peanut"], note:""},
  treenut:      {excludeTags:["treenut"], note:""},
  soy:          {excludeTags:["soy"], note:""},
  fish:         {excludeTags:["fish"], note:"Добавь омега-3 (водорослевую или льняное масло)."},
  shellfish:    {excludeTags:["shellfish"], note:""},
  vegetarian:   {excludeTags:["fish","shellfish","beef","pork"], excludeCatMeat:true, note:"Молочное и яйца оставлены."},
  vegan:        {excludeTags:["milk","lactose","lactose_low","egg","fish","shellfish","beef","pork"], excludeCatMeat:true,
                 note:"Растительный белок усваивается хуже, поэтому норма выше. Добавь B12, креатин и омега-3 из водорослей."},
  pescatarian:  {excludeTags:["beef","pork"], excludeCatMeat:true, keepFish:true, note:"Рыба и морепродукты оставлены."},
  halal:        {excludeTags:["pork"], note:""},
  no_beef:      {excludeTags:["beef"], note:""},
  fodmap:       {excludeTags:["fodmap"], note:"Бобовые и часть фруктов убраны — вводи их обратно постепенно."}
};

const MEAT_IDS = ["chicken_breast","turkey_fillet","beef_mince_5","pork_lean"];
const FISH_IDS = ["cod","mackerel","salmon","tuna_can","shrimp"];

function clamp(x,a,b){ return Math.max(a, Math.min(b,x)); }
function r(x){ return Math.round(x); }

function bmr(input){
  const s = input.sex==="f" ? -161 : 5;
  if(input.bodyfat && input.bodyfat>3 && input.bodyfat<60){
    const lbm = input.weight*(1-input.bodyfat/100);
    return {value: 370 + 21.6*lbm, formula:"Кетч-МакАрдл (по % жира)"};
  }
  return {value: 10*input.weight + 6.25*input.height - 5*input.age + s, formula:"Миффлина–Сан Жеора"};
}

const ACTIVITY = {
  sed:   {mul:1.2,   ru:"Сидячий образ жизни"},
  light: {mul:1.375, ru:"Лёгкая активность (1–3 трен/нед)"},
  mod:   {mul:1.55,  ru:"Средняя (3–5 трен/нед)"},
  high:  {mul:1.725, ru:"Высокая (6–7 трен/нед)"},
  ath:   {mul:1.9,   ru:"Очень высокая (физическая работа + спорт)"}
};

// Lifestyle outside the gym; training sessions are added on top (≈+0.025 per weekly session).
const LIFESTYLE = {
  sed:   {mul:1.25, ru:"Сидячая работа"},
  light: {mul:1.35, ru:"Немного хожу"},
  mod:   {mul:1.45, ru:"Много хожу"},
  high:  {mul:1.6,  ru:"Физический труд"}
};

function activityFactor(input){
  const life = LIFESTYLE[input.activity];
  if(life && typeof input.trainingDays==="number"){
    const d = clamp(Math.round(input.trainingDays),0,7);
    var word = (d>=2 && d<=4) ? "раза" : "раз";
    return {mul: Math.min(1.9, life.mul + 0.025*d), ru: life.ru+", "+d+"\u00a0"+word+" в\u00a0неделю"};
  }
  return ACTIVITY[input.activity] || ACTIVITY.light;
}

function energy(input){
  const b = bmr(input);
  const act = activityFactor(input);
  const tdee = b.value*act.mul;
  let target, rate, label;
  switch(input.goal){
    case "cut":    target = tdee*0.80; rate="−0,5…−0,7 кг в неделю"; label="Сушка"; break;
    case "bulk":   target = tdee*1.10; rate="+0,2…+0,35 кг в неделю"; label="Набор массы"; break;
    case "recomp": target = tdee*1.00; rate="вес держится ровно"; label="Рекомпозиция"; break;
    default:       target = tdee;      rate="вес держится ровно"; label="Поддержание";
  }
  const floor = input.sex==="f" ? 1200 : 1500;
  let floored = false;
  if(target < floor){ target = floor; floored = true; }
  return {bmr:r(b.value), formula:b.formula, tdee:r(tdee), target:r(target), rate, label, activity:act.ru, floored, deficit:r(tdee-target)};
}

function macros(input, kcal){
  const w = input.weight;
  const set = new Set(input.restrictions||[]);
  let pPerKg = 2.0;
  if(input.goal==="cut") pPerKg = 2.2;
  if(set.has("vegan")) pPerKg += 0.2;
  if(input.age>=45) pPerKg = Math.max(pPerKg, 2.0);
  let protein = r(w*pPerKg);

  let fat = r(Math.max(w*0.8, kcal*0.22/9));
  let carbKcal = kcal - protein*4 - fat*9;
  if(carbKcal < kcal*0.15){
    fat = r(Math.max(w*0.5, (kcal - protein*4 - kcal*0.15)/9));
    carbKcal = kcal - protein*4 - fat*9;
  }
  if(carbKcal < 0){
    protein = r((kcal - fat*9)*0.45/4);
    carbKcal = kcal - protein*4 - fat*9;
  }
  const carbs = r(Math.max(0, carbKcal/4));
  const fiber = r(kcal/1000*14);
  return {protein, fat, carbs, fiber, pPerKg:Math.round(pPerKg*10)/10};
}

function allowedFoods(restrictions){
  const set = new Set(restrictions||[]);
  const banTags = new Set();
  let banMeat=false, keepFish=false;
  const notes=[];
  set.forEach(kR=>{
    const rule = RESTRICTIONS[kR];
    if(!rule) return;
    (rule.excludeTags||[]).forEach(t=>banTags.add(t));
    if(rule.excludeCatMeat) banMeat=true;
    if(rule.keepFish) keepFish=true;
    if(rule.note) notes.push(rule.note);
  });
  const banIds = new Set(restrictions && restrictions.filter(x=>x.indexOf("no:")===0).map(x=>x.slice(3)) || []);
  const foods = FOODS.filter(f=>{
    if(banIds.has(f.id)) return false;
    if(banMeat && MEAT_IDS.indexOf(f.id)>=0) return false;
    if(banMeat && !keepFish && FISH_IDS.indexOf(f.id)>=0) return false;
    for(const t of f.tags){ if(banTags.has(t)) return false; }
    return true;
  });
  return {foods, notes};
}

function pickRot(list, i){ return list.length ? list[i % list.length] : null; }

const MEAL_SLOTS = {
  3: ["am","main","main"],
  4: ["am","main","snack","main"],
  5: ["am","snack","main","snack","main"],
  6: ["am","snack","main","snack","main","night"]
};
function inSlot(f, slot){
  if(!f.slot) return true;
  var list=f.slot.split(",");
  if(list.indexOf(slot)>=0) return true;
  if(slot==="night" && list.indexOf("snack")>=0) return true;
  return false;
}
function poolFor(foods, cat, slot){
  var strict = foods.filter(function(f){ return f.cat===cat && inSlot(f, slot); });
  if(cat==="protein"){
    var bestEff = 0;
    strict.forEach(function(f){ var e=f.p/Math.max(f.kcal,1); if(e>bestEff) bestEff=e; });
    if(strict.length < 3 || bestEff < 0.1){
      var extra = foods.filter(function(f){ return f.cat===cat && strict.indexOf(f)<0; });
      strict = strict.concat(extra);
    }
  }
  var pool = strict.length ? strict : foods.filter(function(f){ return f.cat===cat; });
  return pool.slice().sort(function(a,b){
    var pa=(a.spec?2:0)+(a.pure?1:0), pb=(b.spec?2:0)+(b.pure?1:0);
    return pa-pb;
  });
}

function buildMeals(input, m, foods, dayIndex){
  const nMeals = clamp(input.meals||4, 3, 6);
  const slots = MEAL_SLOTS[nMeals] || MEAL_SLOTS[4];
  const rot = dayIndex||0;

  if(!foods.filter(function(f){return f.cat==="protein" && f.p>=10;}).length)
    return {error:"Не осталось источников белка — ослабь ограничения."};

  // доли приёмов: завтрак и ужин весомее перекусов
  const weight = slots.map(function(sl){ return sl==="snack" ? 0.62 : sl==="night" ? 0.55 : 1; });
  const wsum = weight.reduce(function(a,b){return a+b;},0);

  const usedP = {}, usedC = {};
  const meals=[];

  let leftP=m.protein, leftC=m.carbs, leftF=m.fat, leftW=wsum;

  for(let i=0;i<nMeals;i++){
    const slot = slots[i];
    const share = weight[i]/leftW;
    const pTarget = Math.max(0, leftP*share);
    const cTarget = Math.max(0, leftC*share);
    const fTarget = Math.max(0, leftF*share);

    let pPool = poolFor(foods,"protein",slot).filter(function(f){ return f.p>=8; });
    if(!pPool.length) pPool = poolFor(foods,"protein",slot);
    if(input.goal==="cut" && pPool.length>1){
      const eff=function(f){ return f.p/Math.max(f.kcal,1); };
      let bestEff=0; pPool.forEach(function(f){ if(eff(f)>bestEff) bestEff=eff(f); });
      const effOK=pPool.filter(function(f){ return eff(f) >= bestEff*0.7; });
      if(effOK.length) pPool = effOK;
    }
    const poolRich = pPool.length >= 4;
    if(fTarget>0 && poolRich){
      const fatOf=function(f){
        const g = clamp(pTarget/(f.p/100), 20, maxPortion(f));
        return g*f.f/100;
      };
      // не берём тех, кто перебирает бюджет жира
      const notFat = pPool.filter(function(f){ return fatOf(f) <= fTarget*1.05; });
      if(notFat.length) pPool = notFat;
      // среди оставшихся предпочитаем тех, кто сам даёт заметную часть жира
      const carries = pPool.filter(function(f){ return fatOf(f) >= fTarget*0.3; });
      if(carries.length >= 2 || (carries.length===1 && pPool.length<=2)) pPool = carries;
    }
    const mealKcal = pTarget*4 + cTarget*4 + fTarget*9;
    if(mealKcal>0 && pPool.length>1){
      const kfit = pPool.filter(function(f){
        const g = clamp(pTarget/(f.p/100), 20, maxPortion(f));
        return (g*f.kcal/100) <= mealKcal*0.72;
      });
      if(kfit.length) pPool = kfit;
    }
    if(poolRich){
      const fits = pPool.filter(function(f){
        const minG = MIN_PORTION[f.id] || 20;
        return (minG*f.p/100) <= pTarget*1.12;
      });
      if(fits.length) pPool = fits;
    }
    let cPool = poolFor(foods,"carb",slot);
    let fPool = poolFor(foods,"fat",slot);
    const vPool = poolFor(foods,"veg",slot);

    const fresh = function(pool, used){
      const un = pool.filter(function(f){ return !used[f.id]; });
      return un.length ? un : pool;
    };
    const pf = pickRot(fresh(pPool, usedP), i + rot*2);
    const pfGuess = pf ? clamp(pTarget/(pf.p/100), 20, maxPortion(pf)) : 0;
    const carbFromP = pf ? pfGuess*pf.c/100 : 0;
    const needCarb = cTarget - carbFromP;
    const cf = needCarb>10 ? pickRot(fresh(cPool, usedC), i + rot) : null;
    const fWhole = fPool.filter(function(f){ return !f.pure; });
    const ff = pickRot(fWhole.length ? fWhole : fPool, i + rot);
    const vf = (slot==="main") ? pickRot(vPool, i + rot) : null;
    if(pf) usedP[pf.id]=1;
    if(cf) usedC[cf.id]=1;

    const gV = vf ? 150 : 0;
    let gP = clamp(pTarget/(pf.p/100), 20, maxPortion(pf));
    let gC = cf ? clamp(cTarget/Math.max(cf.c/100,0.01), 20, maxPortion(cf)) : 0;
    let gF = ff ? clamp(fTarget/Math.max(ff.f/100,0.01)*0.45, 0, maxPortion(ff)) : 0;

    for(let it=0; it<14; it++){
      const curP = gP*pf.p/100 + (cf?gC*cf.p/100:0) + (ff?gF*ff.p/100:0) + (gV?gV*vf.p/100:0);
      const curC = gP*pf.c/100 + (cf?gC*cf.c/100:0) + (ff?gF*ff.c/100:0) + (gV?gV*vf.c/100:0);
      const curF = gP*pf.f/100 + (cf?gC*cf.f/100:0) + (ff?gF*ff.f/100:0) + (gV?gV*vf.f/100:0);
      if(pf.p>0) gP = clamp(gP + (pTarget-curP)/(pf.p/100)*0.7, 20, maxPortion(pf));
      if(cf && cf.c>0) gC = clamp(gC + (cTarget-curC)/(cf.c/100)*0.7, 20, maxPortion(cf));
      if(ff && ff.f>0) gF = clamp(gF + (fTarget-curF)/(ff.f/100)*0.7, 0, maxPortion(ff));
    }

    const items=[];
    items.push(mkItem(pf, roundPortion(gP, pf, gP < (MIN_PORTION[pf.id]||20)*0.8)));
    if(cf) items.push(mkItem(cf, roundPortion(gC, cf)));
    if(ff && gF>=8 && leftF>4){
      var gFat = Math.round(gF/5)*5;
      if(ff.pure) gFat = Math.min(gFat, slot==="main" ? 12 : 8);
      if(gFat>=5) items.push(mkItem(ff, gFat));
    }
    if(vf) items.push(mkItem(vf, gV));

    const tot = items.reduce(function(a,x){return {kcal:a.kcal+x.kcal,p:a.p+x.p,f:a.f+x.f,c:a.c+x.c,fib:a.fib+x.fib};},{kcal:0,p:0,f:0,c:0,fib:0});
    leftP -= tot.p; leftC -= tot.c; leftF -= tot.f; leftW -= weight[i];
    meals.push({name: mealName(i,nMeals,slot), items:items,
      total:{kcal:r(tot.kcal),p:r(tot.p),f:r(tot.f),c:r(tot.c),fib:r(tot.fib)}});
  }
  return {meals:meals};
}

const MIN_PORTION = {
  chicken_breast:100, turkey_fillet:100, beef_mince_5:100, pork_lean:100,
  cod:120, mackerel:100, salmon:100, tuna_can:80, shrimp:100,
  cottage_cheese:100, cottage_cheese_0:100, greek_yogurt:100, kefir:200, milk:200,
  hard_cheese:30, whey:25, soy_protein:25, pea_protein:25,
  tofu:100, lentils:60, chickpeas:60, beans_red:60,
  oats:40, rice_white:50, buckwheat:50, pasta:50, potato:150, sweet_potato:150,
  bread_whole:40, bread_gf:40, banana:100, apple:120, berries:100,
  olive_oil:5, butter:5, peanut_butter:15, almonds:15, walnuts:15,
  avocado:40, seeds_sunflower:15, honey:10
};
const MAX_OVERRIDE = {
  lentils:180, chickpeas:180, beans_red:180, tofu:400,
  eggs:300, egg_whites:450, hard_cheese:80,
  whey:60, soy_protein:60, pea_protein:60,
  kefir:600, milk:600, greek_yogurt:450,
  cottage_cheese:350, cottage_cheese_0:350
};
function maxPortion(f){
  if(MAX_OVERRIDE[f.id]) return MAX_OVERRIDE[f.id];
  if(f.cat==="fat")     return f.kcal>=700 ? 45 : (f.kcal>=500 ? 70 : 220);
  if(f.cat==="protein") return f.kcal>=350 ? 60 : (f.kcal>=150 ? 350 : 500);
  if(f.cat==="carb")    return f.kcal>=300 ? 260 : (f.kcal>=150 ? 420 : 700);
  return 300;
}
function roundPortion(g, f, allowBelowMin){
  var min = allowBelowMin ? 10 : (MIN_PORTION[f.id] || 20);
  if(f.id==="eggs") return Math.max(100, Math.round(g/50)*50);
  var v = g>=100 ? Math.round(g/10)*10 : Math.round(g/5)*5;
  return Math.max(min, v);
}

function mkItem(f, grams){
  return {id:f.id, ru:f.ru, grams, kcal:f.kcal*grams/100, p:f.p*grams/100, f:f.f*grams/100, c:f.c*grams/100, fib:f.fib*grams/100};
}

function mealName(i,n,slot){
  if(n===3) return ["Завтрак","Обед","Ужин"][i];
  if(n===4) return ["Завтрак","Обед","Перекус","Ужин"][i];
  if(n===5) return ["Завтрак","Перекус","Обед","Перекус","Ужин"][i];
  return ["Завтрак","Перекус","Обед","Перекус","Ужин","Перед сном"][i];
}

function generateNutrition(input){
  input = Object.assign({sex:"m",age:30,height:180,weight:80,activity:"light",goal:"recomp",meals:4,restrictions:[]}, input||{});
  const e = energy(input);
  const m = macros(input, e.target);
  const {foods, notes} = allowedFoods(input.restrictions);
  const goalNotes = [];
  if(input.goal==="cut"){
    goalNotes.push("Белок "+String(m.pPerKg).replace(".",",")+" г на кг веса: в дефиците это главная защита мышц.");
    goalNotes.push("Раз в 7–10 дней делай рефид: плюс 25–30% калорий за счёт углеводов.");
    goalNotes.push("Если вес не падает 2–3 недели, убери ещё 150–200 ккал, не больше.");
    goalNotes.push("Овощи и объёмная еда дают сытость почти без калорий.");
  }
  if(input.goal==="bulk"){
    goalNotes.push("Если вес стоит 2–3 недели, добавь 150–200 ккал углеводами. Если прибавляешь больше 0,4 кг в неделю, убавь: лишнее уходит в жир.");
  }
  const day = buildMeals(input, m, foods, input.dayIndex||0);
  const sum = day.meals ? day.meals.reduce((a,x)=>({kcal:a.kcal+x.total.kcal,p:a.p+x.total.p,f:a.f+x.total.f,c:a.c+x.total.c,fib:a.fib+x.total.fib}),{kcal:0,p:0,f:0,c:0,fib:0}) : null;
  const actual = sum ? {kcal:r(sum.kcal),p:r(sum.p),f:r(sum.f),c:r(sum.c),fib:r(sum.fib)} : null;
  const fitNotes = [];
  if(actual){
    if(actual.p < m.protein*0.9){
      fitNotes.push("Не хватает "+(m.protein-actual.p)+" г белка. "+
        (input.meals<=4 ? "Добавь приём пищи или порцию протеина." : "Добавь порцию протеина."));
    }
    if(actual.f > m.fat*1.2){
      fitNotes.push("Жиров на "+(actual.f-m.fat)+" г больше цели. Убери орехи или масло из одного приёма.");
    }
    if(actual.kcal > e.target*1.08){
      fitNotes.push("Калорий на "+(actual.kcal-e.target)+" больше цели. Уменьши гарнир в самом большом приёме.");
    }
  }
  return {energy:e, macros:m, restrictionNotes:notes, goalNotes:goalNotes, fitNotes:fitNotes,
          foodsAvailable:foods.length, day, actual:actual};
}

if(typeof module!=="undefined") module.exports = {generateNutrition, FOODS, RESTRICTIONS, ACTIVITY};
