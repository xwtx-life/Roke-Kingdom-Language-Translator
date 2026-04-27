<template>
  <div class="min-h-screen flex flex-col items-center p-2 md:p-4">
    <div class="mb-6 w-full max-w-4xl flex justify-start">
      <router-link to="/" class="text-roke-gold hover:text-roke-magic transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        返回工具箱
      </router-link>
    </div>

    <div class="glass-panel w-full max-w-4xl p-5 md:p-10 shadow-2xl relative overflow-hidden">
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-roke-magic opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-roke-gold opacity-10 rounded-full blur-3xl"></div>
      
      <header class="text-center mb-8 md:mb-12">
        <h1 class="text-3xl md:text-5xl font-bold text-roke-gold mb-3 md:mb-4 tracking-wider">
          洛克语翻译器
        </h1>
        <p class="text-roke-magic font-medium tracking-widest opacity-80 uppercase rune-text text-xs md:text-sm">
          ᚱᛟᚲᛖ ᚲᛁᚾᚷᛞᛟᛗ ᚱᚠᚲᛖ ᚲᛁᛈᚻᛖᚱ
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 relative items-start">
        <!-- Input Area -->
        <div class="flex flex-col gap-3 w-full text-left">
          <label class="text-xs md:text-sm font-semibold text-roke-gold/60 uppercase tracking-widest ml-1 text-left flex justify-between items-center">
            <span>{{ isDecoding ? '洛克语 (解密模式)' : '中文/英文 (加密模式)' }}</span>
            <span :class="['text-[10px] text-roke-magic transition-opacity italic', isTranslating ? 'opacity-100' : 'opacity-0']">正在施放翻译魔法...</span>
          </label>
          <textarea 
            v-model="inputText"
            :placeholder="isDecoding ? '粘贴洛克语符号或英文...' : '在此输入你想说的话...'" 
            :class="['w-full h-40 md:h-80 bg-black/40 border border-white/10 rounded-2xl p-5 md:p-6 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-roke-magic/50 transition-all resize-none placeholder:text-white/10 shadow-inner', isDecoding ? 'rune-text text-roke-magic' : '']"
          ></textarea>
          <div class="flex flex-wrap gap-2 mt-1 md:mt-2">
            <span class="text-[10px] md:text-xs text-white/40 self-center mr-1">常用词:</span>
            <button 
              v-for="phrase in quickPhrases" 
              :key="phrase"
              @click="inputText = phrase"
              class="quick-phrase px-2 md:px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-[10px] md:text-xs transition-colors border border-white/5"
            >
              {{ phrase }}
            </button>
          </div>
        </div>

        <!-- Output Area -->
        <div class="flex flex-col gap-3 w-full mt-6 lg:mt-0 text-left">
          <label class="text-xs md:text-sm font-semibold text-roke-gold/60 uppercase tracking-widest ml-1">
            {{ isDecoding ? '翻译结果 (中文)' : '洛克语 (Roke Language)' }}
          </label>
          <div class="relative group h-40 md:h-80">
            <canvas ref="particleCanvas" class="absolute inset-0 pointer-events-none z-10 rounded-2xl"></canvas>
            <textarea 
              :value="outputText"
              readonly
              :placeholder="isDecoding ? '等待翻译...' : 'ᚠᛒᚲᛞ...'" 
              :class="['w-full h-full bg-black/40 border border-white/10 rounded-2xl p-5 md:p-6 text-xl md:text-2xl focus:outline-none resize-none placeholder:text-white/5 cursor-default shadow-inner relative z-0', !isDecoding ? 'rune-text text-roke-magic' : 'text-lg text-white']"
            ></textarea>
            <div class="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex gap-2 z-20">
              <button @click="copyResult" class="bg-roke-gold text-roke-dark px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg">
                {{ copyBtnText }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Rune Table -->
      <div class="mt-10 md:mt-16 bg-white/5 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-white/5 shadow-2xl">
        <h3 class="text-roke-gold text-base md:text-lg font-bold mb-5 md:mb-8 tracking-widest uppercase text-center flex items-center justify-center gap-2 md:gap-3">
          <span class="h-px w-6 md:w-8 bg-roke-gold/30"></span>
          洛克语字符对照表
          <span class="h-px w-6 md:w-8 bg-roke-gold/30"></span>
        </h3>
        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-13 gap-3 md:gap-4">
          <div 
            v-for="letter in alphabet" 
            :key="letter"
            class="flex flex-col items-center p-2 bg-black/20 rounded-xl border border-white/5 hover:border-roke-magic/50 transition-colors group cursor-default"
          >
            <span class="text-xs text-white/30 group-hover:text-roke-gold transition-colors">{{ letter }}</span>
            <span class="text-2xl rune-text text-roke-gold group-hover:scale-110 transition-transform mt-1">{{ letter }}</span>
          </div>
        </div>
      </div>

      <div class="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left border-t border-white/5 pt-10 md:pt-12">
        <div class="space-y-3 md:space-y-4">
          <h3 class="text-roke-gold text-lg md:text-xl font-bold flex items-center gap-2 md:gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-roke-magic md:w-5 md:h-5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            什么是洛克语？
          </h3>
          <p class="text-sm md:text-base text-white/60 leading-relaxed">
            洛克语是洛克王国中神秘的古老文字。本工具支持双向转换：输入中文可生成洛克语代码，粘贴洛克语（或对应的英文字符）可直接还原其含义。
          </p>
        </div>
        <div class="space-y-3 md:space-y-4">
          <h3 class="text-roke-gold text-lg md:text-xl font-bold flex items-center gap-2 md:gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-roke-magic md:w-5 md:h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            如何解密？
          </h3>
          <p class="text-sm md:text-base text-white/60 leading-relaxed">
            系统会自动识别输入。如果你粘贴的内容是英文或卢恩符文，系统将自动开启“解密模式”并显示其中文含义。
          </p>
        </div>
      </div>

      <footer class="mt-10 md:mt-16 text-center text-white/20 text-[10px] md:text-xs border-t border-white/5 pt-8">
        <p>本站仅供洛克王国爱好者交流学习使用，不代表官方立场。</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { decodeRunic, applyRoke, translateText } from './utils';

const inputText = ref('');
const outputText = ref('');
const isTranslating = ref(false);
const copyBtnText = ref('复制结果');
const particleCanvas = ref<HTMLCanvasElement | null>(null);

const quickPhrases = ['洛克王国', '魔法学院', '宠物捕捉'];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// 智能识别当前是否为解密模式
const isDecoding = computed(() => {
  if (!inputText.value) return false;
  // 如果包含中文，则不是解密
  if (/[\u4e00-\u9fa5]/.test(inputText.value)) return false;
  // 如果是纯英文或卢恩符文，则是解密模式
  return /^[A-Za-z\s!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\`~-]+$/.test(inputText.value) || /[\u16A0-\u16FF]/.test(inputText.value);
});

let timeout: any = null;

watch(inputText, async (newVal) => {
  if (!newVal) {
    outputText.value = '';
    return;
  }

  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    if (isDecoding.value) {
      // 解密逻辑：符文 -> 英文 -> 中文
      const englishText = decodeRunic(newVal);
      const chineseText = await translateText(englishText, true, (show) => {
        isTranslating.value = show;
      });
      outputText.value = chineseText;
    } else {
      // 加密逻辑：中文 -> 英文 -> 洛克语展示
      const englishText = await translateText(newVal, false, (show) => {
        isTranslating.value = show;
      });
      outputText.value = applyRoke(englishText);
    }
  }, 500);
});

const copyResult = () => {
  navigator.clipboard.writeText(outputText.value).then(() => {
    copyBtnText.value = '已复制';
    setTimeout(() => copyBtnText.value = '复制结果', 2000);
  });
};

// Particle Animation (Keep as is)
let animationId: number;
let particles: any[] = [];
class Particle {
  x: number; y: number; size: number;
  speedX: number; speedY: number; opacity: number;
  width: number; height: number;
  constructor(width: number, height: number) {
    this.width = width; this.height = height;
    this.x = Math.random() * width; this.y = Math.random() * height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.4 - 0.2; this.speedY = Math.random() * -0.8 - 0.2;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.y < 0) this.y = this.height;
    this.opacity -= 0.001;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(124,77,255,${this.opacity})`; ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
  }
}

onMounted(() => {
  const canvas = particleCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;
  const resize = () => {
    if (!canvas.parentElement) return;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  };
  window.addEventListener('resize', resize);
  resize();
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (outputText.value.length > 0) {
      if (particles.length < 30) particles.push(new Particle(canvas.width, canvas.height));
      particles.forEach((p, i) => { p.update(); p.draw(ctx); if (p.opacity <= 0) particles.splice(i, 1); });
    }
    animationId = requestAnimationFrame(animate);
  };
  animate();
});
onUnmounted(() => { cancelAnimationFrame(animationId); });
</script>
