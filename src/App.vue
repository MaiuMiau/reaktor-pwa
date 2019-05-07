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
html {
  height: 100%;
}

._backround {
  background-repeat: no-repeat;
  background-color: #b3c193;
  background-image: url('./assets/pollution3.png');
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
  font-size: 3.75em;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.formcontainer{
  max-width: 400px;
}
</style>
