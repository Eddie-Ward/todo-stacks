import React, { useContext, useMemo, useState } from "react";
import { Html } from "@react-three/drei";
import Stack from "./Stack";
import StackFloor from "./StackFloor";
import NewStackModal from "./design/modals/NewStackModal";
import { UserContext } from "../shared/UserContext";
import { trpc } from "../utils/trpc";
import { t } from "../utils/tunnel";

const DIMENSIONS: [number, number] = [1.5, 1.5];
const SPACING = 2;
const LAYOUT = { ROW: 4, COL: 4 };
const HEIGHT_SCALE = 0.4;

const WorldStack = () => {
	const userId = useContext(UserContext);
	const { data } = trpc.stack.getAllStackIdsByUser.useQuery(
		{ id: userId },
		{ refetchOnWindowFocus: false }
	);
	const [newStack, setNewStack] = useState(false);

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

	return data ? (
		<>
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
					hue={205}
					visible={true}
					length={0}
					setNewStack={setNewStack}
				/>
			) : null}
			<t.In>
				{newStack ? <NewStackModal setNewStack={setNewStack} /> : null}
			</t.In>
		</>
	) : (
		<Html position={[0, 0, 0]}>
			<h1>Loading...</h1>
		</Html>
	);
};

export default WorldStack;
