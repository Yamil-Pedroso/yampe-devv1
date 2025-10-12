/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route } from "../../../routes/new-work-details/$newsBlogsId";
import { useDevtoByTags, useDevtoArticle } from "@/lib/hooks/useDevto";
import ElementContainer from "@/components/common/element-container/ElementContainer";
import NewsBlogsAside from "@/components/news-&-blogs/news-blogs-aside/NewsBlogsAside";
import { FaShareAlt, FaUser } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const toNumeric = (id: string | number) =>
  typeof id === "number" ? id : Number(String(id).replace(/[^\d]/g, ""));

const NewBlogDetails = () => {
  const { newsBlogsId } = Route.useParams();
  const numericId = toNumeric(newsBlogsId);

  // Lista para obtener meta básica (tags, portada, autor) — ya lo tienes
  const newsBlogsQuery = useDevtoByTags(
    ["react", "typescript", "javascript"],
    24
  );
  const summaryItem = newsBlogsQuery.data?.find(
    (item) => toNumeric(item.id) === numericId
  );

  const detailQuery = useDevtoArticle(numericId);
  const detail = detailQuery.data;

  const title = summaryItem?.title ?? detail?.title ?? "Blog Details";
  const cover =
    summaryItem?.image ?? detail?.cover_image ?? detail?.social_image ?? "";
  const tags = summaryItem?.tags ?? [];
  const authorName = summaryItem?.author ?? detail?.user?.name ?? "Unknown";
  const authorAvatar =
    (summaryItem as any)?.authorAvatar ??
    detail?.user?.profile_image_90 ??
    detail?.user?.profile_image ??
    "";
  const publishedAt =
    summaryItem?.publishedAt ??
    (detail?.published_at ? new Date(detail.published_at) : null);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-center text-2xl font-bold mb-4">{title}</h1>

      <div className="flex gap-12 mt-12">
        <ElementContainer className="border border-border-color bg-bg1-color w-[53.125rem] h-auto">
          {summaryItem || detail ? (
            <div className="flex flex-col p-10">
              {/* Tags */}
              {tags.length > 0 && (
                <div className="text-color4 mb-2 p-3.5 bg-neutral-700 rounded-2xl">
                  <p className="text-center">{tags.join(", ")}</p>
                </div>
              )}

              {/* Header autor + fecha + share */}
              <div className="w-full flex flex-col items-center mt-5">
                <div className="w-full flex justify-between items-center">
                  <div className="flex">
                    <div className="flex items-center mb-4">
                      <div className="w-[55px] h-[55px] rounded-full overflow-hidden border border-border-color mb-2">
                        {authorAvatar ? (
                          <img
                            src={authorAvatar}
                            alt="Icon"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUser className="text-color4 text-[55px]" />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-color4">Post By</p>
                        <p className="text-color4 text-[1.375rem]">
                          {authorName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mr-30">
                    <p className="text-color4">Published</p>
                    <p className="text-color4 text-[1.375rem] mb-2">
                      {publishedAt
                        ? publishedAt.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <button
                      aria-label="Share"
                      className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800"
                      onClick={() => {
                        if (navigator.share && detail?.url) {
                          navigator
                            .share({ title, url: detail.url })
                            .catch(() => {});
                        } else if (detail?.url) {
                          navigator.clipboard.writeText(detail.url);
                        }
                      }}
                    >
                      <FaShareAlt className="text-color4 text-[21px]" />
                    </button>
                  </div>
                </div>

                {/* Cover */}
                {cover && (
                  <div className="w-[51.1244rem] h-[29.3031rem] overflow-hidden rounded-lg mt-3.5">
                    <img
                      src={cover}
                      alt={title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col mt-8 text-color4">
                {/* Dropcap / lead-in preserved */}
                <div className="flex">
                  <div>
                    <span className="flex justify-center items-center font-bold w-[3.0194rem] h-[3.125rem] bg-color0 text-2xl text-black rounded-[.8rem]">
                      {title?.[0]?.toUpperCase() ?? "B"}
                    </span>
                  </div>
                  <div className="ml-5">
                    <p className="text-base/7">
                      {detail?.description ?? summaryItem?.description ?? ""}
                    </p>
                  </div>
                </div>

                {/* Contenido principal */}
                <div className="prose prose-invert max-w-none mt-6">
                  {detail?.body_markdown ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {detail.body_markdown}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-base/7 mt-2.5">
                      {/* Fallback: si aún no cargó el detalle, mostramos description larga si la tienes, o un aviso */}
                      {summaryItem?.description ?? "Loading full content…"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500">Blog not found.</p>
          )}
        </ElementContainer>

        <NewsBlogsAside keyword="" setKeyword={() => {}} />
      </div>
    </div>
  );
};

export default NewBlogDetails;
