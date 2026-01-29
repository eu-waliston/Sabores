import React from "react";
import "./Blog.scss";

const Blog = () => {
    return (
        <main className="page blog">
            <header className="page__header blog__header">
                <h1>Blog</h1>
                <p>Dicas, histórias e inspiração culinária</p>
            </header>

            <section className="blog__grid">
                {[...Array(6)].map((_, i) => (
                    <article key={i} className="blog-card">
                        <div className="blog-card__image" />

                        <div className="blog-card__content">
                            <h2>Post #{i + 1}</h2>
                            <p>
                                Um texto introdutório que dá vontade de clicar e ler tudo.
                            </p>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Blog;
