<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li v-for="(item, index) in navItems" :key="index" :class="`nav-item-${index + 1}`">
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
      currentPage: '息肉诊断',
      navItems: [
        { name: '息肉诊断', link: '/diagnosis' },
        { name: '用户中心', link: '/user' },
        { name: '关于息肉', link: '/about' }
      ]
    }
  },
  methods: {
    setCurrentPage(pageName) {
      this.currentPage = pageName;
      // 这里可以添加路由导航逻辑
    }
  }
}
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: #E7EDEB;
  padding: 0.5vw 0;
  position: fixed;
  top: 0;
  height: 4vw;
  min-height: 40px;
  max-height: 60px;
  z-index: 1000;
}

.nav-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.nav-list li {
  position: absolute;
  transform: translateX(-50%);
}

.nav-item-1 { left: 25%; }
.nav-item-2 { left: 50%; }
.nav-item-3 { left: 75%; }

.nav-list a {
  display: inline-block;
  padding: 0.5vw 1vw;
  text-decoration: none;
  color: black;
  border-radius: 30px;
  font-size: 1vw;
  min-font-size: 12px;
  max-font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-list a.active {
  background-color: #5BA98D;
  color: white;
}

@media screen and (max-width: 768px) {
  .navbar {
    height: auto;
    padding: 1vw 0;
  }

  .nav-list {
    flex-direction: column;
    height: auto;
  }

  .nav-list li {
    position: static;
    transform: none;
    margin: 1vw 0;
  }

  .nav-list a {
    font-size: 3vw;
    padding: 1vw 2vw;
  }
}
</style>
