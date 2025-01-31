import { mount } from "@vue/test-utils";
import TableListComponent from "../../src/components/InstrumentListComponent.vue";
import { createPinia } from "pinia";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockStore = {
  constituents: {
    info: { name: "IPSA" },
    constituents: [
      { codeInstrument: 1, name: "Instrument 1" },
      { codeInstrument: 2, name: "Instrument 2" },
      { codeInstrument: 3, name: "Instrument 3" },
      { codeInstrument: 4, name: "Instrument 4" },
      { codeInstrument: 5, name: "Instrument 5" },
      { codeInstrument: 6, name: "Instrument 6" },
    ],
  },
};

describe("TableListComponent", () => {
  let wrapper;

  beforeEach(() => {
    const pinia = createPinia();
    wrapper = mount(TableListComponent, {
      global: {
        plugins: [pinia],
      },
      mocks: {
        $store: {
          state: mockStore,
        },
      },
    });
  });

  it("should render the component and show the tabs", () => {
    const tabs = wrapper.findAll(".tab-link");
    expect(tabs).toHaveLength(5);
    expect(tabs[0].text()).toBe("IPSA");
  });

  it("should correctly switch tabs", async () => {
    const tabLinks = wrapper.findAll(".tab-link");
    await tabLinks[1].trigger("click");

    expect(wrapper.vm.activeTab).toBe(1);
  });
});
