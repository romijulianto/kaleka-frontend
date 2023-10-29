<script setup lang="ts">
import { ref, computed } from "vue";

const isMenuOpen = ref<boolean>(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const menuClasses = computed(() => ({
  hidden: !isMenuOpen.value,
  "md:flex": true,
  "space-x-10": true,
  "text-white": true,
}));

const activityImageClasses = computed(() => ({
  "w-full": true,
  "h-52 md:h-96": true,
  "object-cover": true,
}));
</script>

<template>
  <div id="layout">
    <div id="nav">
      <header class="flex items-center justify-center p-4 bg-black md:p-7">
        <div
          class="justify-center md:absolute md:justify-start md:logo md:left-4 md:flex"
        >
          <img
            alt="logo-kaleka"
            src="../assets/images/img-logo.png"
            href="#"
            class="w-auto h-12 cursor-pointer md:h-16"
          />
        </div>
        <div class="absolute justify-end cursor-pointer md:hidden right-4">
          <button @click="toggleMenu" class="text-white">☰</button>
        </div>
        <div :class="menuClasses">
          <div class="cursor-pointer font-bold text-[#F8BE1A]">BERANDA</div>
          <div class="cursor-pointer font-bold text-[#F8BE1A]">
            TENTANG KAMI
          </div>
        </div>
      </header>

      <div id="activities">
        <img
          alt="kaleka-activities"
          style="width: 100%; height: 200px"
          src="../assets/images/img-activities.png"
        />
      </div>
    </div>

    <slot />
  </div>
</template>

<style scoped>
#nav {
  height: 35vh !important;
}
</style>
