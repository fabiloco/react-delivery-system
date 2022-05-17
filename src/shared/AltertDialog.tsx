import { FC, useState } from "react";

import {
	DialogTitle,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";

interface AltertDialogProps {
	isOpen: boolean;
	toggleIsOpen: (value: boolean) => void;
	action: () => void;
	title: string;
	content: string;
	agreeBtnText: string;
}

export const AltertDialog: FC<AltertDialogProps> = ({
	toggleIsOpen,
	isOpen,
	content,
	title,
	agreeBtnText,
	action,
}) => {
	const handleOnClickAgreeBtn = () => {
		toggleIsOpen(!isOpen);
		action();
	};

	return (
		<Dialog
			open={isOpen}
			onClose={() => toggleIsOpen(!isOpen)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={(e) => toggleIsOpen(!isOpen)}>Cancel</Button>
				<Button onClick={(e) => handleOnClickAgreeBtn()} autoFocus>
					{agreeBtnText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
