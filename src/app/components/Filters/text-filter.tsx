import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";

export default function TextFilter({
	placeholder,
	onFilterChange,
}: {
	placeholder: string;
	onFilterChange: (value: string) => void;
}) {
	const handleChange = useDebouncedCallback((term: string) => {
		onFilterChange(term);
	}, 300);

	return (
		<div className="relative flex flex-1 flex-shrink-0">
			<MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
			<input
				className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
				placeholder={placeholder}
				onChange={(e) => {
					handleChange(e.target.value);
				}}
				defaultValue=""
			/>
		</div>
	);
}
