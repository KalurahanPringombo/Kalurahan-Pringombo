import { AlertTriangleIcon } from 'lucide-react';

type FormErrorProps = {
	message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;
	return (
		<div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive dark:bg-destructive/30 dark:text-red-500 ">
			<AlertTriangleIcon className="h-5 w-5" />
			<p>{message}</p>
		</div>
	);
};
