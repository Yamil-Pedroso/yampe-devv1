import { createFileRoute } from "@tanstack/react-router";
import NewsBlogsPlace from "@/components/news-&-blogs/news-blogs-place/NewsBlogsPlace";

export const Route = createFileRoute("/news-blogs")({
  component: NewsBlogs,
});

function NewsBlogs() {
  return <NewsBlogsPlace />;
}
