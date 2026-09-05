/**
 * YouTube Utility functions for Wood Nido
 * Supports:
 * - standard: https://www.youtube.com/watch?v=VIDEO_ID
 * - short link: https://youtu.be/VIDEO_ID
 * - embed link: https://www.youtube.com/embed/VIDEO_ID
 * - shorts: https://www.youtube.com/shorts/VIDEO_ID
 * - mobile: https://m.youtube.com/watch?v=VIDEO_ID
 */

export function getYouTubeVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();

  // If it's already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex matching all common YouTube URL formats
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

export function getYouTubeEmbedUrl(urlOrId: string, autoplay: boolean = true): string {
  const videoId = getYouTubeVideoId(urlOrId) || 'dQw4w9WgXcQ';
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`;
}

export function getYouTubeThumbnail(urlOrId: string): string {
  const videoId = getYouTubeVideoId(urlOrId);
  if (!videoId) {
    return 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80';
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function isValidYouTubeUrl(url: string): boolean {
  return getYouTubeVideoId(url) !== null;
}
