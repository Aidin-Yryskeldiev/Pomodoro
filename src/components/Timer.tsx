import { useEffect, useState } from "react";
import TimerButton from "./TimerButton";
import SettingsModal from "./SettingsModal";
import { Settings } from "../types/Settings";
import { TimerMode } from "../types/TimerMode";
import { Box, Button, Typography, styled } from "@mui/material";
import { LinearProgress } from "@mui/material";

const Timer: React.FC = () => {
	const [seconds, setSeconds] = useState<number>(0);
	const [click, setClick] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [settings, setSettings] = useState<Settings>({
		pomodoro: 0,
		shortBreak: 0,
		longBreak: 0,
		longBreakInterval: 0,
		autoStartBreaks: false,
		autoStartPomodoros: false,
	});
	const [mode, setMode] = useState<TimerMode>("pomodoro");
	const [cycleCount, setCycleCount] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		if (!click) return;

		const intervalId = setInterval(() => {
			setSeconds((prev) => {
				if (prev > 0) {
					return prev - 1;
				} else {
					clearInterval(intervalId);
					switchMode();
					return 0;
				}
			});
			setProgress((prev) =>
				prev < 100 ? prev + 100 / (settings.pomodoro * 60) : 100
			);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [click, mode]);

	useEffect(() => {
		document.title = `${Math.floor(seconds / 60)}:${(
			"0" +
			(seconds % 60)
		).slice(-2)}`;
	}, [seconds]);

	const switchMode = () => {
		if (mode === "pomodoro") {
			if ((cycleCount + 1) % settings.longBreakInterval === 0) {
				setMode("longBreak");
				setSeconds(settings.longBreak * 60);
			} else {
				setMode("shortBreak");
				setSeconds(settings.shortBreak * 60);
			}
			setCycleCount(cycleCount + 1);
		} else {
			setMode("pomodoro");
			setSeconds(settings.pomodoro * 60);
		}

		setProgress(0);
	};

	const applySettings = () => {
		setSeconds(settings.pomodoro * 60);
		console.log("Settings applied:", settings);
	};

	useEffect(() => {
		document.body.style.backgroundColor =
			mode === "pomodoro"
				? "#ba4949"
				: mode === "shortBreak"
				? "#38858a"
				: "#397097";
	}, [mode]);

	const handleModeChange = (newMode: TimerMode) => {
		setMode(newMode);
		setSeconds(
			newMode === "pomodoro"
				? settings.pomodoro * 60
				: newMode === "shortBreak"
				? settings.shortBreak * 60
				: settings.longBreak * 60
		);
		setClick(false);
		setProgress(0);
	};

	return (
		<Box>
			<Box sx={{ marginLeft: "60%" }}>
				<Button
					sx={{
						backgroundColor: "rgba(0, 0, 0, 0.1)",
						"&:hover": {
							backgroundColor: "rgba(0, 0, 0, 0.1)",
						},
					}}
					variant="contained"
					onClick={() => setShowModal(true)}>
					&#9883; Setting
				</Button>
			</Box>

			<LinearProgress
				variant="determinate"
				value={progress}
				sx={{
					width: "45%",
					margin: "0 auto",
					position: "relative",
					top: "20px",
					backgroundColor: "rgba(0, 0, 0, 0.1)",
					"& .MuiLinearProgress-bar": {
						backgroundColor: "#ffffff",
					},
				}}
			/>

			<BoxMuiForm>
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<TimerButton
						mode="pomodoro"
						onClick={handleModeChange}
						isActive={mode === "pomodoro"}
					/>

					<TimerButton
						mode="shortBreak"
						onClick={handleModeChange}
						isActive={mode === "shortBreak"}
					/>

					<TimerButton
						mode="longBreak"
						onClick={handleModeChange}
						isActive={mode === "longBreak"}
					/>
				</Box>

				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Typography sx={{ fontSize: "150px", color: "white" }}>
						{Math.floor(seconds / 60)}:{("0" + (seconds % 60)).slice(-2)}
					</Typography>

					<Button
						sx={{
							width: "200px",
							height: "50px",
							fontSize: "20px",
							fontWeight: "bold",
							backgroundColor: "white",
							color: "#ba4949",
							"&:hover": {
								backgroundColor: "white",
							},
						}}
						variant="contained"
						onClick={() => setClick(!click)}>
						{click ? "Stop" : "Start"}
					</Button>
				</Box>

				<SettingsModal
					open={showModal}
					onClose={() => setShowModal(false)}
					settings={settings}
					setSettings={setSettings}
					applySettings={applySettings}
				/>
			</BoxMuiForm>
		</Box>
	);
};

export default Timer;

const BoxMuiForm = styled(Box)(() => ({
	width: "500px",
	height: "330px",
	backgroundColor: "rgba(0, 0, 0, 0.1)",
	borderRadius: "7px",
	position: "relative",
	top: "70px",
	margin: "0 auto",
	paddingTop: "20px",
}));
