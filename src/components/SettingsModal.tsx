import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { Settings } from "../types/Settings";

type SettingsModalProps = {
	open: boolean;
	onClose: () => void;
	settings: Settings;
	setSettings: React.Dispatch<React.SetStateAction<Settings>>;
	applySettings: () => void;
};

const SettingsModal: React.FC<SettingsModalProps> = ({
	open,
	onClose,
	settings,
	setSettings,
	applySettings,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setSettings((prevSettings) => ({
			...prevSettings,
			[name]: type === "checkbox" ? checked : Number(value),
		}));
	};

	const handleSave = () => {
		applySettings();
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle sx={{ textAlign: "center" }}>Settings</DialogTitle>
			<DialogContent>
				<form>
					<TextField
						margin="dense"
						label="Pomodoro (minutes)"
						type="number"
						name="pomodoro"
						value={settings.pomodoro}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						margin="dense"
						label="Short Break (minutes)"
						type="number"
						name="shortBreak"
						value={settings.shortBreak}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						margin="dense"
						label="Long Break (minutes)"
						type="number"
						name="longBreak"
						value={settings.longBreak}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						margin="dense"
						label="Long Break Interval"
						type="number"
						name="longBreakInterval"
						value={settings.longBreakInterval}
						onChange={handleChange}
						fullWidth
					/>
					<Checkbox
						name="autoStartBreaks"
						checked={settings.autoStartBreaks}
						onChange={handleChange}
					/>
					Auto Start Breaks
					<br />
					<Checkbox
						name="autoStartPomodoros"
						checked={settings.autoStartPomodoros}
						onChange={handleChange}
					/>
					Auto Start Pomodoros
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="contained" onClick={handleSave}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SettingsModal;
