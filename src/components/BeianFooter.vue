<template>
  <footer class="beian-footer">
    <div class="beian-info">
      <img src="https://upload.polypeye.cn/beian/%E5%A4%87%E6%A1%88%E5%9B%BE%E6%A0%87.png" alt="备案图标" class="beian-icon">
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=42011102005601" rel="noreferrer" target="_blank">
        鄂公网安备42011102005601
      </a>
      <span class="spacer"> </span>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" rel="noreferrer" target="_blank" class="icp-beian">
        鄂ICP备2024068409号-1
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'BeianFooter'
}
</script>

<style scoped>
.beian-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  padding: 8px 0;
  z-index: 1000;
  font-size: 0.7vw;
  color: #333;
}

.beian-info {
  display: inline-flex; /* 使用内联flexbox来保持在一行内 */
  align-items: center;
}

.beian-icon {
  width: 0.9vw; /* 固定图标大小 */
  height: auto;
  vertical-align: middle;
  margin-right: 5px; /* 在图标和文字之间添加一些间距 */
}

.spacer {
  margin: 0 5px; /* 间隔5个空格 */
}
</style>
