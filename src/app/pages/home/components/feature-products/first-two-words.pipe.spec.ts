import { FirstTwoWordsPipe } from './first-two-words.pipe';

describe('FirstTwoWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstTwoWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
