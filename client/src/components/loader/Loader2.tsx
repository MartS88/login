import React from 'react';
import { ColorRing } from 'react-loader-spinner';

interface LoaderProps {
  height: string;
  width: string;
}

const Loader2: React.FC<LoaderProps> = ({ height, width }) => {
  return (
    <ColorRing
      visible={true}
      height={height}
      width={width}
      ariaLabel='Loader'
      wrapperStyle={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      wrapperClass='loader-wrapper'
      colors={['#fcefef', '#FFFFFF', '#c9c4c4', '#fcefef', '#FFFFFF']}
    />
  );
};

export default Loader2;
