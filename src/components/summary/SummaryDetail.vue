<template>
  <div
    style="
      margin-top: 8%;
      color: white;
      background-color: black;
      padding: 0 auto;
      width: 300px;
    "
  >
    <div
      style="display: flex; justify-content: space-between; margin-bottom: 10px"
    >
      <strong>Cotización</strong>
      <span data-testid="formatted-date">{{
        dataSummaries ? formattedDate : "-"
      }}</span>
    </div>
    <hr />
    <div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        "
      >
        <strong>MERCADO</strong>
        <span class="market-name">{{
          dataSummaries ? dataSummaries?.info?.marketName : "-"
        }}</span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <strong>APERTURA</strong>
        <span>{{
          formatedDecimal(dataSummaries ? dataSummaries?.price?.openPrice : 0)
        }}</span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <strong>CIERRE ANTERIOR</strong>
        <span>{{
          formatedDecimal(dataSummaries ? dataSummaries?.price?.closePrice : 0)
        }}</span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <strong>MÁXIMO DIARIO</strong>
        <span>{{
          formatedDecimal(dataSummaries ? dataSummaries?.price?.maxDay : 0)
        }}</span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <strong>MÍNIMO DIARIO</strong>
        <span>{{
          formatedDecimal(dataSummaries ? dataSummaries?.price?.minDay : 0)
        }}</span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <strong>MÁXIMO 52 SEMANAS</strong>
        <span>{{
          formatedDecimal(dataSummaries ? dataSummaries?.price?.max52W : 0)
        }}</span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <strong>MÍNIMO 52 SEMANAS</strong>
        <span>{{
          formatedDecimal(dataSummaries ? dataSummaries?.price?.min52W : 0)
        }}</span>
      </div>
      <div
        style="display: flex; justify-content: space-between; margin-top: 10px"
      >
        <strong>Variación**</strong>
        <div>%</div>
      </div>
      <hr />
      <div style="display: flex; justify-content: space-between">
        <strong>1 MES</strong>
        <span
          :class="{
            'value-red': dataSummaries && dataSummaries?.price?.pct30D < 0,
            'value-white': dataSummaries && dataSummaries?.price?.pct30D === 0,
            'value-green': dataSummaries && dataSummaries?.price?.pct30D > 0,
          }"
        >
          <span>
            {{
              (dataSummaries?.price?.pct30D > 0 ? "+" : "") +
              (dataSummaries?.price?.pct30D?.toFixed(2) ?? 0)
            }}%
          </span>
        </span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <strong>1 AÑO</strong>
        <span
          :class="{
            'value-red': dataSummaries && dataSummaries?.price?.pctRelW52 < 0,
            'value-white':
              dataSummaries && dataSummaries?.price?.pctRelW52 === 0,
            'value-green': dataSummaries && dataSummaries?.price?.pctRelW52 > 0,
          }"
        >
          <span>
            {{
              (dataSummaries?.price?.pctRelW52 > 0 ? "+" : "") +
              (dataSummaries?.price?.pctRelW52?.toFixed(2) ?? 0)
            }}%
          </span>
        </span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <strong>AÑO A LA FECHA</strong>
        <span
          :class="{
            'value-red': dataSummaries && dataSummaries?.price?.pctRelCY < 0,
            'value-white':
              dataSummaries && dataSummaries?.price?.pctRelCY === 0,
            'value-green': dataSummaries && dataSummaries?.price?.pctRelCY > 0,
          }"
        >
          <span>
            {{
              (dataSummaries?.price?.pctRelCY > 0 ? "+" : "") +
              (dataSummaries?.price?.pctRelCY?.toFixed(2) ?? 0)
            }}%
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSummaryStore } from "../../store/summary";
import { computed } from "vue";
import formatedDecimal from "../../utils/formatDecimal";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es";

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale("es");

const summaries = useSummaryStore();

const dataSummaries = computed(() => {
  return summaries.summaries[0];
});
const formattedDate = dayjs(
  dataSummaries?.value?.price?.bidDatetime,
  "YYYY-MM-DD HH:mm:ss"
).format("DD/MM/YYYY - hh:mm:ss a");
</script>

<style scoped>
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
