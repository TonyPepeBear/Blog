const search = instantsearch({
  indexName: "hugo_blog",
  searchClient: instantMeiliSearch(
    "https://search.tonypepe.com",
    "RelTuTBT6c8e8b5bdb81f783d45f135975ff59e8cfe8a63990f9d7f6757b68f5e36b8c1e"
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
