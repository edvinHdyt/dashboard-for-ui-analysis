export interface LaravelErrorResponse {
  message: string;
  errors?: {
    username?: string[];
    email?: string[];
    no_hp?: string[];
    password?: string[];
  };
}

