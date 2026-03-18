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
  EmojiEmotions as JokeIcon, 
  ArrowForwardIos as ArrowIcon 
} from '@mui/icons-material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';



export const StartSite = () => {
  const activities = [
    {
      title: "Quiz",
      description: "Teste dein Wissen?",
      icon: <QuizIcon sx={{ fontSize: 40, color: '#FF9800' }} />,
      color: '#FFF3E0',
      btnColor: '#FF9800',
      path: "/quizliste"
    },
    {
      title: "Witze",
      description: "Klopf Klopf! Wer ist da?",
      icon: <JokeIcon sx={{ fontSize: 40, color: '#E91E63' }} />,
      color: '#FCE4EC',
      btnColor: '#E91E63',
      path: "/witzliste"
    },
    {
      title: "Spiele",
      description: "Teste deinen Geist?",
      icon: <VideogameAssetIcon sx={{ fontSize: 40, color: '#219538ff' }} />,
      color: '#e3fae8ff',
      btnColor: '#219538ff',
      path: "/spiele"
    }
  ];

  return (
    <div className="Start">
      <StandardHeader />
      <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, textAlign: 'center', bgcolor: 'transparent' }}>

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
                {item.icon}
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
                  backgroundColor: item.btnColor,
                  '&:hover': { backgroundColor: item.btnColor, filter: 'brightness(0.9)' }
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