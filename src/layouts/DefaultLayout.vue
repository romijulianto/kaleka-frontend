<script setup lang="ts">
import { ref, computed } from "vue";

const isMenuOpen = ref<boolean>(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const activityImageClasses = computed(() => ({
  "w-full": true,
  "h-52 md:h-96": true,
  "object-cover": true,
}));
</script>

<template>
  <div id="layout">
    <div id="nav overflow-x: hidden overflow-y: hidden">
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
        <div
          class="hidden space-x-10 text-white sm:hidden md:flex"
          v-if="isMenuOpen === false"
        >
          <div class="cursor-pointer font-bold text-[#F8BE1A]">BERANDA</div>
          <div class="cursor-pointer font-bold text-[#F8BE1A]">
            TENTANG KAMI
          </div>
        </div>
        <div class="relative z-50 navbar-menu" v-else-if="isMenuOpen === true">
          <div
            class="fixed inset-0 bg-gray-800 opacity-25 navbar-backdrop"
          ></div>
          <nav
            class="fixed top-0 bottom-0 left-0 flex flex-col w-5/6 max-w-sm px-6 py-6 overflow-y-auto bg-black border-r"
          >
            <div class="flex items-center mb-8">
              <a class="mr-auto text-3xl font-bold leading-none" href="#">
                <img
                  alt="logo-kaleka"
                  src="../assets/images/img-logo.png"
                  href="#"
                  class="w-auto h-12 cursor-pointer md:h-16"
                />
              </a>
              <button class="navbar-close" @click="isMenuOpen = false">
                <svg
                  class="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <li class="mb-1">
                  <a
                    class="block p-4 text-sm font-semibold text-[#F8BE1A] rounded hover:bg-blue-50 hover:text-blue-600"
                    href="#"
                    >BERANDA</a
                  >
                </li>
                <li class="mb-1">
                  <a
                    class="block p-4 text-sm font-semibold text-[#F8BE1A] rounded hover:bg-blue-50 hover:text-blue-600"
                    href="#"
                    >TENTANG KAMI</a
                  >
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div id="activities">
        <img
          alt="kaleka-activities"
          style="width: 100%; height: 200px"
          :class="activityImageClasses"
          src="../assets/images/img-activities.png"
        />
      </div>
    </div>

    <slot class="mt-[35vh]" />
  </div>
</template>

<style scoped>
#nav {
  height: 35vh !important;
}
</style>
