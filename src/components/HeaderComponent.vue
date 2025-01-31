<template>
  <div>
    <h3 style="color: white">{{ info?.name }},{{ info?.countryName }}</h3>
    <span>Indice</span>
    <hr class="line" />

    <div class="values-row">
      <div class="value-container">
        <span>Valor Actual</span>
        <div class="uk-search-icon" uk-icon="arrow-down"></div>
        <span class="valuenow">{{
          formatDecimal(dataConstituent ? dataConstituent?.lastPrice : 0)
        }}</span>
      </div>

      <div class="value-container">
        <span>Var.% Actual</span>
        <span
          :class="{
            'value-red': dataConstituent && dataConstituent?.pctDay < 0,
            'value-white': dataConstituent && dataConstituent?.pctDay >= 0,
          }"
        >
          {{ formatDecimal(dataConstituent ? dataConstituent?.pctDay : 0) }}
        </span>
      </div>

      <div class="value-container">
        <span>Var. Puntos Actual</span>
        <span
          :class="{
            'value-red':
              dataConstituent && dataConstituent.performanceAbsolute < 0,
            'value-white':
              dataConstituent && dataConstituent.performanceAbsolute >= 0,
          }"
        >
          {{
            formatDecimal(
              dataConstituent ? dataConstituent.performanceAbsolute : 0
            )
          }}
        </span>
      </div>
    </div>
    <hr class="line" />
  </div>
</template>

<script setup>
import { useMainStore } from "../store";
import { computed } from "vue";
import { useSearchStore } from "../store/search";
import formatDecimal from "../utils/formatDecimal";

const mainStoreData = useMainStore();
const searchStore = useSearchStore();

const info = computed(() => {
  return mainStoreData.info.data?.info;
});

const selectConstituent = computed(() => {
  return searchStore.getSelectConstituent;
});

const dataConstituent = computed(() => {
  const data = mainStoreData.info?.data?.constituents.filter(
    (f) => f.codeInstrument === selectConstituent.value?.codeInstrument
  );
  return data?.[0] || {};
});
</script>

<style scoped>
.line {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #ddd;
}

.values-row {
  display: flex;
  align-items: center;
}

.value-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 0px;
}

span {
  margin-right: 10px;
  font-size: 16px;
}

.uk-search-icon {
  color: white;
  margin-left: 0px;
  font-size: 20px;
}

.valuenow {
  color: white;
  font-size: 16px;
}

.value-red {
  color: red;
  font-weight: bold;
}
.value-white {
  color: white;
  font-weight: bold;
}
</style>
