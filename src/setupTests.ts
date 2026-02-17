import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
(global as any).IS_REACT_ACT_ENVIRONMENT = true;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}));

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}));

HTMLCanvasElement.prototype.getContext = jest
  .fn()
  .mockImplementation((contextType) => {
    if (contextType === '2d') {
      return {
        fillRect: jest.fn(), clearRect: jest.fn(), strokeRect: jest.fn(),
        beginPath: jest.fn(), closePath: jest.fn(), moveTo: jest.fn(),
        lineTo: jest.fn(), arc: jest.fn(), ellipse: jest.fn(), rect: jest.fn(),
        fill: jest.fn(), stroke: jest.fn(), clip: jest.fn(),
        scale: jest.fn(), rotate: jest.fn(), translate: jest.fn(),
        transform: jest.fn(), setTransform: jest.fn(), resetTransform: jest.fn(),
        fillStyle: '#000000', strokeStyle: '#000000', lineWidth: 1,
        lineCap: 'butt', lineJoin: 'miter', globalAlpha: 1,
        globalCompositeOperation: 'source-over',
        createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
        createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
        createPattern: jest.fn(),
        fillText: jest.fn(), strokeText: jest.fn(),
        measureText: jest.fn(() => ({ width: 10 })),
        drawImage: jest.fn(), save: jest.fn(), restore: jest.fn(),
        createImageData: jest.fn(), getImageData: jest.fn(), putImageData: jest.fn(),
      };
    }
    return null;
  });

global.requestAnimationFrame = jest.fn((callback) => {
  setTimeout(callback, 16);
  return 1;
});
global.cancelAnimationFrame = jest.fn();

global.fetch = jest.fn().mockResolvedValue({
  ok: true, status: 200,
  json: async () => ({}), text: async () => '',
  blob: async () => new Blob(), arrayBuffer: async () => new ArrayBuffer(0),
} as Response);
