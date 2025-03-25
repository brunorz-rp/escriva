"use client";

// pages/index.js
import React from "react";

const FetchFromDB = () => {
	const handleClick = () => {
		alert("Button clicked!");
	};

	return (
		<button
			className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-200"
			onClick={handleClick}
		>
			<span>Carregar</span>
		</button>
	);
};

export default FetchFromDB;
