export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const markdownFiles = import.meta.glob("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: markdown };
  }
  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  frontmatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove surrounding quotes if present
      if (
        (value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('"') && value.endsWith('"'))
      ) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });

  return { data, content };
}

export const posts: Post[] = Object.entries(markdownFiles).map(
  ([path, rawContent]) => {
    const { data, content } = parseFrontmatter(rawContent as string);

    // Fallback to filename if slug is not provided
    const filenameSlug = path.split("/").pop()?.replace(".md", "") || "";

    return {
      slug: data.slug || filenameSlug,
      title: data.title || "Untitled",
      excerpt: data.excerpt || "",
      category: data.category || "Uncategorized",
      date: data.date || new Date().toLocaleDateString(),
      readTime: data.readTime || "5 min read",
      image: data.image || "",
      content: content.trim(),
    };
  },
);
