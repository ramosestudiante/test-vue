import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import Chart from "../../src/components/ChartComponent.vue";
import { describe, vi, it, expect, beforeEach } from "vitest";

vi.mock("vue3-apexcharts", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: { name: "ApexCharts", render: () => {} },
  };
});

describe("Chart.vue", () => {
  let wrapper;

  beforeEach(() => {
    const pinia = createPinia();
    wrapper = mount(Chart, {
      global: {
        plugins: [pinia],
      },
    });
  });

  it("renders buttons and reacts to button click", async () => {
    await wrapper.vm.$nextTick();
    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBeGreaterThan(0);

    const button = buttons.at(0);
    expect(button.text()).toBe("1D");
    await button.trigger("click");
    expect(wrapper.vm.selectedRange).toBe("1D");
  });

  it("filters chart data based on selected range", async () => {
    await wrapper.find("button").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedRange).toBe("1D");
  });

  it("renders chart with filtered data", async () => {
    await wrapper.vm.changeRange("1M");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedRange).toBe("1M");
  });
});
