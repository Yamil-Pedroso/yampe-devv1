/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Route } from "../../../routes/new-work-details/$newsBlogsId";
import { useDevtoByTags, useDevtoArticle } from "@/lib/hooks/useDevto";
import ElementContainer from "@/components/common/element-container/ElementContainer";
import NewsBlogsAside from "@/components/news-&-blogs/news-blogs-aside/NewsBlogsAside";
import { FaShareAlt, FaUser, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const toNumeric = (id: string | number) =>
  typeof id === "number" ? id : Number(String(id).replace(/[^\d]/g, ""));

const NewBlogDetails = () => {
  const [keyword, setKeyword] = useState("");
  const { newsBlogsId } = Route.useParams();
  const numericId = toNumeric(newsBlogsId);

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

  const shareUrl =
    detail?.url ?? (typeof window !== "undefined" ? window.location.href : "");

  const shareText = `${title} — ${shareUrl}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const mailtoHref = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}`;

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8">
      <h1 className="text-center text-xl sm:text-2xl font-bold mb-4">
        {title}
      </h1>

      <div className="flex flex-col justify-center lg:flex-row gap-8 lg:gap-12 mt-8 lg:mt-12 w-full ">
        <ElementContainer className="border border-border-color bg-bg1-color w-full lg:w-[53.125rem] h-auto">
          {summaryItem || detail ? (
            <div className="flex flex-col p-6 sm:p-10">
              {/* Tags */}
              {tags.length > 0 && (
                <div className="text-color4 mb-2 p-3.5 bg-neutral-700 rounded-2xl">
                  <p className="text-center">{tags.join(", ")}</p>
                </div>
              )}

              <div className="w-full flex flex-col items-center mt-5">
                <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  {/* Autor */}
                  <div className="flex">
                    <div className="flex items-center">
                      <div className="w-[55px] h-[55px] rounded-full overflow-hidden border border-border-color">
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

                  {/* Fecha */}
                  <div className="sm:ml-auto">
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

                  {/* Share */}
                  <div className="sm:ml-4">
                    <div className="flex gap-3">
                      <button
                        aria-label="Share"
                        className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800 cursor-pointer"
                        onClick={() => {
                          if (navigator.share && shareUrl) {
                            navigator
                              .share({ title, url: shareUrl })
                              .catch(() => {});
                          } else if (shareUrl) {
                            navigator.clipboard.writeText(shareUrl);
                          }
                        }}
                      >
                        <FaShareAlt className="text-color4 text-[21px]" />
                      </button>

                      {/* WhatsApp */}
                      <a
                        aria-label="Compartir por WhatsApp"
                        className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800"
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="text-color4 text-[21px]" />
                      </a>

                      {/* Gmail / Email */}
                      <a
                        aria-label="Compartir por Email"
                        className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800"
                        href={mailtoHref}
                      >
                        <FaEnvelope className="text-color4 text-[21px]" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Cover: full width en móvil, respeta tu ancho en lg */}
                {cover && (
                  <div className="w-full lg:w-[51.1244rem] h-[16rem] sm:h-[22rem] lg:h-[29.3031rem] overflow-hidden rounded-lg mt-3.5">
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
                {/* Lead-in */}
                <div className="flex flex-col sm:flex-row">
                  <div className="mb-3 sm:mb-0">
                    <span className="flex justify-center items-center font-bold w-[3.0194rem] h-[3.125rem] bg-color0 text-2xl text-black rounded-[.8rem]">
                      {title?.[0]?.toUpperCase() ?? "B"}
                    </span>
                  </div>
                  <div className="sm:ml-5 mt-2 sm:mt-0">
                    <p className="text-base/7">
                      {detail?.description ?? summaryItem?.description ?? ""}
                    </p>
                  </div>
                </div>

                {/* Markdown */}
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
                      {summaryItem?.description ?? "Loading full content…"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500 p-6">Blog not found.</p>
          )}
        </ElementContainer>

        {/* ASIDE: debajo en móvil, al lado en desktop */}
        <div className="w-full lg:w-auto lg:min-w-[28rem]">
          <NewsBlogsAside keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>
    </div>
  );
};

export default NewBlogDetails;
