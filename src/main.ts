import './style.css'

const ROKE_MAPPING: Record<string, string> = {
  'A': '\u16A0', 'B': '\u16D2', 'C': '\u16B2', 'D': '\u16DE', 'E': '\u16D6',
  'F': '\u16D7', 'G': '\u16B7', 'H': '\u16BB', 'I': '\u16C1', 'J': '\u16C3',
  'K': '\u16B2', 'L': '\u16B1', 'M': '\u16A6', 'N': '\u16BE', 'O': '\u16DF',
  'P': '\u16C8', 'Q': '\u16B2', 'R': '\u16B1', 'S': '\u16CA', 'T': '\u16CF',
  'U': '\u16A2', 'V': '\u16B9', 'W': '\u16DE', 'X': '\u16C9', 'Y': '\u16C3',
  'Z': '\u16C7',
  'a': '\u16A0', 'b': '\u16D2', 'c': '\u16B2', 'd': '\u16DE', 'e': '\u16D6',
  'f': '\u16D7', 'g': '\u16B7', 'h': '\u16BB', 'i': '\u16C1', 'j': '\u16C3',
  'k': '\u16B2', 'l': '\u16B1', 'm': '\u16A6', 'n': '\u16BE', 'o': '\u16DF',
  'p': '\u16C8', 'q': '\u16B2', 'r': '\u16B1', 's': '\u16CA', 't': '\u16CF',
  'u': '\u16A2', 'v': '\u16B9', 'w': '\u16DE', 'x': '\u16C9', 'y': '\u16C3',
  'z': '\u16C7'
};

const DECODE_MAPPING: Record<string, string> = {};
Object.entries(ROKE_MAPPING).forEach(([k, v]) => {
  if (!DECODE_MAPPING[v]) {
    DECODE_MAPPING[v] = k.toUpperCase();
  }
});

function applyRoke(text: string): string {
  return text.split('').map(char => ROKE_MAPPING[char] || char).join('');
}

function translateToNormal(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    result += DECODE_MAPPING[char] || char;
  }
  return result;
}

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
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
              <button id="generateScrollBtn" class="bg-roke-magic text-white px-4 py-2 rounded-lg font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                生成画卷
              </button>
              <button id="copyBtn" class="bg-roke-gold text-roke-dark px-4 py-2 rounded-lg font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg">
                复制结果
              </button>
            </div>
          </div>
        </div>
      </div>

      <canvas id="shareCanvas" class="hidden"></canvas>

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
`

const inputArea = document.querySelector<HTMLTextAreaElement>('#input')!
const outputArea = document.querySelector<HTMLTextAreaElement>('#output')!
const copyBtn = document.querySelector<HTMLButtonElement>('#copyBtn')!
const translatingStatus = document.querySelector<HTMLSpanElement>('#translatingStatus')!

let timeout: any = null;

async function translateText(text: string): Promise<string> {
  if (!text) return '';
  // If text is purely English/symbols, don't translate
  if (/^[A-Za-z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\`~-]+$/.test(text)) {
    return text;
  }
  
  translatingStatus.style.opacity = '1';
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=zh-CN|en`);
    const data = await res.json();
    return data.responseData.translatedText;
  } catch (e) {
    console.error('Translation failed', e);
    return text;
  } finally {
    translatingStatus.style.opacity = '0';
  }
}

async function updateTranslation() {
  const text = inputArea.value;
  if (/[\u16A0-\u16FF]/.test(text)) {
    outputArea.value = translateToNormal(text);
    outputArea.classList.remove('rune-text');
    outputArea.classList.add('text-lg', 'text-white');
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const englishText = await translateText(text);
      outputArea.value = applyRoke(englishText);
      outputArea.classList.add('rune-text');
      outputArea.classList.remove('text-lg', 'text-white');
    }, 500);
  }
}

inputArea.addEventListener('input', updateTranslation);

document.querySelectorAll('.quick-phrase').forEach(btn => {
  btn.addEventListener('click', () => {
    inputArea.value = (btn as HTMLButtonElement).innerText;
    updateTranslation();
  });
});

// Rune Table
const runeTable = document.querySelector<HTMLDivElement>('#runeTable')!;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
runeTable.innerHTML = alphabet.map(letter => `
  <div class="flex flex-col items-center p-2 bg-black/20 rounded-xl border border-white/5 hover:border-roke-magic/50 transition-colors group cursor-default">
    <span class="text-xs text-white/30 group-hover:text-roke-gold transition-colors">${letter}</span>
    <span class="text-2xl rune-text text-roke-gold group-hover:scale-110 transition-transform mt-1">${ROKE_MAPPING[letter]}</span>
  </div>
`).join('');

// Particles
const canvas = document.querySelector<HTMLCanvasElement>('#particleCanvas')!;
const ctx = canvas.getContext('2d')!;
let particles: any[] = [];
function resize() { 
  canvas.width = canvas.parentElement?.clientWidth || 0; 
  canvas.height = canvas.parentElement?.clientHeight || 0; 
}
window.addEventListener('resize', resize);
resize();

class Particle {
  x=Math.random()*canvas.width; y=Math.random()*canvas.height; size=Math.random()*2+1;
  speedX=Math.random()*0.4-0.2; speedY=Math.random()*-0.8-0.2; opacity=Math.random()*0.5+0.2;
  update() { this.x+=this.speedX; this.y+=this.speedY; if(this.y<0) this.y=canvas.height; this.opacity-=0.001; }
  draw() { ctx.fillStyle=`rgba(124,77,255,${this.opacity})`; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(outputArea.value.length > 0) {
    if(particles.length < 30) particles.push(new Particle());
    particles.forEach((p,i) => { p.update(); p.draw(); if(p.opacity<=0) particles.splice(i,1); });
  }
  requestAnimationFrame(animate);
}
animate();

// Scroll Generator
const generateScrollBtn = document.querySelector<HTMLButtonElement>('#generateScrollBtn')!;
const shareCanvas = document.querySelector<HTMLCanvasElement>('#shareCanvas')!;

generateScrollBtn.addEventListener('click', () => {
  if (!outputArea.value) return;
  const sCtx = shareCanvas.getContext('2d')!;
  const bg = new Image();
  bg.crossOrigin = "anonymous";
  generateScrollBtn.innerText = '生成中...';
  bg.onload = () => {
    shareCanvas.width = bg.width; shareCanvas.height = bg.height;
    sCtx.drawImage(bg, 0, 0);
    sCtx.fillStyle = '#4a148c'; sCtx.textAlign = 'center'; sCtx.textBaseline = 'middle';
    sCtx.font = 'bold 50px RokeRune, serif';
    sCtx.fillText(outputArea.value.substring(0, 25), shareCanvas.width/2, shareCanvas.height/2);
    const link = document.createElement('a');
    link.download = `roke-scroll.png`; link.href = shareCanvas.toDataURL(); link.click();
    generateScrollBtn.innerText = '生成画卷';
  };
  bg.src = '/scroll.png';
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(outputArea.value).then(() => {
    const old = copyBtn.innerText; copyBtn.innerText = '已复制';
    setTimeout(() => copyBtn.innerText = old, 2000);
  });
});
