import { defineStore } from "pinia";
import constituents from "../../json/constituyentes/constituensList.json";

export const useTableListStore = defineStore("tableList", {
  state: () => ({
    dataconstituents: { ...constituents },
  }),

  getters: {
    constituents(state) {
      return state.dataconstituents.data;
    },
  },

  actions: {},
});
