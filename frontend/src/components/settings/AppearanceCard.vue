<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '../../stores/settings.store';
import { useI18n } from 'vue-i18n';
import Card from 'primevue/card';
import ToggleSwitch from 'primevue/toggleswitch';

const { t } = useI18n();
const settingsStore = useSettingsStore();

const compactMode = computed({
  get: () => settingsStore.compactMode,
  set: (val) => settingsStore.setCompactMode(val)
});

const motionEffects = computed({
  get: () => settingsStore.motionEffects,
  set: (val) => settingsStore.setMotionEffects(val)
});

const themeOptions = [
  { value: 'blue', bgClass: 'bg-blue-500' },
  { value: 'green', bgClass: 'bg-green-500' },
  { value: 'purple', bgClass: 'bg-purple-500' },
  { value: 'orange', bgClass: 'bg-orange-500' },
  { value: 'red', bgClass: 'bg-red-500' },
  { value: 'teal', bgClass: 'bg-teal-500' }
];

const handleThemeChange = (color: any) => {
  settingsStore.setThemeColor(color);
};

const handleAppearanceChange = (mode: 'light' | 'dark') => {
  settingsStore.setAppearance(mode);
};
</script>

<template>
  <Card class="border border-gray-150 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-200">
    <template #title>
      <div class="px-5 pt-4 flex flex-col space-y-1">
        <h4 class="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight select-none">
          {{ t('settings.appearance.title') }}
        </h4>
        <p class="text-[10px] text-gray-400 font-semibold leading-normal select-none">
          {{ t('settings.appearance.desc') }}
        </p>
      </div>
    </template>
    <template #content>
      <div class="space-y-6">
        
        <!-- Appearance Mode Section -->
        <div class="space-y-3.5">
          <div class="flex flex-col space-y-1">
            <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider select-none">
              {{ t('settings.appearance.colorMode') }}
            </span>
            <p class="text-[10px] text-gray-400 font-semibold select-none leading-none">
              {{ t('settings.appearance.colorModeDesc') }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Light Mode Button Card -->
            <button
              type="button"
              @click="handleAppearanceChange('light')"
              class="flex-1 flex flex-col items-center justify-center p-5 rounded-2xl border text-center cursor-pointer transition-all duration-200 font-bold relative bg-white dark:bg-gray-900"
              :class="[
                settingsStore.appearance === 'light'
                  ? 'border-primary-500 ring-1 ring-primary-500 shadow-sm shadow-primary-500/5'
                  : 'border-gray-150 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
              ]"
            >
              <!-- Check badge top-right -->
              <span class="absolute top-3.5 right-3.5 flex items-center justify-center select-none">
                <i v-if="settingsStore.appearance === 'light'" class="fa-solid fa-circle-check text-primary-500 text-base"></i>
                <span v-else class="w-3.5 h-3.5 rounded-full border border-gray-200 dark:border-gray-700 block"></span>
              </span>

              <!-- Centered Yellow Sun Icon with Radial Glow container -->
              <div class="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/20 flex items-center justify-center mb-3">
                <i class="fa-solid fa-sun text-amber-500 text-lg"></i>
              </div>

              <!-- Title & Desc -->
              <span class="text-xs font-black text-gray-850 dark:text-white leading-tight">
                {{ t('settings.appearance.lightModeLabel') }}
              </span>
              <span class="text-[9px] text-gray-400 font-semibold leading-normal mt-1 max-w-[80%] mx-auto">
                {{ t('settings.appearance.lightModeDesc') }}
              </span>
            </button>

            <!-- Dark Mode Button Card -->
            <button
              type="button"
              @click="handleAppearanceChange('dark')"
              class="flex-1 flex flex-col items-center justify-center p-5 rounded-2xl border text-center cursor-pointer transition-all duration-200 font-bold relative bg-white dark:bg-gray-900"
              :class="[
                settingsStore.appearance === 'dark'
                  ? 'border-primary-500 ring-1 ring-primary-500 shadow-sm shadow-primary-500/5'
                  : 'border-gray-150 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
              ]"
            >
              <!-- Check badge top-right -->
              <span class="absolute top-3.5 right-3.5 flex items-center justify-center select-none">
                <i v-if="settingsStore.appearance === 'dark'" class="fa-solid fa-circle-check text-primary-500 text-base"></i>
                <span v-else class="w-3.5 h-3.5 rounded-full border border-gray-200 dark:border-gray-700 block"></span>
              </span>

              <!-- Centered Primary Moon Icon with Radial Glow container -->
              <div class="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-950/20 flex items-center justify-center mb-3">
                <i class="fa-solid fa-moon text-primary-500 text-lg"></i>
              </div>

              <!-- Title & Desc -->
              <span class="text-xs font-black text-gray-850 dark:text-white leading-tight">
                {{ t('settings.appearance.darkModeLabel') }}
              </span>
              <span class="text-[9px] text-gray-400 font-semibold leading-normal mt-1 max-w-[80%] mx-auto">
                {{ t('settings.appearance.darkModeDesc') }}
              </span>
            </button>
          </div>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800"></div>

        <!-- Theme Accent Color Grid -->
        <div class="space-y-3.5">
          <div class="flex flex-col space-y-1">
            <span class="block text-[10px] font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider select-none">
              {{ t('settings.appearance.themeColor') }}
            </span>
            <p class="text-[10px] text-gray-400 font-semibold select-none leading-none">
              {{ t('settings.appearance.themeColorDesc') }}
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-6 gap-3">
            <button
              v-for="theme in themeOptions"
              :key="theme.value"
              type="button"
              @click="handleThemeChange(theme.value)"
              class="flex flex-col items-center justify-center p-3.5 rounded-xl border text-center cursor-pointer transition-all duration-200 font-bold relative bg-white dark:bg-gray-900"
              :class="[
                settingsStore.themeColor === theme.value
                  ? 'border-primary-500 ring-1 ring-primary-500 bg-primary-50/10 dark:bg-primary-950/10'
                  : 'border-gray-150 bg-white hover:bg-gray-50/50 hover:border-gray-300 text-gray-700 dark:bg-transparent dark:border-gray-800 dark:text-gray-450'
              ]"
            >
              <!-- Color dot with check badge inside -->
              <div class="relative flex items-center justify-center mb-1 select-none">
                <span :class="['w-4.5 h-4.5 rounded-full shadow-inner flex-shrink-0 flex items-center justify-center text-[10px] text-white', theme.bgClass]">
                  <i v-if="settingsStore.themeColor === theme.value" class="fa-solid fa-check text-[9px] font-black"></i>
                </span>
              </div>
              <span class="text-[10px] tracking-tight leading-none mt-1 select-none">{{ t('settings.themes.' + theme.value) }}</span>
            </button>
          </div>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800"></div>

        <!-- Layout Toggles Section -->
        <div class="space-y-3.5">
          <div class="flex flex-col space-y-1">
            <span class="block text-[10px] font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider select-none">
              {{ t('settings.appearance.displayOptions') }}
            </span>
            <p class="text-[10px] text-gray-400 font-semibold select-none leading-none">
              {{ t('settings.appearance.displayOptionsDesc') }}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Compact Layout Toggle -->
            <div class="flex items-center justify-between p-3.5 bg-gray-50/50 dark:bg-gray-800/40 rounded-xl border border-gray-150 dark:border-gray-800">
              <div class="flex flex-col space-y-0.5 max-w-[80%] select-none">
                <span class="text-xs font-bold text-gray-850 dark:text-gray-200">
                  {{ t('settings.appearance.compactMode') }}
                </span>
                <span class="text-[9px] text-gray-400 font-semibold leading-normal">
                  {{ t('settings.appearance.compactModeDesc') }}
                </span>
              </div>
              <ToggleSwitch v-model="compactMode" />
            </div>

            <!-- Motion transitions Toggle -->
            <div class="flex items-center justify-between p-3.5 bg-gray-50/50 dark:bg-gray-800/40 rounded-xl border border-gray-150 dark:border-gray-800">
              <div class="flex flex-col space-y-0.5 max-w-[80%] select-none">
                <span class="text-xs font-bold text-gray-850 dark:text-gray-200">
                  {{ t('settings.appearance.motion') }}
                </span>
                <span class="text-[9px] text-gray-400 font-semibold leading-normal">
                  {{ t('settings.appearance.motionDesc') }}
                </span>
              </div>
              <ToggleSwitch v-model="motionEffects" />
            </div>
          </div>
        </div>

      </div>
    </template>
  </Card>
</template>
