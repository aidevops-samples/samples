import { test } from 'node:test';
import assert from 'node:assert/strict';
import { area, isCircle, type Shape } from '../src/shapes.ts';

test('원과 정사각형의 넓이를 kind로 구분해 계산한다', () => {
  assert.equal(area({ kind: 'circle', radius: 2 }), Math.PI * 4);
  assert.equal(area({ kind: 'square', side: 3 }), 9);
});

test('isCircle 타입 가드로 원만 걸러낸다', () => {
  const shapes: Shape[] = [{ kind: 'circle', radius: 1 }, { kind: 'square', side: 1 }];
  const circles = shapes.filter(isCircle);
  assert.equal(circles.length, 1);
  assert.equal(circles[0]?.radius, 1);
});
