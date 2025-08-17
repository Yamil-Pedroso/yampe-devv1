export const newsAndBlogsData = {
  header: "News & Blogs",
  newsAndBlogs: [
    {
      image:
        "https://images.unsplash.com/photo-1726186029199-218e58c9fb41?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["Design", "Figma"],
      excerpt: "A deep dive into the world of design systems.",
      date: new Date().toISOString().split("T")[0],
      author: "John Doe",
      icon: "FaRegCalendarAlt",
    },
    {
      image: "./images/news-&-blogs/chatgpt1.png",
      tags: ["AI", "ChatGPT 5"],
      excerpt: "Exploring the capabilities of ChatGPT 5 and its impact on AI.",
      date: new Date().toISOString().split("T")[0],
      author: "Jane Smith",
      icon: "FaRegCalendarAlt",
    },
  ],
};
