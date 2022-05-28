import React from "react";
import { graphql } from "gatsby";
import MainLayout from "../components/layouts/main-layouts";
import ArticleList from "../components/article-list";

export default function ArticleListPageTemplate(props: Props) {
  const { data } = props;
  return (
    <MainLayout>
      <div>
        <ArticleList nodes={data.allMarkdownRemark.edges} />
      </div>
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

export const query = graphql`
  query ArticleListPageTemplateQuery($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { eq: false } } }
      limit: $limit
      skip: $skip
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
