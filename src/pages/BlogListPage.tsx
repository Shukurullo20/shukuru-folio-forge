import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';

export default function BlogListPage() {
  const [offset, setOffset] = useState(0);
  const [allBlogs, setAllBlogs] = useState<any[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['blogs', offset],
    queryFn: async () => {
      const result = await api.blogList(15, offset);
      if (offset === 0) {
        setAllBlogs(result);
      } else {
        setAllBlogs(prev => [...prev, ...result]);
      }
      return result;
    },
  });

  const blogs = offset === 0 ? (data ?? []) : allBlogs;
  const hasMore = data && data.length === 15;

  return (
    <div className="animate-fade-in">
      <h1 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>Blog</h1>
      <p className="text-sm mt-1 mb-6" style={{ color: 'var(--fg3)' }}>Thoughts, tutorials, and notes</p>

      {blogs.map((blog: any) => (
        <Link
          key={blog.id}
          to={`/blog/${blog.slug}`}
          className="flex items-center justify-between py-3 transition-opacity hover:opacity-70"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <span className="text-sm" style={{ color: 'var(--fg)' }}>{blog.title}</span>
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <span className="text-xs" style={{ color: 'var(--fg3)' }}>{formatDate(blog.date)}</span>
            <ArrowRight size={12} style={{ color: 'var(--fg3)' }} />
          </div>
        </Link>
      ))}

      {hasMore && (
        <button
          onClick={() => setOffset(prev => prev + 15)}
          className="mt-6 text-xs px-4 py-2 rounded transition-opacity hover:opacity-70"
          style={{ border: '1px solid var(--border)', color: 'var(--fg2)' }}
        >
          Load More
        </button>
      )}
    </div>
  );
}
