import { UserEntitePipe } from './user-entite.pipe';

describe('UserEntitePipe', () => {
  it('create an instance', () => {
    const pipe = new UserEntitePipe();
    expect(pipe).toBeTruthy();
  });
});
