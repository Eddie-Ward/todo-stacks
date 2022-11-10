import React from "react";
import { Edges, Html, Plane } from "@react-three/drei";

interface StackFloorProps {
	position: [number, number];
	dimension: [number, number];
	scale: number;
	hue: number;
	visible: boolean;
	length: number;
	category?: string;
	children: React.ReactNode;
}

const StackFloor = ({
	position,
	dimension,
	scale,
	hue,
	visible,
	length,
	category,
	children,
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
				color={`hsl(${hue}, 70%, 50%)`}
				opacity={0.5}
			/>
			{children}
			<Edges color={`hsl(${hue}, 70%, 50%)`} />
			{category ? (
				<Html transform zIndexRange={[100, 0]}>
					<h1 className="pointer-events-none translate-y-11 text-left font-cursive text-sm font-medium text-th-orange-700">
						{category}
					</h1>
				</Html>
			) : null}
		</Plane>
	);
};

export default StackFloor;
