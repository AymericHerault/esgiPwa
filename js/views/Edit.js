import { html, render } from '../../web_modules/lit-html.js';

export default function Edit(page, data) {
  const properties = {};
  const template = ({ data, properties }) => html`
    <section>
      <h1>Plop</h1>
    </section>
  `;

  function renderView(data) {
    const view = template({ data, properties });
    render(view, page);
  }

  renderView();

  document.addEventListener('render-view', ({ detail }) => {
    renderView(detail);
  });
}
