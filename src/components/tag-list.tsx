import React from "react";
import { Icon } from "@iconify/react";
import tagIcon from "@iconify/icons-mdi/tag";

export default function TagList({ tags, showIcon = true }: Props) {
  return (
    <div>
      {tags && (
        <div className="flex py-3 flex-wrap gap-x-3 gap-y-4 items-center">
          {showIcon && <Icon icon={tagIcon} />}
          {tags.map((tag) => (
            <a
              className="px-3 py-1 text-sm bg-gray-200 rounded-full"
              href={"/search/tag?tag=" + tag}
            >
              {tag}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  tags: string[];
  showIcon?: boolean;
}
