<!-- src/components/RecordDetail.vue -->
<template>
  <div class="record-detail-overlay" v-if="show" @click.self="close">
    <div class="record-detail-content">
      <div class="media-container">
        <img v-if="isImage" :src="record.url" alt="诊断图片" @load="onMediaLoad">
        <video v-else :src="record.url" controls @loadedmetadata="onMediaLoad"></video>
      </div>
      <div class="button-group">
        <button @click="downloadContent">下载内容</button>
        <button @click="close">关闭页面</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'RecordDetail',
  props: {
    show: Boolean,
    record: Object
  },
  setup(props, { emit }) {
    const isImage = computed(() => ['detect', 'segment'].includes(props.record?.type));

    const onMediaLoad = (event) => {
      const { width, height } = event.target;
      const aspectRatio = width / height;
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;

      if (width > maxWidth || height > maxHeight) {
        if (aspectRatio > maxWidth / maxHeight) {
          event.target.style.width = `${maxWidth}px`;
          event.target.style.height = 'auto';
        } else {
          event.target.style.width = 'auto';
          event.target.style.height = `${maxHeight}px`;
        }
      }
    };

    const close = () => {
      emit('close');
    };

    const downloadContent = () => {
      const link = document.createElement('a');
      link.href = props.record.url;
      link.download = `record_${props.record.id}.${isImage.value ? 'jpg' : 'mp4'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return {
      isImage,
      onMediaLoad,
      close,
      downloadContent
    };
  }
}
</script>

<style scoped>
.record-detail-overlay {
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

.record-detail-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  max-height: 90%;
}

.media-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  max-height: calc(80vh - 100px);
}

.media-container img,
.media-container video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #5BA98D;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4a8c75;
}
</style>
