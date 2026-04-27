<template>
  <div class="min-h-screen flex flex-col items-center p-2 md:p-4">
    <div class="mb-6 w-full max-w-5xl flex justify-start">
      <router-link to="/" class="text-roke-gold hover:text-roke-magic transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        返回工具箱
      </router-link>
    </div>

    <div class="glass-panel w-full max-w-5xl p-5 md:p-10 shadow-2xl relative overflow-hidden">
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-roke-magic opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-roke-gold opacity-10 rounded-full blur-3xl"></div>

      <header class="text-center mb-12">
        <h1 class="text-3xl md:text-5xl font-bold text-roke-gold mb-4 tracking-wider">
          孵蛋查询
        </h1>
        <p class="text-white/40 text-sm md:text-base max-w-xl mx-auto">
          探寻生命的奥秘。在这里查询宠物的孵化组别，找到完美的繁育拍档。
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Group List -->
        <div class="lg:col-span-1 space-y-3">
          <h3 class="text-white/40 text-xs font-bold uppercase tracking-widest px-2 mb-4">孵化组别 (Egg Groups)</h3>
          <button 
            v-for="group in eggGroups" 
            :key="group.name"
            @click="activeGroup = group"
            :class="[
              'w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group',
              activeGroup.name === group.name ? 'bg-white/10 border-roke-gold text-white' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'
            ]"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ group.icon }}</span>
              <span class="font-bold">{{ group.name }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-hover:opacity-100 transition-opacity"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <!-- Detail Panel -->
        <div class="lg:col-span-2">
          <div class="bg-black/40 rounded-3xl p-6 md:p-10 border border-white/5 min-h-[500px] flex flex-col">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl">
                {{ activeGroup.icon }}
              </div>
              <div>
                <h2 class="text-3xl font-bold text-white">{{ activeGroup.name }}组</h2>
                <p class="text-white/40 text-sm">组别成员及孵化特性</p>
              </div>
            </div>

            <div class="mb-8">
              <h4 class="text-roke-gold text-xs font-bold uppercase tracking-widest mb-4">组别简介</h4>
              <p class="text-white/60 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                {{ activeGroup.description }}
              </p>
            </div>

            <div class="flex-1">
              <h4 class="text-roke-gold text-xs font-bold uppercase tracking-widest mb-4">代表宠物</h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div 
                  v-for="pet in activeGroup.members" 
                  :key="pet"
                  class="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 hover:border-roke-magic/30 transition-all group"
                >
                  <div class="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    🐾
                  </div>
                  <span class="text-sm font-medium text-white/80">{{ pet }}</span>
                </div>
              </div>
            </div>

            <div class="mt-8 p-4 bg-roke-magic/10 border border-roke-magic/20 rounded-2xl flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-roke-magic mt-1 shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <p class="text-xs text-roke-magic/80 leading-relaxed">
                <strong>孵蛋规则：</strong> 只有处于相同组别的雄性与雌性宠物才能产出宠物蛋。产出的蛋种类随雌性宠物，技能遗传可能随雄性宠物。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const eggGroups = [
  { 
    name: '陆地', 
    icon: '☘️', 
    description: '绝大多数生活在陆地上的哺乳类宠物都属于这一组。它们通常拥有毛茸茸的外表，也是数量最庞大的一个组别。',
    members: ['喵喵', '火花', '板牙兔', '火绒兽', '霹雳石']
  },
  { 
    name: '天空', 
    icon: '☁️', 
    description: '生活在天空中的羽翼类宠物。它们擅长飞行，动作敏捷。',
    members: ['羽蝶', '闪电鸟', '风暴鹰', '飞天狗']
  },
  { 
    name: '水中', 
    icon: '🌊', 
    description: '生活在海洋或河流中的宠物。它们通常拥有极佳的游泳能力。',
    members: ['水蓝蓝', '果冻', '章鱼炮手', '潜水龟']
  },
  { 
    name: '不死', 
    icon: '👻', 
    description: '主要由幽灵系和恶魔系宠物组成。这些宠物充满了神秘感，繁育逻辑也较为特殊。',
    members: ['小幽灵', '恶魔叮', '骷髅兵', '梦游']
  },
  { 
    name: '守护', 
    icon: '🛡️', 
    description: '通常由岩石系、机械系或具有极强防御能力的宠物组成。它们体型厚重，是坚不可摧的盾牌。',
    members: ['阿布', '铁头头', '地壳兽', '齿轮猫']
  },
  { 
    name: '植物', 
    icon: '🎋', 
    description: '草系宠物的聚集地，由于具备光合作用等特性，它们被归为此类。',
    members: ['丢丢', '空灵兽', '仙人掌', '喇叭花']
  }
];

const activeGroup = ref(eggGroups[0]);
</script>
