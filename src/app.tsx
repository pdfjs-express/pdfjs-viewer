import React from 'react';
import ReactDOM from 'react-dom';
import Viewer from './components/Viewer/Viewer';

const App = () => {
  return (
    <div>
      <Viewer />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));