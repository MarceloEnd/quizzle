import { StandardHeader } from "../components/StandardHeader";
import { Link } from 'react-router-dom'; // 1. Import Link
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
  ArrowForwardIos as ArrowIcon 
} from '@mui/icons-material';



export const QuizOverviewSite = () => {
  const activities = [
    {
      title: "Ponys und Pferde",
      description: "Teste dein Pferde Wissen?",
      path: "/quiz/1"
    },
    {
      title: "Farben",
      description: "Kennst du den Farbkreis?",
      path: "/quiz/2"
    }
  ];

  return (
    <div className="Start">
      <StandardHeader />
      <Paper elevation={4} sx={{ p: 6, textAlign: 'center', bgcolor: 'white' }}>
        <Typography variant="h2" color="primary" gutterBottom>Teste dein Quiz Wissen</Typography>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {activities.map((item, index) => (
          <Paper 
            key={index} 
            elevation={3} 
            sx={{ 
              borderRadius: '20px', 
              overflow: 'hidden',
              backgroundColor: item.color,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)' }
            }}
          >
            <ListItem sx={{ p: 3 }}>
              <ListItemIcon>
                <QuizIcon sx={{ fontSize: 40, color: '#FF9800' }} />
              </ListItemIcon>
              <ListItemText 
                primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.title}</Typography>}
                secondary={item.description}
              />
              <Button 
                variant="contained" 
                component={Link} 
                to={item.path}
                sx={{ 
                  borderRadius: '12px', 
                  backgroundColor: '#FF9800',
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