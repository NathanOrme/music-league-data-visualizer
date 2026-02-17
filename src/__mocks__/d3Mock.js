/* eslint-env jest */
/* global jest */
// Mock D3 library for Jest tests
const d3 = {
  // Mock commonly used D3 functions
  select: jest.fn(function selectMock() {
    const mockSelection = {
      selectAll: jest.fn(() => mockSelection),
      data: jest.fn(() => mockSelection),
      enter: jest.fn(() => mockSelection),
      exit: jest.fn(() => mockSelection),
      append: jest.fn(() => mockSelection),
      attr: jest.fn(() => mockSelection),
      style: jest.fn(() => mockSelection),
      text: jest.fn(() => mockSelection),
      remove: jest.fn(() => mockSelection),
      call: jest.fn(() => mockSelection),
      on: jest.fn(() => mockSelection),
      transition: jest.fn(() => mockSelection),
      duration: jest.fn(() => mockSelection),
      ease: jest.fn(() => mockSelection),
    };
    return mockSelection;
  }),

  // Mock scale functions - fully chainable
  scaleLinear: jest.fn(function scaleLinearMock() {
    const scale = function (value) {
      return value;
    };
    scale.domain = jest.fn(() => scale);
    scale.range = jest.fn(() => scale);
    scale.nice = jest.fn(() => scale);
    scale.ticks = jest.fn(() => [0, 1, 2, 3, 4, 5]);
    scale.tickFormat = jest.fn(() => (d) => String(d));
    return scale;
  }),

  scaleBand: jest.fn(function scaleBandMock() {
    const scale = function (value) {
      return value;
    };
    scale.domain = jest.fn(() => scale);
    scale.range = jest.fn(() => scale);
    scale.bandwidth = jest.fn(() => 10);
    scale.paddingInner = jest.fn(() => scale);
    scale.paddingOuter = jest.fn(() => scale);
    return scale;
  }),

  // Mock axis functions - fully chainable
  axisBottom: jest.fn(function axisBottomMock() {
    const axis = function (selection) {
      return selection;
    };
    axis.tickFormat = jest.fn(() => axis);
    axis.ticks = jest.fn(() => axis);
    axis.tickSize = jest.fn(() => axis);
    axis.tickValues = jest.fn(() => axis);
    axis.tickPadding = jest.fn(() => axis);
    return axis;
  }),

  axisLeft: jest.fn(function axisLeftMock() {
    const axis = function (selection) {
      return selection;
    };
    axis.tickFormat = jest.fn(() => axis);
    axis.ticks = jest.fn(() => axis);
    axis.tickSize = jest.fn(() => axis);
    axis.tickValues = jest.fn(() => axis);
    axis.tickPadding = jest.fn(() => axis);
    return axis;
  }),

  // Mock other commonly used functions
  max: jest.fn((arr, accessor) => {
    if (!arr || arr.length === 0) {
      return 0;
    }
    return Math.max(...arr.map(accessor || ((d) => d)));
  }),

  min: jest.fn((arr, accessor) => {
    if (!arr || arr.length === 0) {
      return 0;
    }
    return Math.min(...arr.map(accessor || ((d) => d)));
  }),

  extent: jest.fn((arr, accessor) => {
    if (!arr || arr.length === 0) {
      return [0, 0];
    }
    const values = arr.map(accessor || ((d) => d));
    return [Math.min(...values), Math.max(...values)];
  }),

  range: jest.fn((start, stop, step = 1) => {
    const result = [];
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
    return result;
  }),

  // Mock additional scale functions - fully chainable
  scaleSqrt: jest.fn(function scaleSqrtMock() {
    const scale = function (value) {
      return Math.sqrt(value);
    };
    scale.domain = jest.fn(() => scale);
    scale.range = jest.fn(() => scale);
    scale.nice = jest.fn(() => scale);
    return scale;
  }),

  scaleTime: jest.fn(function scaleTimeMock() {
    const scale = function (value) {
      return value;
    };
    scale.domain = jest.fn(() => scale);
    scale.range = jest.fn(() => scale);
    scale.nice = jest.fn(() => scale);
    scale.ticks = jest.fn(() => []);
    scale.tickFormat = jest.fn(() => (d) => String(d));
    return scale;
  }),

  // Mock color scales
  schemeCategory10: [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
  ],
  scaleOrdinal: jest.fn(function scaleOrdinalMock() {
    const scale = function (value) {
      return value;
    };
    scale.domain = jest.fn(() => scale);
    scale.range = jest.fn(() => scale);
    return scale;
  }),
};

module.exports = d3;
