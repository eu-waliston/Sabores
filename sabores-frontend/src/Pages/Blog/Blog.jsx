import React from "react";
import "./Blog.scss";

const Blog = () => {
  return (
    <div className="page blog">
      <header className="page__header">
        <h1>Blog</h1>
        <p>Dicas, histórias e inspiração culinária</p>
      </header>

      <section className="blog__posts">
        {[...Array(5)].map((_, i) => (
          <article key={i} className="blog-post">
            <h2>Post #{i + 1}</h2>
            <p>
              Um texto introdutório que dá vontade de clicar e ler tudo.
            </p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Blog;
