import React, { useState } from "react";
import {
	OrbitControls,
	PerspectiveCamera,
	Bounds,
	ContactShadows,
	Center,
} from "@react-three/drei";
import WorldStack from "./WorldStack";
import { EventsContext } from "../shared/EventContext";

const World = () => {
	const [disableEvents, setDisableEvents] = useState(false);

	return (
		<>
			<PerspectiveCamera makeDefault fov={65} position={[10, 10, 10]} />
			<OrbitControls
				makeDefault
				enableRotate={!disableEvents}
				enablePan={false}
				minPolarAngle={Math.PI / 2.5}
				maxPolarAngle={Math.PI / 2.5}
			/>
			<pointLight position={[10, 10, 10]} />
			<Bounds
				fit
				clip
				observe
				damping={0.75}
				margin={window.innerWidth < 600 ? 1.95 : 3.25}>
				<Center disableY>
					<EventsContext.Provider
						value={{ disableEvents, setDisableEvents }}>
						<WorldStack />
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
