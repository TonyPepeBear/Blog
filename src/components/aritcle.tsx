import React from "react";
import "../styles/article.css";
import { Icon } from "@iconify/react";
import tagIcon from "@iconify/icons-mdi/tag";
import calendarMonth from "@iconify/icons-mdi/calendar-month";
import infoWithCircle from "@iconify/icons-entypo/info-with-circle";

export default function Article(props: Props) {
  const { node } = props;
  const { title, image, date, tags } = node.frontmatter;
  const outputDate = new Date(date).toLocaleDateString();
  return (
    <div className="bg-white w-full rounded-xl shadow-md break-words">
      <img
        src={image}
        alt={title}
        className="w-full rounded-t-xl h-72 lg:h-96 object-cover"
      />
      <div className="p-5">
        <h1 className="text-4xl font-medium">{title}</h1>
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 py-4">
          {/* Date */}
          <div className="text-xl flex gap-2 items-center text-gray-700 font-medium">
            <Icon icon={infoWithCircle} />
            <time dateTime={date}>{outputDate}</time>
          </div>
          {/* Issue */}
          <a
            href="http://github.com/tonypepebear/hugoblog/issues"
            target="_blank"
          >
            <div className="text-xl flex gap-2 items-center text-gray-700 font-medium">
              <Icon icon="entypo:info-with-circle" />
              <span>Issue</span>
            </div>
          </a>
        </div>
        {/* 分隔符 */}
        <div>
          <div className="h-4" />
          <hr />
          <div className="h-4" />
        </div>
        {/* Article */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: node.html }}
        />
        {/* 分隔符 */}
        <div>
          <div className="h-4" />
          <hr />
          <div className="h-4" />
        </div>
        {/* Tages */}
        {tags && (
          <div className="flex py-3 flex-wrap gap-x-3 gap-y-4 items-center">
            <Icon icon={tagIcon} />
            {tags.map((tag) => (
              <span className="px-3 py-1 text-sm bg-gray-200 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
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
}
