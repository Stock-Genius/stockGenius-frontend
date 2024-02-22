import React from 'react';
import { useDispatch } from 'react-redux';



function Message({ success, message, setShowAlertBox }) {

    const dispatch = useDispatch();

    const clearMessage = () => {
        setShowAlertBox(false);
        dispatch({ type: 'RESET_STATE' });
    }

    return (
        <>
            <div className={`fixed top-20 right-2 items-center z-50 px-4 py-2  ${success ? 'text-green-800' : 'text-red-800'}  border-t-4  ${success ? 'border-green-300' : 'border-red-300'}    ${success ? 'bg-green-50' : 'bg-red-50'}  ${success ? 'dark:text-green-400' : 'dark:text-red-400'}  dark:bg-gray-800  ${success ? 'dark:border-green-800' : 'dark:border-red-800'}`} role="alert">

                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                {message}
                <button onClick={clearMessage} className={`ml-2 -mx-1.5 -my-1.5 ${success ? 'bg-green-50' : 'bg-red-50'} ${success ? 'text-green-500' : 'text-red-500'}  rounded-lg focus:ring-2  ${success ? 'focus:ring-green-400' : 'focus:ring-red-400'}  p-1.5  ${success ? 'hover:bg-green-200' : 'hover:bg-red-200'}  inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800  ${success ? 'dark:text-green-400' : 'dark:text-red-400'}  dark:hover:bg-gray-700`}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default Message;
