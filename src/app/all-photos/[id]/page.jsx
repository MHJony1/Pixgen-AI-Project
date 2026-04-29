import React from 'react';
import {
  Heart,
  Download,
  Share2,
  Maximize,
  Calendar,
  Box,
  Tag,
} from 'lucide-react';
import Image from 'next/image';

const PhotoDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch('https://pixgen-ai-project.vercel.app/data.json', {
  });
  const photos = await res.json();
  const photo = photos.find((p) => p.id === parseInt(id));

  if (!photo) {
    return (
      <div className="flex justify-center items-center h-screen">
        Photo not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800">
          {/* Left Side: Image Preview */}
          <div className="relative group overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              width={300}
              height={300}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition">
              <Maximize className="w-5 h-5 text-zinc-900" />
            </button>
          </div>

          {/* Right Side: Details Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {photo.category}
                </span>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 text-zinc-500 hover:text-red-500 transition">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">{photo.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-500 transition">
                    <Download className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {photo.downloads}
                    </span>
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
                {photo.title}
              </h1>

              {/* Prompt Box */}
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 mb-8">
                <p className="text-xs font-bold text-zinc-400 uppercase mb-2 tracking-widest">
                  AI Prompt
                </p>
                <p className="text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                  {photo.prompt}
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold leading-none mb-1">
                      Model
                    </p>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      {photo.model}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500">
                    <Maximize className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold leading-none mb-1">
                      Resolution
                    </p>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      {photo.resolution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3 text-zinc-400">
                  <Tag className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Tags
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {photo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg text-xs font-medium hover:bg-zinc-200 transition cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-2xl font-bold hover:opacity-90 transition shadow-xl shadow-zinc-200 dark:shadow-none flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download HD
              </button>
              <button className="p-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl hover:bg-zinc-200 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsPage;
