import './App.css';
import AdComponent from './components/AdComponent';
import Router from './Router/router';

function App() {
  return (
    <div className="App">
      <Router />
      <AdComponent adSlot="f08c47fec0942fa0" key={window.location.pathname} />
    </div>
  );
}

export default App;
