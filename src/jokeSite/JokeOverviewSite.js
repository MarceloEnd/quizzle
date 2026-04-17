import { StandardHeader } from "../components/StandardHeader";
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Psychology as QuizIcon, 
  ArrowForwardIos as ArrowIcon, 
} from '@mui/icons-material';
import { categories } from "./functions/helper";



export const JokeOverviewSite = () => {
  const themes = categories()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="Jokes Overview">
      <StandardHeader previousPath="/"/>
      <Paper elevation={4} sx={{ p: 6, textAlign: 'center', bgcolor: 'white' }}>
        <Typography variant={isMobile ? "h4" : "h2"} color="#4ba5f7" gutterBottom sx={{ fontWeight: 800, mb: 4 }}>
          Witze vom feinsten
        </Typography>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {themes.map((item, index) => (
          <Paper 
            key={index} 
            elevation={3} 
            sx={{ 
              borderRadius: '20px', 
              overflow: 'hidden',
              backgroundColor: '#c5efff',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)' }
            }}
          >
            <ListItem sx={{ p: 3 }}>
              <ListItemIcon>
                <QuizIcon sx={{ fontSize: 40, color: '#412199' }} />
              </ListItemIcon>
              <ListItemText 
                primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item}</Typography>}
              />
              <Button 
                variant="contained" 
                component={Link} 
                to={"/witz/"+index}
                sx={{ 
                  borderRadius: '12px', 
                  backgroundColor: '#412199',
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