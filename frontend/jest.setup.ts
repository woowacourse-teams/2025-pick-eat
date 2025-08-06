import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Typescript 환경일 때는 (global as any)로
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
