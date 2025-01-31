<template>
    <div class="uk-flex uk-flex-column vh-100">
      <div class="uk-flex uk-flex-1">
        <main class="uk-padding-small uk-width-expand">
          <inicio/>
        </main>
      </div>
    </div>
  </template>
  
  
  <style>
  .vh-100 {
    height: 100vh;
  }
  </style>
  <script>
import Inicio from '../pages/Inicio.vue';

 export default {

    name: "DashboardTemplate",
    components:{
      inicio: Inicio
    }
  };
</script>
  