import {getTodos, setTodo} from "../idb";
import {createTodo} from "../api/todos";
import displayCurrentPage from "./displayCurrentPage";

export function createTodoEvent() {
    document.addEventListener('create-todo', async ({ detail: todo }) => {
        await setTodo(todo);
        if (!document.offline && navigator.onLine === true) {
            const module = await import('../views/Home.js');
            const Home = module.default;
            const ctn = app.querySelector('[page="home"]');
            const HomeView = new Home(ctn);
            // If connection is good enought, do thte HTTP call
            const result = await createTodo(todo);
            if (result !== false) {
                // If we successfuly get a result from API
                // Get the updated todo list
                // Rerender the template
                HomeView.todos = await getTodos();
                displayCurrentPage('home');
                return HomeView.renderView();
            }
            // In case of an error
            // Update the synced flag of the new todo
            todo.synced = 'false';
            // Rerender the template
            HomeView.todos = await setTodo(todo);
            displayCurrentPage('home');
            return HomeView.renderView();
        }
    });
}