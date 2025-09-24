import Image from "next/image";
import React from "react";
import { OutcomeParams } from "../constant";

export function renderOutcome({outcomeText, projectTitle} : OutcomeParams) {
  
  const textToRender = outcomeText || "";
  const parts = textToRender.split(/(\[IMAGE:.*?\])/g);

  return parts.map((part, index) => {
    const imageMatch = part.match(/\[IMAGE:(.*?)\]/);
    if (imageMatch) {
      const imageUrl = imageMatch[1];
      return (
        <div key={index} className="my-8">
          <Image
            src={imageUrl}
            alt={`${projectTitle} - Visual ${index + 1}`}
            width={1200}
            height={800}
            className="rounded-lg shadow-lg object-cover w-full"
          />
        </div>
      );
    }

    if (part.trim() !== "") {
      return (
        <p
          key={index}
          className="text-gray-700 leading-relaxed whitespace-pre-line"
        >
          {part}
        </p>
      );
    }

    return null;
  });
}