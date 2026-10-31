// 가이드 "고급 타입" — 이벤트 이름과 인자 타입을 묶은 이벤트 발행기 (매핑된 타입 활용)

type Listener<Args extends unknown[]> = (...args: Args) => void;

export class TypedEmitter<Events extends Record<string, unknown[]>> {
  // 이벤트마다 그 이벤트의 인자 타입을 받는 리스너 배열
  #listeners: { [K in keyof Events]?: Listener<Events[K]>[] } = {};

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): () => void {
    (this.#listeners[event] ??= []).push(listener);
    return () => this.off(event, listener);
  }

  off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): void {
    this.#listeners[event] = this.#listeners[event]?.filter((l) => l !== listener);
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
    for (const listener of this.#listeners[event] ?? []) listener(...args);
  }
}
