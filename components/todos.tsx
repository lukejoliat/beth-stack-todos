import * as elements from "typed-html";

type Todo = string;
type Todos = Todo[];

export const TodoItem = ({ todo, index }: { todo: Todo; index: number }) => {
  return (
    <li class={"my-2 w-full flex items-center"}>
      <span class={"flex-1"}>{todo}</span>
      <button
        class="bg-slate-400 text-white p-2 rounded-md"
        hx-delete={`/todo/${index}`}
        hx-target="#list"
      >
        Complete
      </button>
    </li>
  );
};

export const TodoList = ({ todos }: { todos: Todos }) => {
  return (
    <ul id="list">
      {todos.map((todo, i) => (
        <TodoItem todo={todo} index={i} />
      ))}
    </ul>
  );
};

export const TodoForm = () => {
  return (
    <form hx-post="/todo" hx-target="#list-and-form">
      <input class="border-2 rounded-md p-2" type="text" name="todo" />
      <button class="bg-slate-400 text-white p-2 rounded-md" type="submit">
        Add todo
      </button>
    </form>
  );
};

export const Todos = ({ todos }: { todos: Todos }) => {
  return (
    <div id="list-and-form">
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
};
