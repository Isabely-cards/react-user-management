import * as yup from 'yup'

export const schemaCreateUser = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),

  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Formato de e-mail inválido'),

  status: yup
    .mixed<'ativo' | 'inativo'>()
    .oneOf(['ativo', 'inativo'])
    .required('Status is required'),
})
