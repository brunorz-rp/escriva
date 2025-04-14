export default function LoadingDots() {
	return (
		<div className="flex space-x-2">
			{[0, 1, 2].map((i) => (
				<div
					key={i}
					className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
					style={{ animationDelay: `${i * 0.1}s` }}
				/>
			))}
		</div>
	);
}
