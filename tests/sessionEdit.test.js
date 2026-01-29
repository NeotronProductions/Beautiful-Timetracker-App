const { editSession, calculateDuration } = require('../public/app.js');

describe('Session Edit Functionality', () => {
  test('should calculate duration correctly', () => {
    const startTime = new Date('2023-01-01T10:00:00');
    const endTime = new Date('2023-01-01T12:00:00');
    const duration = calculateDuration(startTime, endTime);
    expect(duration).toBe(120);
  });
  
test('should validate duration to prevent negative values', () => {
    const startTime = new Date('2023-01-01T12:00:00');
    const endTime = new Date('2023-01-01T10:00:00');
    expect(() => editSession(startTime, endTime)).toThrow('Duration cannot be negative');
  });
});