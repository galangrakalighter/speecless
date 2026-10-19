import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BRIDGE_URL =
  "https://goldenaromafood.com/bridge_pencilvania.php";

const BRIDGE_KEY = "Gafibaru123!";

interface Article {
  id: number;
  category_id: number;
  category_name: string;
  title: string;
  excerpt: string | null;
  content: string;
  image: string | null;
}

interface BridgeResponse {
  status: "success" | "error";
  message?: string;
  data?: Array<{
    id: string;
    category_id: string;
    category_name: string;
    title: string;
    excerpt: string | null;
    content: string;
    image: string | null;
  }>;
}

const ArticleSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadArticles = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      if (!BRIDGE_KEY) {
        throw new Error("VITE_BRIDGE_KEY belum diatur.");
      }

      const query = `
        SELECT
          a.id,
          a.category_id,
          a.title,
          a.excerpt,
          a.content,
          a.image,
          k.nama_kategori AS category_name
        FROM articles AS a
        INNER JOIN kategori AS k
          ON k.id = a.category_id
        ORDER BY a.id DESC
        LIMIT 6
      `;

      const response = await fetch(
        `${BRIDGE_URL}?key=${encodeURIComponent(BRIDGE_KEY)}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        },
      );

      const responseText = await response.text();

      let result: BridgeResponse;

      try {
        result = JSON.parse(responseText) as BridgeResponse;
      } catch {
        throw new Error(
          "Server tidak memberikan respons JSON yang valid.",
        );
      }

      if (!response.ok || result.status !== "success") {
        throw new Error(
          result.message || "Artikel gagal dimuat.",
        );
      }

      const mappedArticles: Article[] = (
        result.data || []
      ).map((article) => ({
        ...article,
        id: Number(article.id),
        category_id: Number(article.category_id),
      }));

      setArticles(mappedArticles);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Artikel gagal dimuat.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadArticles();
  }, [loadArticles]);

  return (
    <section className="bg-[#4a4613] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e5bb43]">
              Informasi Pencilvania
            </p>

            <h2 className="text-4xl font-black text-white">
              Artikel Kami
            </h2>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse space-y-4"
              >
                <div className="aspect-video rounded-2xl bg-white/10" />
                <div className="h-4 w-24 rounded bg-white/10" />
                <div className="h-7 w-full rounded bg-white/10" />
                <div className="h-7 w-3/4 rounded bg-white/10" />
                <div className="h-10 w-32 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-2xl border border-red-300/30 bg-red-950/30 p-8 text-center">
            <p className="font-semibold text-red-100">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void loadArticles()}
              className="mt-4 rounded-full bg-[#d4a017] px-6 py-2 text-sm font-bold text-[#3d3013] transition hover:bg-[#e5b52a]"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {!isLoading &&
          !error &&
          articles.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="font-semibold text-white">
                Belum ada artikel.
              </p>

              <p className="mt-1 text-sm text-white/60">
                Artikel terbaru akan ditampilkan di sini.
              </p>
            </div>
          )}

        {!isLoading &&
          !error &&
          articles.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col"
                >
                  <Link
                    to={`/artikel/${article.id}`}
                    className="block overflow-hidden rounded-2xl bg-stone-200"
                    aria-label={`Baca artikel ${article.title}`}
                  >
                    <div className="aspect-video">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#696326] text-sm font-semibold text-white/60">
                          Pencilvania
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="mt-4 flex flex-1 flex-col">
                    <span className="mb-2 w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#e5bb43]">
                      {article.category_name}
                    </span>

                    <h3 className="text-xl font-bold leading-tight text-white md:text-2xl">
                      <Link
                        to={`/artikel/${article.id}`}
                        className="transition hover:text-[#e5bb43]"
                      >
                        {article.title}
                      </Link>
                    </h3>

                    {article.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/70">
                        {article.excerpt}
                      </p>
                    )}

                    <Link
                      to={`/artikel/${article.id}`}
                      className="mt-5 w-fit rounded-full bg-[#d4a017] px-6 py-2 text-sm font-bold text-[#3d3013] transition-colors hover:bg-[#e5b52a]"
                    >
                      Selengkapnya
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
      </div>
    </section>
  );
};

export default ArticleSection;