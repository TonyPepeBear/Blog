import React from "react";
import { MeiliSearch } from "meilisearch";
import MainLayout from "../../components/layouts/main-layouts";
import ReadMoreButton from "../../components/read-more-button";
import TagList from "../../components/tag-list";
import { marked } from "marked";
import { useQueryParams, StringParam } from "use-query-params";

export default function SearchTags() {
  const [{ tag }, _] = useQueryParams({ tag: StringParam });
  const [result, setResult] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    client
      .index("gatsby-blog")
      .search("", {
        filter: ["tags=" + (tag ? tag : "")],
        limit: Number.MAX_SAFE_INTEGER,
      })
      .then((res: any) => {
        setResult(res.hits);
        setIsLoading(false);
      });
  }, []);
  return (
    <MainLayout title={"tag: " + tag + " - TonyPepe"}>
      <div>
        <h1 className="my-4 bg-white rounded-md py-4 px-6 text-2xl">
          {"Tag: " + tag}
        </h1>
        {isLoading ? <LoadingChild /> : <ResultClild hits={result} />}
      </div>
    </MainLayout>
  );
}

const LoadingChild = () => {
  return (
    <div className="my-4 bg-white rounded-md py-4 px-6 text-2xl">Loading</div>
  );
};

const ResultClild = ({ hits }: ResultProp) => {
  if (hits.length === 0) {
    return (
      <div className="my-4 bg-white rounded-md py-4 px-6 text-2xl">
        No result
      </div>
    );
  }
  return (
    <div>
      {hits.map((hit: any) => {
        const { title, url, tags, summary } = hit;
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
      })}
    </div>
  );
};

interface ResultProp {
  hits: any[];
}

const client = new MeiliSearch({
  host: "https://search.tonypepe.com",
  apiKey: "e98490acb78ad48ba2e978cb99444a0250c79d2d3788808acdf06790158341e9",
});
