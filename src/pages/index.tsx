import { graphql } from "gatsby";
import * as React from "react";
import MainLayout from "../components/layouts/main-layouts";
import ArticleList from "../components/article-list";

export default function IndexPage({ data }: Props) {
  return (
    <MainLayout>
      <ArticleList nodes={data.allMarkdownRemark.edges} />
    </MainLayout>
  );
}
interface Props {
  data: {
    allMarkdownRemark: {
      edges: {
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
    };
  };
}

export const qldata = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { eq: false } } }
      limit: 8
    ) {
      edges {
        node {
          id
          html
          rawMarkdownBody
          excerpt(pruneLength: 200, truncate: true)
          frontmatter {
            title
            date
            draft
            tags
            image
            description
          }
        }
      }
    }
  }
`;
