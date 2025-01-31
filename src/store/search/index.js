import { defineStore } from "pinia";
import constituents from "../../json/constituyentes/constituensList.json";

export const useSearchStore = defineStore("search", {
  state: () => ({
    data: {
      ...constituents,
    },
    searchQuery: "",
    selectedConstituent: null,
  }),

  getters: {
    filteredConstituents(state) {
      if (!state.data || !state.data.data.constituents) {
        return [];
      }

      return state.data.data.constituents.filter((constituent) => {
        return (
          constituent.name
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          constituent.shortName
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          constituent.codeInstrument
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase())
        );
      });
    },
    getSelectConstituent(state) {
      return state.selectedConstituent;
    },
  },

  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },

    setSelectedConstituent(constituent) {
      this.selectedConstituent = constituent;
    },
  },
});
