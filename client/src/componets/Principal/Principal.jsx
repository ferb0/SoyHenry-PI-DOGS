import ConjuntBreed from '../ConjuntBreed/ConjuntBreed.jsx';
import Nav from '../Nav/Nav.jsx'
import Search from '../Search/Search.jsx';

export default function Principal() {
    return (
      <div className="App">
        <h1>Principal</h1>
        <Nav />
        <Search />
        <ConjuntBreed />
      </div>
    );
  }