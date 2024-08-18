<!-- src/components/MessageBox.vue -->
<template>
  <transition name="fade">
    <div v-if="show" class="message-box" :class="type">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MessageBox',
  props: {
    show: Boolean,
    message: String,
    type: {
      type: String,
      default: 'info'
    }
  }
}
</script>

<style scoped>
.message-box {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  z-index: 1000;
}

.info {
  background-color: #2196F3;
}

.error {
  background-color: #F44336;
}

.success {
  background-color: #4CAF50;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
