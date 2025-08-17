import { createFileRoute } from "@tanstack/react-router";
import NewBlogDetails from "../../components/news-&-blogs/new-blog-details/NewBlogDetails";

export const Route = createFileRoute("/new-work-details/$newsBlogsId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewBlogDetails />;
}
