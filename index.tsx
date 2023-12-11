import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { Readable } from "stream";
import * as elements from "typed-html";
import { plugin as todosRoutes } from "./routes/todos";

export type HtmlFunction = <A>(
  value:
    | Readable
    | JSX.Element
    | ((this: void, rid: number, ...args: A[]) => JSX.Element),
  ...args: A[]
) => Promise<Response | string> | Response | string;

export const BaseHtml = ({
  children,
}: {
  children: unknown | string[];
}) => `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Todo App with Bun</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://unpkg.com/htmx.org@1.9.3"></script>
            </head>
        <body class="h-[100vh]">
            ${Array.isArray(children) ? children.join("") : children}
        </body>
        </html>`;

const app = new Elysia()
  .use(swagger())
  .use(html())
  .use(todosRoutes)
  .get("/", ({ html }: { html: HtmlFunction }) =>
    html(
      <BaseHtml>
        <div id="root" class="flex flex-col items-center justify-center h-full">
          <h1 class="text-4xl my-4">Todo App with Bun & HTMX</h1>
          <div hx-get="/todos" hx-swap="outerHTML" hx-trigger="load" />
        </div>
      </BaseHtml>
    )
  );

app.listen(3000, () => {
  console.log("Listening at http://localhost:3000");
});
