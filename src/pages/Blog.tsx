import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { posts } from "../content/posts";

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = posts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Blog</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Insights, tips, and stories from the world of canine psychology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {currentPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block aspect-video overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="text-primary font-bold uppercase tracking-wider text-xs">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-slate-600 mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center font-bold text-primary hover:text-primary-dark transition-colors mt-auto"
                >
                  Read Article
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() =>
                setSearchParams({ page: Math.max(1, page - 1).toString() })
              }
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 font-medium"
            >
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setSearchParams({ page: (i + 1).toString() })}
                  className={`w-10 h-10 rounded-lg font-bold flex items-center justify-center transition-colors ${
                    page === i + 1
                      ? "bg-primary text-white"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setSearchParams({
                  page: Math.min(totalPages, page + 1).toString(),
                })
              }
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 font-medium"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
