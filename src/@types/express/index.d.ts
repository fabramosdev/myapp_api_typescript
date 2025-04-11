/**
 * Override Express Types
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
