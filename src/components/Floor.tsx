import type { MeshProps } from "@react-three/fiber";
import React from "react";

function Floor(props: MeshProps) {
	return (
		<mesh {...props} receiveShadow={true}>
			<boxBufferGeometry args={[20, 2, 10]} />
			<meshPhongMaterial color={"white"} />
		</mesh>
	);
}

export default Floor;
