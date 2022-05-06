<template>
  <q-toolbar class="bg-primary text-white">
    <q-toolbar-title>
      Toolbar
    </q-toolbar-title>
    <q-btn to="/">Регіони</q-btn>
    <q-btn to="/districts">Райони</q-btn>
  </q-toolbar>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components:{
  }
})
</script>

<style>
  .wrapper{
    max-width: 1420px;
    margin: 0 auto;
  }
</style>
