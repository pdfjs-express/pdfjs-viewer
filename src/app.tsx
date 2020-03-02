import React from 'react';
import ReactDOM from 'react-dom';
import Viewer from './components/Viewer/Viewer';
import Header from './components/Header/Header';
import './app.scss';

const App = () => {
  return (
    <div className='app'>
      <Header />
      <Viewer />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));