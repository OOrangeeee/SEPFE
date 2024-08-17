<template>
  <div class="user-center">
    <div class="navbar-placeholder"></div>
    <div class="user-info">
      <h2 v-if="userInfo" class="user-nickname">{{ userInfo.userNickName }}医生</h2>
      <p v-if="userInfo" class="user-details">用户名: {{ userInfo.userName }}</p>
      <p v-if="userInfo" class="user-details">邮箱: {{ userInfo.userEmail }}</p>
      <h2 v-else class="user-nickname">加载中...</h2>
    </div>
    <div class="content-container">
      <div class="user-actions">
        <button class="action-button" @click="showPasswordModal = true">修改密码</button>
        <button class="action-button" @click="showNicknameModal = true">修改昵称</button>
        <button class="action-button logout" @click="showLogoutModal = true">退出登录</button>
      </div>
      <div class="main-content-wrapper">
        <div class="main-content">
          <h3 class="content-title">诊断记录</h3>
          <div class="diagnosis-records">
            <DiagnosisRecord
                v-for="record in records"
                :key="record.id"
                :record="record"
                @record-clicked="handleRecordClick"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPasswordModal" class="modal">
      <div class="modal-content">
        <h3>修改密码</h3>
        <input v-model="newPassword" type="password" placeholder="新密码">
        <input v-model="confirmPassword" type="password" placeholder="确认密码">
        <div class="button-group">
          <button @click="changePassword">确认</button>
          <button @click="showPasswordModal = false">取消</button>
        </div>
      </div>
    </div>
    <div v-if="showNicknameModal" class="modal">
      <div class="modal-content">
        <h3>修改昵称</h3>
        <input v-model="newNickname" type="text" placeholder="新昵称">
        <div class="button-group">
          <button @click="changeNickname">确认</button>
          <button @click="showNicknameModal = false">取消</button>
        </div>
      </div>
    </div>
    <div v-if="showLogoutModal" class="modal">
      <div class="modal-content">
        <h3>确认退出？</h3>
        <div class="button-group">
          <button @click="logout">确认</button>
          <button @click="showLogoutModal = false">取消</button>
        </div>
      </div>
    </div>
    <MessageBox :show="messageBoxShow" :message="messageBoxMessage" :type="messageBoxType" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import sendRequest from '@/utils/http';
import { useRouter } from 'vue-router';
import MessageBox from '@/components/MessageBox.vue';
import DiagnosisRecord from '@/components/DiagnosisRecord.vue';

export default {
  name: 'UserCenter',
  components: {
    MessageBox,
    DiagnosisRecord
  },
  setup() {
    const router = useRouter();
    const userInfo = ref(null);
    const showPasswordModal = ref(false);
    const showNicknameModal = ref(false);
    const showLogoutModal = ref(false);
    const newPassword = ref('');
    const confirmPassword = ref('');
    const newNickname = ref('');

    // 新增的 MessageBox 相关状态
    const messageBoxShow = ref(false);
    const messageBoxMessage = ref('');
    const messageBoxType = ref('info');
    const records = ref([]);

    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await sendRequest('/users/records-all', 'GET', [], null, {
          Authorization: token
        });
        if (response.status === 200) {
          records.value = response.data.records;
        } else {
          showMessage('服务器出错啦，请稍后再试', 'error');
        }
      } catch (error) {
        showMessage('服务器出错啦，请稍后再试', 'error');
      }
    };
    const handleRecordClick = (recordId) => {
      // 处理记录点击的逻辑
      console.log('Clicked record ID:', recordId);
    };

    // 显示消息的函数
    const showMessage = (message, type = 'info') => {
      messageBoxMessage.value = message;
      messageBoxType.value = type;
      messageBoxShow.value = true;
      setTimeout(() => {
        messageBoxShow.value = false;
      }, 3000);
    };

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await sendRequest('/users/account', 'GET', [], null, {
          Authorization: token
        });
        if (response && response.data && response.data.userInfo) {
          userInfo.value = response.data.userInfo;
        } else {
          showMessage('获取用户信息失败: 响应格式不正确', 'error');
        }
      } catch (error) {
        showMessage('获取用户信息失败', 'error');
      }
    };

    const changePassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        showMessage('两次输入的密码不一致', 'error');
        return;
      }
      if (!/^[\x20-\x7E]{6,20}$/.test(newPassword.value)) {
        showMessage('密码必须是6-20位的ASCII可打印字符', 'error');
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('user-password', newPassword.value);
        const response = await sendRequest('/users/account/password', 'PUT', [], formData, {
          Authorization: token
        });
        if (response.status === 201) {
          showMessage('修改密码成功', 'success');
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          await router.push('/login');
        } else {
          showMessage(response.data.error_message || '修改密码失败', 'error');
        }
      } catch (error) {
        showMessage('修改密码失败', 'error');
      }
      showPasswordModal.value = false;
    };

    const changeNickname = async () => {
      if (newNickname.value.length < 1 || newNickname.value.length > 20) {
        showMessage('昵称长度必须在1-20之间', 'error');
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('user-nickname', newNickname.value);
        const response = await sendRequest('/users/account/nickname', 'PUT', [], formData, {
          Authorization: token
        });
        if (response.status === 201) {
          showMessage('修改昵称成功', 'success');
          await fetchUserInfo();
        } else {
          showMessage(response.data.error_message || '修改昵称失败', 'error');
        }
      } catch (error) {
        showMessage('修改昵称失败', 'error');
      }
      showNicknameModal.value = false;
    };

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      router.push('/login');
      showMessage('已成功退出登录', 'success');
    };

    onMounted(() => {
      fetchUserInfo();
      fetchRecords();
    });

    return {
      userInfo,
      showPasswordModal,
      showNicknameModal,
      showLogoutModal,
      newPassword,
      confirmPassword,
      newNickname,
      changePassword,
      changeNickname,
      logout,
      messageBoxShow,
      messageBoxMessage,
      messageBoxType,
      records,
      handleRecordClick
    };
  }
};
</script>

<style scoped>
.user-center {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 60px;
  box-sizing: border-box;
}
.user-info {
  text-align: center;
  margin-top: 2vh;
  margin-bottom: 2vh;
  width: 100%;
}
.user-nickname {
  font-size: 2.5vw;
  margin-bottom: 1vh;
}
.user-details {
  font-size: 1.2vw;
  margin: 0.5vh 0;
}
.content-container {
  display: flex;
  justify-content: space-between;
  width: 94vw;
  margin: 2vh auto 0;
  height: calc(100vh - 220px);
  max-height: 580px;
}
.user-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 26vw;
  height: 100%;
  padding: 2vh 0;
}
.action-button {
  width: 100%;
  padding: 1.5vh 0;
  font-size: 1.5vw;
  cursor: pointer;
  background-color: #5BA98D;
  color: white;
  border: none;
  border-radius: 10px;
  transition: all 0.3s ease;
}
.action-button.logout {
  background-color: #d9534f;
}
.action-button:hover {
  opacity: 0.8;
}
.main-content-wrapper {
  width: 66vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-content {
  width: 98%;
  height: 98%;
  background-color: rgba(24, 183, 144, 0.1);
  border-radius: 20px;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.content-title {
  text-align: center;
  font-size: 1.8vw;
  margin-top: 0;
  margin-bottom: 2vh;
}
.diagnosis-records {
  flex-grow: 1;
  overflow-y: auto;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}
.modal-content h3 {
  margin-bottom: 20px;
  font-size: 1.5rem;
}
.modal-content input {
  margin: 10px 0;
  padding: 10px;
  width: calc(100% - 20px);
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}
.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}
.modal-content button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #5BA98D;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}
.modal-content button:hover {
  background-color: #4a8c75;
}
.diagnosis-records {
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
}
</style>
