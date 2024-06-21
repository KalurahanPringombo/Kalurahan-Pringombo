import { Suspense } from 'react';

import { NewVerificationForm } from '@/components/auth/form/new-verification-form';

const NewVefiricationPage = () => {
	return (
		<section className="bg-gray-700 min-h-screen flex items-center justify-center w-full">
			<Suspense>
				<NewVerificationForm />
			</Suspense>
		</section>
	);
};
export default NewVefiricationPage;
