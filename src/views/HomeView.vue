<template>
  <div class="home">
    <h1>THE EYE<br>FOR POLYP</h1>
    <h2>结 直 肠 息 肉 智 慧 诊 断 云 平 台</h2>
    <button @click="goToLogin">开 始 使 用</button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
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
  height: calc(100vh - 30px);
  margin-top: 30px;
  text-align: center;
}

h1 {
  font-size: 10.5vw;
  font-weight: lighter;
  margin: 0;
  padding: 0;
  color: black;
}

h2 {
  color: #003E27;
  font-weight: normal;
  font-size: 1vw;
  margin-top: 2.5vh;
}

button {
  font-size: 1.5vw;
  color: #E7EDEB;
  background-color: black;
  border: none;
  border-radius: 30px;
  padding: 1vh 2.5vw;
  margin-top: 2.5vh;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #333;
}
</style>
