import * as React from "react";
import MainLayout from "../components/layouts/main-layouts";
import { marked } from "marked";
import {
  InstantSearch,
  Hits,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch-hooks-web";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import ReadMoreButton from "../components/read-more-button";
import TagList from "../components/tag-list";

const searchClient = instantMeiliSearch(
  "https://search.tonypepe.com",
  "e98490acb78ad48ba2e978cb99444a0250c79d2d3788808acdf06790158341e9"
);

export default function Search() {
  return (
    <MainLayout>
      <InstantSearch indexName="gatsby-blog" searchClient={searchClient}>
        <MySearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </MainLayout>
  );
}

const MySearchBox = (props: UseSearchBoxProps) => {
  const { query, refine, clear, isSearchStalled } = useSearchBox(props);

  return (
    <div>
      <input
        type="text"
        placeholder="Search anything..."
        onChange={(e) => refine(e.target.value)}
        className="focus:outline-none focus:ring rounded-md p-2 w-full text-2xl"
      />
      {isSearchStalled && (
        <span className="text-lg text-gray-600">Searching...</span>
      )}
      {}
    </div>
  );
};

const Hit = (props: any) => {
  const hit: searchSechma = props.hit;
  const { summary, title, url, tags } = hit;
  const html = marked(summary);
  return (
    <div className="my-4 bg-white rounded-md py-4 px-6">
      <h1 className="pt-2 text-2xl">{title}</h1>
      <div className="pt-5" dangerouslySetInnerHTML={{ __html: html }} />
      <ReadMoreButton href={url} />
      <div className="h-2" />
      {tags && <TagList tags={tags} />}
    </div>
  );
};

interface searchSechma {
  title: string;
  date: number;
  url: string;
  summary: string;
  tags: string[];
}
