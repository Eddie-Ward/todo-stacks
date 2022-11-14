import React from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

const LoadingModal = () => {
	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	return isFetching || isMutating ? (
		<div className="pointer-events-none absolute bottom-4 right-4 font-cursive text-2xl font-medium text-th-blue-900">
			Loading...
		</div>
	) : null;
};

export default LoadingModal;
