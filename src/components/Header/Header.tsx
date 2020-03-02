import React from 'react';
import Button from '../Button/Button';
import useGlobalState from '../../state/useGlobalState';

import './Header.scss';

export default () => {

  const [currentZoom, setZoom] = useGlobalState('zoom');

  return (
    <div className='Header'>
      <Button
        icon='add_circle_outline'
        onClick={() => setZoom(currentZoom * 1.5)}
      /> 

      <Button
        icon='remove_circle_outline'
        onClick={() => setZoom(currentZoom / 1.5)}
      /> 
    </div>  
  )
}

