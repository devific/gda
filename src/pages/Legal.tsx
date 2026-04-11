import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";

const legalFiles = import.meta.glob("../content/legal/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export default function Legal() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (slug) {
      const filePath = `../content/legal/${slug}.md`;
      if (legalFiles[filePath]) {
        setContent(legalFiles[filePath] as string);
      } else {
        setContent("");
      }
    }
  }, [slug]);

  if (
    !slug ||
    (content === "" &&
      Object.keys(legalFiles).length > 0 &&
      !legalFiles[`../content/legal/${slug}.md`])
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50">
      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-white border shadow-sm rounded-2xl border-slate-100 md:p-12"
        >
          <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-primary hover:prose-a:text-primary-dark">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
