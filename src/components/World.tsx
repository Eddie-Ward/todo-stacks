import {
	OrbitControls,
	PerspectiveCamera,
	Bounds,
	ContactShadows,
	Center,
} from "@react-three/drei";
import React, { useReducer, useState } from "react";
import { stacks as initialStackIds } from "../utils/todos";
import Stack from "./Stack";
import { stackReducer } from "../shared/stackReducer";
import { EventsContext } from "../shared/EventContext";

const positions: Array<[number, number]> = [
	[1, 1],
	[-1, 1],
];

const World = () => {
	const [stackIds, dispatch] = useReducer(stackReducer, initialStackIds);
	const [disableEvents, setDisableEvents] = useState(false);

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
					<EventsContext.Provider
						value={{ disableEvents, setDisableEvents }}>
						{stackIds.map((stackId, index) => (
							<Stack
								key={stackId}
								position={positions[index]}
								dimension={[1, 1]}
								heightScale={0.25}
								stackId={stackId}
							/>
						))}
					</EventsContext.Provider>
				</Center>
			</Bounds>
			<ContactShadows
				position={[0, -0.1, 0]}
				scale={20}
				opacity={0.6}
				far={25}
				blur={1.5}
			/>
		</>
	);
};

export default World;
