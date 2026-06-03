import type { BlogBlock } from "@/lib/blog/posts";

function paragraphClass(index: number, blocks: BlogBlock[]): string {
  const isFirstParagraph =
    blocks.findIndex((b) => b.type === "p") === index;
  return isFirstParagraph
    ? "blog-article-p blog-article-p--lead"
    : "blog-article-p";
}

export function BlogPostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="blog-article-body">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={`${index}-${block.text}`} className="blog-article-h2">
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={`${index}-ul`} className="blog-article-list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={`${index}-${block.text.slice(0, 24)}`}
            className={paragraphClass(index, blocks)}
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
