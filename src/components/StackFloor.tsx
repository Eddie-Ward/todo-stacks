import React, { useContext, useState } from "react";
import { Edges, Plane } from "@react-three/drei";
import { EventsContext } from "../shared/EventContext";
import BaseStackInfoModal from "./design/modals/BaseStackInfoModal";

interface StackFloorProps {
	position: [number, number];
	dimension: [number, number];
	scale: number;
	hue: number;
	visible: boolean;
	length: number;
	category?: string;
	setNewTodo?: React.Dispatch<React.SetStateAction<boolean>>;
	setNewStack?: React.Dispatch<React.SetStateAction<boolean>>;
	children?: React.ReactNode;
}

const StackFloor = ({
	position,
	dimension,
	scale,
	hue,
	visible,
	length,
	category,
	setNewTodo,
	setNewStack,
	children,
}: StackFloorProps) => {
	const { disableEvents } = useContext(EventsContext);
	const [hovered, setHovered] = useState(false);

	return (
		<Plane
			position={[position[0], 0.01, position[1]]}
			args={dimension}
			scale={scale}
			rotation={[-Math.PI / 2, 0, 0]}
			visible={length > 0 ? visible : true}
			onClick={(e) => {
				e.stopPropagation();
				if (!disableEvents && length == 0) {
					if (setNewTodo) {
						setNewTodo(true);
						setHovered(false);
					} else if (setNewStack) {
						setNewStack(true);
						setHovered(false);
					}
				}
			}}
			onPointerEnter={(e) => {
				e.stopPropagation();
				if (!disableEvents && length == 0) {
					setHovered(true);
				}
			}}
			onPointerLeave={(e) => {
				e.stopPropagation();
				if (!disableEvents && length == 0) {
					setHovered(false);
				}
			}}>
			<meshBasicMaterial
				color={`hsl(${hue}, ${category ? "50%" : "25%"}, 50%)`}
				opacity={
					category
						? hovered || visible
							? 0.6
							: 0.5
						: hovered
						? 0.6
						: 0.2
				}
				transparent={true}
			/>
			{children}
			<Edges color={`hsl(${hue}, 70%, 50%)`} />
			{length === 0 ? (
				<BaseStackInfoModal
					visible={category ? visible || hovered : hovered}
					category={category}
					length={length}
				/>
			) : null}
		</Plane>
	);
};

export default StackFloor;
