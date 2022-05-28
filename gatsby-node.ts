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
    createPage({
      path: "/articles/" + item.node.frontmatter.title,
      component: path.resolve("./src/templates/article-template.tsx"),
      context: {
        id: item.node.id,
      },
    });
  });
  // create all post list pages
  const numPages = Math.ceil(data!.allMarkdownRemark.edges.length / 8);
  Array.from({ length: numPages }).forEach((_, i) => {
    i != 0 &&
      createPage({
        path: "/pages/" + (i + 1),
        component: path.resolve(
          "./src/templates/article-list-page-template.tsx"
        ),
        context: {
          limit: 8,
          skip: i * 8,
          numPages,
          currentPage: i + 1,
        },
      });
  });
};

const articleGraphql = `{
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          title
        }
      }
    }
  }
}
`;

interface ArticleListData {
  allMarkdownRemark: {
    edges: {
      node: {
        id: string;
        frontmatter: {
          title: string;
        };
      };
    }[];
  };
}
