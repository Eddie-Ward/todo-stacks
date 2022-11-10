import { type NextPage } from "next";
import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import World from "./../components/World";

const Home: NextPage = () => {
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
					<World />
				</Canvas>
			</main>
		</>
	);
};

export default Home;
