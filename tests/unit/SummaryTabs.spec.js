import { mount } from "@vue/test-utils";
import { createPinia } from 'pinia';
import SummaryTabs from "../../src/components/summary/SummaryComponent.vue";
import SummaryDetail from "../../src/components/summary/SummaryDetail.vue";
import SummaryResume from "../../src/components/summary/SummaryResume.vue";
import { describe, it, expect } from "vitest";

describe("SummaryTabs.vue", () => {
  const pinia = createPinia();

  it("renders the component", () => {
    const wrapper = mount(SummaryTabs, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the tabs", () => {
    const wrapper = mount(SummaryTabs, {
      global: {
        plugins: [pinia],
      },
    });
    const tabs = wrapper.findAll("ul.tabs li");
    expect(tabs.length).toBe(2);
    expect(tabs[0].text()).toContain("Resumen");
    expect(tabs[1].text()).toContain("Detalles");
  });

  it("defaults to the first tab (Resumen) and renders SummaryResume", () => {
    const wrapper = mount(SummaryTabs, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.findComponent(SummaryResume).exists()).toBe(true);
    expect(wrapper.findComponent(SummaryDetail).exists()).toBe(false);
  });

  it("switch to second tab (Detalles) when clicked", async () => {
    const wrapper = mount(SummaryTabs, {
      global: {
        plugins: [pinia],
      },
    });

    const detailTab = wrapper.findAll("ul.tabs li")[1];
    await detailTab.find("a").trigger("click");

    expect(wrapper.findComponent(SummaryResume).exists()).toBe(false);
    expect(wrapper.findComponent(SummaryDetail).exists()).toBe(true);
  });

  it("apply active class to the correct tab", async () => {
    const wrapper = mount(SummaryTabs, {
      global: {
        plugins: [pinia],
      },
    });

    const tabs = wrapper.findAll("ul.tabs li");
    expect(tabs[0].classes()).toContain("uk-active");
    expect(tabs[1].classes()).not.toContain("uk-active");

    await tabs[1].find("a").trigger("click");

    expect(tabs[0].classes()).not.toContain("uk-active");
    expect(tabs[1].classes()).toContain("uk-active");
  });
});
