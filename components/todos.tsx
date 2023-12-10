import * as elements from "typed-html";

export const TodoList = ({ todos }: { todos: string[] }) => {
  return (
    <ul id="list">
      {todos.map((todo, i) => (
        <li class={"my-2 w-full flex items-center"}>
          <span class={"flex-1"}>{todo}</span>
          <button
            class="bg-slate-400 text-white p-2 rounded-md"
            hx-delete={`/todo/${i}`}
            hx-target="#list"
          >
            Complete
          </button>
        </li>
      ))}
    </ul>
  );
};

export const TodoForm = () => {
  return (
    <form hx-post="/create" hx-target="#list-and-form">
      <input class="border-2 rounded-md p-2" type="text" name="todo" />
      <button class="bg-slate-400 text-white p-2 rounded-md" type="submit">
        Add todo
      </button>
    </form>
  );
};

export const Todos = ({ todos }: { todos: string[] }) => {
  return (
    <div id="list-and-form">
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
};
