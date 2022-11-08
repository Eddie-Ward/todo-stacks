import {
	OrbitControls,
	PerspectiveCamera,
	Bounds,
	ContactShadows,
	Center,
} from "@react-three/drei";
import React, { useReducer } from "react";
import { stacks as initialStackIds } from "../utils/todos";
import Stack from "./Stack";
import { stackReducer } from "../shared/stackReducer";

const positions: Array<[number, number]> = [
	[1, 1],
	[-1, 1],
];

const World = () => {
	const [stackIds, dispatch] = useReducer(stackReducer, initialStackIds);

	return (
		<>
			<PerspectiveCamera makeDefault fov={65} />
			<OrbitControls
				makeDefault
				enablePan={false}
				minPolarAngle={Math.PI / 2.5}
				maxPolarAngle={Math.PI / 2.5}
			/>
			<pointLight position={[10, 10, 10]} />
			<Bounds fit clip observe damping={0.5} margin={2.25}>
				<Center disableY>
					{stackIds.map((stackId, index) => (
						<Stack
							key={stackId}
							position={positions[index]}
							dimension={[1, 1]}
							heightScale={0.25}
							stackId={stackId}
						/>
					))}
				</Center>
			</Bounds>
			<ContactShadows
				position={[0, -0.1, 0]}
				scale={20}
				opacity={0.6}
				far={25}
				blur={1.5}
			/>
			{/* <Floor position={[0, 0, 0]} /> */}
			{/* <Floor position={[0, -2, 0]} /> */}
		</>
	);
};

export default World;
