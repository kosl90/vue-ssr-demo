<template>
  <div id="app">
    <div class="content">
      <section class="container">
        <div class="row">
          <section class="prod-news news">
            <news title="产品更新" :items="prodNews" pageLink="#"></news>
          </section>
          <section class="site-news news">
            <news title="资讯动态" :items="siteNews"></news>
          </section>
          <section class="forum-news news">
            <news title="论坛" :items="forumNews"></news>
          </section>
        </div>
      </section>
      </div>
      <web-footer></web-footer>
      <fixed-zone></fixed-zone>
  </div>
</template>

<script>
import News from '~components/News';
import FixedZone from '~components/FixedZone';
import WebFooter from '~components/WebFooter';
import logo from '~assets/logo.png';

export default {
  name: 'app',
  components: {
    News,
    FixedZone,
    WebFooter,
  },
  data() {
    return {
      logo,
      prodNews: [
                { link: 'https://baidu.com', title: '百度' },
                { link: 'https://baidu.com', title: '百度' },
                { link: 'https://baidu.com', title: '百度' },
                { link: 'https://baidu.com', title: '百度' },
      ],
      siteNews: [
                { link: 'https://baidu.com', title: '百度' },
      ],
      forumNews: [
                { link: 'https://baidu.com', title: '百度' },
      ],
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: flex;
  flex-flow: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.container {
  width: 97%;
  margin: auto;
}

.row {
  display: flex;
  justify-content: space-between;
}

.news {
  width: 30%;
}
</style>
