const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname,'..');
const projects = require('./projects.json');
const domain = 'https://devgroup.kz';
const phone = '77776833920';
const wa = `https://wa.me/${phone}`;
const esc = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const write = (name, body) => {const dest=path.join(root,name);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,body);};
const logo = '<span class="symbol" aria-hidden="true"><i></i><i></i><i></i></span><span><b>DEV</b> Group</span>';
function header(base){
return `<a class="skip" href="#main">К содержанию</a><header class="header"><nav class="nav wrap" aria-label="Основная навигация"><a class="logo" href="${base}" aria-label="DEV Group — главная">${logo}</a><div class="links"><a href="${base}#projects">Проекты</a><a href="${base}#about">О компании</a></div><a class="pill" href="#contact">Связаться</a></nav></header>`;
}
function footer(base){
return `<footer class="foot"><div class="wrap"><a class="logo" href="${base}" aria-label="DEV Group — главная">${logo}</a><div class="foot-contact"><a href="${base}#projects">Проекты</a><a href="${wa}">WhatsApp</a></div></div></footer>`;
}
function contact(selected){
return `<section class="contact${selected?' detail-footer-contact':''}" id="contact" aria-labelledby="contact-title"><div class="wrap contact-inner"><div><h2 id="contact-title">Обсудим задачу?</h2><p>Выберите проект и напишите нам в WhatsApp.</p><a class="phone" href="${wa}">+7 777 683 39 20</a></div><form class="form" action="${wa}" method="get"><label>Проект<select id="topic" name="project"><option value="">Общий вопрос</option>${projects.map(p=>`<option${selected===p.slug?' selected':''}>${esc(p.name)}</option>`).join('')}</select></label><label>Ваше сообщение<textarea name="text" required maxlength="2000" rows="3" placeholder="Что хотите обсудить?"></textarea></label><button class="button" type="submit">Продолжить в WhatsApp</button></form></div></section>`;
}
const badge='<span class="badge">Скоро</span>';
const tile=(p,base,big=false)=>`<span aria-hidden="true" class="mark mark-${p.mark}${big?' detail-mark':''}"><img src="${base}assets/icons/${p.mark}.png" width="27" height="27" alt=""></span>`;
function card(p){
const url=`projects/${p.slug}/`;
if(p.art)return `<article class="project feature ${p.art==='tsd'?'mint':''}" data-category="${p.category}"><div class="content"><div class="kicker">${esc(p.tag)}</div><h3><a class="titlelink" href="${url}">${esc(p.name)}</a></h3><p>${esc(p.summary)}</p><a class="project-link" href="${p.external}">${p.host}<span class="sr"> — сайт проекта</span></a></div><img class="feature-art" src="assets/${p.art}.png" width="600" height="440" alt="" decoding="async"></article>`;
return `<a class="project minor" data-category="${p.category}" href="${url}">${tile(p,'')}<div><div class="minor-title"><h3>${esc(p.name)}</h3>${p.soon?badge:''}</div><p>${esc(p.summary)}</p></div><span class="chev" aria-hidden="true"></span></a>`;
}
function frame(base, pagePath, title, description, main, structured){
const url=domain+pagePath;
return `<!doctype html>
<html lang="ru-KZ"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#ffffff">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="DEV Group"><meta property="og:locale" content="ru_KZ"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${domain}/assets/relief.png">
<link rel="icon" href="${base}assets/favicon.png" type="image/png"><link rel="stylesheet" href="${base}assets/site.css"><script defer src="${base}assets/site.js"></script>
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org',...structured}).replace(/</g,'\\u003c')}</script>
</head><body>${header(base)}<main id="main">${main}</main>${footer(base)}</body></html>\n`;
}
const cats=[['all','Все'],['retail','Торговля'],['ai','ИИ'],['it','Разработка и IT']];
const home = `<section class="hero" aria-labelledby="hero-title"><div class="wrap hero-inner"><div class="hero-copy"><div class="region"><span class="regional" aria-hidden="true"></span>Казахстан</div><h1 id="hero-title">Технологии<br><span>для бизнеса.</span></h1><p>Оснащаем магазины, разрабатываем программы для торговли и внедряем локальный ИИ.</p><a class="button" href="#projects">Смотреть проекты</a></div><div class="artbox"><img class="art" src="assets/relief.png" width="1050" height="700" alt="" fetchpriority="high"></div></div></section>
<section class="catalog wrap" id="projects" aria-labelledby="projects-title"><div class="section-head"><h2 id="projects-title">Наши проекты</h2><div class="filters" aria-label="Фильтр проектов" role="group" hidden>${cats.map(([id,label])=>`<button type="button" aria-controls="project-list" data-filter="${id}" aria-pressed="${id==='all'}">${label}</button>`).join('')}</div></div><div class="cards" id="project-list">${projects.map(card).join('\n')}</div><p class="sr" role="status" id="filter-status"></p></section>
<section class="about" id="about"><div class="wrap about-inner"><h2>О компании</h2><p>DEV Group объединяет проекты для бизнеса в Казахстане. Работаем с тем, чем команда магазина пользуется каждый день, — от весов и терминала на складе до базы 1С и интернет-магазина.</p></div></section>${contact()}`;
write('index.html',frame('./','/','DEV Group — торговое оборудование, ИИ и разработка ПО в Казахстане','Проекты DEV Group для бизнеса в Казахстане. Оборудование для магазинов, терминалы сбора данных, локальный ИИ, решения для 1С и разработка интернет-магазинов.',home,{'@type':'Organization',name:'DEV Group',url:domain,telephone:'+'+phone}));
for(const p of projects){
const base='../../', url=`/projects/${p.slug}/`;
const facts=p.items?`<h2>Возможности</h2><div class="facts">${p.items.map(([title,txt])=>`<div class="fact"><h3>${esc(title)}</h3><p>${esc(txt)}</p></div>`).join('')}</div>`:p.works?`<h2>Работы команды</h2><div class="samples">${p.works.map(([host,label])=>`<a class="sample" href="https://${host}/"><strong>${esc(host)}</strong><span>${esc(label)}</span></a>`).join('')}</div>`:`<div class="prompt"><h2>${esc(p.prompt)}</h2><p>${esc(p.hint)}</p></div>`;
const view=`<section class="detail"><div class="wrap"><a class="breadcrumb" href="${base}#projects">Все проекты</a><div class="detail-layout"><div class="detail-copy"><div class="kicker">${esc(p.tag)} ${p.soon?badge:''}</div><h1>${esc(p.name)}</h1><h2>${esc(p.title)}</h2><p class="detail-intro">${esc(p.lead)}</p><a class="button" href="${p.external||'#contact'}">${p.host?'Перейти на '+p.host:p.soon?'Спросить о проекте':'Обсудить проект'}</a></div>${p.art?`<img class="detail-visual" src="${base}assets/${p.art}.png" width="600" height="440" alt="">`:tile(p,base,true)}</div></div></section><section class="detail-body wrap">${facts}</section>${contact(p.slug)}`;
write(`projects/${p.slug}/index.html`,frame(base,url,`${p.name} — ${p.title} | DEV Group`,p.summary+' '+p.title+'.',view,{'@type':'WebPage',name:p.name,description:p.summary,url:domain+url,isPartOf:{'@type':'WebSite',name:'DEV Group',url:domain}}));
}
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['/',...projects.map(p=>`/projects/${p.slug}/`)].map(p=>`  <url><loc>${domain}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt',`User-agent: *\nAllow: /\nDisallow: /tools/\nSitemap: ${domain}/sitemap.xml\n`);
