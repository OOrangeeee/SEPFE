<template>
  <div class="background-container">
    <img src="https://upload.polypeye.cn/web/background_east_north.png" class="corner-image northeast"  alt="背景1"/>
    <img src="https://upload.polypeye.cn/web/background_west_north.png" class="corner-image northwest"  alt="背景2"/>
    <img src="https://upload.polypeye.cn/web/background_east_sorth.png" class="corner-image southeast"  alt="背景3"/>
    <img src="https://upload.polypeye.cn/web/background_west_sorth.png" class="corner-image southwest"  alt="背景4"/>
  </div>
</template>

<script>
export default {
  name: 'BackgroundCorners',
}
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-color: #E7EDEB;
  z-index: -1;
}
.corner-image {
  position: absolute;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.northeast {
  right: 17.3%;
  top: 7%;
  width: 15vw;
  height: 15vw;
  animation-name: fade1;
  animation-duration: 5s;
}
.northwest {
  left: 16.2%;
  top: 15.4%;
  width: 32vw;
  height: 32vw;
  animation-name: fade2;
  animation-duration: 4s;
}
.southeast {
  right: 14.2%;
  bottom: 9.5%;
  width: 28vw;
  height: 28vw;
  animation-name: fade3;
  animation-duration: 6s;
}
.southwest {
  left: 10%;
  bottom: 10.5%;
  width: 12vw;
  height: 12vw;
  animation-name: fade4;
  animation-duration: 8s;
}
@keyframes fade1 { from { opacity: 0; } to { opacity: 1; } }
@keyframes fade2 { from { opacity: 0; } to { opacity: 1; } }
@keyframes fade3 { from { opacity: 0; } to { opacity: 1; } }
@keyframes fade4 { from { opacity: 0; } to { opacity: 1; } }
</style>

