"use client";

import { useState } from "react";

interface DropdownProps {
	selectedOption: string;
	onSelect: (value: string) => void;
}

export default function CustomDropdown({
	selectedOption,
	onSelect,
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);

	const options = [
		{ value: "apple", label: "🍎 Apple" },
		{ value: "banana", label: "🍌 Banana" },
		{ value: "orange", label: "🍊 Orange" },
	];

	const handleSelect = (label: string) => {
		console.log("Dropdown selecting:", label); // Debug log
		onSelect(label); // Should update parent state
		setIsOpen(false);
	};

	return (
		<div className="relative w-64">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full p-2 border rounded"
			>
				{selectedOption || "Select an option"}
			</button>
			{isOpen && (
				<div className="absolute mt-1 w-full bg-white border shadow-lg">
					{options.map((option) => (
						<div
							key={option.value}
							onClick={() => handleSelect(option.label)}
							className="p-2 hover:bg-gray-100 cursor-pointer"
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
