<template>
  <div id="app">
    <NavBar/>
    <BackGroundContainer/>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" v-if="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import BackGroundContainer from "@/components/BackGroundContainer.vue";

export default {
  name: "App",
  components: {
    NavBar,
    BackGroundContainer
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
  transform-origin: center center;
}
.fade-enter, .fade-leave-to {
  opacity: 0; /* 开始时透明，逐渐变为不透明 */
  transform: scale(0.95); /* 开始时略微缩小，逐渐放大到正常大小 */
}
html, body {
  height: 100%;
  overflow: hidden; /* 隐藏滑动条 */
}


</style>
