import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { posts } from "../content/posts";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">Post Not Found</h1>
          <p className="text-slate-600 mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="text-primary font-bold hover:underline inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to="/blog"
            className="text-primary font-bold hover:underline inline-flex items-center mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>

          <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
            <span className="text-primary font-bold uppercase tracking-wider text-xs bg-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-slate max-w-none prose-headings:font-extrabold prose-a:text-primary hover:prose-a:text-primary-dark prose-img:rounded-xl"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.div>
      </article>
    </div>
  );
}
