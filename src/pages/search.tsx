import * as React from "react";
import MainLayout from "../components/layouts/main-layouts";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "https://search.tonypepe.com",
  "RelTuTBT6c8e8b5bdb81f783d45f135975ff59e8cfe8a63990f9d7f6757b68f5e36b8c1e"
);

export default function Search() {
  return (
    <MainLayout>
      <InstantSearch indexName="hugo_blog" searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </MainLayout>
  );
}

const Hit = (props: any) => {
  const hit: searchSechma = props.hit;
  return (
    <div className="p-4">
      <h1>{hit.title}</h1>
      <p>{hit.summary}</p>
    </div>
  );
};

interface searchSechma {
  title: string;
  date: number;
  url: string;
  summary: string;
}
