import React from 'react';

function LoadingPage() {
	return (
		<div className="flex space-x-2 justify-center items-center bg-gray-400/20 h-full dark:invert">
			<span className="sr-only">Loading...</span>
			<div className="h-4 w-4 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
			<div className="h-4 w-4 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
			<div className="h-4 w-4 bg-gray-700 rounded-full animate-bounce"></div>
		</div>
	);
}

export default LoadingPage;
