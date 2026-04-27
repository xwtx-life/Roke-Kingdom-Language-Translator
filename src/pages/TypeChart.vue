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

      <header class="text-center mb-10">
        <h1 class="text-3xl md:text-5xl font-bold text-roke-gold mb-4 tracking-wider">
          属性克制查询
        </h1>
        <p class="text-white/40 text-sm md:text-base">
          点击属性查看其对应的克制与被克制关系
        </p>
      </header>

      <!-- Search & Filter -->
      <div class="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
        <div class="relative w-full max-w-md">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索属性名称..." 
            class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-roke-gold/50 transition-all"
          />
        </div>
      </div>

      <!-- Type Grid -->
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 mb-10">
        <button 
          v-for="type in filteredTypes" 
          :key="type.name"
          @click="selectedType = type"
          :class="[
            'p-3 rounded-xl border transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-2',
            selectedType?.name === type.name ? 'bg-white/15 border-roke-gold shadow-[0_0_15px_rgba(255,215,0,0.2)]' : 'bg-white/5 border-white/5 hover:border-white/20'
          ]"
        >
          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold', type.colorClass]">
            {{ type.name[0] }}
          </div>
          <span class="text-xs md:text-sm font-medium">{{ type.name }}</span>
        </button>
      </div>

      <!-- Detail View -->
      <div v-if="selectedType" class="bg-black/40 rounded-3xl p-6 md:p-10 border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="flex items-center gap-4 mb-8">
          <div :class="['w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold', selectedType.colorClass]">
            {{ selectedType.name[0] }}
          </div>
          <div>
            <h2 class="text-2xl md:text-4xl font-bold text-white">{{ selectedType.name }}系</h2>
            <p class="text-white/40 text-sm">属性关系详表</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Offensive -->
          <div class="space-y-6">
            <h3 class="text-roke-gold font-bold flex items-center gap-2 text-lg uppercase tracking-widest">
              <span class="w-1 h-6 bg-roke-gold rounded-full"></span>
              攻击表现 (Offense)
            </h3>
            
            <div class="space-y-4">
              <div>
                <p class="text-xs text-white/30 mb-2 uppercase font-bold tracking-tighter">克制 (伤害 x2.0)</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="t in selectedType.strongAgainst" :key="t" class="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm">
                    {{ t }}
                  </span>
                  <span v-if="selectedType.strongAgainst.length === 0" class="text-white/20 text-sm italic">无显著克制</span>
                </div>
              </div>
              
              <div>
                <p class="text-xs text-white/30 mb-2 uppercase font-bold tracking-tighter">被抵抗 (伤害 x0.5)</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="t in selectedType.weakTo" :key="t" class="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm">
                    {{ t }}
                  </span>
                  <span v-if="selectedType.weakTo.length === 0" class="text-white/20 text-sm italic">全额伤害</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Defensive -->
          <div class="space-y-6">
            <h3 class="text-roke-magic font-bold flex items-center gap-2 text-lg uppercase tracking-widest">
              <span class="w-1 h-6 bg-roke-magic rounded-full"></span>
              防御表现 (Defense)
            </h3>
            
            <div class="space-y-4">
              <div>
                <p class="text-xs text-white/30 mb-2 uppercase font-bold tracking-tighter">抵抗 (受伤害 x0.5)</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="t in selectedType.resists" :key="t" class="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-sm">
                    {{ t }}
                  </span>
                  <span v-if="selectedType.resists.length === 0" class="text-white/20 text-sm italic">常规防御</span>
                </div>
              </div>
              
              <div>
                <p class="text-xs text-white/30 mb-2 uppercase font-bold tracking-tighter">弱点 (受伤害 x2.0)</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="t in selectedType.weakAgainst" :key="t" class="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg text-sm">
                    {{ t }}
                  </span>
                  <span v-if="selectedType.weakAgainst.length === 0" class="text-white/20 text-sm italic">无明显弱点</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
        <p class="text-white/20">请在上方选择一个属性以查看详情</p>
      </div>

      <footer class="mt-16 text-center text-white/20 text-xs border-t border-white/5 pt-8">
        <p>数据仅供参考，具体以游戏内实际战斗效果为准。</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface TypeData {
  name: string;
  colorClass: string;
  strongAgainst: string[];
  weakTo: string[];
  resists: string[];
  weakAgainst: string[];
}

const searchQuery = ref('');
const selectedType = ref<TypeData | null>(null);

const types: TypeData[] = [
  { name: '火', colorClass: 'bg-red-500 text-white', strongAgainst: ['草', '冰', '虫', '机械'], weakTo: ['水', '火', '龙', '石'], resists: ['火', '草', '冰', '虫', '机械'], weakAgainst: ['水', '地', '石'] },
  { name: '水', colorClass: 'bg-blue-500 text-white', strongAgainst: ['火', '土', '石'], weakTo: ['水', '草', '龙'], resists: ['水', '火', '冰', '机械'], weakAgainst: ['草', '电'] },
  { name: '草', colorClass: 'bg-green-500 text-white', strongAgainst: ['水', '土', '石'], weakTo: ['火', '草', '毒', '翼', '虫', '龙', '机械'], resists: ['水', '电', '草', '土'], weakAgainst: ['火', '冰', '毒', '翼', '虫'] },
  { name: '电', colorClass: 'bg-yellow-400 text-black', strongAgainst: ['水', '翼'], weakTo: ['草', '电', '龙'], resists: ['电', '翼', '机械'], weakAgainst: ['土'] },
  { name: '土', colorClass: 'bg-yellow-800 text-white', strongAgainst: ['火', '电', '毒', '石', '机械'], weakTo: ['草', '虫'], resists: ['毒', '石'], weakAgainst: ['水', '草', '冰'] },
  { name: '冰', colorClass: 'bg-cyan-300 text-black', strongAgainst: ['草', '土', '翼', '龙'], weakTo: ['火', '水', '冰', '机械'], resists: ['冰'], weakAgainst: ['火', '武', '石', '机械'] },
  { name: '武', colorClass: 'bg-orange-700 text-white', strongAgainst: ['普通', '冰', '石', '恶魔', '机械'], weakTo: ['毒', '翼', '萌', '虫', '幽灵'], resists: ['虫', '石', '恶魔'], weakAgainst: ['翼', '萌', '幽灵'] },
  { name: '毒', colorClass: 'bg-purple-600 text-white', strongAgainst: ['草', '萌'], weakTo: ['毒', '土', '石', '幽灵', '机械'], resists: ['草', '武', '毒', '虫'], weakAgainst: ['土', '萌'] },
  { name: '翼', colorClass: 'bg-indigo-400 text-white', strongAgainst: ['草', '武', '虫'], weakTo: ['电', '石', '机械'], resists: ['草', '武', '虫'], weakAgainst: ['电', '冰', '石'] },
  { name: '萌', colorClass: 'bg-pink-400 text-white', strongAgainst: ['武', '毒'], weakTo: ['萌', '机械'], resists: ['武', '萌'], weakAgainst: ['虫', '幽灵', '恶魔'] },
  { name: '虫', colorClass: 'bg-lime-500 text-black', strongAgainst: ['草', '萌', '恶魔'], weakTo: ['火', '武', '毒', '翼', '幽灵', '机械'], resists: ['草', '武', '土'], weakAgainst: ['火', '翼', '石'] },
  { name: '石', colorClass: 'bg-gray-500 text-white', strongAgainst: ['火', '冰', '翼', '虫'], weakTo: ['武', '土', '机械'], resists: ['普通', '火', '毒', '翼'], weakAgainst: ['水', '草', '武', '土', '机械'] },
  { name: '幽灵', colorClass: 'bg-purple-900 text-white', strongAgainst: ['萌', '幽灵'], weakTo: ['恶魔'], resists: ['毒', '虫'], weakAgainst: ['幽灵', '恶魔'] },
  { name: '龙', colorClass: 'bg-blue-900 text-white', strongAgainst: ['龙'], weakTo: ['机械'], resists: ['火', '水', '草', '电'], weakAgainst: ['冰', '龙'] },
  { name: '恶魔', colorClass: 'bg-red-900 text-white', strongAgainst: ['萌', '幽灵'], weakTo: ['武', '恶魔'], resists: ['幽灵', '恶魔'], weakAgainst: ['武', '虫', '萌'] },
  { name: '机械', colorClass: 'bg-slate-400 text-black', strongAgainst: ['冰', '石'], weakTo: ['火', '水', '电', '机械'], resists: ['普通', '草', '冰', '翼', '萌', '石', '虫', '龙'], weakAgainst: ['火', '武', '土'] },
  { name: '普通', colorClass: 'bg-gray-300 text-black', strongAgainst: [], weakTo: ['石', '幽灵', '机械'], resists: [], weakAgainst: ['武'] },
];

const filteredTypes = computed(() => {
  return types.filter(t => t.name.includes(searchQuery.value));
});

// Auto-select first type on mount for preview
onMounted(() => {
  selectedType.value = types[0];
});
</script>

<style scoped>
.animate-in {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
</style>
