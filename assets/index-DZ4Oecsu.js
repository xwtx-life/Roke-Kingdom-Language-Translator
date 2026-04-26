(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={A:`ᚠ`,B:`ᛒ`,C:`ᚲ`,D:`ᛞ`,E:`ᛖ`,F:`ᛗ`,G:`ᚷ`,H:`ᚻ`,I:`ᛁ`,J:`ᛃ`,K:`ᚲ`,L:`ᚱ`,M:`ᚦ`,N:`ᚾ`,O:`ᛟ`,P:`ᛈ`,Q:`ᚲ`,R:`ᚱ`,S:`ᛊ`,T:`ᛏ`,U:`ᚢ`,V:`ᚹ`,W:`ᛞ`,X:`ᛉ`,Y:`ᛃ`,Z:`ᛇ`,a:`ᚠ`,b:`ᛒ`,c:`ᚲ`,d:`ᛞ`,e:`ᛖ`,f:`ᛗ`,g:`ᚷ`,h:`ᚻ`,i:`ᛁ`,j:`ᛃ`,k:`ᚲ`,l:`ᚱ`,m:`ᚦ`,n:`ᚾ`,o:`ᛟ`,p:`ᛈ`,q:`ᚲ`,r:`ᚱ`,s:`ᛊ`,t:`ᛏ`,u:`ᚢ`,v:`ᚹ`,w:`ᛞ`,x:`ᛉ`,y:`ᛃ`,z:`ᛇ`},t={};Object.entries(e).forEach(([e,n])=>{t[n]||(t[n]=e.toUpperCase())});function n(t){return t.split(``).map(t=>e[t]||t).join(``)}function r(e){let n=``;for(let r=0;r<e.length;r++){let i=e[r];n+=t[i]||i}return n}var i=document.querySelector(`#app`);i.innerHTML=`
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="glass-panel w-full max-w-4xl p-8 shadow-2xl relative overflow-hidden">
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-roke-magic opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-roke-gold opacity-10 rounded-full blur-3xl"></div>
      
      <header class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-bold text-roke-gold mb-4 tracking-wider">
          洛克语翻译器
        </h1>
        <p class="text-roke-magic font-medium tracking-widest opacity-80 uppercase rune-text text-sm">
          ᚱᛟᚲᛖ ᚲᛁᚾᚷᛞᛟᛗ ᚱᚠᚲᛖ ᚲᛁᛈᚻᛖᚱ
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 relative items-start">
        <div class="flex flex-col gap-4 w-full text-left">
          <label class="text-sm font-semibold text-roke-gold/60 uppercase tracking-widest ml-1 text-left flex justify-between">
            <span>输入文字 (中文将自动译为英文)</span>
            <span id="translatingStatus" class="text-[10px] opacity-0 text-roke-magic transition-opacity italic">正在施放翻译魔法...</span>
          </label>
          <textarea 
            id="input" 
            placeholder="在此输入你想说的话..." 
            class="w-full h-48 lg:h-80 bg-black/40 border border-white/10 rounded-2xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-roke-magic/50 transition-all resize-none placeholder:text-white/10 shadow-inner"
          ></textarea>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="text-xs text-white/40 self-center mr-2">常用词:</span>
            <button class="quick-phrase px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs transition-colors border border-white/5">洛克王国</button>
            <button class="quick-phrase px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs transition-colors border border-white/5">魔法学院</button>
            <button class="quick-phrase px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs transition-colors border border-white/5">宠物捕捉</button>
          </div>
        </div>

        <div class="flex flex-col gap-4 w-full mt-8 lg:mt-0 text-left">
          <label class="text-sm font-semibold text-roke-gold/60 uppercase tracking-widest ml-1">
            洛克语 / Roke Language
          </label>
          <div class="relative group h-48 lg:h-80">
            <canvas id="particleCanvas" class="absolute inset-0 pointer-events-none z-10 rounded-2xl"></canvas>
            <textarea 
              id="output" 
              readonly
              placeholder="ᚠᛒᚲᛞ..." 
              class="w-full h-full bg-black/40 border border-white/10 rounded-2xl p-6 text-2xl rune-text text-roke-magic focus:outline-none resize-none placeholder:text-white/5 cursor-default shadow-inner relative z-0"
            ></textarea>
            <div class="absolute bottom-4 right-4 flex gap-2 z-20">
              <button id="copyBtn" class="bg-roke-gold text-roke-dark px-4 py-2 rounded-lg font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg">
                复制结果
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 bg-white/5 rounded-3xl p-8 border border-white/5 shadow-2xl">
        <h3 class="text-roke-gold text-lg font-bold mb-6 tracking-widest uppercase text-center flex items-center justify-center gap-3">
          <span class="h-px w-8 bg-roke-gold/30"></span>
          洛克语字符对照表
          <span class="h-px w-8 bg-roke-gold/30"></span>
        </h3>
        <div id="runeTable" class="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-13 gap-4"></div>
      </div>

      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-left border-t border-white/5 pt-12">
        <div class="space-y-4">
          <h3 class="text-roke-gold text-xl font-bold flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-roke-magic"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            什么是洛克语？
          </h3>
          <p class="text-base text-white/60 leading-relaxed">
            洛克语是洛克王国中神秘的古老文字。本工具支持自动将中文翻译为英文后再转换为符文，还原最正宗的游戏韵味。
          </p>
        </div>
        <div class="space-y-4">
          <h3 class="text-roke-gold text-xl font-bold flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-roke-magic"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            支持解密吗？
          </h3>
          <p class="text-base text-white/60 leading-relaxed">
            支持双向转换。粘贴洛克语符号，系统将自动识别其编码并还原为对应的英文含义。
          </p>
        </div>
      </div>

      <footer class="mt-16 text-center text-white/20 text-xs border-t border-white/5 pt-8">
        <p>本站仅供洛克王国爱好者交流学习使用，不代表官方立场。</p>
      </footer>
    </div>
  </div>
`;var a=document.querySelector(`#input`),o=document.querySelector(`#output`),s=document.querySelector(`#copyBtn`),c=document.querySelector(`#translatingStatus`),l=null;async function u(e){if(!e)return``;if(/^[A-Za-z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\`~-]+$/.test(e))return e;c.style.opacity=`1`;try{return(await(await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(e)}&langpair=zh-CN|en`)).json()).responseData.translatedText}catch(t){return console.error(`Translation failed`,t),e}finally{c.style.opacity=`0`}}async function d(){let e=a.value;/[\u16A0-\u16FF]/.test(e)?(o.value=r(e),o.classList.remove(`rune-text`),o.classList.add(`text-lg`,`text-white`)):(clearTimeout(l),l=setTimeout(async()=>{o.value=n(await u(e)),o.classList.add(`rune-text`),o.classList.remove(`text-lg`,`text-white`)},500))}a.addEventListener(`input`,d),document.querySelectorAll(`.quick-phrase`).forEach(e=>{e.addEventListener(`click`,()=>{a.value=e.innerText,d()})});var f=document.querySelector(`#runeTable`);f.innerHTML=`ABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(``).map(t=>`
  <div class="flex flex-col items-center p-2 bg-black/20 rounded-xl border border-white/5 hover:border-roke-magic/50 transition-colors group cursor-default">
    <span class="text-xs text-white/30 group-hover:text-roke-gold transition-colors">${t}</span>
    <span class="text-2xl rune-text text-roke-gold group-hover:scale-110 transition-transform mt-1">${e[t]}</span>
  </div>
`).join(``);var p=document.querySelector(`#particleCanvas`),m=p.getContext(`2d`),h=[];function g(){p.width=p.parentElement?.clientWidth||0,p.height=p.parentElement?.clientHeight||0}window.addEventListener(`resize`,g),g();var _=class{x=Math.random()*p.width;y=Math.random()*p.height;size=Math.random()*2+1;speedX=Math.random()*.4-.2;speedY=Math.random()*-.8-.2;opacity=Math.random()*.5+.2;update(){this.x+=this.speedX,this.y+=this.speedY,this.y<0&&(this.y=p.height),this.opacity-=.001}draw(){m.fillStyle=`rgba(124,77,255,${this.opacity})`,m.beginPath(),m.arc(this.x,this.y,this.size,0,Math.PI*2),m.fill()}};function v(){m.clearRect(0,0,p.width,p.height),o.value.length>0&&(h.length<30&&h.push(new _),h.forEach((e,t)=>{e.update(),e.draw(),e.opacity<=0&&h.splice(t,1)})),requestAnimationFrame(v)}v(),s.addEventListener(`click`,()=>{navigator.clipboard.writeText(o.value).then(()=>{let e=s.innerText;s.innerText=`已复制`,setTimeout(()=>s.innerText=e,2e3)})});