<template>
<div>
  <div class="title"><h3 class="name">{{ title }}</h3><a v-if="pageLink" class="more" :href="pageLink">更多 >></a></div>
  <ul class="content">
    <li class="item" v-for="item in items"><a :href="item.link" target="_blank">{{item.title}}</a></li>
  </ul>
</div>
</template>

<script>
import '~styles/News.css';

export default {
  name: 'News',
  props: {
    items: {
      required: true,
    },
    pageLink: String,
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
