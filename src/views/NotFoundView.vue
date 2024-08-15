<template>
  <div class="not-found-container">
    <h1>404</h1>
    <p>Oops! The page you are looking for has disappeared.</p>
    <div class="orange-icon">
      <img src="https://upload.polypeye.cn/web/orange_icon.png" alt="Orange Icon">
      <span>OOrangeeee<br>Jin0714@outlook.com<br>https://github.com/OOrangeeee</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h1 {
  font-size: 10vw;
  color: #d35400;
}

p {
  font-size: 2vw;
}

.orange-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
}

.orange-icon img {
  width: 5vw;
}

.orange-icon span {
  font-size: 1vw;
  margin-left: 5px;
}
</style>
