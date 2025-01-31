<template>
  <tr>
    <td>
      <button @click="handleClick(instrument)" class="unstyled-button">
        <span class="value-white"> {{ instrument?.shortName }} </span>
      </button>
    </td>
    <td>
      {{ instrument.lastPrice }}
    </td>

    <td class="value-white">
      {{ instrument?.volumeMoney }}
    </td>

    <td>
      <span
        :class="{
          'value-red': instrument?.pctDay < 0,
          'value-white': instrument?.pctDay === 0,
          'value-green': instrument?.pctDay > 0,
        }"
      >
        <span>
          {{
            (instrument?.pctDay > 0 ? "+" : "") +
            (instrument?.pctDay?.toFixed(2) ?? 0)
          }}%
        </span>
      </span>
    </td>

    <td>
      <span
        :class="{
          'value-red': instrument?.pct30D < 0,
          'value-white': instrument?.pct30D === 0,
          'value-green': instrument?.pct30D > 0,
        }"
      >
        <span>
          {{
            (instrument?.pct30D > 0 ? "+" : "") +
            (instrument?.pct30D?.toFixed(2) ?? 0)
          }}%
        </span>
      </span>
    </td>

    <td>
      <span
        :class="{
          'value-red': instrument?.pctCY < 0,
          'value-white': instrument?.pctCY === 0,
          'value-green': instrument?.pctCY > 0,
        }"
      >
        <span>
          {{
            (instrument?.pctCY > 0 ? "+" : "") +
            (instrument?.pctCY?.toFixed(2) ?? 0)
          }}%
        </span>
      </span>
    </td>

    <td> <span
        :class="{
          'value-red': instrument?.pct1Y < 0,
          'value-white': instrument?.pct1Y === 0,
          'value-green': instrument?.pct1Y > 0,
        }"
      >
        <span>
          {{
            (instrument?.pct1Y > 0 ? "+" : "") +
            (instrument?.pct1Y?.toFixed(2) ?? 0)
          }}%
        </span>
      </span></td>
  </tr>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useSearchStore } from "../store/search";
const searchStore = useSearchStore();

const props = defineProps({
  instrument: {
    type: Object,
    required: true,
  },
});

const handleClick = (instrument) => {
  searchStore.setSelectedConstituent(instrument);
};
</script>

<style scoped>
.unstyled-button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

td {
  padding: 4px 8px;
  font-size: 0.875rem;
  text-align: center;
}

table th:nth-child(1) {
  width: 150px;
}
table th:nth-child(2),
table th:nth-child(3),
table th:nth-child(4),
table th:nth-child(5),
table th:nth-child(6),
table th:nth-child(7) {
  width: 80px;
  text-align: center;
}

.value-red {
  color: red;
  font-weight: bold;
}
.value-white {
  color: white;
  font-weight: bold;
}
.value-green {
  color: green;
  font-weight: bold;
}
</style>
