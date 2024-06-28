import { TimerMode } from "../types/TimerMode";

type TimerButtonProps = {
	mode: TimerMode;
	onClick: (mode: TimerMode) => void;
	isActive: boolean;
};

const TimerButton: React.FC<TimerButtonProps> = ({
	mode,
	onClick,
	isActive,
}) => {
	return (
		<button
			onClick={() => onClick(mode)}
			style={{
				backgroundColor: isActive
					? mode === "pomodoro"
						? "rgba(0, 0, 0, 0.1)"
						: mode === "shortBreak"
						? "rgba(0, 0, 0, 0.1)"
						: "rgba(0, 0, 0, 0.1)"
					: "transparent",
				color: "white",
				border: "none",
				borderRadius: "10px",
				fontSize: "15px",
				width: "100px",
				height: "30px",
				cursor: "pointer",
			}}>
			{mode.charAt(0).toUpperCase() + mode.slice(1)}
		</button>
	);
};

export default TimerButton;
