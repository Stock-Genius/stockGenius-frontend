import React from 'react'

function ServerError() {
  return (
    <>
        <div className='py-32 flex-grow items-start justify-center bg-gray-50'>
          <div className='rounded-lg bg-white p-8 text-center shadow-xl'>
            <h1 className='mb-4 text-4xl font-bold'>404</h1>
            <p className='text-gray-600'>Server Not Start</p>
            <p className='text-red-600'>Oops! Something Went Wrong Contact With The Site Owner</p>
          </div>
        </div>
    </>
  )
}

export default ServerError;
