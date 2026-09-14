import bcrypt from 'bcryptjs';

export async function gerarHash(senha: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(senha, salt);
}

export async function compararHash(
  senhaTexto: string,
  hashSenha: string
): Promise<boolean> {
  return bcrypt.compare(senhaTexto, hashSenha);
}