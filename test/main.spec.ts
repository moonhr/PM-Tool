test("더하기 함수 테스트", () => {
  const sum = (a: number, b: number) => a + b;
  expect(sum(1, 2)).toBe(3);
});
