import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Grid2 } from "@mui/material";
import {
	FormDialog,
	TextField,
	useNotificationCenter,
} from "@pautena/react-design-system";
import type { ItemPublic, ItemUpdate } from "../../client";
import { updateItemMutation } from "../../client/@tanstack/react-query.gen";
import { handleError } from "../../utils";

interface EditItemProps {
	isOpen: boolean;
	item: ItemPublic;
	onClose: () => void;
}

export const EditItem = ({ isOpen, item, onClose }: EditItemProps) => {
	const queryClient = useQueryClient();
	const { show } = useNotificationCenter();

	const updateItem = useMutation({
		...updateItemMutation(),
		onSuccess: () => {
			show({
				severity: "success",
				message: "Item updated",
			});
			onClose();
		},
		onError: (err) => {
			handleError(err, show);
		},
	});

	const handleSubmit = (data: ItemUpdate) =>
		updateItem.mutate({ path: { id: item.id }, body: data });

	return (
		<FormDialog
			open={isOpen}
			onCancel={onClose}
			title="Edit Item"
			onSubmit={handleSubmit}
			loading={updateItem.isPending}
		>
			<Grid2 container spacing={2}>
				<Grid2 size={12}>
					<TextField
						name="title"
						label="Title"
						fullWidth
						required
						variant="outlined"
						defaultValue={item.title}
					/>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						name="description"
						label="Description"
						fullWidth
						required
						variant="outlined"
						defaultValue={item.description}
					/>
				</Grid2>
			</Grid2>
		</FormDialog>
	);
};
