export type UserStatus = 'ativo' | 'inativo'

export interface User {
  id: string
  name: string
  email: string
  status: UserStatus
}
