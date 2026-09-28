import { useState } from 'react';
import './App.css';

function App() {
	const [size, setSize] = useState<number>(8);
	const [states, setStates] = useState<boolean[][]>(Array.from({ length: size }, () => Array(size).fill(false)));
	const [isSolved, setIsSolved] = useState<boolean>(false);

	const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSize = parseInt(event.target.value, 10);
		if (!isNaN(newSize) && newSize > 0) {
			setSize(newSize);
			setStates(Array.from({ length: newSize }, () => Array(newSize).fill(false)));
			setIsSolved(false);
		}
	};

	const checkIfSolved = () => {
		setIsSolved(states.every((row) => row.every((cell) => cell)));
	};

	const handleButtonClick = (yIndex: number, xIndex: number) => {
		const newStates = [...states];
		newStates[yIndex][xIndex] = !newStates[yIndex][xIndex];

		if (yIndex - 1 >= 0) newStates[yIndex - 1][xIndex] = !newStates[yIndex - 1][xIndex]; // Toggle the button above
		if (yIndex + 1 < size) newStates[yIndex + 1][xIndex] = !newStates[yIndex + 1][xIndex]; // Toggle the button below
		if (xIndex - 1 >= 0) newStates[yIndex][xIndex - 1] = !newStates[yIndex][xIndex - 1]; // Toggle the button to the left
		if (xIndex + 1 < size) newStates[yIndex][xIndex + 1] = !newStates[yIndex][xIndex + 1]; // Toggle the button to the right

		setStates(newStates);
		checkIfSolved();
	};

	return (
		<>
			<div className="size">
				<span>Size:</span>
				<input name="size-input" id="size-input" defaultValue={size} onChange={handleSizeChange} />
			</div>
			<div className="container">
				{isSolved ? (
					<div className="solved-message">
						<h2>Congratulations!</h2>
						<p>You've solved the puzzle!</p>
						<button onClick={() => window.location.reload()}>Play Again</button>
					</div>
				) : (
					states.map((row, yIndex) => (
						<div key={yIndex} className="column">
							{row.map((_, xIndex) => (
								<div
									key={`${xIndex}-${yIndex}`}
									className={`button ${states[yIndex][xIndex] ? 'active' : ''}`}
									onClick={() => handleButtonClick(yIndex, xIndex)}
									style={{ height: `${75 / size}vh` }}
								/>
							))}
						</div>
					))
				)}
			</div>
		</>
	);
}

export default App;
