// DTO de saída: formato retornado pelo endpoint POST /auth/login.
export class loginResponseDTO {
  constructor(public token: string) {}
}