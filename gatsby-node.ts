import { GatsbyNode } from "gatsby";
import * as path from "path";

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

interface ArticleListData {
  allMarkdownRemark: {
    edges: {
      node: {
        id: string;
        fileAbsolutePath: string;
        frontmatter: {
          title: string;
        };
      };
    }[];
  };
}

const articleGraphql = `{
  allMarkdownRemark {
    edges {
      node {
        id
        fileAbsolutePath
        frontmatter {
          title
        }
      }
    }
  }
}
`;
