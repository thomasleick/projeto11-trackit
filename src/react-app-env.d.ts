/// <reference types="react-scripts" />
declare module 'http' {
    import { RequestOptions } from 'https';
    export * from 'https';
    export const request: typeof https.request;
    export const get: typeof https.get;
    export const globalAgent: typeof https.globalAgent;
  }