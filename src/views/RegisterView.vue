<template>
  <div class="container">
    <MessageBox :show="showMessage" :message="messageText" :type="messageType" />
    <div class="left-panel">
      <div class="home">
        <h1>THE EYE<br>FOR POLYP</h1>
        <h2>结 直 肠 息 肉 智 慧 诊 断 云 平 台</h2>
      </div>
    </div>
    <div class="right-panel">
      <div class="login-background">
        <div class="login-box">
          <h3>注册</h3>
          <input type="text" placeholder="用户名" v-model="user.username">
          <span v-if="errors.username">{{ errors.username }}</span>
          <input type="text" placeholder="昵称" v-model="user.nickname">
          <span v-if="errors.nickname">{{ errors.nickname }}</span>
          <input type="password" placeholder="密码" v-model="user.password">
          <span v-if="errors.password">{{ errors.password }}</span>
          <input type="password" placeholder="确认密码" v-model="user.confirmPassword">
          <span v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
          <input type="email" placeholder="用户邮箱" v-model="user.email">
          <span v-if="errors.email">{{ errors.email }}</span>
          <button @click="register">注册</button>
          <p>已有账号？<a @click="goToLogin">立即登录</a></p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import sendRequest from '@/utils/http';
import MessageBox from '@/components/MessageBox.vue';

export default {
  name: "RegisterPage",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MessageBox
  },
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        email: ''
      },
      errors: {
        username: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        email: ''
      },
      showMessage: false,
      messageText: '',
      messageType: 'info'
    };
  },
  methods: {
    validateInput() {
      let isValid = true;
      // 验证用户名：大小写英文字母和数字，长度6-20
      if (!/^[a-zA-Z0-9]{6,20}$/.test(this.user.username)) {
        this.errors.username = '用户名必须为6-20位字母或数字';
        isValid = false;
      } else {
        this.errors.username = '';
      }
      // 验证昵称长度1-20
      if (!/^.{1,20}$/.test(this.user.nickname)) {
        this.errors.nickname = '昵称长度必须在1-20字符之间';
        isValid = false;
      } else {
        this.errors.nickname = '';
      }
      // 验证密码长度6-20
      if (!/^.{6,20}$/.test(this.user.password)) {
        this.errors.password = '密码长度必须为6-20字符';
        isValid = false;
      } else {
        this.errors.password = '';
      }
      // 确认密码匹配
      if (this.user.confirmPassword !== this.user.password) {
        this.errors.confirmPassword = '确认密码不匹配';
        isValid = false;
      } else {
        this.errors.confirmPassword = '';
      }
      // 验证邮箱格式
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.user.email)) {
        this.errors.email = '邮箱格式不正确';
        isValid = false;
      } else {
        this.errors.email = '';
      }
      return isValid;
    },
    clearInputs() {
      this.user = {
        username: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        email: ''
      };
      this.errors = {
        username: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        email: ''
      };
    },
    async register() {
      if (this.validateInput()) {
        try {
          const response = await sendRequest('/users/account', 'POST', [], {
            'user-name': this.user.username,
            'user-password': this.user.password,
            'user-email': this.user.email,
            'user-nickname': this.user.nickname
          });

          if (response.status === 201) {
            // 注册成功
            this.showMessage = true;
            this.messageText = '注册成功！';
            this.messageType = 'success';

            // 清空输入框
            this.clearInputs();

            // 延迟跳转，给用户一些时间看到成功消息
            setTimeout(() => {
              this.$router.push('/register/ok');
            }, 2000);
          } else {
            // 注册失败
            const errorData = response.data;
            this.showMessage = true;
            this.messageText = errorData.error_message || '注册失败，请稍后重试';
            this.messageType = 'error';
          }
        } catch (error) {
          console.error('Registration error:', error);
          this.showMessage = true;
          this.messageText = '注册过程中发生错误，请稍后重试';
          this.messageType = 'error';
        }

        // 设置消息显示时间
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }
    },
    goToLogin() {
      this.$router.push('/login');
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
