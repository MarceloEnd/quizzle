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
  Psychology as QuizIcon, 
  ArrowForwardIos as ArrowIcon, 
} from '@mui/icons-material';
import { StandardHeader } from '../../components/StandardHeader';
import { categoriesWordSearch } from './functions.js/functions';

export const WordSearchOverviewSite = () => {
  const themes = categoriesWordSearch();

  return (
    <div className="Word Search Overview">
      <StandardHeader previousPath="/spiele"/>
      <Paper elevation={4} sx={{ p: 6, textAlign: 'center', bgcolor: 'white' }}>
        <Typography variant="h2" color="primary" gutterBottom>Wort Suche</Typography>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {themes.map((item, index) => (
          <Paper 
            key={index} 
            elevation={3} 
            sx={{ 
              borderRadius: '20px', 
              overflow: 'hidden',
              backgroundColor: '#e3fae8ff',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)' }
            }}
          >
            <ListItem sx={{ p: 3 }}>
              <ListItemIcon>
                <QuizIcon sx={{ fontSize: 40, color: '#219538ff' }} />
              </ListItemIcon>
              <ListItemText 
                primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.kategorie}</Typography>}
              />
              <Button 
                variant="contained" 
                component={Link} 
                to={"/spiele/wortsuche/"+item.id}
                sx={{ 
                  borderRadius: '12px', 
                  backgroundColor: '#219538ff',
                  '&:hover': { backgroundColor: '#219538ff', filter: 'brightness(0.9)' }
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