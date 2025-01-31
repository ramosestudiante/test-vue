<template>
  <div>
    <div>
      <ul uk-tab class="tabs">
        <li
          v-for="(tab, index) in tabs"
          :key="tab.name"
          :class="{ 'uk-active': activeTab === index }"
        >
          <a href="#" @click.prevent="setActiveTab(index)" class="tab-link">{{
            tab.name
          }}</a>
        </li>
      </ul>
    </div>

    <div class="table-container">
      <table class="uk-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Último</th>
            <th>Monto (MM)</th>
            <th>Var Día</th>
            <th>Var 30D</th>
            <th>Año Actual</th>
            <th>12 Meses</th>
          </tr>
        </thead>
        <tbody>
          <InstrumentItemComponent
            v-for="instrument in paginatedFirstHalf"
            :key="instrument.codeInstrument"
            :instrument="instrument"
          />
        </tbody>
      </table>

      <table class="uk-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Último</th>
            <th>Monto (MM)</th>
            <th>Var Día</th>
            <th>Var 30D</th>
            <th>Año Actual</th>
            <th>12 Meses</th>
          </tr>
        </thead>
        <tbody>
          <InstrumentItemComponent
            v-for="instrument in paginatedSecondHalf"
            :key="instrument.codeInstrument"
            :instrument="instrument"
          />
        </tbody>
      </table>
    </div>

    <div class="pagination-container">
      <div class="pagination-left">
        <Pagination
          :currentPage="currentPageFirstHalf"
          :totalPages="totalPagesFirstHalf"
          @page-changed="handlePageChangeFirstHalf"
        />
      </div>

      <div class="pagination-right">
        <Pagination
          :currentPage="currentPageSecondHalf"
          :totalPages="totalPagesSecondHalf"
          @page-changed="handlePageChangeSecondHalf"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import InstrumentItemComponent from "./InstrumentItemComponent.vue";
import { useTableListStore } from "../store/tableList";
import Pagination from "./Pagination.vue";

const tableData = useTableListStore();
const activeTab = ref(0);
const itemsPerPage = 5;

const currentPageFirstHalf = ref(1);
const currentPageSecondHalf = ref(1);

const totalPagesFirstHalf = computed(() =>
  Math.ceil(firstHalf.value.length / itemsPerPage)
);
const totalPagesSecondHalf = computed(() =>
  Math.ceil(secondHalf.value.length / itemsPerPage)
);

const paginatedFirstHalf = computed(() => {
  const start = (currentPageFirstHalf.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return firstHalf.value.slice(start, end);
});

const paginatedSecondHalf = computed(() => {
  const start = (currentPageSecondHalf.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return secondHalf.value.slice(start, end);
});

function handlePageChangeFirstHalf(page) {
  currentPageFirstHalf.value = page;
}

function handlePageChangeSecondHalf(page) {
  currentPageSecondHalf.value = page;
}

const tabs = reactive([
  { name: "IPSA" },
  { name: "IGPA" },
  { name: "NASDAQ" },
  { name: "DOW JONES" },
  { name: "SP/BVL" },
]);

const setActiveTab = (index) => {
  activeTab.value = index;
};

const filteredTableData = computed(() => {
  const activeTabName = tabs[activeTab.value]?.name;
  const tab =
    tableData.constituents?.info?.name === activeTabName
      ? tableData.constituents
      : null;
  return tab ? tab.constituents || [] : [];
});

const firstHalf = computed(() =>
  filteredTableData.value.slice(
    0,
    Math.ceil(filteredTableData.value.length / 2)
  )
);
const secondHalf = computed(() =>
  filteredTableData.value.slice(Math.ceil(filteredTableData.value.length / 2))
);
</script>

<style scoped>
.table-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

th {
  color: white;
  height: 1px;
}
.uk-table {
  width: 50%;
  border-collapse: separate;
  border-spacing: 2px;
  height: 100px;
  overflow-y: auto;
  margin: 0;
}

td,
th {
  padding: 5px 5px;
  font-size: 0.75rem;
  line-height: 1;
  text-align: center;
}

table th {
  font-size: 0.75rem;
  padding: 5px 5px;
  text-align: center;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.pagination-left,
.pagination-right {
  width: 48%;
}
.tabs {
  font-size: 12px;
  margin-bottom: 10px;
}

.tab-link {
  padding: 6px 12px;
  font-size: 12px;
}

.tab-link:hover {
  text-decoration: underline;
}

.tab-link.uk-active {
  background-color: #f0f0f0;
  color: #000;
}

.uk-tab {
  display: flex;
  justify-content: space-evenly;
  max-width: 50%;
  flex-wrap: wrap;
}
</style>
