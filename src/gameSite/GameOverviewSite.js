import { StandardHeader } from "../components/StandardHeader";
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  ArrowForwardIos as ArrowIcon, 
} from '@mui/icons-material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

// 1. Define the game data outside the component
const GAMES = [
  { id: 1, title: "Mini Sudoku (Leicht)", path: "/spiele/minisudoku?leicht" },
  { id: 2, title: "Mini Sudoku ", path: "/spiele/minisudoku" }, 
  { id: 2, title: "Mini Sudoku (Schwer)", path: "/spiele/minisudoku?schwer" }, 
];

export const GameOverviewSite = () => {
  return (
    <div className="Games Overview">
      <StandardHeader />
      <Paper elevation={4} sx={{ p: 6, textAlign: 'center', bgcolor: 'white' }}>
        <Typography variant="h2" color="primary" gutterBottom>Spiele</Typography>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {GAMES.map((game) => (
            <Paper 
              key={game.id} 
              elevation={3} 
              sx={{ 
                borderRadius: '20px', 
                overflow: 'hidden',
                backgroundColor: "#e3fae8ff",
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            >
              <ListItem sx={{ p: 3 }}>
                <ListItemIcon>
                  <VideogameAssetIcon sx={{ fontSize: 40, color: '#219538ff' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{game.title}</Typography>}
                />
                <Button 
                  variant="contained" 
                  component={Link} 
                  to={game.path}
                  sx={{ 
                    borderRadius: '12px', 
                    backgroundColor: '#219538ff',
                    '&:hover': { backgroundColor: '#FFF3E0', filter: 'brightness(0.9)' }
                  }}
                  endIcon={<ArrowIcon />}
                >
                  Go!
                </Button>
              </ListItem>
            </Paper>
          ))}
        </List>
      </Paper>
    </div>
  );
}