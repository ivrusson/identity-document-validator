// Adjust the import path as necessary

import { SpainIdCardValidator } from "../../src/validators";

describe('SpainIdCardValidator', () => {
  const validator = new SpainIdCardValidator();

  describe('validate NIF', () => {
    it('should validate a correct NIF', () => {
      const result = validator.validate('12345678Z'); // Use a valid NIF number
      expect(result.isValid).toBe(true);
    });

    it('should reject an incorrect NIF', () => {
      const result = validator.validate('12345678A'); // Use an invalid NIF number
      expect(result.isValid).toBe(false);
    });
  });

  describe('validate NIE', () => {
    it('should validate a correct NIE', () => {
      const result = validator.validate('X1234567L'); // Use a valid NIE number
      expect(result.isValid).toBe(true);
    });

    it('should reject an incorrect NIE', () => {
      const result = validator.validate('X1234567A'); // Use an invalid NIE number
      expect(result.isValid).toBe(false);
    });
  });

  // CIF tests could be added here, following a similar pattern
  // Note: CIF validation is not implemented in the provided examples

  describe('error handling', () => {
    it('should return an error for empty input', () => {
      const result = validator.validate('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('ID is empty');
    });

    it('should return an error for invalid format', () => {
      const result = validator.validate('invalidFormat');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid format');
    });
  });
});
