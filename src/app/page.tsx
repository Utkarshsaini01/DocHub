import React from 'react';

import Main from '../components/main';
import Header from '../components/header';

export default function Home() {
  return (
    <>
    <div className='flex flex-col items-center justify-center h-screen'>
      <Header />
      <Main />
      </div>
    </>
  )
}
