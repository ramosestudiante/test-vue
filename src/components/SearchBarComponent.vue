<template>
  <div class="search-container">
    <form class="uk-search uk-search-default" aria-label="Search">
      <span class="uk-search-icon" uk-icon="search"></span>
      <input
        class="uk-search-input"
        type="search"
        placeholder="Busca un instrumento"
        aria-label="Buscar"
        v-model="searchQuery"
        @keydown.enter="handleEnter"
        @focus="showResults = true"
      />
    </form>

    <ul
      v-if="filteredConstituents.length && searchQuery && showResults"
      class="search-results"
    >
      <li
        v-for="constituent in filteredConstituents"
        :key="constituent.codeInstrument"
        @click="selectConstituent(constituent)"
        class="search-result-item"
      >
        {{ constituent.name }} - {{ constituent.codeInstrument }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useSearchStore } from "../store/search";
import { computed, ref, watch } from "vue";

const searchStore = useSearchStore();
const searchQuery = ref("");
const showResults = ref(false);

const filteredConstituents = computed(() => {
  if (!searchQuery.value) return [];
  return searchStore.filteredConstituents.filter(
    (constituent) =>
      constituent.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      constituent.codeInstrument
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
  );
});

const selectConstituent = (constituent) => {
  searchQuery.value = `${constituent.name} - ${constituent.codeInstrument}`;
  searchStore.setSelectedConstituent(constituent);
  showResults.value = false;
};

const handleEnter = () => {
  if (filteredConstituents.value.length === 1) {
    selectConstituent(filteredConstituents.value[0]);
  }
};

let debounceTimeout = null;
watch(searchQuery, (newQuery) => {
  showResults.value = !!newQuery;
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    searchStore.setSearchQuery(newQuery);
  }, 500);
});
</script>

<style scoped>
.search-container {
  width: 100%;
  position: relative;
}

.search-select-wrapper {
  position: relative;
}

.uk-search {
  width: 100%;
  display: flex;
}

.uk-search-input {
  flex: 1;
  width: 100%;
  min-width: 0;
}
.uk-search-input:focus {
  background-color: rgb(58, 56, 56);
  border-color: black;
  outline: none;
}

.search-results {
  position: absolute;
  top: 80%;
  left: 0;
  width: 100%;
  max-width: 98%;
  background-color: white;
  border: 1px solid black;
  max-height: 200px;
  overflow-y: auto;
  z-index: 99;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.search-result-item {
  padding: 10px;
  cursor: pointer;
}

.search-result-item:hover {
  background-color: #f1f1f1;
}
.selected-option {
  margin-top: 10px;
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.selected-option button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}
</style>
