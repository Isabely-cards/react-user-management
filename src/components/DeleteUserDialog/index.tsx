import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'

export interface DeleteUserDialogProps {
  open: boolean
  userName?: string
  onCancel: () => void
  onConfirm: () => Promise<void>
}

export function DeleteUserDialog({
  open,
  userName,
  onCancel,
  onConfirm,
}: DeleteUserDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  const descriptionId = 'delete-dialog-description'

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-dialog-title"
      aria-describedby={descriptionId}
    >
      <DialogTitle id="delete-dialog-title">Confirmar exclusão</DialogTitle>

      <DialogContent dividers>
        <Typography id={descriptionId} component="p">
          Tem certeza de que deseja excluir{' '}
          <strong>{userName ?? 'este usuário'}</strong>?
        </Typography>

        {loading && (
          <Typography
            variant="body2"
            sx={{ mt: 2 }}
            role="status"
            aria-live="polite"
          >
            Excluindo usuário...
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} disabled={loading} autoFocus>
          Cancelar
        </Button>

        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Deletar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
