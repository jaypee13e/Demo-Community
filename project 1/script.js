const ME={n:'Demo',c:'#102c5b'};
const M=[{n:'Demo',c:'#102c5b',b:'Admin · demo account'},{n:'Maya',c:'#df5684',b:'Photography & travel'},{n:'Jon',c:'#2f7d6d',b:'Learning to code'},{n:'Lia',c:'#8a5cc2',b:'Book lover'},{n:'Ben',c:'#c27a2c',b:'Community moderator'},{n:'Ana',c:'#2f6fc2',b:'Design enthusiast'}];
const col=n=>(M.find(m=>m.n===n)||ME).c;
const G=['linear-gradient(135deg,#f4a9c4,#9bb5e6)','linear-gradient(135deg,#ffd9a8,#e88aa8)','linear-gradient(135deg,#9bd3c3,#5f86cf)','linear-gradient(135deg,#c9b3ee,#f4a9c4)'];
let posts=[
 {id:1,by:'Maya',t:'2h ago',x:'Caught the sunrise from the hilltop this morning. Honestly the best way to start a Saturday. 🌅',g:0,likes:12,liked:0,saved:0,rep:2,com:[['Jon','Gorgeous light!'],['Ana','Take me next time']]},
 {id:2,by:'Lia',t:'5h ago',x:'Just finished an amazing book and need a recommendation for my next one. What are you all reading?',g:1,likes:27,liked:1,saved:1,rep:5,com:[['Ben','Congratulations!']]},
 {id:3,by:'Jon',t:'Yesterday',x:'Shipped my first side project today. Thanks for all the tips, everyone!',g:2,likes:18,liked:0,saved:0,rep:1,com:[]},
 {id:4,by:'Demo',t:'2 days ago',x:'Reminder: community meetup is on Tuesday at 6 pm. Hope to see you all there!',g:-1,likes:9,liked:0,saved:0,rep:0,com:[['Maya','See you there!']]}
];
let notes=[['Maya','liked your post'],['Jon','commented: "Great reminder"'],['Lia','reposted your post']];
let page='home',open={};
const $=s=>document.querySelector(s);
const nav=[['home','🏠','Home'],['members','👥','Members'],['notes','🔔','Alerts'],['me','👤','Profile']];
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('s');setTimeout(()=>t.classList.remove('s'),1600)}
function enter(){$('#welcome').classList.add('hidden');$('#app').classList.remove('hidden');go('home')}
function toggleTheme(){const h=document.documentElement;h.dataset.theme=h.dataset.theme==='dark'?'light':'dark'}
function go(p){page=p;$('#dot').style.display=p==='notes'?'none':'';
 $('#rail').innerHTML=nav.map(n=>`<button class="${p===n[0]?'on':''}" onclick="go('${n[0]}')">${n[1]} ${n[2]}</button>`).join('')+`<button class="new" onclick="go('new')">+ New Post</button>`;
 $('#tab').innerHTML=nav.slice(0,2).concat([['new','➕','Post']],nav.slice(2)).map(n=>`<button class="${p===n[0]?'on':''}" onclick="go('${n[0]}')">${n[1]}<br>${n[2]}</button>`).join('');
 render();scrollTo(0,0)}
const av=(n,s=40)=>`<div class="av" style="background:${col(n)};width:${s}px;height:${s}px">${n[0]}</div>`;
function postHTML(p){return `<article class="card"><div class="ph">${av(p.by)}<div><b>${p.by}</b><small>${p.t}</small></div></div><p>${p.x}</p>${p.g>=0?`<div class="media" style="background:${G[p.g]}"></div>`:''}
<div class="acts"><button class="${p.liked?'on':''}" onclick="act(${p.id},'like')">${p.liked?'♥':'♡'} ${p.likes}</button><button onclick="act(${p.id},'cm')">💬 ${p.com.length}</button><button onclick="act(${p.id},'rep')">🔁 ${p.rep}</button><button class="sp ${p.saved?'on':''}" onclick="act(${p.id},'save')">${p.saved?'★':'☆'}</button></div>
${open[p.id]?p.com.map(c=>`<div class="cm"><b>${c[0]}</b>${c[1]}</div>`).join('')+`<div class="ci"><input id="c${p.id}" placeholder="Write a comment…" onkeydown="if(event.key==='Enter')addC(${p.id})"><button class="sb" onclick="addC(${p.id})">Send</button></div>`:''}</article>`}
function act(id,k){const p=posts.find(x=>x.id===id);
 if(k==='like'){p.liked=!p.liked;p.likes+=p.liked?1:-1}
 if(k==='save'){p.saved=!p.saved;toast(p.saved?'Saved to your list':'Removed from saved')}
 if(k==='rep'){p.rep++;toast('Reposted to the community')}
 if(k==='cm')open[id]=!open[id];render()}
function addC(id){const i=$('#c'+id);if(!i.value.trim())return;posts.find(x=>x.id===id).com.push([ME.n,i.value.trim()]);render()}
function newPost(){const v=$('#np').value.trim();if(!v)return toast('Write something first');posts.unshift({id:Date.now(),by:ME.n,t:'Just now',x:v.replace(/</g,'&lt;'),g:-1,likes:0,liked:0,saved:0,rep:0,com:[]});toast('Posted!');go('home')}
function render(){const m=$('#main');
 if(page==='home')m.innerHTML=posts.map(postHTML).join('');
 if(page==='new')m.innerHTML=`<h2>New Post</h2><div class="card"><textarea id="np" placeholder="Share a moment with the community…"></textarea><div class="row" style="margin-top:10px"><span class="mu">Photo/video upload runs through Cloudinary in the full app</span><button class="sb" onclick="newPost()">Post</button></div></div>`;
 if(page==='members')m.innerHTML=`<h2>Members</h2>`+M.map(u=>`<div class="card row"><div class="l">${av(u.n,46)}<div><b>${u.n}</b><div class="mu">${u.b}</div></div></div></div>`).join('');
 if(page==='notes')m.innerHTML=`<h2>Notifications</h2>`+notes.map(n=>`<div class="card l row" style="justify-content:flex-start"><div class="l">${av(n[0],36)}<span><b>${n[0]}</b> ${n[1]}</span></div></div>`).join('');
 if(page==='me'){const mine=posts.filter(p=>p.by===ME.n);m.innerHTML=`<div class="card"><div class="cover"></div><div style="display:flex;gap:14px;align-items:flex-end;margin-top:-30px;padding:0 8px">${av('Demo',72)}<div><h2 style="margin:0">Demo</h2><div class="mu">${M[0].b}</div></div></div><div class="row" style="justify-content:space-around;margin-top:16px;text-align:center"><div><b>${mine.length}</b><div class="mu">Posts</div></div><div><b>${M.length-1}</b><div class="mu">Members</div></div><div><b>${posts.filter(p=>p.saved).length}</b><div class="mu">Saved</div></div></div></div>`+mine.map(postHTML).join('')}
}