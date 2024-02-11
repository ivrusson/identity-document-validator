import { IDocumentValidator, ValidationResult, ParsedResult } from "./Validator";

enum ValidationErrorType {
  EmptyValue = "ID is empty",
  InvalidFormat = "Invalid format",
  InvalidNIF = "Invalid NIF",
  InvalidNIE = "Invalid NIE",
  CIFValidationNotImplemented = "CIF validation not implemented",
  UnknownError = "Unknown error"
}

export class SpainIdCardValidator implements IDocumentValidator {
  validate(id: string): ValidationResult {
    try {
      if (!id) {
        throw new Error(ValidationErrorType.EmptyValue);
      }

      if (this.isNIF(id)) {
        return this.validateNIF(id);
      } else if (this.isNIE(id)) {
        return this.validateNIE(id);
      } else if (this.isCIF(id)) {
        return this.validateCIF(id);
      } else {
        throw new Error(ValidationErrorType.InvalidFormat);
      }
    } catch (error) {
      return { isValid: false, error: this.handleError(error) };
    }
  }

  parse(id: string): ParsedResult | null {
    // Omitted for brevity
    return null;
  }

  private isNIF(id: string): boolean {
    return /^[0-9]{8}[A-Z]$/i.test(id);
  }

  private isNIE(id: string): boolean {
    return /^[XYZ][0-9]{7}[A-Z]$/i.test(id);
  }

  private isCIF(id: string): boolean {
    return /^[ABCDEFGHJKLMNPQRSUVW][0-9]{7}[0-9A-J]$/i.test(id);
  }

  private validateNIF(id: string): ValidationResult {
    const letter = "TRWAGMYFPDXBNJZSQVHLCKET";
    const number = parseInt(id.substring(0, 8), 10);
    const expectedLetter = letter.charAt(number % 23);

    if (expectedLetter === id.charAt(8).toUpperCase()) {
      return { isValid: true };
    } else {
      throw new Error(ValidationErrorType.InvalidNIF);
    }
  }

  private validateNIE(id: string): ValidationResult {
    const letter = "TRWAGMYFPDXBNJZSQVHLCKET";
    const initialLetter = id.charAt(0);
    const initialNumber = initialLetter === 'X' ? 0 : initialLetter === 'Y' ? 1 : 2;
    const number = parseInt(initialNumber + id.substring(1, 8), 10);
    const expectedLetter = letter.charAt(number % 23);

    if (expectedLetter === id.charAt(8).toUpperCase()) {
      return { isValid: true };
    } else {
      throw new Error(ValidationErrorType.InvalidNIE);
    }
  }

  private validateCIF(id: string): ValidationResult {
    // CIF validation is not implemented in this example.
    throw new Error(ValidationErrorType.CIFValidationNotImplemented);
  }

  private handleError(error: unknown): string {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      // Now that TypeScript knows error is an Error, we can safely access its message property
      // Assuming ValidationErrorType is a string enum, and error.message will match one of its values
      return error.message;
    }
    // If it's not an Error, handle it as a generic or unknown error.
    return "An unknown error occurred";
  }
}
