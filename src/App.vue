<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/dist/bootstrap-vue';
@import url('https://fonts.googleapis.com/css?family=Jaldi');
html {
  height: 100%;
}

._backround {
  background-repeat: no-repeat;
  background-color: #abb5a4;
  background-image: url('./assets/pollution5.png');
  background-attachment: fixed, fixed;
  background-size: cover;
  background-position: center;
}
body {
  // height: 100%;
  @extend ._backround;
}
h1{
  color: white;
  font-family: 'Jaldi', sans-serif;
  font-size: 4.75em;
}
#app {
  font-family: 'Jaldi', sans-serif;
  font-size: 1.15em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
