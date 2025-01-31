import { describe, it, expect, beforeEach, vi } from "vitest";
import { flushPromises } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import SummaryDetail from "../../src/components/summary/SummaryDetail.vue";
import { createPinia } from "pinia";
import dayjs from "dayjs";

vi.mock("../../src/store/summary", () => ({
  useSummaryStore: vi.fn(() => ({
    summaries: [
      {
        info: { marketName: "Test Market" },
        price: {
          openPrice: 100,
          closePrice: 110,
          maxDay: 120,
          minDay: 90,
          max52W: 200,
          min52W: 50,
          pct30D: 5,
          pctRelW52: -10,
          pctRelCY: 15,
          bidDatetime: "2025-01-30 14:00:00",
        },
      },
    ],
  })),
}));

describe("SummaryDetail.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SummaryDetail, {
      global: {
        plugins: [createPinia()],
      },
    });
  });

  it("renders market name", async () => {
    const marketName = wrapper.find(".market-name");

    expect(marketName.exists()).toBe(true);
    expect(marketName.text()).toBe("Test Market");
  });

  it("formats dates", async () => {
    await flushPromises();
    const formattedDate = wrapper.find('[data-testid="formatted-date"]').text();
    expect(formattedDate).toBe(
      dayjs("2025-01-30 14:00:00").format("DD/MM/YYYY - hh:mm:ss a")
    );
  });

  it("formats numbers correctly with positive values", async () => {
    await flushPromises();
    const openPrice = wrapper.findAll("span")[2].text();
    expect(openPrice).toBe("100.00");
  });
  it("renders percentage changes with the correct class for positive, negative, and zero values", async () => {
    await flushPromises();

    const spanElements = wrapper.findAll("span");

    const monthChange = spanElements[8].text();
    const monthChangeClass = spanElements[8].classes();

    console.log(monthChange);

    expect(monthChange).toBe("+5.00%");
    expect(monthChangeClass).toContain("value-green");
  });
});
