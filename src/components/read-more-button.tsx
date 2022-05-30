import React from "react";

export default function ReadMoreButton({ href, title = "Read More" }: Props) {
  return (
    <p className="mt-8 mb-4">
      <a
        className="w-fit py-3 px-6 rounded-full break-words bg-transparent border border-gray-700 hover:bg-gray-500 text-gray-800 hover:text-white transform duration-200"
        href={href}
      >
        {title}
      </a>
    </p>
  );
}

interface Props {
  href: string;
  title?: string;
}
