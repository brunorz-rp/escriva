import React from "react";

interface ActionButtonProps {
	onClick: () => void; // Function with no parameters
	label: string;
}

export default function SalvarNoBanco({ onClick, label }: ActionButtonProps) {
	return (
		<button
			onClick={onClick}
			className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
		>
			{label}
		</button>
	);
}
