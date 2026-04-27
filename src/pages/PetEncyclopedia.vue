<template>
  <div class="min-h-screen flex flex-col items-center p-2 md:p-4">
    <div class="mb-6 w-full max-w-6xl flex justify-start">
      <router-link to="/" class="text-roke-gold hover:text-roke-magic transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        返回工具箱
      </router-link>
    </div>

    <div class="glass-panel w-full max-w-6xl p-5 md:p-10 shadow-2xl relative overflow-hidden">
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-roke-magic opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-roke-gold opacity-10 rounded-full blur-3xl"></div>

      <header class="text-center mb-10">
        <h1 class="text-3xl md:text-5xl font-bold text-roke-gold mb-4 tracking-wider">
          宠物图鉴
        </h1>
        <div class="max-w-2xl mx-auto relative">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索宠物名称、编号或属性..." 
            class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg text-white focus:outline-none focus:ring-2 focus:ring-roke-gold/50 transition-all pl-14"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-5 top-1/2 -translate-y-1/2 text-white/20"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
      </header>

      <!-- Filter Chips -->
      <div class="flex flex-wrap gap-2 mb-10 justify-center">
        <button 
          v-for="tag in filterTags" 
          :key="tag"
          @click="activeTag = tag"
          :class="[
            'px-4 py-1.5 rounded-full text-sm transition-all border',
            activeTag === tag ? 'bg-roke-gold text-roke-dark border-roke-gold font-bold' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'
          ]"
        >
          {{ tag }}
        </button>
      </div>

      <!-- Pet Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="pet in filteredPets" 
          :key="pet.id"
          class="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-roke-gold/30 transition-all hover:-translate-y-2 cursor-pointer relative overflow-hidden"
          @click="selectedPet = pet"
        >
          <div class="absolute top-4 right-4 text-white/5 font-black text-4xl italic group-hover:text-roke-gold/10 transition-colors">
            #{{ pet.id }}
          </div>
          
          <div class="relative z-10">
            <div class="w-full aspect-square bg-black/20 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
              <img :src="pet.image" :alt="pet.name" class="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-roke-gold transition-colors">{{ pet.name }}</h3>
            <div class="flex gap-2">
              <span 
                v-for="type in pet.types" 
                :key="type"
                :class="['px-2 py-0.5 rounded text-[10px] font-bold uppercase', getTypeColor(type)]"
              >
                {{ type }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPets.length === 0" class="text-center py-20 opacity-20">
        <p class="text-2xl">未发现该名称的宠物...</p>
      </div>
    </div>

    <!-- Pet Detail Modal (Placeholder for now) -->
    <Transition name="modal">
      <div v-if="selectedPet" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click.self="selectedPet = null">
        <div class="glass-panel w-full max-w-2xl p-8 relative animate-in zoom-in duration-300">
          <button @click="selectedPet = null" class="absolute top-6 right-6 text-white/40 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          
          <div class="flex flex-col md:flex-row gap-8">
            <div class="w-full md:w-1/2 aspect-square bg-white/5 rounded-3xl flex items-center justify-center">
              <img :src="selectedPet.image" :alt="selectedPet.name" class="w-4/5 h-4/5 object-contain" />
            </div>
            <div class="flex-1">
              <p class="text-roke-gold font-bold italic mb-1">NO.{{ selectedPet.id }}</p>
              <h2 class="text-4xl font-bold text-white mb-4">{{ selectedPet.name }}</h2>
              <div class="flex gap-2 mb-6">
                <span v-for="type in selectedPet.types" :key="type" :class="['px-3 py-1 rounded text-xs font-bold uppercase', getTypeColor(type)]">
                  {{ type }}
                </span>
              </div>
              
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p class="text-[10px] text-white/30 uppercase">身高</p>
                  <p class="text-lg font-bold text-white">{{ selectedPet.height }}</p>
                </div>
                <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p class="text-[10px] text-white/30 uppercase">体重</p>
                  <p class="text-lg font-bold text-white">{{ selectedPet.weight }}</p>
                </div>
              </div>
              
              <p class="text-white/60 text-sm leading-relaxed mb-6">
                {{ selectedPet.description }}
              </p>
              
              <button class="w-full bg-roke-gold text-roke-dark font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform">
                查看技能详情
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const searchQuery = ref('');
const activeTag = ref('全部');
const selectedPet = ref<any>(null);

const filterTags = ['全部', '主宠', '火系', '水系', '草系', '龙系', '神宠'];

const pets = [
  { id: '001', name: '喵喵', types: ['草'], height: '0.6m', weight: '12.4kg', description: '虽然有点害羞，但却很努力。喜欢在阳光充足的地方午睡。', image: 'https://pic.imgdb.cn/item/662cd7210ea9cb163f9a7442.png' },
  { id: '004', name: '火花', types: ['火'], height: '0.5m', weight: '9.8kg', description: '性格活泼，身体里蕴藏着巨大的热量。尾巴上的火焰代表着它的精神状态。', image: 'https://pic.imgdb.cn/item/662cd7210ea9cb163f9a7434.png' },
  { id: '007', name: '水蓝蓝', types: ['水'], height: '0.4m', weight: '8.2kg', description: '非常聪明，喜欢干净的水域。它吐出的泡泡具有神奇的治愈力。', image: 'https://pic.imgdb.cn/item/662cd7210ea9cb163f9a7452.png' },
  { id: '100', name: '迪莫', types: ['光'], height: '0.3m', weight: '3.5kg', description: '洛克王国的象征性宠物，象征着梦想与希望。它是每个洛克的忠实伙伴。', image: 'https://pic.imgdb.cn/item/662cd7210ea9cb163f9a7465.png' },
  { id: '150', name: '冰龙王', types: ['冰', '龙'], height: '2.5m', weight: '450kg', description: '沉睡在雪山之巅的传说宠物，拥有掌控寒冰的力量。', image: 'https://pic.imgdb.cn/item/662cd7210ea9cb163f9a747c.png' },
  { id: '200', name: '圣水守护', types: ['水', '神圣'], height: '1.8m', weight: '85kg', description: '海洋的守护者，能够净化一切邪恶的力量。', image: 'https://pic.imgdb.cn/item/662cd7210ea9cb163f9a748d.png' },
];

const getTypeColor = (type: string) => {
  const colors: any = {
    '草': 'bg-green-500/20 text-green-400 border border-green-500/30',
    '火': 'bg-red-500/20 text-red-400 border border-red-500/30',
    '水': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    '光': 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30',
    '冰': 'bg-cyan-300/20 text-cyan-200 border border-cyan-300/30',
    '龙': 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
    '神圣': 'bg-purple-400/20 text-purple-300 border border-purple-400/30',
  };
  return colors[type] || 'bg-white/5 text-white/40 border border-white/10';
};

const filteredPets = computed(() => {
  return pets.filter(pet => {
    const matchesSearch = pet.name.includes(searchQuery.value) || pet.id.includes(searchQuery.value);
    const matchesTag = activeTag.value === '全部' || pet.types.includes(activeTag.value.replace('系', '')) || (activeTag.value === '神宠' && pet.types.includes('神圣'));
    return matchesSearch && matchesTag;
  });
});
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
