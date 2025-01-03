'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  caption?: string;
  thumbnail_url?: string;
}

interface InstagramFeedProps {
  accessToken: string;
  limit?: number;
}

const InstagramFeed = ({ accessToken, limit = 6 }: InstagramFeedProps) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}&limit=${limit}`
        );
        
        if (!response.ok) {
          throw new Error('Error al obtener las publicaciones de Instagram');
        }

        const data = await response.json();
        setPosts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [accessToken, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-color-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-color-text py-8">
        <p>No se pudieron cargar las publicaciones de Instagram</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            key={post.id}
            className="relative aspect-square group overflow-hidden rounded-lg"
          >
            <Image
              src={post.media_type === 'VIDEO' ? post.thumbnail_url || post.media_url : post.media_url}
              alt={post.caption || 'Publicación de Instagram'}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-sm px-4 text-center line-clamp-3">
                {post.caption || 'Ver en Instagram'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;
