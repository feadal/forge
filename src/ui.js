(function(){
"use strict";
var KEY="forge_v1";
var S=null, mem=null;

function load(){ try{var r=localStorage.getItem(KEY); if(r) return JSON.parse(r);}catch(e){} return null; }
function save(){ try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){ mem=S; } }
S = load() || mem || {step:"intro", profile:null, program:null, nutrition:null, log:{}, history:[], week:1, tab:"train", dayIdx:0};

function $(id){ return document.getElementById(id); }
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
function el(tag, cls, html){ var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }

var Q = [
  {id:"sex", q:"Пол", type:"pick", opts:[{v:"m",l:"Мужской"},{v:"f",l:"Женский"}]},
  {id:"age", q:"Возраст", type:"num", unit:"лет", min:14, max:80, def:30},
  {id:"height", q:"Рост", type:"num", unit:"см", min:130, max:220, def:180},
  {id:"weight", q:"Вес", type:"num", unit:"кг", min:35, max:200, def:80},
  {id:"level", q:"Стаж тренировок", type:"pick", opts:[
    {v:"beg",l:"Новичок",d:"меньше года"},{v:"int",l:"Средний",d:"1–4 года"},{v:"adv",l:"Опытный",d:"больше 4 лет"}]},
  {id:"goal", q:"Главная цель", type:"pick", opts:[
    {v:"hyp",l:"Набрать мышцы",d:"гипертрофия, 6–15 повторов"},
    {v:"cut",l:"Сушка",d:"сжечь жир, сохранив мышцы и силу"},
    {v:"str",l:"Стать сильнее",d:"сила, 3–6 повторов"},
    {v:"hybrid",l:"Сила + масса",d:"тяжёлая база + подсобка"}]},
  {id:"days", q:"Сколько дней в неделю", type:"pick", opts:[
    {v:2,l:"2 дня"},{v:3,l:"3 дня"},{v:4,l:"4 дня"},{v:5,l:"5 дней"},{v:6,l:"6 дней"}]},
  {id:"minutes", q:"Длительность тренировки", type:"pick", opts:[
    {v:45,l:"45 минут"},{v:60,l:"60 минут"},{v:75,l:"75 минут"},{v:90,l:"90 минут"}]},
  {id:"legs", q:"Тренируешь ноги?", type:"pick", opts:[
    {v:true,l:"Да",d:"полноценная программа"},{v:false,l:"Нет",d:"только верх тела"}]},
  {id:"limits", q:"Есть проблемы с суставами или спиной?", sub:"Программа обойдёт опасные упражнения и предложит замены", type:"multi", optional:true, opts:[
    {v:"low_back",l:"Поясница"},{v:"knee",l:"Колени"},{v:"shoulder",l:"Плечи"},
    {v:"elbow",l:"Локти"},{v:"wrist",l:"Запястья"},{v:"hip",l:"Тазобедренный"},
    {v:"hernia",l:"Грыжа (была)"}]},
  {id:"redflags", q:"Есть что-то из этого прямо сейчас?", sub:"Отметь честно — это про безопасность, а не про анкету", type:"multi", optional:true, opts:[
    {v:"rest_pain",l:"Сильная боль в покое или ночью"},
    {v:"numb",l:"Онемение или прострелы в руку/ногу"},
    {v:"acute",l:"Свежая травма (<2 нед) или операция"},
    {v:"bulge",l:"Выпирание или боль в паху при кашле"},
    {v:"lock",l:"Сустав заклинивает / подкашивается"}]},
  {id:"emphasis", q:"Что хочешь подтянуть особенно?", type:"multi", opts:[
    {v:"chest",l:"Грудь"},{v:"lats",l:"Спина"},{v:"sdelt",l:"Плечи"},{v:"biceps",l:"Бицепс"},
    {v:"triceps",l:"Трицепс"},{v:"quads",l:"Ноги"},{v:"glutes",l:"Ягодицы"},{v:"core",l:"Пресс"}], optional:true},
  {id:"equipment", q:"Что есть в зале?", type:"multi", opts:[
    {v:"bb",l:"Штанга"},{v:"db",l:"Гантели"},{v:"cable",l:"Блоки"},{v:"machine",l:"Тренажёры"},{v:"bw",l:"Турник/брусья"}], defAll:true},
  {id:"activity", q:"Активность вне зала", type:"pick", opts:[
    {v:"sed",l:"Сидячая",d:"офис, мало хожу"},{v:"light",l:"Лёгкая",d:"немного хожу"},
    {v:"mod",l:"Средняя",d:"много хожу"},{v:"high",l:"Высокая",d:"физический труд"}]},
  {id:"nutgoal", q:"Цель по питанию", type:"pick", opts:[
    {v:"cut",l:"Сушка",d:"−20% калорий, белок 2.2 г/кг"},
    {v:"recomp",l:"Рекомпозиция",d:"мышцы при том же весе"},
    {v:"bulk",l:"Набор массы",d:"+10% калорий"},
    {v:"maintain",l:"Поддержание",d:"без изменений"}]},
  {id:"meals", q:"Сколько приёмов пищи в день", type:"pick", opts:[
    {v:3,l:"3"},{v:4,l:"4"},{v:5,l:"5"},{v:6,l:"6"}]},
  {id:"restrictions", q:"Ограничения в еде", sub:"Отметь всё, что подходит", type:"multi", opts:[
    {v:"lactose",l:"Непереносимость лактозы"},{v:"milk_allergy",l:"Аллергия на молоко"},
    {v:"gluten",l:"Без глютена"},{v:"celiac",l:"Целиакия"},
    {v:"egg",l:"Аллергия на яйца"},{v:"peanut",l:"Аллергия на арахис"},
    {v:"treenut",l:"Аллергия на орехи"},{v:"soy",l:"Аллергия на сою"},
    {v:"fish",l:"Аллергия на рыбу"},{v:"shellfish",l:"Аллергия на морепродукты"},
    {v:"vegetarian",l:"Вегетарианство"},{v:"vegan",l:"Веганство"},
    {v:"pescatarian",l:"Пескетарианство"},{v:"halal",l:"Без свинины"},
    {v:"no_beef",l:"Без говядины"},{v:"fodmap",l:"Проблемы с ЖКТ (FODMAP)"}], optional:true}
];

var draft = {};
var qi = 0;

function startWizard(){ draft = {}; qi = 0; S.step="wizard"; save(); render(); }

function renderWizard(){
  var root = $("app"); root.innerHTML="";
  var q = Q[qi];
  var head = el("div","wz-head");
  head.appendChild(el("div","wz-prog","<span style=\"width:"+Math.round((qi)/Q.length*100)+"%\"></span>"));
  head.appendChild(el("div","wz-count", (qi+1)+" из "+Q.length));
  root.appendChild(head);
  root.appendChild(el("h2","wz-q", esc(q.q)));
  if(q.sub) root.appendChild(el("p","wz-sub", esc(q.sub)));

  var box = el("div","wz-body");
  if(q.type==="pick"){
    q.opts.forEach(function(o){
      var b = el("button","opt", "<b>"+esc(o.l)+"</b>"+(o.d?"<i>"+esc(o.d)+"</i>":""));
      b.onclick=function(){ draft[q.id]=o.v; next(); };
      if(draft[q.id]===o.v) b.classList.add("on");
      box.appendChild(b);
    });
  } else if(q.type==="num"){
    var wrap = el("div","numwrap");
    var inp = el("input"); inp.type="text"; inp.inputMode="numeric"; inp.className="numin";
    inp.value = draft[q.id]!=null?draft[q.id]:(q.def||"");
    wrap.appendChild(inp); wrap.appendChild(el("span","numunit",esc(q.unit)));
    box.appendChild(wrap);
    var go = el("button","accent-btn","Дальше");
    go.onclick=function(){
      var v=parseFloat(String(inp.value).replace(",","."));
      if(!v||v<q.min||v>q.max){ toast("Введи значение "+q.min+"–"+q.max); return; }
      draft[q.id]=v; next();
    };
    box.appendChild(go);
    setTimeout(function(){ inp.focus(); },80);
  } else if(q.type==="multi"){
    if(!draft[q.id]) draft[q.id] = q.defAll ? q.opts.map(function(o){return o.v;}) : [];
    var grid = el("div","multi");
    q.opts.forEach(function(o){
      var b = el("button","chip", esc(o.l));
      if(draft[q.id].indexOf(o.v)>=0) b.classList.add("on");
      b.onclick=function(){
        var a=draft[q.id], i=a.indexOf(o.v);
        if(i>=0) a.splice(i,1); else a.push(o.v);
        b.classList.toggle("on");
      };
      grid.appendChild(b);
    });
    box.appendChild(grid);
    var go2 = el("button","accent-btn", q.optional?"Дальше":"Готово");
    go2.onclick=function(){ next(); };
    box.appendChild(go2);
  }
  root.appendChild(box);
  if(qi>0){
    var back = el("button","ghost-btn","← Назад");
    back.onclick=function(){ qi--; render(); };
    root.appendChild(back);
  }
}

function next(){
  var justAnswered = Q[qi];
  qi++;
  if(justAnswered && justAnswered.id==="goal" && draft.nutgoal==null){
    if(draft.goal==="cut") draft.nutgoal="cut";
    else if(draft.goal==="hyp") draft.nutgoal="recomp";
  }
  if(qi>=Q.length){ finish(); return; }
  render();
}

function finish(){
  var p = {
    sex:draft.sex, age:draft.age, height:draft.height, weight:draft.weight,
    level:draft.level, goal:draft.goal, days:draft.days, minutes:draft.minutes,
    legs:draft.legs, emphasis:draft.emphasis||[], equipment:(draft.equipment&&draft.equipment.length?draft.equipment:["bb","db","cable","machine","bw"]),
    activity:draft.activity, nutgoal:draft.nutgoal, meals:draft.meals, restrictions:draft.restrictions||[],
    limits:draft.limits||[], redflags:draft.redflags||[]
  };
  S.profile = p;
  S.program = FORGE.generateProgram({level:p.level,days:p.days,minutes:p.minutes,goal:p.goal,legs:p.legs,emphasis:p.emphasis,equipment:p.equipment,limits:p.limits});
  S.nutrition = FORGE.generateNutrition({sex:p.sex,age:p.age,height:p.height,weight:p.weight,activity:p.activity,goal:p.nutgoal,meals:p.meals,restrictions:p.restrictions});
  S.step = (p.redflags && p.redflags.length) ? "redflag" : "app";
  S.tab="train"; S.dayIdx=0; S.log={}; S.week=1;
  save(); render();
}

function setsForWeek(base, w){
  if(w<=2) return Math.max(2, base-1);
  if(w>=7) return Math.max(2, base-1);
  return base;
}

function exercisesForWeek(list, w){
  var pairs = list.map(function(x,i){ return {x:x, i:i}; });
  var frac = (w<=2) ? 0.6 : (w===7 ? 0.6 : 1);
  if(frac>=1) return pairs;
  var n = Math.max(4, Math.round(list.length*frac));
  return pairs.slice(0, n);
}

function logKey(di, xi, si){ return S.week+"|"+di+"|"+xi+"|"+si; }

function renderApp(){
  var root=$("app"); root.innerHTML="";
  var prog=S.program, nut=S.nutrition;

  var top = el("div","topbar");
  top.appendChild(el("div","brand","<b>FORGE</b><span>"+esc(prog.meta.split)+"</span>"));
  var wk = el("div","weekbar");
  var pm = el("button","stp","◀"); pm.onclick=function(){ if(S.week>1){S.week--; save(); render();} };
  var pp = el("button","stp","▶"); pp.onclick=function(){ if(S.week<8){S.week++; save(); render();} };
  var ph = phaseFor(S.week);
  wk.appendChild(pm);
  wk.appendChild(el("div","wkmid","<b>Неделя "+S.week+"</b><i>"+esc(ph)+"</i>"));
  wk.appendChild(pp);
  top.appendChild(wk);
  root.appendChild(top);

  var tabs = el("div","tabs");
  [["train","Тренировки"],["food","Питание"],["prof","Профиль"]].forEach(function(t){
    var b=el("button","tab",t[1]);
    if(S.tab===t[0]) b.classList.add("on");
    b.onclick=function(){ S.tab=t[0]; save(); render(); };
    tabs.appendChild(b);
  });
  root.appendChild(tabs);

  var main = el("div","main");
  if(S.tab==="train") renderTrain(main, prog);
  else if(S.tab==="food") renderFood(main, nut);
  else renderProfile(main);
  root.appendChild(main);
}

function phaseFor(w){
  if(w<=2) return "Вкатывание · RIR 3–4";
  if(w<=4) return "Разгон · RIR 2–3";
  if(w<=6) return "Пик · RIR 1–2";
  if(w===7) return "Делоад · объём вдвое";
  return "Проходка · тест силы";
}

function renderTrain(main, prog){
  var nav = el("div","daynav");
  prog.days.forEach(function(d,i){
    var b=el("button","dbtn", esc(d.name));
    if(i===S.dayIdx) b.classList.add("on");
    b.onclick=function(){ S.dayIdx=i; save(); render(); };
    nav.appendChild(b);
  });
  main.appendChild(nav);

  var day = prog.days[S.dayIdx];
  var plan = exercisesForWeek(day.exercises, S.week);
  var totalSets=0, doneSets=0;
  plan.forEach(function(p){
    var n = setsForWeek(p.x.sets, S.week);
    totalSets += n;
    for(var si=0; si<n; si++){ if(S.log[logKey(S.dayIdx,p.i,si)] && S.log[logKey(S.dayIdx,p.i,si)].done) doneSets++; }
  });
  var bar = el("div","progbar","<span style=\"width:"+(totalSets?Math.round(doneSets/totalSets*100):0)+"%\"></span>");
  var pw = el("div","progwrap"); pw.appendChild(bar);
  pw.appendChild(el("span","progtxt", doneSets+"/"+totalSets+" подх."));
  main.appendChild(pw);

  if(plan.length < day.exercises.length){
    main.appendChild(el("div","warn", (S.week===7?"Делоад":"Вкатывание")+": сокращённый объём — "+plan.length+" из "+day.exercises.length+" упражнений. С 3-й недели программа раскрывается полностью."));
  }

  plan.forEach(function(pair){
    var x = pair.x, xi = pair.i;
    var card = el("div","card");
    card.appendChild(el("h3",null, esc(x.name)));
    var n = setsForWeek(x.sets, S.week);
    card.appendChild(el("div","cmeta","<b>"+n+" × "+esc(x.reps)+"</b> · RIR "+esc(x.rir)+" · "+esc(FORGE.MUSCLE_RU[x.muscle]||"")));
    if(x.cue) card.appendChild(el("p","cue", esc(x.cue)));
    var sets = el("div","sets");
    for(var si=0; si<n; si++){
      (function(si){
        var k = logKey(S.dayIdx, xi, si);
        var rec = S.log[k] || {w:"",r:"",done:false};
        var row = el("div","srow"+(rec.done?" done":""));
        row.appendChild(el("span","snum", String(si+1)));
        var f1=el("div","fld"); var i1=el("input"); i1.type="text"; i1.inputMode="decimal"; i1.value=rec.w; i1.placeholder="";
        i1.oninput=function(){ rec.w=i1.value; S.log[k]=rec; save(); };
        f1.appendChild(i1); f1.appendChild(el("span","unit","кг")); row.appendChild(f1);
        var f2=el("div","fld"); var i2=el("input"); i2.type="text"; i2.inputMode="numeric"; i2.value=rec.r;
        i2.oninput=function(){ rec.r=i2.value; S.log[k]=rec; save(); };
        f2.appendChild(i2); f2.appendChild(el("span","unit","повт")); row.appendChild(f2);
        var ck=el("button","ck","✓");
        ck.onclick=function(){ rec.done=!rec.done; S.log[k]=rec; save(); render(); };
        row.appendChild(ck);
        sets.appendChild(row);
      })(si);
    }
    card.appendChild(sets);
    main.appendChild(card);
  });

  var fin = el("button","accent-btn","Завершить тренировку");
  fin.onclick=function(){ finishSession(); };
  main.appendChild(fin);

  if(S.history.length){
    var h=el("div","block");
    h.appendChild(el("h4","bh","Последние тренировки"));
    S.history.slice(-5).reverse().forEach(function(r){
      h.appendChild(el("div","hrow", esc(r.d)+" · "+esc(r.day)+" · "+r.total+" кг тоннаж"));
    });
    main.appendChild(h);
  }
}

function finishSession(){
  var day=S.program.days[S.dayIdx], total=0, any=false;
  day.exercises.forEach(function(x,xi){
    var n=setsForWeek(x.sets,S.week);
    for(var si=0;si<n;si++){
      var r=S.log[logKey(S.dayIdx,xi,si)];
      if(r){ var w=parseFloat(String(r.w).replace(",","."))||0, rr=parseFloat(r.r)||0; if(w>0&&rr>0){ total+=w*rr; any=true; } }
    }
  });
  if(!any){ toast("Нет вписанных подходов"); return; }
  var d=new Date();
  var ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  S.history.push({d:ds, day:day.name, total:Math.round(total), week:S.week});
  day.exercises.forEach(function(x,xi){
    var n=setsForWeek(x.sets,S.week);
    for(var si=0;si<n;si++){ var k=logKey(S.dayIdx,xi,si); if(S.log[k]) S.log[k].done=false; }
  });
  save(); render(); toast("Записано ✓");
}

function renderFood(main, nut){
  var e=nut.energy, m=nut.macros;
  var tiles=el("div","tiles");
  [["ккал",e.target],["белок",m.protein+"г"],["жиры",m.fat+"г"],["угл.",m.carbs+"г"]].forEach(function(t,i){
    var d=el("div","tile"+(i===0?" acc":""));
    d.appendChild(el("span","tk",t[0]));
    d.appendChild(el("span","tv",String(t[1])));
    tiles.appendChild(d);
  });
  main.appendChild(tiles);
  main.appendChild(el("p","hint", esc(e.label)+" · "+esc(e.rate)+" · TDEE ≈ "+e.tdee+" ккал ("+esc(e.formula)+")"));

  var p0=S.profile;
  if(p0 && p0.goal==="cut" && p0.nutgoal==="bulk"){
    main.appendChild(el("div","warn","⚠ Тренировки настроены на сушку, а питание — на набор массы. Это противоречие: выбери одно. Пересобрать программу можно во вкладке «Профиль»."));
  }
  if(nut.goalNotes && nut.goalNotes.length){
    var g=el("div","warn");
    nut.goalNotes.forEach(function(n){ g.appendChild(el("div",null, esc(n))); });
    main.appendChild(g);
  }
  if(nut.restrictionNotes && nut.restrictionNotes.length){
    var w=el("div","warn");
    nut.restrictionNotes.forEach(function(n){ w.appendChild(el("div",null,"⚠ "+esc(n))); });
    main.appendChild(w);
  }

  if(nut.day && nut.day.error){ main.appendChild(el("div","warn", esc(nut.day.error))); return; }
  (nut.day.meals||[]).forEach(function(meal){
    var c=el("div","card");
    c.appendChild(el("h3",null, esc(meal.name)+" <small>"+meal.total.kcal+" ккал · Б"+meal.total.p+"</small>"));
    var ul=el("div","fitems");
    meal.items.forEach(function(it){
      ul.appendChild(el("div","fitem","<span>"+esc(it.ru)+"</span><b>"+it.grams+" г</b>"));
    });
    c.appendChild(ul);
    main.appendChild(c);
  });

  var reroll=el("button","ghost-btn","Другой вариант меню");
  reroll.onclick=function(){
    var p=S.profile;
    S.nutrition=FORGE.generateNutrition({sex:p.sex,age:p.age,height:p.height,weight:p.weight,activity:p.activity,goal:p.nutgoal,meals:p.meals,restrictions:p.restrictions,dayIndex:(S.nutrition._i||0)+1});
    S.nutrition._i=(S.nutrition._i||0)+1;
    save(); render();
  };
  main.appendChild(reroll);
}

function renderProfile(main){
  var p=S.profile, prog=S.program;
  var c=el("div","card");
  c.appendChild(el("h3",null,"Профиль"));
  var rows=[
    ["Параметры", p.height+" см · "+p.weight+" кг · "+p.age+" лет"],
    ["Стаж", {beg:"новичок",int:"средний",adv:"опытный"}[p.level]],
    ["Программа", prog.meta.split],
    ["Тренировок", p.days+"/нед по "+p.minutes+" мин"],
    ["Цель", {hyp:"гипертрофия",str:"сила",hybrid:"сила+масса",cut:"сушка"}[p.goal]]
  ];
  var t=el("div","prows");
  rows.forEach(function(r){ t.appendChild(el("div","prow","<span>"+esc(r[0])+"</span><b>"+esc(r[1])+"</b>")); });
  c.appendChild(t);
  main.appendChild(c);

  var v=el("div","card");
  v.appendChild(el("h3",null,"Недельный объём"));
  var vv=el("div","prows");
  Object.keys(prog.weeklyVolume).forEach(function(k){
    if(prog.weeklyVolume[k]>0) vv.appendChild(el("div","prow","<span>"+esc(FORGE.MUSCLE_RU[k])+"</span><b>"+prog.weeklyVolume[k]+" подх.</b>"));
  });
  v.appendChild(vv);
  main.appendChild(v);

  if(prog.limitNotes && prog.limitNotes.length){
    var lc=el("div","card");
    lc.appendChild(el("h3",null,"Твои ограничения"));
    prog.limitNotes.forEach(function(x){
      lc.appendChild(el("div","prow","<b>"+esc(x.title)+"</b>"));
      lc.appendChild(el("p","hint", esc(x.note)));
    });
    main.appendChild(lc);
  }

  var n=el("div","card");
  n.appendChild(el("h3",null,"Прогрессия"));
  n.appendChild(el("p","hint", esc(prog.progression)));
  if(prog.notes) prog.notes.forEach(function(t){ n.appendChild(el("p","hint","• "+esc(t))); });
  main.appendChild(n);

  var again=el("button","ghost-btn","Пересобрать программу");
  again.onclick=function(){ if(confirm("Заново пройти анкету? Логи тренировок сохранятся.")) startWizard(); };
  main.appendChild(again);

  var wipe=el("button","ghost-btn danger","Сбросить всё");
  wipe.onclick=function(){
    if(!confirm("Стереть профиль, программу и все логи?")) return;
    try{localStorage.removeItem(KEY);}catch(e){}
    S={step:"intro",profile:null,program:null,nutrition:null,log:{},history:[],week:1,tab:"train",dayIdx:0};
    mem=null; save(); render();
  };
  main.appendChild(wipe);
}

function renderIntro(){
  var root=$("app"); root.innerHTML="";
  var c=el("div","intro");
  c.appendChild(el("h1",null,"FORGE"));
  c.appendChild(el("p","lead","Составлю тренировки и питание под тебя — по твоим данным, целям, инвентарю и ограничениям в еде."));
  var f=el("div","feats");
  [["Программа","сплит, объём и упражнения под твой стаж, дни и время"],
   ["Питание","калории, макросы и меню с учётом аллергий и диет"],
   ["Трекинг","логируешь веса, ведёшь прогресс по неделям"]].forEach(function(x){
    f.appendChild(el("div","feat","<b>"+esc(x[0])+"</b><span>"+esc(x[1])+"</span>"));
  });
  c.appendChild(f);
  var go=el("button","accent-btn big","Собрать программу");
  go.onclick=startWizard;
  c.appendChild(go);
  c.appendChild(el("p","fine","Работает офлайн. Все данные остаются на твоём устройстве."));
  root.appendChild(c);
}

var tt;
function toast(msg){
  var t=$("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(tt); tt=setTimeout(function(){ t.classList.remove("show"); },1800);
}

var RF_RU={rest_pain:"сильная боль в покое или ночью",numb:"онемение или прострелы в конечность",
  acute:"свежая травма или операция",bulge:"выпирание/боль в паху при кашле",lock:"сустав заклинивает или подкашивается"};

function renderRedflag(){
  var root=$("app"); root.innerHTML="";
  var c=el("div","intro");
  c.appendChild(el("h2",null,"Сначала — к врачу"));
  var list=(S.profile.redflags||[]).map(function(k){ return "• "+(RF_RU[k]||k); }).join("<br>");
  c.appendChild(el("div","warn","Ты отметил:<br>"+list));
  c.appendChild(el("p","lead","Это признаки, при которых нагрузку подбирают не по анкете, а после осмотра. Тренировки сейчас могут усугубить проблему, а я не могу тебя осмотреть и не заменяю врача."));
  c.appendChild(el("p","hint","Сходи к травматологу или спортивному врачу. Программа никуда не денется — она сохранена и будет ждать."));
  var b=el("button","ghost-btn","Я был у врача, мне разрешили тренироваться");
  b.onclick=function(){ S.step="app"; save(); render(); };
  c.appendChild(b);
  root.appendChild(c);
}

function render(){
  if(S.step==="redflag" && S.profile) renderRedflag();
  else if(S.step==="wizard") renderWizard();
  else if(S.step==="app" && S.program) renderApp();
  else renderIntro();
  window.scrollTo(0,0);
}

window.FORGE_UI={render:render};
render();
})();
