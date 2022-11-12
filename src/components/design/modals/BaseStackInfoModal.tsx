import { Html } from "@react-three/drei";
import React, { useContext, useEffect } from "react";
import { EventsContext } from "../../../shared/EventContext";

interface StackInfoProps {
	visible: boolean;
	category?: string;
	length: number;
}

const BaseStackInfoModal = ({ visible, category, length }: StackInfoProps) => {
	return (
		<Html
			transform
			position={length === 0 ? [0, 0, 1.5] : [0, 2, 0]}
			prepend
			zIndexRange={[5, 0]}
			sprite
			visible={visible}>
			{length === 0 ? (
				category ? (
					<>
						<h1
							className={`pointer-events-none text-center font-cursive text-3xl font-semibold text-th-orange-700 sm:font-medium ${
								visible ? "block" : "hidden"
							}`}>
							{category}
						</h1>
						<p
							className={`pointer-events-none text-center font-cursive text-3xl font-semibold text-green-600 sm:font-medium ${
								visible ? "block" : "hidden"
							}`}>
							Add a todo
						</p>
					</>
				) : (
					<h1
						className={`pointer-events-none text-center font-cursive text-3xl font-semibold text-green-600  sm:font-medium ${
							visible ? "block" : "hidden"
						}`}>
						Add a stack
					</h1>
				)
			) : (
				<h1
					className={`pointer-events-none text-center font-cursive text-3xl font-semibold text-th-orange-700  sm:font-medium ${
						visible ? "block" : "hidden"
					}`}>
					{category}
				</h1>
			)}
		</Html>
	);
};

export default BaseStackInfoModal;
