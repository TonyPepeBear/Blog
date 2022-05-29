import React from "react";
import ArticleListItem from "./article-list-item";
import PagePicker from "./page-picker";

export default function ArticleList(props: Props) {
  const { nodes, numPages, currentPage } = props;
  return (
    <div className="flex flex-col w-full gap-7 lg:gap-14">
      {nodes.map(({ node }) => (
        <ArticleListItem node={node} key={node.id} />
      ))}
      <PagePicker numPages={numPages} currentPage={currentPage} />
    </div>
  );
}

interface Props {
  numPages: number;
  currentPage: number;
  nodes: {
    node: {
      id: string;
      html: any;
      excerpt: string;
      fileAbsolutePath: string;
      rawMarkdownBody: string;
      frontmatter: {
        title: string;
        date: string;
        draft: boolean;
        tags: string[];
        image: string;
        description?: string;
      };
    };
  }[];
}
