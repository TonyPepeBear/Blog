import React from "react";
import { Icon } from "@iconify/react";
import tagIcon from "@iconify/icons-mdi/tag";

export default function TagList({ tags }: Props) {
  return (
    <div>
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
  );
}

interface Props {
  tags: string[];
}
