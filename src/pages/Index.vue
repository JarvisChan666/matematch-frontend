<script setup lang="ts">
import { ref } from 'vue';

const imageList = [
  'https://wallpapercave.com/wp/wp7991295.jpg',
  'https://wallpapercave.com/dwp2x/wp7991293.png',
  'https://wallpapercave.com/dwp2x/wp6211363.jpg',
  'https://wallpapercave.com/dwp2x/wp5789791.jpg',
  'https://wallpapercave.com/dwp2x/wp7991299.jpg',
  'https://wallpapercave.com/dwp2x/wp6193080.png',
  'https://wallpapercave.com/dwp2x/wp7991306.png',
  'https://wallpapercave.com/dwp2x/wp7991307.jpg',
  'https://wallpapercave.com/w/wp7991415',
  'https://wallpapercave.com/wp/wp7991485.png',
  'https://wallpapercave.com/wp/wp4320944.jpg',
  'https://wallpapercave.com/dwp2x/wp7991504.jpg',
];
</script>

<template>
  <van-notice-bar
    left-icon="volume-o"
    :scrollable="false"
    text="不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。"
  />
  <img v-for="img in imageList" v-lazy="img" />
</template>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
