<template>
  <section class="footer">
    <footer class="container">
      <section class="pull-left">
        <p>@ 2017 <a href="#">使用前必读.</a></p>
      </section>
      <section class="pull-right">
        <p>数据库服务: abcd</p>
      </section>
    </footer>
  </section>
</template>

<script>
  import '~styles/WebFooter.css';

  export default {
    name: 'Footer',
    serverCachekey() {
      return `vee-${this.name}`;
    },
  };

</script>
