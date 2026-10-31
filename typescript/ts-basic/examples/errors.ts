// 가이드 "오류 처리" — node examples/errors.ts
import { AppError, describeError, loadConfig, NotFoundError, ValidationError } from '../src/errors.ts';
import { err, ok, type Result } from '../src/result.ts';

// 1) 오류 클래스 계층 — instanceof로 종류를 구분한다
const failures: unknown[] = [
  new NotFoundError('주문', 'o_123'),
  new ValidationError(['email 형식 오류', 'age는 0 이상']),
  new TypeError('undefined is not a function'),
  '문자열을 throw하는 오래된 코드',
];
for (const failure of failures) {
  console.log(describeError(failure));
}

// 2) cause — 감싼 오류에서 원래 오류를 따라간다
try {
  loadConfig('{ broken json');
} catch (error) {
  if (error instanceof AppError) {
    console.log(`${error.name}(${error.code}): ${error.message}`);
    console.log('  원인:', error.cause instanceof Error ? error.cause.name : error.cause);
  }
}

// 3) 예상할 수 있는 실패는 Result로, 예상하지 못한 실패는 throw로
type Account = { id: string; balance: number };
function withdraw(account: Account, amount: number): Result<Account, 'INSUFFICIENT' | 'INVALID_AMOUNT'> {
  if (amount <= 0) return err('INVALID_AMOUNT');
  if (account.balance < amount) return err('INSUFFICIENT');
  return ok({ ...account, balance: account.balance - amount });
}

const account = { id: 'a1', balance: 10_000 };
for (const amount of [3_000, 50_000, -1]) {
  const r = withdraw(account, amount);
  // r.error의 타입이 'INSUFFICIENT' | 'INVALID_AMOUNT'라서 메시지 표를 빠짐없이 만들 수 있다
  const messages = { INSUFFICIENT: '잔액 부족', INVALID_AMOUNT: '금액 오류' } satisfies Record<'INSUFFICIENT' | 'INVALID_AMOUNT', string>;
  console.log(`출금 ${amount}:`, r.ok ? `잔액 ${r.value.balance}` : messages[r.error]);
}
