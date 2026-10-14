import { Fragment } from 'react';

const PLACEHOLDER_SPLIT = /(\[[^\]]+\])/g;
const IS_PLACEHOLDER = /^\[[^\]]+\]$/;

/**
 * Renders text while highlighting any [bracketed] placeholder segment, so
 * unfinished copy is easy to spot before launch.
 */
export function renderPlaceholders(text) {
  return String(text)
    .split(PLACEHOLDER_SPLIT)
    .map((part, index) =>
      IS_PLACEHOLDER.test(part) ? (
        <span key={index} className="ph">
          {part}
        </span>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      ),
    );
}
