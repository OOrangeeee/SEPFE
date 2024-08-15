<template>
  <div class="container">
    <div class="left-panel">
      <div class="home">
        <h1>THE EYE<br>FOR POLYP</h1>
        <h2>结 直 肠 息 肉 智 慧 诊 断 云 平 台</h2>
      </div>
    </div>
    <div class="right-panel">
      <div class="login-background">
        <div class="login-box">
          <h3>登录</h3>
          <input type="text" placeholder="用户名" />
          <input type="password" placeholder="密码" />
          <button @click="login">登录</button>
          <p>没有账号？<a @click="goToRegister">立即注册</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  methods: {
    login() {
      // 登录逻辑
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  margin-top: 0;
}
.left-panel{
  width: 38%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100vh;
}
.right-panel {
  width: 62%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://upload.polypeye.cn/web/loginBackGround.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
h1 {
  font-size: 6vw;
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
h3 {
  font-size: 2vw;
  color: white;
  padding: 0;
  margin: 0 0 2vh;
}
.login-box {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 3vw;
  border-radius: 30px;
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  width: 80%;
  padding: 1vw;
  margin-top: 1vh;
  border-radius: 30px;
  border: 1px solid #ccc;
}
button {
  width: 88%;
  padding: 1vw;
  margin-top: 2vh;
  background-color: black;
  color: white;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 1vw;
}
button:hover {
  background-color: #333;
}
p {
  font-size: 1vw;
}
a {
  color: blue;
  cursor: pointer;
  font-size: 1vw;
}
</style>
