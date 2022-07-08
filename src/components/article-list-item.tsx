import * as React from "react";
import { Icon } from "@iconify/react";
import { marked } from "marked";
import calendarMonth from "@iconify/icons-mdi/calendar-month";
import ReadMoreButton from "./read-more-button";
import TagList from "./tag-list";

export default function ArticleListItem({ node }: Props) {
  const { title, date, tags, image } = node.frontmatter;
  const summary = node.rawMarkdownBody.split("<!--more-->")[0];
  const outputDate = new Date(date).toLocaleDateString();
  const href =
    "/posts/" +
    node.fileAbsolutePath
      .split("/posts/")[1]
      .split(".md")[0]
      .replace(" ", "-")
      .toLowerCase();
  return (
    <div className="bg-white  w-full rounded-xl shadow-md">
      <img
        src={image}
        alt={title}
        className="w-full rounded-t-xl h-72 lg:h-96 object-cover"
      />
      <div className="p-5">
        {/* Title */}
        <a className="" href={href}>
          <h2 className="text-3xl">{title}</h2>
        </a>
        {/* Date */}
        <div className="pt-5 text-xl flex gap-2 items-center">
          <Icon icon={calendarMonth} />
          <time dateTime={date}>{outputDate}</time>
        </div>
        {/* Summary */}
        <div className="py-8 px-2 text-xl text-justify">
          <div dangerouslySetInnerHTML={{ __html: marked.parse(summary) }} />
        </div>
        {/* Read More */}
        <ReadMoreButton href={href} />
        {/* Tages */}
        <TagList tags={tags} />
      </div>
    </div>
  );
}

interface Node {
  html: any;
  excerpt: string;
  rawMarkdownBody: string;
  fileAbsolutePath: string;
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
