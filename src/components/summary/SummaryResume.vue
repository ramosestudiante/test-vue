<template>
  <div
    style="
      margin-top: 8%;
      color: white;
      background-color: black;
      padding: 20px;
      width: 300px;
    "
  >
    <div style="margin-bottom: 10px">
      <p>
        {{ selectSearch?.name }} cotiza en
        {{ dataSummaries?.info?.marketName || "Bolsa de Santiago" }}.
      </p>
      último precio de {{ dataSummaries?.price?.lastPrice }}. Pero abrió en
      {{ dataSummaries?.price?.openPrice }}, alcanzando un máximo de
      {{ dataSummaries?.price?.maxDay }} y un mínimo de
      {{ dataSummaries?.price?.minDay }}. Su precio ha estado entre
      {{ dataSummaries?.price?.min52W }} y {{ dataSummaries?.price?.max52W }}.
    </div>
    <hr />
    <div
      style="display: flex; justify-content: space-between; margin-bottom: 10px"
    >
      <strong>Últimos 30 días</strong>
      <span v-html="getIcon(dataSummaries?.price?.pct30D)"></span>
    </div>
    <div style="display: flex; justify-content: space-between">
      <strong>Últimos 12 meses</strong>
      <span v-html="getIcon(dataSummaries?.price?.pctRelW52)"></span>
    </div>
    <div style="display: flex; justify-content: space-between">
      <strong>Año actual</strong>
      <span v-html="getIcon(dataSummaries?.price?.pctRelCY)"></span>
    </div>
    <hr />
  </div>
</template>

<script setup>
import { useSummaryStore } from "../../store/summary";
import { useSearchStore } from "../../store/search";
import { computed } from "vue";

const search = useSearchStore();
const summaries = useSummaryStore();

const dataSummaries = computed(() => {
  return summaries.summaries[0] || {}; // Ensure there's always a fallback
});

const selectSearch = computed(() => {
  return search.getSelectConstituent;
});

const getIcon = (value) => {
  if (value === undefined || value === null) return "-";
  return value >= 0 ? `${value.toFixed(2)}% 📈` : `${value.toFixed(2)}% 📉`;
};
</script>
