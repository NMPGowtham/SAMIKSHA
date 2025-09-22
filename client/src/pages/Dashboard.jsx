import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { posts } from "../data/posts";

import graphImage from "../assets/graph.png";
import responseImage from "../assets/response.png";
import wordCloudImage from "../assets/wordcloud.jpeg";

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analyzed, setAnalyzed] = useState(false);

  const selectedPost = posts.find((p) => String(p.id) === id);

  const modelResponses = {
    1: {
      summary:
        "This post discusses advanced techniques for handling large-scale data efficiently. The analysis highlights performance improvements and trade-offs.",
      comments: [
        "Great explanation! Helped me understand the concept clearly.",
        "Would love to see more code examples.",
        "The performance graph is very insightful!",
        "Super detailed write-up, thank you!",
        "Could you also cover edge cases in future posts?",
      ],
    },
    2: {
      summary: "Another sample post summary for Post 2.",
      comments: ["Nice write-up!", "Clear and concise explanation."],
    },
    3: {
      summary: "Sample summary for Post 3.",
      comments: ["Very helpful!", "Good breakdown of concepts."],
    },
    4: {
      summary: "Sample summary for Post 4.",
      comments: ["Thanks for sharing!", "Awesome post 👍"],
    },
  };

  if (!selectedPost)
    return (
      <div className="text-red-500 text-center mt-10 font-semibold text-lg">
        ⚠️ Post not found.
      </div>
    );

  const comments = modelResponses[selectedPost.id]?.comments || [];

  const imageClasses =
    "rounded-lg w-full max-w-full object-contain";

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 flex flex-col items-center py-6 px-4 space-y-6">
      {/* Post Info */}
      <div className="w-full max-w-4xl bg-white rounded-xl p-6 shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {selectedPost.title}
        </h1>
        <p className="text-gray-700 mb-4">{selectedPost.description}</p>
        {!analyzed && (
          <button
            onClick={() => setAnalyzed(true)}
            className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors duration-200"
          >
            Analyze
          </button>
        )}
      </div>

      {analyzed && (
        <>
          {/* Word Cloud */}
          <div className="w-full max-w-4xl flex flex-col items-center rounded-xl p-4">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-3">
              🖼️ Word Cloud
            </h2>
            <img
              src={wordCloudImage}
              alt="Word Cloud"
              className={imageClasses}
            />
          </div>

          {/* Summary */}
          <div className="w-full max-w-4xl rounded-xl p-4">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-2">
              🔍 Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {modelResponses[selectedPost.id]?.summary ||
                "Summary not available."}
            </p>
          </div>

          {/* Graph + Model Response */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center rounded-xl p-3">
              <h2 className="text-xl font-semibold text-emerald-600 mb-3 text-center">
                📊 Graph Visualization
              </h2>
              <img src={graphImage} alt="Graph" className={imageClasses} />
            </div>
            <div className="flex flex-col items-center rounded-xl p-3">
              <h2 className="text-xl font-semibold text-emerald-600 mb-3 text-center">
                📥 Model Response
              </h2>
              <img src={responseImage} alt="Response" className={imageClasses} />
            </div>
          </div>

          {/* Comments */}
          <div className="w-full max-w-4xl rounded-xl p-4">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-3">
              💬 Comments
            </h2>
            <div className="space-y-2">
              {comments.length > 0 ? (
                <>
                  {comments.slice(0, 2).map((c, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 rounded-lg text-gray-800"
                    >
                      {c}
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      navigate(`/comments/${selectedPost.id}`, {
                        state: { comments },
                      })
                    }
                    className="mt-3 px-6 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                  >
                    Show All Comments →
                  </button>
                </>
              ) : (
                <p className="text-gray-500">No comments available.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
