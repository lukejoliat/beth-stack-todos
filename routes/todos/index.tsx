import { Elysia } from "elysia";
import * as elements from "typed-html";
import { HtmlFunction } from "../..";
import { TodoList, Todos } from "../../components/todos";

export let todos = ["Buy milk", "Buy eggs", "Buy bread"];

export const plugin = new Elysia()
  .get("/todos", ({ html }: { html: HtmlFunction }) =>
    html(<Todos todos={todos} />)
  )
  .delete(
    "/todo/:id",
    ({ html, params }: { html: HtmlFunction; params: { id: number } }) => {
      todos.splice(params.id, 1);
      return html(<TodoList todos={todos} />);
    }
  )
  .post(
    "/todo",
    ({ html, body }: { html: HtmlFunction; body: { todo: string } }) => {
      todos = [...todos, body.todo];
      return html(<Todos todos={todos} />);
    }
  );
