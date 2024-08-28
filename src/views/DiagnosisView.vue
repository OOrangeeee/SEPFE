<template>
  <div class="diagnosis-page">
    <div class="navbar-placeholder"></div>
    <h2 v-if="userNickname" class="user-nickname">{{ userNickname }}医生</h2>
    <h2 v-else class="user-nickname">加载中...</h2>
    <div class="main-content-wrapper">
      <div class="main-content">
        <button v-if="selectedOption" @click="resetSelection" class="back-button">
          &lt; 返回
        </button>
        <div class="content-layout" :class="{ 'selected': selectedOption }">
          <div class="diagnosis-options" :class="{ 'column-layout': selectedOption }">
            <button
                v-for="option in options"
                :key="option.id"
                @click="selectOption(option.id)"
                :class="{ 'active': selectedOption === option.id }"
            >
              {{ option.name }}
            </button>
          </div>
          <div v-if="selectedOption" class="right-content">
            <div v-if="selectedOption !== 'video'" class="image-upload">
              <label for="file-upload" class="custom-file-upload">
                <input id="file-upload" type="file" @change="handleFileUpload" accept=".png" />
                上传PNG图片
              </label>
              <span v-if="fileUploaded" class="upload-success">✓</span>
            </div>
            <div v-else class="video-upload">
              <label for="video-upload" class="custom-file-upload">
                <input id="video-upload" type="file" @change="handleVideoUpload" accept=".mp4" />
                上传MP4视频 (最大200MB)
              </label>
              <span v-if="fileUploaded" class="upload-success">✓</span>
            </div>
            <button @click="startAnalysis" class="start-analysis">开始分析</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 分析模态窗口 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div v-if="modalState === 'input'">
          <h3>请输入患者姓名</h3>
          <input v-model="patientName" type="text" placeholder="患者姓名">
          <button @click="confirmAnalysis">确认</button>
        </div>
        <div v-else-if="modalState === 'analyzing'">
          <h3>正在分析中请等待</h3>
        </div>
        <div v-else-if="modalState === 'complete'">
          <h3>分析完毕，请前往用户中心查看</h3>
          <button @click="closeModal">关闭</button>
        </div>
        <div v-else-if="modalState === 'error'">
          <h3>分析出错请稍后再试</h3>
          <button @click="closeModal">关闭</button>
        </div>
      </div>
    </div>
    <!-- 视频压缩模态窗口 -->
    <div v-if="showCompressionModal" class="modal-overlay">
      <div class="modal-content">
        <h3>正在进行视频压缩，请稍后...</h3>
        <div class="progress-bar">
          <div class="progress" :style="{ width: compressionProgress + '%' }"></div>
        </div>
        <p>{{ compressionProgress }}%</p>
      </div>
    </div>
    <MessageBox :show="messageBoxShow" :message="messageBoxMessage" :type="messageBoxType" />
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import sendRequest from '@/utils/http';
import {FFmpeg} from '@ffmpeg/ffmpeg';
import {fetchFile} from '@ffmpeg/util';
import MessageBox from '@/components/MessageBox.vue'; // 导入 MessageBox 组件

export default {
  name: 'DiagnosisPage',
  components: {
    MessageBox // 注册 MessageBox 组件
  },
  setup() {
    const userNickname = ref('');
    const selectedOption = ref(null);
    const fileUploaded = ref(false);
    const uploadedFile = ref(null);
    const showModal = ref(false);
    const modalState = ref('input');
    const patientName = ref('');
    const showCompressionModal = ref(false);
    const compressionProgress = ref(0);
    const messageBoxShow = ref(false);
    const messageBoxMessage = ref('');
    const messageBoxType = ref('info');

    const options = [
      {id: 'detect', name: '肠镜图片检测'},
      {id: 'segment', name: '肠镜图片分割'},
      {id: 'video', name: '肠镜视频追踪'}
    ];

    const showMessage = (message, type = 'info') => {
      messageBoxMessage.value = message;
      messageBoxType.value = type;
      messageBoxShow.value = true;
      setTimeout(() => {
        messageBoxShow.value = false;
      }, 3000);
    };

    const resetSelection = () => {
      selectedOption.value = null;
      resetUploadState();
    };

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await sendRequest('/users/account', 'GET', [], null, {
          Authorization: token
        });
        if (response && response.data && response.data.userInfo) {
          userNickname.value = response.data.userInfo.userNickName;
        } else {
          showMessage('获取用户信息失败: 响应格式不正确', 'error');
        }
      } catch (error) {
        showMessage('获取用户信息失败', 'error');
      }
    };

    onMounted(() => {
      fetchUserInfo();
    });

    const selectOption = (optionId) => {
      selectedOption.value = optionId;
      resetUploadState();
    };

    const resetUploadState = () => {
      fileUploaded.value = false;
      uploadedFile.value = null;
      if (document.getElementById('file-upload')) {
        document.getElementById('file-upload').value = '';
      }
      if (document.getElementById('video-upload')) {
        document.getElementById('video-upload').value = '';
      }
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.type === 'image/png') {
          uploadedFile.value = file;
          fileUploaded.value = true;
        } else {
          showMessage('请上传PNG格式的图片', 'error');
          resetUploadState();
        }
      }
    };


    const handleVideoUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.type === 'video/mp4') {
          if (file.size <= 200 * 1024 * 1024) {
            showCompressionModal.value = true;
            try {
              uploadedFile.value = await compressVideo(file);
              fileUploaded.value = true;
            } catch (error) {
              showMessage('视频压缩失败，请重试', 'error');
            } finally {
              showCompressionModal.value = false;
            }
          } else {
            showMessage('视频大小不能超过200MB', 'error');
          }
        } else {
          showMessage('请上传MP4格式的视频', 'error');
        }
        event.target.value = '';
      }
    };


    const compressVideo = async (file) => {
      try {
        console.log('压缩前视频大小:', (file.size / (1024 * 1024)).toFixed(2), 'MB');
        const ffmpeg = new FFmpeg();
        await ffmpeg.load({
          coreURL: '/ffmpeg/ffmpeg-core.js',
          wasmURL: '/ffmpeg/ffmpeg-core.wasm',
        });
        ffmpeg.on('progress', ({ progress }) => {
          compressionProgress.value = Math.round(progress * 100);
        });
        await ffmpeg.writeFile('input.mp4', await fetchFile(file));
        await ffmpeg.exec([
          '-i', 'input.mp4',
          '-crf', '28',
          '-preset', 'veryfast',
          '-vf', 'scale=854:480',
          '-r', '24',
          '-c:a', 'copy',
          'output.mp4'
        ]);
        const data = await ffmpeg.readFile('output.mp4');
        const compressedFile = new File([data.buffer], 'compressed_video.mp4', {type: 'video/mp4'});

        // 显示压缩后的文件大小
        console.log('压缩后视频大小:', (compressedFile.size / (1024 * 1024)).toFixed(2), 'MB');

        return compressedFile;
      } catch (error) {
        console.error('Error in video compression:', error);
        throw error;
      }
    };

    const startAnalysis = async () => {
      if (!uploadedFile.value) {
        showMessage('请先上传文件', 'error');
        return;
      }
      showModal.value = true;
      modalState.value = 'input';
    };


    const confirmAnalysis = async () => {
      if (!patientName.value) {
        showMessage('请输入患者姓名', 'error');
        return;
      }
      modalState.value = 'analyzing';
      const formData = new FormData();
      formData.append('file', uploadedFile.value);
      formData.append('patient-name', patientName.value);
      let endpoint = '';
      switch (selectedOption.value) {
        case 'detect':
          endpoint = '/detection';
          break;
        case 'segment':
          endpoint = '/segmentation';
          break;
        case 'video':
          endpoint = '/track';  // 修改这里为 '/track'
          break;
        default:
          console.error('未知的选项');
          modalState.value = 'error';
          return;
      }
      try {
        const token = localStorage.getItem('token');
        const response = await sendRequest(endpoint, 'POST', [], formData, {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        });
        if (response.status === 201) {
          modalState.value = 'complete';
        } else {
          modalState.value = 'error';
        }
      } catch (error) {
        console.error('分析过程出错', error);
        modalState.value = 'error';
      }
    };


    const closeModal = () => {
      showModal.value = false;
      modalState.value = 'input';
      patientName.value = '';
      resetUploadState();
    };

    return {
      userNickname,
      options,
      selectedOption,
      fileUploaded,
      selectOption,
      handleFileUpload,
      handleVideoUpload,
      startAnalysis,
      showModal,
      modalState,
      patientName,
      confirmAnalysis,
      closeModal,
      showCompressionModal,
      compressionProgress,
      messageBoxShow,
      messageBoxMessage,
      messageBoxType,
      resetSelection,
    };
  }
};
</script>

<style scoped>
.diagnosis-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 60px;
}

.user-nickname {
  text-align: center;
  margin-top: 4vh;
  margin-bottom: 0.5vh; /* 稍微增加底部边距 */
  font-size: 3vw;
}

.main-content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center; /* 改回居中对齐 */
  height: calc(100vh - 60px - 7vh - 3vw);
}

.main-content {
  width: 70%;
  height: 70%;
  background-color: rgba(24, 183, 144, 0.1);
  border-radius: 20px;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
  position: relative; /* 添加这行 */
}

.content-layout {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.content-layout.selected {
  padding-top: 3vw; /* 为返回按钮留出空间 */
}
.diagnosis-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  transition: all 0.3s ease;
}
.diagnosis-options.column-layout {
  flex-direction: column;
  width: 40%;
  height: 100%;
  justify-content: space-around;
}
.diagnosis-options button {
  width: 30%;
  height: 10vh;
  padding: 0 2vw;
  font-size: 1.8vw;
  cursor: pointer;
  background-color: #5BA98D;
  color: white;
  border: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
.diagnosis-options.column-layout button {
  width: 90%;
  height: 25%;
}
.diagnosis-options button.active {
  background-color: #4a8c75;
}
.right-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
}
.custom-file-upload {
  display: inline-block;
  padding: 1.5vw 3vw;
  cursor: pointer;
  margin-bottom: 2vw;
  color: white;
  background-color: #5BA98D;
  border-radius: 10px;
  font-size: 1.8vw;
}
input[type="file"] {
  display: none;
}
.upload-success {
  color: #5BA98D;
  margin-left: 1vw;
  font-size: 1.8vw;
}
.start-analysis {
  padding: 1.5vw 3vw;
  font-size: 1.8vw;
  cursor: pointer;
  background-color: #5BA98D;
  color: white;
  border: none;
  border-radius: 10px;
  margin-top: 2vw;
}
.modal-overlay {
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
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}
.modal-content input {
  margin: 1rem 0;
  padding: 0.5rem;
  width: 100%;
}
.modal-content button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #5BA98D;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-top: 1rem;
  overflow: hidden;
}
.progress {
  height: 100%;
  background-color: #5BA98D;
  transition: width 0.3s ease;
}
.back-button {
  position: absolute;
  top: 1vw;
  left: 1vw;
  padding: 0.5vw 1vw;
  font-size: 1.2vw;
  cursor: pointer;
  background-color: transparent;
  color: #5BA98D;
  border: 1px solid #5BA98D;
  border-radius: 5px;
  transition: all 0.3s ease;
  z-index: 10; /* 确保按钮在其他元素之上 */
}

.back-button:hover {
  background-color: #5BA98D;
  color: white;
}
</style>
