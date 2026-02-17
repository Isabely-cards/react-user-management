import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem,
  Fade,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaCreateUser } from '../../schema/schemaCreateUser'
import { useEffect } from 'react'

export interface UserFormData {
  name: string
  email: string
  status: 'ativo' | 'inativo'
}

export interface UserFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: UserFormData) => Promise<void>
  defaultValues?: UserFormData
  isEditing?: boolean
}

export function UserFormDialog({
  open,
  onClose,
  onSubmit,
  defaultValues,
  isEditing = false,
}: UserFormDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: yupResolver(schemaCreateUser),
    defaultValues: {
      name: '',
      email: '',
      status: 'ativo',
    },
  })

  useEffect(() => {
    if (open) {
      if (defaultValues) {
        reset(defaultValues)
      } else {
        reset({
          name: '',
          email: '',
          status: 'ativo',
        })
      }
    }
  }, [open, defaultValues, reset])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Fade}
      aria-labelledby="user-form-title"
      aria-describedby="user-form-description"
    >
      <DialogTitle id="user-form-title">
        {isEditing ? 'Editar usuário' : 'Adicionar usuário'}
      </DialogTitle>

      <Typography
        id="user-form-description"
        variant="body2"
        color="textSecondary"
        sx={{ mb: 2, pl: 3 }}
      >
        Preencha os campos abaixo para {isEditing ? 'editar' : 'adicionar'} o
        usuário.
      </Typography>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} mt={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="name-input"
                  label="Nome"
                  fullWidth
                  required
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  aria-required="true"
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  required
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  aria-required="true"
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Status"
                  fullWidth
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  <MenuItem value="ativo">ativo</MenuItem>
                  <MenuItem value="inativo">inativo</MenuItem>
                </TextField>
              )}
            />

            <DialogActions sx={{ px: 0 }}>
              <Button onClick={onClose}>Cancelar</Button>

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Salvando...'
                  : isEditing
                    ? 'Atualizar'
                    : 'Criar'}
              </Button>
            </DialogActions>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  )
}
