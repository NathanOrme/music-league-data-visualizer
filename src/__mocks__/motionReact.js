/* eslint-env jest */
/* global jest */
const React = require('react');

const motion = new Proxy(
  {},
  {
    get: (_target, prop) => {
      return React.forwardRef((props, ref) => {
        const { children, ...rest } = props;
        return React.createElement(prop, { ...rest, ref }, children);
      });
    },
  },
);

const AnimatePresence = ({ children }) => children;

module.exports = {
  motion,
  AnimatePresence,
  useAnimation: jest.fn(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  })),
  useMotionValue: jest.fn((initial) => ({
    get: () => initial,
    set: jest.fn(),
    onChange: jest.fn(),
  })),
  useTransform: jest.fn((value) => value),
  useMotionTemplate: jest.fn((...args) => args.join('')),
  useSpring: jest.fn((value) => value),
  useInView: jest.fn(() => true),
  useScroll: jest.fn(() => ({
    scrollX: { get: () => 0 },
    scrollY: { get: () => 0 },
    scrollXProgress: { get: () => 0 },
    scrollYProgress: { get: () => 0 },
  })),
};
