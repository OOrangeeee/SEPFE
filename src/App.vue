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
  opacity: 0;
  transform: scale(0.95);
}
</style>
