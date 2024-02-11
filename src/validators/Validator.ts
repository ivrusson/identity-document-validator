export interface IDocumentValidator {
  validate(document: string): ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ParsedResult {
  country: string;
  format: string;
  parts?: { [key: string]: any };
}