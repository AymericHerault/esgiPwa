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
          <form @submit="${this.handleForm}" id="addTodo" class="w-full h-full flex justify-between items-center px-4 py-3">
            <label class="flex-1" aria-label="Add todo input">
              <input
                autocomplete="off"
                .value="${this.properties.todo}"
                @input="${e => this.properties.todo = e.target.value}"
                class="py-3 px-4 rounded-sm w-full h-full"
                type="text"
                placeholder="Enter a new todo ..."
                name="todo">
            </label>
            <button
              aria-label="Add"
              class="ml-4 rounded-lg text-uppercase bg-heraku h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
              type="submit">Add<lit-icon class="ml-2" icon="send"></lit-icon></button>
          </form>  
        </footer>
      </section>
    `;
  }

  renderView() {
    const view = this.template();
    render(view, this.page);
  }

  handleForm(e) {
    e.preventDefault();
  }
}