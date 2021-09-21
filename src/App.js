import { useState } from 'react';
import Board from './components/Board';
import Menu from './components/Menu';
import './components/style.css';
import './components/mobile-style.css';

function App() {
    const [start,setStart] = useState(false); 
    return (
        <div className='App'>

            {!start ? <Menu startGame={setStart}/> : <Board />}
        </div>
    );
}

export default App;
