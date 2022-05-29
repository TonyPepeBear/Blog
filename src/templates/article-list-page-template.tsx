import React from "react";
import { graphql } from "gatsby";
import MainLayout from "../components/layouts/main-layouts";
import ArticleList from "../components/article-list";

export default function ArticleListPageTemplate(props: Props) {
  const { data, pageContext } = props;
  const { numPages, currentPage } = pageContext;
  if (currentPage == 1) {
    return (
      <div>
        {React.useEffect(() => {
          location.href = "/";
        }, [])}
        <div />
      </div>
    );
  }
  return (
    <MainLayout>
      <ArticleList
        nodes={data.allMarkdownRemark.edges}
        numPages={numPages}
        currentPage={currentPage}
      />
    </MainLayout>
  );
}

interface Props {
  pageContext: {
    limit: number;
    skip: number;
    numPages: number;
    currentPage: number;
  };
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          id: string;
          fileAbsolutePath: string;
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
          fileAbsolutePath
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
