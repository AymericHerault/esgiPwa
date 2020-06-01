import { html, render } from 'lit-html';

export default class Home {
  constructor(page) {
    this.page = page;
    this.properties = {
      todos: [],
      todo: ''
    };

    this.renderView();
  }

  set todos(value) {
    this.properties.todos = value;
  }

  get todos() {
    return this.properties.todos;
  }

  template() {
    return html`
      <section class="h-full">
        <div ?hidden="${!this.properties.todos.length}">
          <header>
            <h1 class="mt-2 px-4 text-xl">My awesome todos : </h1>
          </header>
          <main class="todolist px-4 pb-20">
            <ul>
              ${this.properties.todos.map(todo => html`<li></li>`)}
            </ul>
          </main>
        </div>
        <div class="mt-8" ?hidden="${this.properties.todos.length}">
          <img class="object-contain px-20" src="assets/img/nodata.svg" alt="No data">
          <p class="mt-4 text-center text-xl">No todos yet, try to create a new one</p>
        </div>
        <footer class="h-16 bg-gray-300 fixed bottom-0 inset-x-0">
        <a href="/add-todo">
           <button
              aria-label="Add"
              class="w-full rounded-lg text-uppercase bg-heraku h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
              type="submit">Add Todo<lit-icon class="ml-2" icon="send"></lit-icon>
            </button>
        </a>
        </footer>
      </section>
    `;
  }

  renderView() {
    const view = this.template();
    render(view, this.page);
  }
}