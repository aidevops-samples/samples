import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AppError, describeError, loadConfig, NotFoundError, ValidationError } from '../src/errors.ts';

test('하위 클래스는 instanceof와 name이 맞다', () => {
  const error = new NotFoundError('주문', 'o_1');
  assert.ok(error instanceof NotFoundError);
  assert.ok(error instanceof AppError);
  assert.ok(error instanceof Error);
  assert.equal(error.name, 'NotFoundError');
  assert.equal(error.code, 'NOT_FOUND');
  assert.equal(error.resource, '주문');
});

test('describeError는 종류마다 다르게 설명한다', () => {
  assert.equal(describeError(new ValidationError(['a', 'b'])), '[VALIDATION_FAILED] a, b');
  assert.equal(describeError(new AppError('X', 'msg')), '[X] msg');
  assert.equal(describeError(new Error('plain')), 'plain');
  assert.equal(describeError('string'), 'string');
  assert.equal(describeError(undefined), 'undefined');
});

test('loadConfig는 원래 오류를 cause로 남긴다', () => {
  assert.throws(() => loadConfig('{'), (error: unknown) => {
    assert.ok(error instanceof AppError);
    assert.equal(error.code, 'CONFIG_INVALID');
    assert.ok(error.cause instanceof SyntaxError);
    return true;
  });
  assert.deepEqual(loadConfig('{"a":1}'), { a: 1 });
});
