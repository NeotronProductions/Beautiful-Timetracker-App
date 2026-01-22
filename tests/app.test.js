describe('Session Editing', () => {
    it('should validate input correctly', () => {
        expect(validateInput('2023-10-01T12:00', '2023-10-01T14:00')).toBe(true);
        expect(validateInput('2023-10-01T14:00', '2023-10-01T12:00')).toBe(false);
    });
    it('should calculate duration correctly', () => {
        expect(calculateDuration('2023-10-01T12:00', '2023-10-01T13:00')).toBe(60);
        expect(calculateDuration('2023-10-01T14:00', '2023-10-01T15:30')).toBe(90);
    });
});