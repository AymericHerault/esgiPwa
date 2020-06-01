import page from 'page';
import checkConnectivity from './network.js';
import {createTodo, fetchTodos} from './api/todos.js';
import {getTodos, setTodo, setTodos} from './idb.js';
import {createTodoEvent} from './utils/createTodoEvent';
import displayCurrentPage from "./utils/displayCurrentPage";

checkConnectivity({});
document.addEventListener('connection-changed', e => {
    document.offline = !e.detail;
    if (!document.offline) {
        // Sync data ...
    }
});

const app = document.querySelector('#app');
fetch('./config.json')
    .then(result => result.json())
    .then(async (config) => {
        window.config = config;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './assets/styles/tailwind.css';
        document.head.appendChild(link);

        page('/', async (ctx) => {
            const module = await import('./views/Home.js');
            const Home = module.default;

            let todos = [];
            if (navigator.onLine) {
                const data = await fetchTodos();
                if (data !== false) {
                    todos = await setTodos(data);
                }
                todos = await getTodos();
            } else {
                todos = await getTodos();
            }


            const ctn = app.querySelector('[page="home"]');
            const HomeView = new Home(ctn);
            displayCurrentPage('home');
        });

        page('/add-todo', async (ctx) => {
            const module = await import('./views/AddTodo.js');
            const AddTodo = module.default;
            const home = app.querySelector('[page="home"]');
            const ctn = app.querySelector('[page="addTodo"]');
            const addTodoView = new AddTodo(ctn);
            displayCurrentPage('addTodo');
            createTodoEvent();
        });

        // Start router
        page();
    }); 