<template>
  <div id="layout">
    <div id="nav">
      <header class="header flex items-center justify-center bg-black p-7">
        <div class="logo absolute justify-start left-4">
          <img
            alt="logo-kaleka"
            src="../assets/images/img-logo.png"
            class="h-[50px] w-[150px] cursor-pointer"
          />
        </div>
        <div class="menu flex space-x-10 text-white">
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
