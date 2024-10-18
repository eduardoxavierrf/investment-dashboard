import React from 'react';
import Navigation from '../components/Navigation';

const Home: React.FC = () => {
  return (
    <div>
      <Navigation />
      <div className='flex mt-[10vh] flex-col items-center'>
        <svg className='w-8 animate-pulse' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#6b7280" d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z"/></svg>
        <span className='text-gray-500'>Procure uma ação para ver informações...</span>
      </div>
    </div>
  )
}

export default Home;