import { type NextPage } from "next";
import Head from "next/head";

import { Canvas } from "@react-three/fiber";
import World from "./../components/World";

import { trpc } from "../utils/trpc";
import { Loader } from "@react-three/drei";
import { Suspense } from "react";

const Home: NextPage = () => {
	// const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
	return (
		<>
			<Head>
				<title>Todo Stacks</title>
			</Head>
			<main
				className="h-screen w-screen"
				style={{
					backgroundImage:
						"linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%)",
				}}>
				<Canvas shadows={true} frameloop="demand">
					<Suspense fallback={null}>
						<World />
					</Suspense>
				</Canvas>
				<Loader />
			</main>
		</>
	);
};

export default Home;
