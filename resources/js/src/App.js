import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router'



function App() {
    
  return (
        <div>

              <Router/>
        </div>
    );
    
}

export default App;

ReactDOM.render(<App />, document.getElementById('user'));
