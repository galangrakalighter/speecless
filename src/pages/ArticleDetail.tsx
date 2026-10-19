import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Header from "@/components/home/Header";
import FinalCTA from "@/components/home/CTA";
import Footer from "@/components/Footer";
import DOMPurify from "dompurify";

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

interface BridgeArticle {
  id: string;
  category_id: string;
  category_name: string;
  title: string;
  excerpt: string | null;
  content: string;
  image: string | null;
}

interface BridgeResponse {
  status: "success" | "error";
  message?: string;
  data?: BridgeArticle[];
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [article, setArticle] =
    useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState("");

  const loadArticle = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);
      setArticle(null);
      setImageError(false);
      setError("");

      try {
        if (!BRIDGE_KEY) {
          throw new Error(
            "Konfigurasi VITE_BRIDGE_KEY belum tersedia.",
          );
        }

        const articleId = Number(id);

        if (
          !Number.isInteger(articleId) ||
          articleId < 1
        ) {
          throw new Error("ID artikel tidak valid.");
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
          WHERE a.id = ${articleId}
          LIMIT 1
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
            signal,
          },
        );

        const responseText = await response.text();

        let result: BridgeResponse;

        try {
          result = JSON.parse(
            responseText,
          ) as BridgeResponse;
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

        const articleData = result.data?.[0];

        if (!articleData) {
          throw new Error("Artikel tidak ditemukan.");
        }

        setArticle({
          id: Number(articleData.id),
          category_id: Number(articleData.category_id),
          category_name: articleData.category_name,
          title: articleData.title,
          excerpt: articleData.excerpt,
          content: articleData.content,
          image: articleData.image,
        });

        document.title = `${articleData.title} | Pencilvania`;
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setArticle(null);

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Artikel gagal dimuat.",
        );
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
        }
      }
    },
    [id],
  );

  useEffect(() => {
    const controller = new AbortController();

    void loadArticle(controller.signal);

    return () => {
      controller.abort();
      document.title = "Pencilvania";
    };
  }, [loadArticle]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f5f0e7]">
        <Header />

        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <div className="animate-pulse">
              <div className="mb-5 h-6 w-36 rounded-full bg-stone-300" />

              <div className="mb-3 h-12 w-full rounded bg-stone-300" />

              <div className="mb-8 h-12 w-2/3 rounded bg-stone-300" />

              <div className="aspect-video rounded-3xl bg-stone-300" />

              <div className="mt-8 space-y-3">
                <div className="h-4 rounded bg-stone-300" />
                <div className="h-4 rounded bg-stone-300" />
                <div className="h-4 w-3/4 rounded bg-stone-300" />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f5f0e7]">
        <Header />

        <main className="grid flex-1 place-items-center px-6 py-20">
          <div className="max-w-lg text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
              Pencilvania
            </p>

            <h1 className="text-3xl font-black text-stone-900 md:text-4xl">
              Artikel tidak ditemukan
            </h1>

            <p className="mt-3 text-stone-600">
              {error ||
                "Artikel yang Anda cari tidak tersedia."}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-full border border-stone-300 px-6 py-3 text-sm font-bold text-stone-700 transition hover:bg-white"
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={() => void loadArticle()}
                className="rounded-full border border-[#d4a017] px-6 py-3 text-sm font-bold text-[#7a5907] transition hover:bg-[#fff6d7]"
              >
                Coba Lagi
              </button>

              <Link
                to="/"
                className="rounded-full bg-[#d4a017] px-6 py-3 text-sm font-bold text-[#3d3013] transition hover:bg-[#e5b52a]"
              >
                Ke Beranda
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(
    article.content,
    {
      ALLOWED_TAGS: [
        "p",
        "br",
        "strong",
        "b",
        "em",
        "i",
        "u",
        "s",
        "h2",
        "h3",
        "h4",
        "ul",
        "ol",
        "li",
        "blockquote",
        "a",
        "img",
        "hr",
        "code",
        "pre",
      ],
      ALLOWED_ATTR: [
        "href",
        "target",
        "rel",
        "src",
        "alt",
        "title",
        "class",
        "style",
      ],
    },
  );

  return (
    <div className="min-h-screen bg-[#f5f0e7]">
      <Header />

      <main>
        <article>
          <header className="bg-[#4a4613] px-6 pb-20 pt-16">
            <div className="mx-auto max-w-4xl">
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#e5bb43]">
                {article.category_name}
              </span>

              <h1 className="mt-6 break-words text-4xl font-black leading-tight text-white md:text-6xl">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="mt-6 max-w-3xl whitespace-pre-line text-lg leading-8 text-white/75">
                  {article.excerpt}
                </p>
              )}
            </div>
          </header>

          <section className="px-4 sm:px-6">
            <div className="mx-auto max-w-4xl">
              {article.image && !imageError && (
                <figure className="-mt-12">
                  <div className="aspect-video overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl sm:rounded-3xl">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-contain"
                      loading="eager"
                      onError={() => setImageError(true)}
                    />
                  </div>
                </figure>
              )}

              <div className="py-12">
                <div
                  className="
                    break-words text-base leading-8 text-stone-700 md:text-lg
                    [&_p]:my-4
                    [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-black [&_h2]:text-stone-900
                    [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-stone-900
                    [&_h4]:mb-3 [&_h4]:mt-6 [&_h4]:text-xl [&_h4]:font-bold
                    [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-7
                    [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-7
                    [&_li]:my-2
                    [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[#d4a017]
                    [&_blockquote]:bg-white [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:italic
                    [&_a]:font-semibold [&_a]:text-blue-800 [&_a]:underline
                    [&_hr]:my-10 [&_hr]:border-stone-300
                    [&_img]:mx-auto [&_img]:my-8 [&_img]:max-h-[650px]
                    [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:object-contain
                  "
                  dangerouslySetInnerHTML={{
                    __html: sanitizedContent,
                  }}
                />

                <div className="mt-12 border-t border-stone-300 pt-8">
                  <Link
                    to="/"
                    className="inline-flex rounded-full bg-[#d4a017] px-7 py-3 text-sm font-bold text-[#3d3013] transition hover:bg-[#e5b52a]"
                  >
                    ← Kembali ke Beranda
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </article>

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;