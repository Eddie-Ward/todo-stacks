### TodoStacks (Name subject to change)

> Most todo lists are exactly that: just a table/list of todo items with maybe the option to sort by priority or length. While tools like Notion are great for providing "alternative" views to this paradigm, I want to present an alternative representation using 3D modeling. One list/category is represented as a stack, and each todo is a block. Blocks are shaded by their priority, and their height is determined by the duration to complete the item. The user is able to have a more visual representation of their tasks: taller stacks imply they have more tasks in that category, darker blocks imply higher priority, and taller ones imply tasks they estimated to take a longer time. Additionally, stacks (technically queue data structures and not stacks) operate on a FIFO basis where only the todo item on the top (that's first in the list) can be marked as complete (removed from the stack (queue)). This restriction is meant to help users focus on just one task at a time and not stress and get distracted about the other items in the stack.

### Your tech stack (frontend, backend, database)

I am using the [T3 stack](https://create.t3.gg) which has most of the technologies I wanted to try.

**The stack's components are:**

-   Typescript - because Javascript is sin
-   React
-   [Tailwind](https://tailwindcss.com) for CSS framework
-   [NextJS](https://nextjs.org) for web framework / serverless backend (I will deploy on Vercel)
-   [tRPC](https://trpc.io) for frontend / backend type-safety in setting up routes. (It uses React-Query for API calls on the front-end.)
-   [Prisma](https://www.prisma.io) for ORM. I'll be using MongoDB for my database because I haven't found a good SQL database host besides Heroku. I'm not planning on using Mongoose because its documentation and type definitions are garbage.

For the 3D part, I will be using [three.js](https://threejs.org) as the base 3D framework. For importing into React's ecosystem, I will be using [React-Three-Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) and its helper library [Drei ](https://github.com/pmndrs/drei#readme). It also implements [React Spring](https://react-spring.dev/basics#basics) as a dependency for setting up animations.

### List of backend models and their properties

![Schemas](https://user-images.githubusercontent.com/110881795/200232736-96de0972-7f17-4a3d-8d2f-73616df86fa0.png)

### React component hierarchy (if applicable)

![React Components](https://user-images.githubusercontent.com/110881795/200235509-87217169-aa76-4bad-b241-7fbb574c69ea.png)

### User stories

**MVP**
As a user, I would like to:

-   CRUD on categories and CRUD on stacks.
-   Mark the top todo of a stack as complete.
-   Only be able to see the details of the top todo.
-   Have a visual indicator of the importance of each todo item
-   Have a visual indicator of the estimated length to complete a todo
-   See information on each stack and see information of the top todo in the stack.

Stretch
As a user, I would like to:

-   Have my own personal stacks and todos saved with a basic personal code. I would like to be prompted on first page load to enter my code to retrieve my personal stack and todos.
-   Have animations for different interactions

### Wireframes

![Wireframe](https://user-images.githubusercontent.com/110881795/200239575-8781ada7-9fc4-486c-b878-de00c6e4e20a.png)
