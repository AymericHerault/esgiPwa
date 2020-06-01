import page from 'page';
import {fetchTodos} from './api/todos.js';
import {setTodos, getTodos} from './idb.js';

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

            ctn.setAttribute('active', true);
        });

        // Start router
        page();

    }); 