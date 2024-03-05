import React from 'react'

function ServerError({error}) {
  return (
    <>
        <div className='flex-grow flex  items-start justify-center w-full'>
          <div className='rounded-lg bg-white p-8 text-center shadow-xl max-w-sm'>
            <h1 className='mb-4 text-4xl font-bold'>404</h1>
            <p className='text-gray-600'>{error}</p>
            <p className='text-red-600'>Oops! Something Went Wrong Contact With The Site Owner</p>
          </div>
        </div>
    </>
  )
}

export default ServerError;
