import { defineStore } from "pinia";
import ChartData from "../../json/history/all-Histories.json";
import { useSearchStore } from "../search";

export const useChartStore = defineStore("chart", {
  state: () => ({
    chartAreas: { ...ChartData },
  }),
  getters: {
    chartAreaSelect(state) {
      const searchStore = useSearchStore();
      const selectedConstituent = searchStore.getSelectConstituent;
      if (!selectedConstituent) return [];
      return state?.chartAreas?.data.filter(
        (f) => f.info.name === selectedConstituent.name
      );
    },
    maxChart(state) {
      const maxHighPrice = state?.chartAreas?.data
        ?.flatMap((f) => f.chart.map((c) => c.highPrice))
        ?.reduce((max, price) => Math.max(max, price), -Infinity);

      return maxHighPrice;
    },
    minChart(state) {
      const minLowPrice = state?.chartAreas?.data
        ?.flatMap((f) => f.chart.map((c) => c.lowPrice))
        ?.reduce((min, price) => Math.min(min, price), Infinity);
      return minLowPrice;
    },
  },
  actions: {},
});
