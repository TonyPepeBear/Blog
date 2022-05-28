import * as React from "react";
import { Icon } from "@iconify/react";
import { marked } from "marked";

interface Node {
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
}

interface Props {
  node: Node;
}

export default function ArticleListItem({ node }: Props) {
  const { title, date, tags, image } = node.frontmatter;
  const summary = node.rawMarkdownBody.split("<!--more-->")[0];
  const outputDate = new Date(date).toLocaleDateString();
  const href = "/articles/" + node.frontmatter.title;
  return (
    <div className="bg-white  w-full rounded-xl shadow-md">
      <img
        src={image}
        alt={title}
        className="w-full rounded-t-xl h-96 object-cover"
      />
      <div className="p-5">
        {/* Title */}
        <a className="" href={href}>
          <h2 className="text-3xl">{title}</h2>
        </a>
        {/* Date */}
        <div className="pt-5 text-xl flex gap-2 items-center">
          <Icon icon="mdi:calendar-month" />
          <time dateTime={date}>{outputDate}</time>
        </div>
        {/* Summary */}
        <div className="py-8 px-2 text-xl text-justify">
          <div dangerouslySetInnerHTML={{ __html: marked.parse(summary) }} />
        </div>
        {/* ReadMore */}
        <p className="my-8">
          <a
            className="w-fit py-3 px-6 rounded-full break-words bg-transparent border border-gray-700 hover:bg-gray-500 text-gray-800 hover:text-white transform duration-200"
            href={href}
          >
            Read More
          </a>
        </p>
        {/* Tages */}
        {tags && (
          <div className="flex py-3 flex-wrap gap-x-3 gap-y-4 items-center">
            <Icon icon="mdi:tag" />
            {tags.map((tag) => (
              <span className="px-2 py-1 text-sm bg-gray-200 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
