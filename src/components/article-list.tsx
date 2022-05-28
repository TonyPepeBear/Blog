import React from "react";
import ArticleListItem from "./article-list-item";

export default function ArticleList(props: Props) {
  const { nodes } = props;
  return (
    <div className="flex flex-col w-full gap-14">
      {nodes.map(({ node }) => (
        <ArticleListItem node={node} />
      ))}
    </div>
  );
}

interface Props {
  nodes: {
    node: {
      html: any;
      excerpt: string;
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
