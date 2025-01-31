import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import SummaryResume from "../../src/components/summary/SummaryResume.vue";
import { describe, it, expect, vi } from "vitest";

vi.mock("../../src/store/summary", () => ({
  useSummaryStore: () => ({
    summaries: [
      {
        price: {
          lastPrice: 100,
          openPrice: 90,
          maxDay: 110,
          minDay: 80,
          min52W: 50,
          max52W: 120,
          pct30D: 5,
          pctRelW52: -2,
          pctRelCY: 3,
        },
      },
    ],
  }),
}));

vi.mock("../../src/store/search", () => ({
  useSearchStore: () => ({
    getSelectConstituent: { name: "Company ABC" },
  }),
}));
describe("SummaryCard.vue", () => {
  it("displays the correct price information", () => {
    const pinia = createPinia();
    const wrapper = mount(SummaryResume, {
      global: {
        plugins: [pinia],
      },
    });

    const companyName = "Company ABC";
    expect(wrapper.text()).toContain(
      `${companyName} cotiza en Bolsa de Santiago.`
    );
  });

  it("displays percentage change with icon for 30 days", () => {
    const wrapper = mount(SummaryResume);
    const icon30D = wrapper.find("span");
    expect(icon30D.text()).toContain("5.00% 📈");
  });

  it("displays percentage change with icon for 12 months", () => {
    const wrapper = mount(SummaryResume);
    const icon12Months = wrapper.findAll("span")[1];
    expect(icon12Months.text()).toContain("-2.00% 📉");
  });

  it("displays percentage change with icon for current year", () => {
    const wrapper = mount(SummaryResume);
    const iconCY = wrapper.findAll("span")[2];
    expect(iconCY.text()).toContain("3.00% 📈");
  });
});
