declare module "degit" {
  function degit(repo: string, options: {}): Emitter;
  export = degit;
}

declare class Emitter {
  on(event: string, cb: Function): void;
  clone(directory: string): Promise<string>;
}
