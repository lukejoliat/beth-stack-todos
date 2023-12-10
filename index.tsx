import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { Readable } from "stream";
import * as elements from "typed-html";
import { isArray } from "util";
import { TodoList, Todos } from "./components/todos";

type HtmlFunction = <A>(
  value:
    | Readable
    | JSX.Element
    | ((this: void, rid: number, ...args: A[]) => JSX.Element),
  ...args: A[]
) => Promise<Response | string> | Response | string;

let todos = ["Buy milk", "Buy eggs", "Buy bread"];

const app = new Elysia()
  .use(html())
  .get("/", ({ html }: { html: HtmlFunction }) =>
    html(
      <BaseHtml>
        <h1 class="text-4xl my-4">Todo App with Bun & HTMX</h1>
        <Todos todos={todos} />
      </BaseHtml>
    )
  )
  .delete(
    "/todo/:id",
    ({ html, params }: { html: HtmlFunction; params: { id: number } }) => {
      todos.splice(params.id, 1);
      return html(<TodoList todos={todos} />);
    }
  )
  .post(
    "/create",
    ({ html, body }: { html: HtmlFunction; body: { todo: string } }) => {
      todos = [...todos, body.todo];
      return html(<Todos todos={todos} />);
    }
  );

app.listen(3000, () => {
  console.log("Listening at http://localhost:3000");
});

const BaseHtml = ({ children }: { children: unknown | string[] }) => {
  console.log(children);

  return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Todo App with Bun</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://unpkg.com/htmx.org@1.9.3"></script>
            </head>
        <body class="h-[100vh]">
            <div id="root" class="flex flex-col items-center justify-center h-full">${
              Array.isArray(children) ? children.join("") : children
            }</div>
        </body>
        </html>`;
};
