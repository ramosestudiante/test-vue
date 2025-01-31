<template>
  <div class="container">
    <VueApexCharts
      :options="chartOptions"
      :series="chartData.series"
      type="area"
      height="250"
      width="1400"
    />

    <div class="button-container">
      <button
        @click="changeRange('1D')"
        class="btn"
        :class="{ active: selectedRange === '1D' }"
      >
        1D
      </button>
      <button
        @click="changeRange('1S')"
        class="btn"
        :class="{ active: selectedRange === '1S' }"
      >
        1S
      </button>
      <button
        @click="changeRange('1M')"
        class="btn"
        :class="{ active: selectedRange === '1M' }"
      >
        1M
      </button>
      <button
        @click="changeRange('3M')"
        class="btn"
        :class="{ active: selectedRange === '3M' }"
      >
        3M
      </button>
      <button
        @click="changeRange('6M')"
        class="btn"
        :class="{ active: selectedRange === '6M' }"
      >
        6M
      </button>
      <button
        @click="changeRange('1A')"
        class="btn"
        :class="{ active: selectedRange === '1A' }"
      >
        1A
      </button>
      <button
        @click="changeRange('5A')"
        class="btn"
        :class="{ active: selectedRange === '5A' }"
      >
        5A
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useChartStore } from "../store/chart";

const emit = defineEmits();

const chartStore = useChartStore();
const selectedRange = ref("1D");

const fullData = computed(() => {
  const data =
    chartStore.chartAreaSelect[0]?.chart.map((e) => [
      new Date(e.datetimeLastPriceTs * 1000).getTime(),
      e.lastPrice,
    ]) || [];
  return data.sort((a, b) => a[0] - b[0]);
});

const minTimestamp = computed(() =>
  Math.min(...fullData.value.map(([timestamp]) => timestamp))
);
const maxTimestamp = computed(() =>
  Math.max(...fullData.value.map(([timestamp]) => timestamp))
);

const filteredData = computed(() => {
  if (!fullData.value.length) return [];
  const now = Date.now();

  switch (selectedRange.value) {
    case "1D":
      return fullData.value.filter(
        ([timestamp]) => timestamp >= maxTimestamp.value - 24 * 60 * 60 * 1000
      );
    case "1S":
      return fullData.value.filter(
        ([timestamp]) =>
          timestamp >= maxTimestamp.value - 7 * 24 * 60 * 60 * 1000
      );
    case "1M":
      return fullData.value.filter(
        ([timestamp]) =>
          timestamp >= maxTimestamp.value - 30 * 24 * 60 * 60 * 1000
      );
    case "3M":
      return fullData.value.filter(
        ([timestamp]) =>
          timestamp >= maxTimestamp.value - 90 * 24 * 60 * 60 * 1000
      );
    case "6M":
      return fullData.value.filter(
        ([timestamp]) =>
          timestamp >= maxTimestamp.value - 180 * 24 * 60 * 60 * 1000
      );
    case "1A":
      return fullData.value.filter(
        ([timestamp]) =>
          timestamp >= maxTimestamp.value - 365 * 24 * 60 * 60 * 1000
      );
    case "5A":
      return fullData.value.filter(
        ([timestamp]) =>
          timestamp >= maxTimestamp.value - 5 * 365 * 24 * 60 * 60 * 1000
      );
    default:
      return fullData.value;
  }
});

const chartData = ref({
  series: [{ data: filteredData.value }],
});

watch(
  filteredData,
  (newData) => {
    chartData.value.series = [{ data: newData }];
  },
  { immediate: true }
);

const chartOptions = computed(() => ({
  chart: {
    id: "area-datetime",
    type: "area",
    height: 350,
    background: "#000",
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 2 },
  xaxis: {
    type: "datetime",
    labels: { show: true },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { style: { colors: "#fff" } },
  },
  tooltip: {
    theme: "dark",
    x: {
      formatter: function (value) {
        return new Date(value).toLocaleString();
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 1,
      gradientToColors: ["#1f3b8b"],
      opacityFrom: 0.9,
      opacityTo: 0.1,
      stops: [0, 100],
    },
  },
  grid: { show: true },
}));

const changeRange = (range) => {
  selectedRange.value = range;
    emit('updateClicked', range);

};
</script>

<style scoped>
.container {
  background-color: #000;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2px;
  margin-top: 1px;
}

.btn {
  background-color: #1f1f1f;
  color: #fff;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  transition: background 0.3s;
}

.btn:hover,
.btn.active {
  background-color: #333;
}

.container {
  background-color: #000;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 10px;
}

.btn {
  background-color: #1f1f1f;
  color: #fff;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  transition: background 0.3s;
}

.btn:hover,
.btn.active {
  background-color: #333;
}

.btn.active {
  background-color: #007bff;
}
</style>
