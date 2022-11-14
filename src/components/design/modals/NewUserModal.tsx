import React from "react";

interface NewUserModalProps {
	setNewUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewUserModal = ({ setNewUserModal }: NewUserModalProps) => {
	return (
		<section className="absolute left-1/2 bottom-4 z-10 w-72 -translate-x-1/2 rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-3 text-center">
			<h1 className="mb-2 font-cursive text-2xl font-bold text-th-blue-900">
				Welcome!
			</h1>
			<p className="mb-2 font-cursive text-xl font-medium text-th-blue-900">
				Click the top block of a stack to get started. Happy
				productivity!
			</p>
			<button
				className="rounded-lg bg-th-orange-500 p-2 font-cursive text-2xl font-medium text-white hover:bg-th-orange-700"
				onClick={(e) => {
					e.stopPropagation();
					setNewUserModal(false);
				}}>
				Got it!
			</button>
		</section>
	);
};

export default NewUserModal;
