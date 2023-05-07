
import './App.css';
import './Style.css';
import Header from './components/Header';
import Main from './components/Main';
import Navbar from './components/Navbar';

function App() {
  return (
 <div data-spy="scroll" data-target=".navbar" data-offset="40" id="home">
  <Navbar />
  <Header />
  <Main />
 </div>
  );
}

export default App;
