<template>
  <div id="app">
    <div class="container">
      <nav-bar></nav-bar>
      <tips></tips>
      <router-view/>
    </div>
  </div>
</template>

<script>
import navBar from 'components/common/navBar'
import tips from 'components/common/tips'
export default {
  name: 'App',
  components:{
    navBar,
    tips
  }
}
</script>

<style>

</style>
