import React from "react";
import { graphql } from "gatsby";
import MainLayout from "../components/layouts/main-layouts";
import { marked } from "marked";

export default function ArticleTemplate(props: Props) {
  const { data } = props;
  return (
    <MainLayout>
      <div>
        <div className="flex flex-col w-full gap-14">
          {data.allMarkdownRemark.edges.map(({ node }) => {
            const { title, image } = node.frontmatter;
            return (
              <div className="bg-white w-full rounded-xl shadow-md break-words">
                <img
                  src={image}
                  alt={title}
                  className="w-full rounded-t-xl h-96 object-cover"
                />
                <div className="p-5">
                  <h1 className="text-4xl">{title}</h1>
                  <div
                    className="main-article"
                    dangerouslySetInnerHTML={{ __html: node.html }}
                  />
                </div>
              </div>
            );
          })}
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
