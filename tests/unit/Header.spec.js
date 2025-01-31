import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import HeaderComponent from '../../src/components/HeaderComponent.vue';

const mockStore = {
  info: {
    data: {
      info: { name: "Test Name", countryName: "Test Country" },
      constituents: [{ codeInstrument: '123', lastPrice: 123.45, pctDay: 2, performanceAbsolute: 3 }],
    },
  },
  getInfo: vi.fn(() => ({
    data: {
      info: { name: "Test Name", countryName: "Test Country" },
      constituents: [{ codeInstrument: '123', lastPrice: 123.45, pctDay: 2, performanceAbsolute: 3 }],
    },
  })),
};

vi.mock('../../src/store', () => ({
  useMainStore: () => mockStore,
}));

describe('HeaderComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HeaderComponent, {
      global: {
        plugins: [createPinia()],
      },
    });
  });

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  });

});
