import { GatsbyNode } from "gatsby";
import * as path from "path";
import * as fs from "fs";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;
  const { errors, data } = await graphql<ArticleListData>(articleGraphql);
  if (errors) {
    console.log(errors);
  }
  // create all articles
  data!!.allMarkdownRemark.edges.forEach((item, index) => {
    const p = item.node.fileAbsolutePath
      .split("/posts/")[1]
      .split(".md")[0]
      .replace(" ", "-")
      .toLowerCase();
    createPage({
      path: "/posts/" + p,
      component: path.resolve("./src/templates/article-template.tsx"),
      context: {
        id: item.node.id,
      },
    });
  });
  // create all post list pages
  const numPages = Math.ceil(data!.allMarkdownRemark.edges.length / 8);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: "/pages/" + (i + 1),
      component: path.resolve("./src/templates/article-list-page-template.tsx"),
      context: {
        limit: 8,
        skip: i * 8,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};

export const onPostBuild: GatsbyNode["onPostBuild"] = async ({
  graphql,
  actions,
}) => {
  const { errors, data } = await graphql<ArticleListData>(articleGraphql);
  // SearchIndex.json
  const searchArr: SearchIndex[] = [];
  data!!.allMarkdownRemark.edges.forEach(({ node }, index) => {
    const summary = node.rawMarkdownBody.split("<!--more-->")[0];
    const url =
      "/posts/" +
      node.fileAbsolutePath
        .split("/posts/")[1]
        .split(".md")[0]
        .replace(" ", "-")
        .toLowerCase();
    const miliseconds = new Date(node.frontmatter.date).getTime();
    searchArr.push({
      id: index,
      date: miliseconds,
      url: url,
      title: node.frontmatter.title,
      summary: summary,
      content: node.internal.content.replace("\n", " "),
      tags: node.frontmatter.tags,
    });
  });
  fs.writeFileSync("./public/SearchIndex.json", JSON.stringify(searchArr));
};

interface ArticleListData {
  allMarkdownRemark: {
    edges: {
      node: {
        id: string;
        fileAbsolutePath: string;
        rawMarkdownBody: string;
        internal: {
          content: string;
        };
        frontmatter: {
          title: string;
          date: string;
          tags: string[];
        };
      };
    }[];
  };
}

const articleGraphql = `{
  allMarkdownRemark (
    sort: { order: DESC, fields: [frontmatter___date] }
    filter: { frontmatter: { draft: { eq: false } } }
  ) {
    edges {
      node {
        id
        fileAbsolutePath
        rawMarkdownBody
        internal {
          content
        }
        frontmatter {
          title
          date
          tags
        }
      }
    }
  }
}
`;

interface SearchIndex {
  id: number;
  date: number;
  url: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
}
