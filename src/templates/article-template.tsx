import React from "react";
import { graphql } from "gatsby";
import MainLayout from "../components/layouts/main-layouts";
import Article from "../components/aritcle";
import { Helmet } from "react-helmet";

export default function ArticleTemplate(props: Props) {
  const { data } = props;
  return (
    <MainLayout>
      <div>
        <Helmet
          title={
            data.allMarkdownRemark.edges[0].node.frontmatter.title +
            " - TonyPepe"
          }
        />
        <div className="flex flex-col w-full gap-14">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Article node={node} />
          ))}
        </div>
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
  query ArticlPageTemplateQuery($id: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { id: { eq: $id } }
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
