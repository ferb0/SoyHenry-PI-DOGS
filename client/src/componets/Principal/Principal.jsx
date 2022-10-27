import { Route } from 'react-router-dom';
import ConjuntBreed from '../ConjuntBreed/ConjuntBreed.jsx';
import DetailBreed from '../DetailBreed/DetailBreed.jsx';
import Nav from '../Nav/Nav.jsx'
import Search from '../Search/Search.jsx';

export default function Principal() {
    return (
      <div className="App">
        <Nav />
        <Route exact path='/' component={Search} />
        <Route exact path='/' component={ConjuntBreed} />
        <Route path='/breed/:id' component={DetailBreed}/>
      </div>
    );  
  }