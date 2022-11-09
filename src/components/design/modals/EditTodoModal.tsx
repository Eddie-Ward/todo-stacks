import { Html } from "@react-three/drei";
import React from "react";

const EditTodoModal = () => {
	return (
		<Html
			// fullscreen
			// className="flex content-center justify-center"
			// className="w-64 rounded-3xl border-4 border-solid border-t-light-orange bg-t-light-blue p-4 text-left"
			calculatePosition={(el, camera, size) => {
				console.log(camera);
				console.log(size);
				return [
					camera.position.x,
					camera.position.y,
					camera.position.z,
				];
			}}>
			<div className="bg-gray z-10 flex h-screen w-screen  items-center justify-center bg-black bg-opacity-5">
				<div>
					<h1 className="mb-4 font-cursive text-2xl font-bold text-t-dark-blue">
						Hello World
					</h1>
					<p className="font-cursive text-base font-medium text-t-dark-blue">
						test
					</p>
				</div>
			</div>
		</Html>
	);
};

export default EditTodoModal;
