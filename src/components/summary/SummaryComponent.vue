<template>
  <aside style="height: 100px">
    <div>
      <ul uk-tab class="tabs">
        <li :class="{ 'uk-active': activeTab === 0 }">
          <a href="#" @click.prevent="setActiveTab(0)">Resumen</a>
        </li>

        <li :class="{ 'uk-active': activeTab === 1 }">
          <a href="#" @click.prevent="setActiveTab(1)">Detalles</a>
        </li>
      </ul>

      <main>
        <div v-if="activeTab === 0">
          <summary-resume />
        </div>

        <div v-if="activeTab === 1">
          <summary-detail />
        </div>
      </main>
    </div>
  </aside>
</template>

<script>
import SummaryDetail from "./SummaryDetail.vue";
import SummaryResume from "./SummaryResume.vue";
export default {
  components: { SummaryDetail, SummaryResume },
  data() {
    return {
      activeTab: 0,
    };
  },
  methods: {
    setActiveTab(tabIndex) {
      this.activeTab = tabIndex;
    },
  },
};
</script>

<style>
.tabs {
  display: flex;
  width: 100%;
}

.tabs li {
  flex: 1;
  text-align: center;
}

.tabs li a {
  display: block;
  padding: 20px 0;
  text-decoration: none;
  font-size: 16px;
  text-transform: capitalize;
}

.tabs li.uk-active a {
  background-color: #444;
  color: white;
}

.tabs li a::after {
  content: "";
  display: block;
  background-color: white;
  margin-top: 5px;
  width: 100%;
}

.tabs li.uk-active a::after {
  background-color: white;
}
</style>
