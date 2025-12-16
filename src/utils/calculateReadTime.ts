export const calculateReadTime = (text: string) => {
  if (!text) return "~1 min read";
    
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const time = Math.ceil(wordCount / wordsPerMinute);
    
  return `${time} min read`;
};