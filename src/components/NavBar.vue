<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li v-for="(item, index) in navItems" :key="index" :style="{left: `${(index + 1) * 20}%`}">
        <a
            :href="item.link"
            :class="{ 'active': currentPage === item.name }"
            @click.prevent="setCurrentPage(item.name)"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      currentPage: '首页',
      navItems: [
        { name: '首页', link: '/' },
        { name: '息肉诊断', link: '/diagnosis' },
        { name: '诊断报告', link: '/report' },
        { name: '关于息肉', link: '/about' }
      ]
    }
  },
  methods: {
    setCurrentPage(pageName) {
      this.currentPage = pageName;
    }
  }
}
</script>
<style scoped>
.navbar {
  width: 100%;
  background-color: #E7EDEB;
  padding: 0.5%;
  position: fixed;
  top: 0;
  height: 50px;
  z-index: 1000;
}

.nav-list {
  display: flex;
  justify-content: space-evenly; /* 均匀分布 */
  align-items: center; /* 垂直居中 */
  width: 100%;
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-list li {
  transform: none; /* 移除之前的transform */
}

.nav-list a {
  display: inline-block;
  padding: 10px 15px;
  text-decoration: none;
  color: black;
  border-radius: 30px;
}

.nav-list a.active {
  background-color: #5BA98D;
  color: white;
}
</style>
