import { useMutation } from "@tanstack/react-query";

import { Grid2 } from "@mui/material";
import {
	FormDialog,
	TextField,
	useNotificationCenter,
} from "@pautena/react-design-system";
import type { ItemCreate } from "../../client";
import { createItemMutation } from "../../client/@tanstack/react-query.gen";
import { handleError } from "../../utils";

interface AddItemProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AddItem = ({ isOpen, onClose }: AddItemProps) => {
	const { show } = useNotificationCenter();

	const createItem = useMutation({
		...createItemMutation(),
		onSuccess: () => {
			show({
				severity: "success",
				message: "Item created",
			});
			onClose();
		},
		onError: (err) => {
			handleError(err, show);
		},
	});

	const handleSubmit = (data: ItemCreate) =>
		createItem.mutate({
			body: data,
		});

	return (
		<FormDialog
			open={isOpen}
			onCancel={onClose}
			title="Add Item"
			onSubmit={handleSubmit}
			loading={createItem.isPending}
		>
			<Grid2 container spacing={2}>
				<Grid2 size={12}>
					<TextField
						name="title"
						label="Title"
						fullWidth
						required
						variant="outlined"
					/>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						name="description"
						label="Description"
						fullWidth
						required
						variant="outlined"
					/>
				</Grid2>
			</Grid2>
		</FormDialog>
	);
};
