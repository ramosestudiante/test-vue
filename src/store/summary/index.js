import { defineStore } from "pinia";
import summaries from "../../json/resumen/All.json";
import { useSearchStore } from "../search";

export const useSummaryStore = defineStore("summary", {
  state: () => ({
    dataSummaries: { ...summaries },
  }),

  getters: {
    summaries(state) {
      const searchStore = useSearchStore();
      const selectedConstituent = searchStore.getSelectConstituent;
      if (!selectedConstituent) return [];
      return state.dataSummaries.data.filter(
        (f) => f.info.name === selectedConstituent.name
      );
    },
  },

  actions: {
    setSummaries(newSummaries) {
      this.dataSummaries.data = newSummaries;
    },
  },
});
