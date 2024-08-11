<template>
  <div class="home">
    <h1>THE EYE<br>FOR POLYP</h1>
    <h2>结直肠息肉智慧诊断云平台</h2>
    <button @click="goToLogin">开始使用</button>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px); /* 减去导航栏的高度 */
  margin-top: 50px; /* 设置顶部边距等于导航栏高度 */
  text-align: center;
}

h1 {
  font-size: 150px; /* 大字体大小 */
  margin: 0;
  padding: 0;
  color: black;
}

h2 {
  color: #003E27; /* 字体颜色为深绿色 */
  font-size: 24px; /* 较小字体大小 */
  margin-top: 20px; /* 与标题之间的间距 */
}

button {
  font-size: 20px;
  color: #E7EDEB; /* 设置按钮字体颜色为浅灰绿色 */
  background-color: black;
  border: none;
  border-radius: 30px; /* 增加圆角矩形的圆度 */
  padding: 15px 40px; /* 增加内边距使按钮更长一些 */
  margin-top: 30px;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #333; /* 鼠标悬停时背景色变深 */
}
</style>
