import { test } from 'node:test';
import assert from 'node:assert/strict';
import { area, assertNever, isCircle, type Shape } from '../src/shapes.ts';

test('kind에 따라 넓이를 계산한다', () => {
  assert.equal(area({ kind: 'circle', radius: 2 }), Math.PI * 4);
  assert.equal(area({ kind: 'square', side: 3 }), 9);
  assert.equal(area({ kind: 'triangle', base: 4, height: 5 }), 10);
});

test('isCircle 타입 가드로 원만 걸러낸다', () => {
  const shapes: Shape[] = [{ kind: 'circle', radius: 1 }, { kind: 'square', side: 1 }];
  const circles = shapes.filter(isCircle);
  assert.equal(circles.length, 1);
  assert.equal(circles[0]?.radius, 1);
});

test('타입을 우회해 들어온 알 수 없는 kind는 assertNever가 막는다', () => {
  const unknownShape = { kind: 'hexagon', side: 1 } as unknown as Shape;
  assert.throws(() => area(unknownShape), /처리하지 않은 값: {"kind":"hexagon","side":1}/);
  assert.throws(() => assertNever('x' as never), /처리하지 않은 값: "x"/);
});
