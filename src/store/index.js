// stores/mainStore.js
import { defineStore } from "pinia";
import constituents from "../json/constituyentes/constituensList.json";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    infoData: {
      ...constituents,
    },
  }),
  getters: {
    info(state) {
      return state.infoData;
    },
  },
  actions: {},
});
