import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isLogLevel, LOG_LEVELS, LogLevel, ROLES, shouldLog } from '../src/constants.ts';

test('as const 객체의 값 목록', () => {
  assert.deepEqual(LOG_LEVELS, ['debug', 'info', 'warn', 'error']);
  assert.equal(LogLevel.Warn, 'warn');
  assert.deepEqual(ROLES, ['admin', 'member', 'guest']);
});

test('isLogLevel은 정의된 값만 통과시킨다', () => {
  assert.equal(isLogLevel('error'), true);
  assert.equal(isLogLevel('ERROR'), false);
  assert.equal(isLogLevel('verbose'), false);
});

test('shouldLog는 심각도 순서로 비교한다', () => {
  assert.equal(shouldLog('error', 'warn'), true);
  assert.equal(shouldLog('warn', 'warn'), true);
  assert.equal(shouldLog('debug', 'info'), false);
});
