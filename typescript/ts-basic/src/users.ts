// 가이드 "유틸리티 타입" — 표에 나온 타입을 실제 코드에서 쓰는 모습
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'member';
};

export type Config = {
  pageSize?: number;
  locale?: string;
};

// 생성할 때는 id를 서버가 정하므로 뺀다
export type NewUser = Omit<User, 'id'>;
// 수정 폼은 일부 필드만 보내도 된다 (id는 바꿀 수 없다)
export type UserPatch = Partial<Omit<User, 'id'>>;
// 화면에 내보낼 때는 password를 뺀다
export type PublicUser = Omit<User, 'password'>;
// 목록 화면에는 두 필드만 필요하다
export type UserSummary = Pick<User, 'id' | 'name'>;

const DEFAULT_CONFIG: Required<Config> = { pageSize: 20, locale: 'ko-KR' };

export function resolveConfig(config: Config): Required<Config> {
  return { ...DEFAULT_CONFIG, ...config };
}

export class UserStore {
  private users: Record<number, User> = {};
  private nextId = 1;

  create(input: NewUser): User {
    const user: User = { id: this.nextId++, ...input };
    this.users[user.id] = user;
    return user;
  }

  update(id: number, patch: UserPatch): User | undefined {
    const current = this.users[id];
    if (!current) return undefined;
    const updated: User = { ...current, ...patch };
    this.users[id] = updated;
    return updated;
  }

  list(): UserSummary[] {
    return Object.values(this.users).map(({ id, name }) => ({ id, name }));
  }
}

export function toPublic(user: User): PublicUser {
  const { password: _password, ...rest } = user;
  return rest;
}

export function countByRole(users: User[]): Record<User['role'], number> {
  const counts: Record<User['role'], number> = { admin: 0, member: 0 };
  for (const u of users) counts[u.role] += 1;
  return counts;
}
