
type Constructor<T> = new (...args: any[]) => T;

type OmitMethods<T> = Omit<T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>;
type PickMethods<T> = Pick<T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>;

interface ConstructorOf<T> {
  new(): T;
}

interface NekoCreationPayload {
  id: string;
  password: string;
  github_only?: boolean;
}
