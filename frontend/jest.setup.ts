import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
