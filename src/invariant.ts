const isProduction = process.env.NODE_ENV === 'production';
const prefix = 'Invariant failed';

// Invarianto instance
export class Invariant extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'Invariant';
  }
}

// Throw an error if the condition fails
export function invariant(
  condition: boolean,
  message?: string
): asserts condition {
  if (condition) {
    return;
  }

  if (isProduction) {
    // In production we strip the message but still throw
    throw new Invariant(prefix);
  } else {
    // When not in production we allow the message to pass through
    // *This block will be removed in production builds*
    throw new Invariant(`${prefix}: ${message || ''}`);
  }
}
