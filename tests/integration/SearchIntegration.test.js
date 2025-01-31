import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import SearchBarComponent from "../../src/components/SearchBarComponent.vue";
import { useTableListStore } from "../../src/store/tableList";
import { describe, it, expect } from "vitest";

describe("SearchBarComponent.vue", () => {
  it("should render the tabs and tables correctly", async () => {
    const pinia = createPinia();
    const wrapper = mount(SearchBarComponent, {
      global: {
        plugins: [pinia],
      },
    });

    const store = useTableListStore();

    store.dataconstituents = { data: [{ id: 1, name: "Constituent 1" }] };

    await wrapper.vm.$nextTick();

    expect(store.constituents.length).toBeGreaterThan(0);
  });
});
