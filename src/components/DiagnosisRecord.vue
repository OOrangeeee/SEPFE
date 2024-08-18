<!-- src/components/DiagnosisRecord.vue -->
<template>
  <div class="diagnosis-record" @click="handleClick">
    <span>{{ formattedTime }} | {{ record.patientName }} | {{ recordType }}</span>
  </div>
</template>

<script>
export default {
  name: 'DiagnosisRecord',
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedTime() {
      return new Date(this.record.time).toLocaleString();
    },
    recordType() {
      switch(this.record.type) {
        case 'detect':
          return '诊断图片检测';
        case 'segment':
          return '诊断图片分割';
        case 'track':
          return '诊断视频追踪';
        default:
          return '未知类型';
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('record-clicked', this.record.id);
    }
  }
}
</script>

<style scoped>
.diagnosis-record {
  width: 80%;
  height: 20%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.diagnosis-record:hover {
  background-color: #e0e0e0;
}
</style>
