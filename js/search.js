const search = instantsearch({
  indexName: "hugo_blog",
  searchClient: instantMeiliSearch(
    "https://search.tonypepe.com",
    "6xWF8OOP6f0a7f4c0eaddff20b31a8f4e3dadbd3ccf40f809da73ab625f6ddc6c7dc9d72"
  ),
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    showSubmit: false,
    showLoadingIndicator: false,
    showReset: false,
    autofocus: true,
    placeholder: "Search",
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 6,
  }),
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results",
      item: `
          <div class="hit-name">
            <a href='{{ url }}'>
              <h2>{{ title }}</h2>
              <p>{{ summary }}</p>
            </a>
          </div>
        `,
    },
  }),
]);

search.start();
