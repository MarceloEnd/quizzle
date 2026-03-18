import { useParams } from 'react-router-dom';
import { StandardHeader } from '../components/StandardHeader';
import { selectedJokes } from './functions/helper';
import { TextCarousel } from './components/textCarousel';

export const JokeSite = () => {
    const { id } = useParams();
    const jokeId = parseInt(id)
    const data = selectedJokes(jokeId);

  return (
    <div className="Jokes">
       <StandardHeader previousPath="/witzliste"/>
       <br/>
       <br/>
       <TextCarousel messages={data} />
    </div>
  );
}