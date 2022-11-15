import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import World from "./../components/World";
import { t } from "../utils/tunnel";
import { trpc } from "../utils/trpc";
import { UserContext } from "../shared/UserContext";
import LoadingModal from "./design/modals/LoadingModal";

const App = () => {
	const userMutation = trpc.user.createNewUser.useMutation();
	const [userId, setUserId] = useState<string | null>(null);
	useEffect(() => {
		if (typeof window !== undefined) {
			setUserId(localStorage.getItem("todoStacksUserId") ?? "");
		}
	}, []);

	const createNewUser = () => {
		userMutation.mutate(
			{},
			{
				async onSuccess(data) {
					localStorage.setItem("todoStacksUserId", data.userId);
					setUserId(data.userId);
				},
			}
		);
	};

	return (
		<>
			{userId === "" ? (
				<article className="absolute top-1/2 left-1/2 w-64 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-6 text-center">
					<h1 className="mb-4 font-cursive text-3xl font-bold text-th-blue-900">
						TodoStacks
					</h1>
					<p className="mb-4 font-cursive text-2xl font-medium text-th-blue-900">
						Welcome!
					</p>
					<button
						className={`rounded-lg  p-3 font-cursive text-2xl font-medium text-white ${
							!userMutation.isLoading && !userMutation.isSuccess
								? "bg-th-orange-500 hover:bg-th-orange-700"
								: "bg-gray-300"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							createNewUser();
						}}
						disabled={
							userMutation.isLoading || userMutation.isSuccess
						}>
						Get started
					</button>
				</article>
			) : userId ? (
				<UserContext.Provider value={userId}>
					<Canvas shadows={true} frameloop="demand">
						<World />
					</Canvas>
					<t.Out />
				</UserContext.Provider>
			) : (
				<article className="absolute top-1/2 left-1/2 w-64 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-6 text-center">
					<h1 className="mb-4 font-cursive text-3xl font-bold text-th-blue-900">
						TodoStacks
					</h1>
					<p className="mb-4 font-cursive text-2xl font-medium text-th-blue-900">
						Loading canvas...
					</p>
				</article>
			)}
			<LoadingModal />
		</>
	);
};

export default App;
