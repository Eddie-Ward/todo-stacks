import { Edges, Plane } from "@react-three/drei";
import React from "react";

interface StackFloorProps {
	position: [number, number];
	dimension: [number, number];
	scale: number;
	visible: boolean;
	length: number;
}

const StackFloor = ({
	position,
	dimension,
	scale,
	visible,
	length,
}: StackFloorProps) => {
	return (
		<Plane
			position={[position[0], 0.01, position[1]]}
			args={dimension}
			scale={scale}
			rotation={[-Math.PI / 2, 0, 0]}
			visible={length > 0 ? visible : true}>
			<meshBasicMaterial
				transparent={true}
				color="#FB8500"
				opacity={0.5}
			/>
			<Edges color="#FB8500" />
		</Plane>
	);
};

export default StackFloor;
