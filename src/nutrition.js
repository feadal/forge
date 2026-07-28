"use strict";

const FOODS = [
  {id:"chicken_breast", ru:"Куриная грудка", cat:"protein", kcal:165, p:31, f:3.6, c:0, fib:0, tags:[], cost:1, prep:"cook"},
  {id:"turkey_fillet", ru:"Филе индейки", cat:"protein", kcal:150, p:29, f:3, c:0, fib:0, tags:[], cost:2, prep:"cook"},
  {id:"beef_mince_5", ru:"Говяжий фарш 5%", cat:"protein", kcal:150, p:21, f:7, c:0, fib:0, tags:["beef"], cost:2, prep:"cook"},
  {id:"pork_lean", ru:"Свинина нежирная", cat:"protein", kcal:180, p:21, f:10, c:0, fib:0, tags:["pork"], cost:2, prep:"cook"},
  {id:"cod", ru:"Треска", cat:"protein", kcal:82, p:18, f:0.7, c:0, fib:0, tags:["fish"], cost:2, prep:"cook"},
  {id:"mackerel", ru:"Скумбрия", cat:"protein", kcal:191, p:18, f:13, c:0, fib:0, tags:["fish"], cost:1, prep:"cook"},
  {id:"salmon", ru:"Лосось", cat:"protein", kcal:208, p:20, f:13, c:0, fib:0, tags:["fish"], cost:3, prep:"cook"},
  {id:"tuna_can", ru:"Тунец консервированный", cat:"protein", kcal:116, p:26, f:1, c:0, fib:0, tags:["fish"], cost:2, prep:"none"},
  {id:"shrimp", ru:"Креветки", cat:"protein", kcal:99, p:24, f:0.3, c:0, fib:0, tags:["shellfish"], cost:3, prep:"cook"},
  {id:"eggs", ru:"Яйца куриные", cat:"protein", kcal:143, p:13, f:10, c:0.7, fib:0, tags:["egg"], cost:1, prep:"cook"},
  {id:"egg_whites", ru:"Яичные белки", cat:"protein", kcal:52, p:11, f:0.2, c:0.7, fib:0, tags:["egg"], cost:2, prep:"cook"},
  {id:"cottage_cheese", ru:"Творог 5%", cat:"protein", kcal:121, p:17, f:5, c:3, fib:0, tags:["milk","lactose_low"], cost:1, prep:"none"},
  {id:"cottage_cheese_0", ru:"Творог обезжиренный", cat:"protein", kcal:71, p:16, f:0.6, c:1.8, fib:0, tags:["milk","lactose_low"], cost:1, prep:"none"},
  {id:"greek_yogurt", ru:"Греческий йогурт", cat:"protein", kcal:59, p:10, f:0.4, c:3.6, fib:0, tags:["milk","lactose_low"], cost:2, prep:"none"},
  {id:"kefir", ru:"Кефир 1%", cat:"protein", kcal:40, p:3, f:1, c:4, fib:0, tags:["milk","lactose_low"], cost:1, prep:"none"},
  {id:"milk", ru:"Молоко 2.5%", cat:"protein", kcal:52, p:2.8, f:2.5, c:4.7, fib:0, tags:["milk","lactose"], cost:1, prep:"none"},
  {id:"hard_cheese", ru:"Сыр твёрдый", cat:"protein", kcal:364, p:25, f:29, c:0, fib:0, tags:["milk","lactose_low"], cost:2, prep:"none"},
  {id:"whey", ru:"Сывороточный протеин", cat:"protein", kcal:400, p:80, f:5, c:8, fib:0, tags:["milk","supplement"], cost:2, prep:"none"},
  {id:"soy_protein", ru:"Соевый протеин", cat:"protein", kcal:380, p:80, f:2, c:5, fib:2, tags:["soy","supplement","vegan"], cost:2, prep:"none"},
  {id:"pea_protein", ru:"Гороховый протеин", cat:"protein", kcal:390, p:80, f:6, c:3, fib:3, tags:["supplement","vegan"], cost:2, prep:"none"},
  {id:"tofu", ru:"Тофу", cat:"protein", kcal:144, p:16, f:9, c:2, fib:1, tags:["soy","vegan"], cost:2, prep:"quick"},
  {id:"lentils", ru:"Чечевица (сухая)", cat:"protein", kcal:352, p:25, f:1, c:60, fib:11, tags:["vegan","fodmap"], cost:1, prep:"cook"},
  {id:"chickpeas", ru:"Нут (сухой)", cat:"protein", kcal:364, p:19, f:6, c:61, fib:17, tags:["vegan","fodmap"], cost:1, prep:"cook"},
  {id:"beans_red", ru:"Фасоль красная (сухая)", cat:"protein", kcal:333, p:24, f:1, c:60, fib:15, tags:["vegan","fodmap"], cost:1, prep:"cook"},

  {id:"oats", ru:"Овсянка", cat:"carb", kcal:379, p:13, f:7, c:67, fib:10, tags:["gluten_trace","vegan"], cost:1, prep:"quick"},
  {id:"rice_white", ru:"Рис белый", cat:"carb", kcal:365, p:7, f:1, c:80, fib:1, tags:["vegan","gf"], cost:1, prep:"cook"},
  {id:"buckwheat", ru:"Гречка", cat:"carb", kcal:343, p:13, f:3, c:72, fib:10, tags:["vegan","gf"], cost:1, prep:"cook"},
  {id:"pasta", ru:"Макароны твёрдых сортов", cat:"carb", kcal:371, p:13, f:1.5, c:75, fib:3, tags:["gluten","vegan"], cost:1, prep:"cook"},
  {id:"potato", ru:"Картофель", cat:"carb", kcal:77, p:2, f:0.1, c:17, fib:2, tags:["vegan","gf"], cost:1, prep:"cook"},
  {id:"sweet_potato", ru:"Батат", cat:"carb", kcal:86, p:1.6, f:0.1, c:20, fib:3, tags:["vegan","gf"], cost:2, prep:"cook"},
  {id:"bread_whole", ru:"Хлеб цельнозерновой", cat:"carb", kcal:247, p:9, f:3, c:41, fib:7, tags:["gluten","vegan"], cost:1, prep:"none"},
  {id:"bread_gf", ru:"Хлеб безглютеновый", cat:"carb", kcal:250, p:5, f:4, c:47, fib:4, tags:["vegan","gf"], cost:3, prep:"none"},
  {id:"banana", ru:"Банан", cat:"carb", kcal:89, p:1.1, f:0.3, c:23, fib:2.6, tags:["vegan","gf"], cost:1, prep:"none"},
  {id:"apple", ru:"Яблоко", cat:"carb", kcal:52, p:0.3, f:0.2, c:14, fib:2.4, tags:["vegan","gf","fodmap"], cost:1, prep:"none"},
  {id:"berries", ru:"Ягоды", cat:"carb", kcal:57, p:0.7, f:0.3, c:14, fib:2.4, tags:["vegan","gf"], cost:2, prep:"none"},
  {id:"honey", ru:"Мёд", cat:"carb", kcal:304, p:0.3, f:0, c:82, fib:0, tags:["vegan","gf","fodmap"], cost:2, prep:"none"},

  {id:"olive_oil", ru:"Оливковое масло", cat:"fat", kcal:884, p:0, f:100, c:0, fib:0, tags:["vegan","gf"], cost:2, prep:"none"},
  {id:"butter", ru:"Сливочное масло", cat:"fat", kcal:717, p:0.9, f:81, c:0.1, fib:0, tags:["milk","lactose_low"], cost:2, prep:"none"},
  {id:"peanut_butter", ru:"Арахисовая паста", cat:"fat", kcal:588, p:25, f:50, c:20, fib:6, tags:["peanut","vegan"], cost:1, prep:"none"},
  {id:"almonds", ru:"Миндаль", cat:"fat", kcal:579, p:21, f:50, c:22, fib:12, tags:["treenut","vegan","gf"], cost:3, prep:"none"},
  {id:"walnuts", ru:"Грецкий орех", cat:"fat", kcal:654, p:15, f:65, c:14, fib:7, tags:["treenut","vegan","gf"], cost:2, prep:"none"},
  {id:"avocado", ru:"Авокадо", cat:"fat", kcal:160, p:2, f:15, c:9, fib:7, tags:["vegan","gf"], cost:3, prep:"none"},
  {id:"seeds_sunflower", ru:"Семечки подсолнуха", cat:"fat", kcal:584, p:21, f:51, c:20, fib:9, tags:["vegan","gf"], cost:1, prep:"none"},

  {id:"broccoli", ru:"Брокколи", cat:"veg", kcal:34, p:2.8, f:0.4, c:7, fib:2.6, tags:["vegan","gf"], cost:1, prep:"quick"},
  {id:"cucumber", ru:"Огурцы", cat:"veg", kcal:15, p:0.7, f:0.1, c:3.6, fib:0.5, tags:["vegan","gf"], cost:1, prep:"none"},
  {id:"tomato", ru:"Помидоры", cat:"veg", kcal:18, p:0.9, f:0.2, c:3.9, fib:1.2, tags:["vegan","gf"], cost:1, prep:"none"},
  {id:"carrot", ru:"Морковь", cat:"veg", kcal:41, p:0.9, f:0.2, c:10, fib:2.8, tags:["vegan","gf"], cost:1, prep:"none"},
  {id:"cabbage", ru:"Капуста", cat:"veg", kcal:25, p:1.3, f:0.1, c:6, fib:2.5, tags:["vegan","gf"], cost:1, prep:"none"},
  {id:"spinach", ru:"Шпинат", cat:"veg", kcal:23, p:2.9, f:0.4, c:3.6, fib:2.2, tags:["vegan","gf"], cost:2, prep:"quick"},
  {id:"mixed_veg", ru:"Овощная смесь", cat:"veg", kcal:45, p:2, f:0.3, c:9, fib:3, tags:["vegan","gf"], cost:1, prep:"quick"}
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
                 note:"Белок поднят до 2.2 г/кг (растительный усваивается хуже). Добавь B12, креатин, омега-3 из водорослей."},
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

function energy(input){
  const b = bmr(input);
  const act = ACTIVITY[input.activity] || ACTIVITY.light;
  const tdee = b.value*act.mul;
  let target, rate, label;
  switch(input.goal){
    case "cut":    target = tdee*0.80; rate="−0.5…−0.7 кг/нед"; label="Сушка"; break;
    case "bulk":   target = tdee*1.10; rate="+0.2…+0.35 кг/нед"; label="Набор массы"; break;
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

function buildMeals(input, m, foods, dayIndex){
  const nMeals = clamp(input.meals||4, 3, 6);
  const proteins = foods.filter(f=>f.cat==="protein" && f.p>=10);
  const carbsF = foods.filter(f=>f.cat==="carb");
  const fatsF = foods.filter(f=>f.cat==="fat");
  const vegF = foods.filter(f=>f.cat==="veg");
  if(!proteins.length) return {error:"Не осталось источников белка — ослабь ограничения."};

  const pPer = m.protein/nMeals;
  const cPer = m.carbs/nMeals;
  const fPer = m.fat/nMeals;
  const meals=[];
  for(let i=0;i<nMeals;i++){
    const pf = pickRot(proteins, i + dayIndex*2);
    const cf = pickRot(carbsF, i + dayIndex);
    const ff = pickRot(fatsF, i + dayIndex);
    const vf = pickRot(vegF, i + dayIndex);
    const gV = (vf && i<nMeals-1) ? 150 : 0;
    const useFat = !!ff;
    let gP = clamp(pPer/(pf.p/100), 30, 400);
    let gC = cf ? clamp(cPer/Math.max(cf.c/100,0.01), 20, 400) : 0;
    let gF = useFat ? clamp(fPer/Math.max(ff.f/100,0.01)*0.5, 3, 60) : 0;

    for(let it=0; it<12; it++){
      const curP = gP*pf.p/100 + (cf?gC*cf.c*0+gC*cf.p/100:0) + (useFat?gF*ff.p/100:0) + (gV?gV*vf.p/100:0);
      const curC = gP*pf.c/100 + (cf?gC*cf.c/100:0) + (useFat?gF*ff.c/100:0) + (gV?gV*vf.c/100:0);
      const curF = gP*pf.f/100 + (cf?gC*cf.f/100:0) + (useFat?gF*ff.f/100:0) + (gV?gV*vf.f/100:0);
      if(pf.p>0) gP = clamp(gP + (pPer-curP)/(pf.p/100)*0.7, 30, 400);
      if(cf && cf.c>0) gC = clamp(gC + (cPer-curC)/(cf.c/100)*0.7, 20, 400);
      if(useFat && ff.f>0) gF = clamp(gF + (fPer-curF)/(ff.f/100)*0.7, 0, 60);
    }
    const items=[];
    items.push(mkItem(pf, Math.round(gP/5)*5));
    if(cf) items.push(mkItem(cf, Math.round(gC/5)*5));
    if(useFat && gF>=3) items.push(mkItem(ff, Math.round(gF/2)*2));
    if(gV) items.push(mkItem(vf, gV));
    const tot = items.reduce((a,x)=>({kcal:a.kcal+x.kcal,p:a.p+x.p,f:a.f+x.f,c:a.c+x.c,fib:a.fib+x.fib}),{kcal:0,p:0,f:0,c:0,fib:0});
    meals.push({name: mealName(i,nMeals), items, total:{kcal:r(tot.kcal),p:r(tot.p),f:r(tot.f),c:r(tot.c),fib:r(tot.fib)}});
  }
  return {meals};
}

function mkItem(f, grams){
  return {id:f.id, ru:f.ru, grams, kcal:f.kcal*grams/100, p:f.p*grams/100, f:f.f*grams/100, c:f.c*grams/100, fib:f.fib*grams/100};
}

function mealName(i,n){
  if(n===3) return ["Завтрак","Обед","Ужин"][i];
  if(n===4) return ["Завтрак","Обед","Перекус","Ужин"][i];
  if(n===5) return ["Завтрак","Перекус","Обед","Перекус 2","Ужин"][i];
  return ["Завтрак","Перекус","Обед","Перекус 2","Ужин","Перед сном"][i];
}

function generateNutrition(input){
  input = Object.assign({sex:"m",age:30,height:180,weight:80,activity:"light",goal:"recomp",meals:4,restrictions:[]}, input||{});
  const e = energy(input);
  const m = macros(input, e.target);
  const {foods, notes} = allowedFoods(input.restrictions);
  const goalNotes = [];
  if(input.goal==="cut"){
    goalNotes.push("Белок поднят до "+m.pPerKg+" г/кг — в дефиците это главная защита мышц.");
    goalNotes.push("Раз в 7–10 дней сделай рефид: +25–30% калорий углеводами (не жиром). Помогает гормонам, тренировкам и голове.");
    goalNotes.push("Дефицит ~"+e.deficit+" ккал/день. Если вес не падает 2–3 недели подряд — режь ещё на 150–200 ккал, не больше.");
    goalNotes.push("Овощи и объёмная еда — твой друг: они дают сытость почти без калорий.");
    if(e.floored) goalNotes.push("⚠ Расчётный дефицит упирался в безопасный минимум калорий — цель поднята до "+e.target+" ккал.");
  }
  if(input.goal==="bulk"){
    goalNotes.push("Если за 2–3 недели вес стоит — добавь 150–200 ккал углеводами. Растёшь быстрее 0.4 кг/нед — убавь: лишнее уйдёт в жир.");
  }
  const day = buildMeals(input, m, foods, input.dayIndex||0);
  const sum = day.meals ? day.meals.reduce((a,x)=>({kcal:a.kcal+x.total.kcal,p:a.p+x.total.p,f:a.f+x.total.f,c:a.c+x.total.c,fib:a.fib+x.total.fib}),{kcal:0,p:0,f:0,c:0,fib:0}) : null;
  return {energy:e, macros:m, restrictionNotes:notes, goalNotes:goalNotes, foodsAvailable:foods.length, day, actual:sum ? {kcal:r(sum.kcal),p:r(sum.p),f:r(sum.f),c:r(sum.c),fib:r(sum.fib)} : null};
}

if(typeof module!=="undefined") module.exports = {generateNutrition, FOODS, RESTRICTIONS, ACTIVITY};
