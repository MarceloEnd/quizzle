import { 
  Box, Typography, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from 'react-router-dom';

export const EndMenuNewGame = ({gameWon, winText, winAnswer, restart, backLink}) => {
    const navigate = useNavigate();
    return(
      <Dialog open={gameWon} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4, textAlign: 'center' } }}>
        <DialogTitle sx={{ pt: 4 }}>
          <EmojiEventsIcon sx={{ fontSize: 80, color: '#ffc107', mb: 1 }} />
          <Typography variant="h4" fontWeight="900">{winText}</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ my: 3, p: 2, bgcolor: '#f0f7ff', borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" color="primary">
               {winAnswer}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions 
            sx={{ 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',    
                gap: 2,                  
                pb: 4,
                px: 4           
            }}
            >
            <Button 
                variant="contained" 
                size="large" 
                onClick={restart} 
                fullWidth 
                sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold', m: '0 !important' }}
            >
                Neues Spiel 
            </Button>

            <Button 
                variant="contained" 
                size="large" 
                onClick={() => navigate(backLink)} 
                fullWidth 
                sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold', m: '0 !important' }}
            >
                Zurück zum Menü
            </Button>
        </DialogActions>
      </Dialog>
      )
    }