import { UserStatusLabelPipe } from './user-status-label.pipe';

describe('UserStatusLabelPipe', () => {
  it('create an instance', () => {
    const pipe = new UserStatusLabelPipe();
    expect(pipe).toBeTruthy();
  });
});
