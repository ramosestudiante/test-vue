<template>
  <div>
    <search-bar />
    <div class="content-container">
      <div class="main-content">
        <header-component />
        <chart />
      </div>
      <div class="summary-container">
        <summary-component />
      </div>
    </div>
    <instrument-list-component class="instrument-list" />
  </div>
</template>

<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
import SearchBar from "../components/SearchBarComponent.vue";
import Chart from "../components/ChartComponent.vue";
import SummaryComponent from "../components/summary/SummaryComponent.vue";
import InstrumentListComponent from "../components/InstrumentListComponent.vue";

defineOptions({
  name: "Inicio",
});
</script>

<style scoped>
.content-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.main-content {
  flex-grow: 1;
  width: 80%;
  padding-right: 20px;
}

.summary-container {
  width: 20%;
  margin-top: 1%;
}

.instrument-list {
  margin-top: 20px;
}
</style>
