import React, { useMemo, useState } from "react";
import {
	OrbitControls,
	PerspectiveCamera,
	Bounds,
	ContactShadows,
	Center,
	Html,
} from "@react-three/drei";
import Stack from "./Stack";
import { EventsContext } from "../shared/EventContext";
import { trpc } from "../utils/trpc";
import StackFloor from "./StackFloor";
import Add from "./design/svg/Add";

// const positions: Array<[number, number]> = [
// 	[1, 1],
// 	[-1, 1],
// ];

const DIMENSIONS: [number, number] = [1.5, 1.5];
const SPACING = 2;
const LAYOUT = { ROW: 4, COL: 4 };
const HEIGHT_SCALE = 0.4;

const World = () => {
	const [disableEvents, setDisableEvents] = useState(false);

	const { data } = trpc.stack.getAllStackIdsByUser.useQuery(
		{ id: "636c453d40c8338a3270b102" },
		{ refetchOnWindowFocus: false }
	);

	const positions = useMemo(() => {
		const stacks = data?.Stack ?? [];
		const numStacks = Math.min(16, stacks.length);
		const numPositions = numStacks === 16 ? numStacks : numStacks + 1;
		const origins: Array<[number, number]> = [];
		for (let i = 0; i < numPositions; i++) {
			origins.push([
				(i % LAYOUT.COL) * (DIMENSIONS[0] + SPACING),
				Math.floor(i / LAYOUT.ROW) * (DIMENSIONS[1] + SPACING),
			]);
		}
		return origins;
	}, [data]);

	console.log(positions);

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
									dimension={[DIMENSIONS[0], DIMENSIONS[1]]}
									heightScale={HEIGHT_SCALE}
									stackId={stack.id}
								/>
							))}
							{data.Stack.length < positions.length ? (
								<StackFloor
									position={positions[positions.length - 1]}
									dimension={[DIMENSIONS[0], DIMENSIONS[1]]}
									scale={1.5}
									hue={15}
									visible={true}
									length={0}>
									<Html
										style={{ translate: "-50% -100%" }}
										position={[0, 0, 0]}
										zIndexRange={[100, 0]}>
										<button
											className="btn-icon scale-75 bg-green-500 hover:bg-green-600"
											disabled={disableEvents}>
											<Add />
										</button>
									</Html>
								</StackFloor>
							) : null}
						</EventsContext.Provider>
					</Center>
				</Bounds>
			) : (
				<Html position={[0, 0, 0]}>
					<h1>Loading...</h1>
				</Html>
			)}
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
