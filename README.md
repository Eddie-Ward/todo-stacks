# TodoStacks

A todolist companion that presents a 3D visual representation to the traditional todo list. 

![image](https://user-images.githubusercontent.com/110881795/201808446-ae4203c8-fc92-4a89-b9ac-61f7b7f31567.png)


## Concept

Traditional todo lists are often just tables of raw data with some sorting and labeling options. Visually, each item's visual hierarchy is the same, distinguished only by text labels. At the same time, seeing details of all todos at once can be paralyzing and distracting when todo lists are meant to compartmentalize and order tasks.  This app is meant to present an alternative visual representation of the traditional todo list paradigm. 

Each category of todos is represented as a stack, and each individual todo a block, colored based on their priority, and sized based on the estimated duration of the task. The app is intended to restrict the user to only interact with the top item of a stack, to mark as complete, though the user can choose to edit other things in the stack. The stacks are a visual representation of the number of tasks for a particular cateogry along with an estimate of the time required without the stress and distraction of seeing the details of every individual item. UserID is stored in the browser's local storage so map to the user's persisted data in a database.

## Technologies Used

The project utilizes Typescript fullstack, and MongoDB for the database.

The main tech stack used is the [T3 Stack](https://beta.create.t3.gg) which consists of:
- [NextJS](https://nextjs.org) as a web framework with React
- [TailwindCSS](https://tailwindcss.com) as a CSS framework for rapid and dynamic styling of JSX components
- [Prisma](https://prisma.io) as a Typescript ORM that promotes type-safety
- [tRPC](https://trpc.io) for writing fully type-safe endpoints that are shared between client and server

Additional libraries:
- [Three.js](https://threejs.org), the most popular Javascript library for implementing 3D rendering using WebGL.
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), a React renderer for Three.js
- [Drei](https://github.com/pmndrs/drei), a library for additional helpers for React Three Fiber
- [React Hook Form](https://react-hook-form.com), a lightweight Typescript library for easy performant forms with validation
- [Tunnel-Rat](https://github.com/pmndrs/tunnel-rat), an escape hatch to allow working across separate renderers, transferring between HTML and React Three Fiber.
- Additionally, [Zod](https://zod.dev) and [React Query](https://tanstack.com/query/v4) are both dependencies of tRPC.

## Installation Instructions
1. Fork and clone this repository.
2. Install node modules by running `npm install`
3. You will need to set up an .env file with a key of `DATABASE_URL` to a valid Mongo database URL
4. Set up Prisma with `npx prisma db push` to generate types in Typescript for the schemas. You can optionally run `npx prisma studio` to verify the database connection and for a GUI view of the data.
5. Run `npm run dev`

## Contribution guidelines
Feel free to submit proposal changes and feature ideas by submitting an issue ticket. This project is definitely still WIP, and I will continue updating it.
