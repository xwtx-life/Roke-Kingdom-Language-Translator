<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="glass-panel w-full max-w-5xl p-8 md:p-16 text-center relative overflow-hidden">
      <div class="absolute -top-24 -left-24 w-64 h-64 bg-roke-magic opacity-20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-roke-gold opacity-10 rounded-full blur-3xl"></div>

      <header class="mb-12 relative z-10">
        <h1 class="text-4xl md:text-6xl font-bold text-roke-gold mb-6 tracking-tighter">
          洛克王国工具箱
        </h1>
        <p class="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
          为您的小洛克旅程提供强力魔法辅助。目前已集成洛克语翻译、属性克制等功能，更多魔法道具持续更新中...
        </p>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <!-- Translator Tool -->
        <router-link to="/translator" class="tool-card group">
          <div class="icon-box bg-roke-magic/20 text-roke-magic group-hover:bg-roke-magic group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
          </div>
          <div class="text-left">
            <h2 class="text-xl font-bold text-roke-gold mb-1">洛克语翻译</h2>
            <p class="text-white/40 text-xs line-clamp-2">支持中英互转及洛克王国古老符文转换。</p>
          </div>
        </router-link>

        <!-- Type Chart Tool -->
        <router-link to="/type-chart" class="tool-card group">
          <div class="icon-box bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m17 7-5-5-5 5"/><path d="m17 17-5 5-5-5"/></svg>
          </div>
          <div class="text-left">
            <h2 class="text-xl font-bold text-roke-gold mb-1">属性克制</h2>
            <p class="text-white/40 text-xs line-clamp-2">精准查询属性间的克制与抵抗关系。</p>
          </div>
        </router-link>

        <!-- Pet Encyclopedia Tool -->
        <router-link to="/pet-encyclopedia" class="tool-card group">
          <div class="icon-box bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 7h6"/></svg>
          </div>
          <div class="text-left">
            <h2 class="text-xl font-bold text-roke-gold mb-1">宠物图鉴</h2>
            <p class="text-white/40 text-xs line-clamp-2">全宠物属性、技能及获取方式查询。</p>
          </div>
        </router-link>

        <!-- Egg Hatching Tool -->
        <router-link to="/egg-hatching" class="tool-card group">
          <div class="icon-box bg-pink-500/20 text-pink-400 group-hover:bg-pink-500 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a8 8 0 0 0 8-8c0-4.42-3.58-12-8-12s-8 7.58-8 12a8 8 0 0 0 8 8Z"/></svg>
          </div>
          <div class="text-left">
            <h2 class="text-xl font-bold text-roke-gold mb-1">孵蛋查询</h2>
            <p class="text-white/40 text-xs line-clamp-2">宠物蛋孵化组别及稀有宠物遗传逻辑。</p>
          </div>
        </router-link>
      </div>

      <footer class="mt-20 text-white/20 text-xs">
        <p>© 2024 洛克王国工具箱 · 魔法学院荣誉出品</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@reference "../style.css";

.tool-card {
  @apply bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-roke-magic/50 transition-all hover:scale-[1.05] flex flex-col gap-4;
}
.icon-box {
  @apply w-12 h-12 rounded-2xl flex items-center justify-center transition-colors;
}
</style>
