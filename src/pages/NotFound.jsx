import React from 'react';
import error from '../assets/error.png'

const NotFound = () => {
  return (
    <div className="flex items-center flex-col gap-5 justify-center h-[80vh] bg-zinc-900">
      <img
        src={error}
        alt=""
        className='size-32'
      />
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-gray-400 mb-8">Page Not Found</p>
      </div>
    </div>
  );
}

export default NotFound;
