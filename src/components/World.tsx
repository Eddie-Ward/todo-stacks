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
import { trpc } from "../utils/trpc";

const positions: Array<[number, number]> = [
	[1, 1],
	[-1, 1],
];

const World = () => {
	const [stackIds, dispatch] = useReducer(stackReducer, initialStackIds);
	const [disableEvents, setDisableEvents] = useState(false);

	const { data, error, isLoading } = trpc.stack.getAllStacksByUser.useQuery({
		id: "636c453d40c8338a3270b102",
	});

	return (
		<>
			<PerspectiveCamera makeDefault fov={65} />
			<OrbitControls
				makeDefault
				enableRotate={!disableEvents}
				enablePan={false}
				minPolarAngle={Math.PI / 2.5}
				maxPolarAngle={Math.PI / 2.5}
			/>
			<pointLight position={[10, 10, 10]} />
			{data ? (
				<Bounds fit clip observe damping={0.5} margin={2.25}>
					<Center disableY>
						<EventsContext.Provider
							value={{ disableEvents, setDisableEvents }}>
							{data.Stack.map((stack, index) => (
								<Stack
									key={stack.id}
									position={positions[index]}
									dimension={[1, 1]}
									heightScale={0.25}
									stack={stack}
								/>
							))}
						</EventsContext.Provider>
					</Center>
				</Bounds>
			) : null}
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
