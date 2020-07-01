describe('CLI run', () => {
  it('should return array', () => {
    const MOCK_PATHS = [
      '/home/node/14.4.0/bin/node',
      '/home/bin/mbtools',
      'test',
    ];
    expect(MOCK_PATHS).toHaveLength(3);
  });
});
