import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<meta charSet="utf-8" />
				<meta name="description" content="A 3D todo list companion" />
				<meta name="robots" content="index, nofollow" />

				<meta itemProp="name" content="Todo Stacks" />
				<meta
					itemProp="description"
					content="A 3D todo list companion"
				/>
				<meta
					itemProp="image"
					content="https://user-images.githubusercontent.com/110881795/201808446-ae4203c8-fc92-4a89-b9ac-61f7b7f31567.png"
				/>

				<meta
					property="og:url"
					content="https://todo-stacks.vercel.app"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Todo Stacks" />
				<meta
					property="og:description"
					content="A 3D todo list companion"
				/>
				<meta
					property="og:image"
					content="https://user-images.githubusercontent.com/110881795/201808446-ae4203c8-fc92-4a89-b9ac-61f7b7f31567.png"
				/>

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Todo Stacks" />
				<meta
					name="twitter:description"
					content="A 3D todo list companion"
				/>
				<meta
					name="twitter:image"
					content="https://user-images.githubusercontent.com/110881795/201808446-ae4203c8-fc92-4a89-b9ac-61f7b7f31567.png"
				/>

				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
