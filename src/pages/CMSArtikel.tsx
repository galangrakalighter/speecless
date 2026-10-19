import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "@/components/RichTextEditor";

const BRIDGE_URL =
  "https://goldenaromafood.com/bridge_pencilvania.php";

const BRIDGE_KEY = "Gafibaru123!";

type ActiveTab = "articles" | "categories" | "planned-keywords";

type KeywordRow = Record<string, unknown>;

type KeywordTableName =
  | "article_generate_keywords"
  | "article_generate_keyword_plans";

interface KeywordColumn {
  Field: string;
  Type: string;
  Null: "YES" | "NO";
  Key: string;
  Default: unknown;
  Extra: string;
}

interface KeywordEditorState {
  table: KeywordTableName;
  row: KeywordRow | null;
}

interface Category {
  id: number;
  nama_kategori: string;
  article_count: number;
}

interface Article {
  id: number;
  category_id: number;
  category_name: string;
  title: string;
  excerpt: string | null;
  content: string;
  image: string | null;
}

interface ArticleForm {
  id: number | null;
  category_id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
}

interface CategoryForm {
  id: number | null;
  nama_kategori: string;
}

interface BridgeResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  data?: T;
  insert_id?: number;
  affected_rows?: number;
  url?: string;
}

const EMPTY_ARTICLE_FORM: ArticleForm = {
  id: null,
  category_id: "",
  title: "",
  excerpt: "",
  content: "",
  image: "",
};

const EMPTY_CATEGORY_FORM: CategoryForm = {
  id: null,
  nama_kategori: "",
};

const sqlString = (
  value: string | null | undefined,
): string => {
  if (value === null || value === undefined) {
    return "NULL";
  }

  const escapedValue = value
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "''")
    .replace(/\u0000/g, "");

  return `'${escapedValue}'`;
};

const sqlNumber = (value: number | string): number => {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    throw new Error("Nilai ID tidak valid.");
  }

  return parsedValue;
};

const sqlIdentifier = (value: string): string =>
  `\`${value.replace(/`/g, "``")}\``;

const isAutomaticColumn = (column: KeywordColumn): boolean =>
  /auto_increment|generated/i.test(column.Extra || "") ||
  ["id", "created_at", "updated_at"].includes(column.Field);

const isDateColumn = (column: KeywordColumn): boolean =>
  /date|time|timestamp/i.test(column.Type);

const toFormValue = (
  value: unknown,
  column: KeywordColumn,
): string => {
  if (value === null || value === undefined) {
    return "";
  }

  const text = String(value);

  if (/datetime|timestamp/i.test(column.Type)) {
    return text.replace(" ", "T").slice(0, 16);
  }

  if (/^date/i.test(column.Type)) {
    return text.slice(0, 10);
  }

  return text;
};

const CMSArtikel: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState<ActiveTab>("articles");

  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [defaultKeywords, setDefaultKeywords] =
    useState<KeywordRow[]>([]);
  const [plannedKeywords, setPlannedKeywords] =
    useState<KeywordRow[]>([]);
  const [defaultKeywordColumns, setDefaultKeywordColumns] =
    useState<KeywordColumn[]>([]);
  const [plannedKeywordColumns, setPlannedKeywordColumns] =
    useState<KeywordColumn[]>([]);
  const [keywordEditor, setKeywordEditor] =
    useState<KeywordEditorState | null>(null);
  const [keywordForm, setKeywordForm] =
    useState<Record<string, string>>({});
  const [isSavingKeyword, setIsSavingKeyword] =
    useState(false);
  const [deletingKeyword, setDeletingKeyword] =
    useState("");

  const [articleForm, setArticleForm] =
    useState<ArticleForm>(EMPTY_ARTICLE_FORM);

  const [categoryForm, setCategoryForm] =
    useState<CategoryForm>(EMPTY_CATEGORY_FORM);

  const [articleSearch, setArticleSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(
    null,
  );
  const [imagePreview, setImagePreview] = useState("");

  const [isArticleFormOpen, setIsArticleFormOpen] =
    useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] =
    useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingArticle, setIsSavingArticle] =
    useState(false);
  const [isSavingCategory, setIsSavingCategory] =
    useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [deletingArticleId, setDeletingArticleId] =
    useState<number | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] =
    useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const executeQuery = useCallback(
    async <T,>(query: string): Promise<BridgeResponse<T>> => {
      if (!BRIDGE_KEY) {
        throw new Error(
          "VITE_BRIDGE_KEY belum diatur pada file .env.",
        );
      }

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

      let result: BridgeResponse<T>;

      try {
        result = JSON.parse(responseText) as BridgeResponse<T>;
      } catch {
        throw new Error(
          "Server tidak memberikan respons JSON yang valid.",
        );
      }

      if (!response.ok || result.status !== "success") {
        throw new Error(
          result.message || "Permintaan ke server gagal.",
        );
      }

      return result;
    },
    [],
  );

  const loadCategories = useCallback(async () => {
    const query = `
      SELECT
        k.id,
        k.nama_kategori,
        COUNT(a.id) AS article_count
      FROM kategori AS k
      LEFT JOIN articles AS a
        ON a.category_id = k.id
      GROUP BY
        k.id,
        k.nama_kategori
      ORDER BY k.nama_kategori ASC
    `;

    const result = await executeQuery<
      Array<{
        id: string;
        nama_kategori: string;
        article_count: string;
      }>
    >(query);

    setCategories(
      (result.data || []).map((category) => ({
        id: Number(category.id),
        nama_kategori: category.nama_kategori,
        article_count: Number(category.article_count),
      })),
    );
  }, [executeQuery]);

  const loadArticles = useCallback(async () => {
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
    `;

    const result = await executeQuery<
      Array<{
        id: string;
        category_id: string;
        category_name: string;
        title: string;
        excerpt: string | null;
        content: string;
        image: string | null;
      }>
    >(query);

    setArticles(
      (result.data || []).map((article) => ({
        ...article,
        id: Number(article.id),
        category_id: Number(article.category_id),
      })),
    );
  }, [executeQuery]);

  const loadKeywords = useCallback(async () => {
    const [
      defaultResult,
      plannedResult,
      defaultColumnsResult,
      plannedColumnsResult,
    ] = await Promise.all([
      executeQuery<KeywordRow[]>(`
        SELECT *
        FROM article_generate_keywords
        ORDER BY id DESC
      `),
      executeQuery<KeywordRow[]>(`
        SELECT *
        FROM article_generate_keyword_plans
        ORDER BY id DESC
      `),
      executeQuery<KeywordColumn[]>(`
        SHOW COLUMNS FROM article_generate_keywords
      `),
      executeQuery<KeywordColumn[]>(`
        SHOW COLUMNS FROM article_generate_keyword_plans
      `),
    ]);

    setDefaultKeywords(defaultResult.data || []);
    setPlannedKeywords(plannedResult.data || []);
    setDefaultKeywordColumns(defaultColumnsResult.data || []);
    setPlannedKeywordColumns(plannedColumnsResult.data || []);
  }, [executeQuery]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      await Promise.all([
        loadCategories(),
        loadArticles(),
        loadKeywords(),
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Data gagal dimuat.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [loadArticles, loadCategories, loadKeywords]);

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("isAuthenticated") === "true" ||
      sessionStorage.getItem("isAuthenticated") === "true" ||
      localStorage.getItem("isLoggedIn") === "true";

    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    void loadData();
  }, [loadData, navigate]);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const filteredArticles = useMemo(() => {
    const keyword = articleSearch.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesSearch =
        keyword === "" ||
        article.title.toLowerCase().includes(keyword) ||
        article.category_name.toLowerCase().includes(keyword) ||
        (article.excerpt || "").toLowerCase().includes(keyword);

      const matchesCategory =
        categoryFilter === "" ||
        article.category_id === Number(categoryFilter);

      return matchesSearch && matchesCategory;
    });
  }, [articleSearch, articles, categoryFilter]);

  const filteredCategories = useMemo(() => {
    const keyword = categorySearch.trim().toLowerCase();

    return categories.filter(
      (category) =>
        keyword === "" ||
        category.nama_kategori
          .toLowerCase()
          .includes(keyword),
    );
  }, [categories, categorySearch]);

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const changeTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    resetMessages();
  };

  const openCreateArticleForm = () => {
    resetMessages();

    setArticleForm({
      ...EMPTY_ARTICLE_FORM,
      category_id:
        categories.length > 0
          ? String(categories[0].id)
          : "",
    });

    setImageFile(null);
    setImagePreview("");
    setIsArticleFormOpen(true);
  };

  const openEditArticleForm = (article: Article) => {
    resetMessages();

    setArticleForm({
      id: article.id,
      category_id: String(article.category_id),
      title: article.title,
      excerpt: article.excerpt || "",
      content: article.content,
      image: article.image || "",
    });

    setImageFile(null);
    setImagePreview(article.image || "");
    setIsArticleFormOpen(true);
  };

  const closeArticleForm = () => {
    if (isSavingArticle || isUploading) {
      return;
    }

    setArticleForm(EMPTY_ARTICLE_FORM);
    setImageFile(null);
    setImagePreview("");
    setIsArticleFormOpen(false);
  };

  const handleArticleFormChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setArticleForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5 MB.");
      event.target.value = "";
      return;
    }

    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  };

  const removeSelectedImage = () => {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview("");

    setArticleForm((currentForm) => ({
      ...currentForm,
      image: "",
    }));
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      return articleForm.image;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();

      formData.append("action", "upload_image");
      formData.append("image", imageFile);

      const response = await fetch(
        `${BRIDGE_URL}?key=${encodeURIComponent(BRIDGE_KEY)}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        },
      );

      const result =
        (await response.json()) as BridgeResponse;

      if (
        !response.ok ||
        result.status !== "success" ||
        !result.url
      ) {
        throw new Error(
          result.message || "Upload gambar gagal.",
        );
      }

      return result.url;
    } finally {
      setIsUploading(false);
    }
  };

  const hasArticleContent = (html: string): boolean => {
    const containsImage = /<img\b/i.test(html);

    const plainText = html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .trim();

    return containsImage || plainText.length > 0;
  };

  const handleArticleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    resetMessages();

    if (
      !articleForm.category_id ||
      !articleForm.title.trim() ||
      !hasArticleContent(articleForm.content)
    ) {
      setError(
        "Kategori, judul, dan isi artikel wajib diisi.",
      );
      return;
    }

    setIsSavingArticle(true);

    try {
      const categoryId = sqlNumber(
        articleForm.category_id,
      );

      const imageUrl = await uploadImage();

      if (articleForm.id === null) {
        const insertQuery = `
          INSERT INTO articles (
            category_id,
            title,
            excerpt,
            content,
            image
          )
          VALUES (
            ${categoryId},
            ${sqlString(articleForm.title.trim())},
            ${sqlString(
              articleForm.excerpt.trim() || null,
            )},
            ${sqlString(articleForm.content.trim())},
            ${sqlString(imageUrl || null)}
          )
        `;

        await executeQuery(insertQuery);
        setSuccess("Artikel berhasil ditambahkan.");
      } else {
        const articleId = sqlNumber(articleForm.id);

        const updateQuery = `
          UPDATE articles
          SET
            category_id = ${categoryId},
            title = ${sqlString(
              articleForm.title.trim(),
            )},
            excerpt = ${sqlString(
              articleForm.excerpt.trim() || null,
            )},
            content = ${sqlString(
              articleForm.content.trim(),
            )},
            image = ${sqlString(imageUrl || null)}
          WHERE id = ${articleId}
          LIMIT 1
        `;

        await executeQuery(updateQuery);
        setSuccess("Artikel berhasil diperbarui.");
      }

      setArticleForm(EMPTY_ARTICLE_FORM);
      setImageFile(null);
      setImagePreview("");
      setIsArticleFormOpen(false);

      await Promise.all([
        loadArticles(),
        loadCategories(),
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Artikel gagal disimpan.",
      );
    } finally {
      setIsSavingArticle(false);
    }
  };

  const handleDeleteArticle = async (
    article: Article,
  ) => {
    const confirmed = window.confirm(
      `Hapus artikel "${article.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    resetMessages();
    setDeletingArticleId(article.id);

    try {
      const articleId = sqlNumber(article.id);

      await executeQuery(`
        DELETE FROM articles
        WHERE id = ${articleId}
        LIMIT 1
      `);

      setSuccess("Artikel berhasil dihapus.");

      await Promise.all([
        loadArticles(),
        loadCategories(),
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Artikel gagal dihapus.",
      );
    } finally {
      setDeletingArticleId(null);
    }
  };

  const openCreateCategoryForm = () => {
    resetMessages();
    setCategoryForm(EMPTY_CATEGORY_FORM);
    setIsCategoryFormOpen(true);
  };

  const openEditCategoryForm = (category: Category) => {
    resetMessages();

    setCategoryForm({
      id: category.id,
      nama_kategori: category.nama_kategori,
    });

    setIsCategoryFormOpen(true);
  };

  const closeCategoryForm = () => {
    if (isSavingCategory) {
      return;
    }

    setCategoryForm(EMPTY_CATEGORY_FORM);
    setIsCategoryFormOpen(false);
  };

  const handleCategorySubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    resetMessages();

    const categoryName =
      categoryForm.nama_kategori.trim();

    if (!categoryName) {
      setError("Nama kategori wajib diisi.");
      return;
    }

    setIsSavingCategory(true);

    try {
      if (categoryForm.id === null) {
        const duplicateQuery = `
          SELECT id
          FROM kategori
          WHERE LOWER(nama_kategori) =
            LOWER(${sqlString(categoryName)})
          LIMIT 1
        `;

        const duplicateResult = await executeQuery<
          Array<{ id: string }>
        >(duplicateQuery);

        if ((duplicateResult.data || []).length > 0) {
          throw new Error(
            "Nama kategori tersebut sudah digunakan.",
          );
        }

        const insertQuery = `
          INSERT INTO kategori (
            nama_kategori
          )
          VALUES (
            ${sqlString(categoryName)}
          )
        `;

        await executeQuery(insertQuery);
        setSuccess("Kategori berhasil ditambahkan.");
      } else {
        const categoryId = sqlNumber(categoryForm.id);

        const duplicateQuery = `
          SELECT id
          FROM kategori
          WHERE LOWER(nama_kategori) =
            LOWER(${sqlString(categoryName)})
            AND id <> ${categoryId}
          LIMIT 1
        `;

        const duplicateResult = await executeQuery<
          Array<{ id: string }>
        >(duplicateQuery);

        if ((duplicateResult.data || []).length > 0) {
          throw new Error(
            "Nama kategori tersebut sudah digunakan.",
          );
        }

        const updateQuery = `
          UPDATE kategori
          SET nama_kategori = ${sqlString(categoryName)}
          WHERE id = ${categoryId}
          LIMIT 1
        `;

        await executeQuery(updateQuery);
        setSuccess("Kategori berhasil diperbarui.");
      }

      setCategoryForm(EMPTY_CATEGORY_FORM);
      setIsCategoryFormOpen(false);

      await Promise.all([
        loadCategories(),
        loadArticles(),
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Kategori gagal disimpan.",
      );
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleDeleteCategory = async (
    category: Category,
  ) => {
    if (category.article_count > 0) {
      setError(
        `Kategori "${category.nama_kategori}" masih digunakan oleh ${category.article_count} artikel. Pindahkan atau hapus artikelnya terlebih dahulu.`,
      );
      return;
    }

    const confirmed = window.confirm(
      `Hapus kategori "${category.nama_kategori}"?`,
    );

    if (!confirmed) {
      return;
    }

    resetMessages();
    setDeletingCategoryId(category.id);

    try {
      const categoryId = sqlNumber(category.id);

      await executeQuery(`
        DELETE FROM kategori
        WHERE id = ${categoryId}
        AND NOT EXISTS (
          SELECT 1
          FROM articles
          WHERE category_id = ${categoryId}
        )
        LIMIT 1
      `);

      setSuccess("Kategori berhasil dihapus.");
      await loadCategories();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Kategori gagal dihapus.",
      );
    } finally {
      setDeletingCategoryId(null);
    }
  };

  const getKeywordColumns = (
    table: KeywordTableName,
  ): KeywordColumn[] =>
    table === "article_generate_keywords"
      ? defaultKeywordColumns
      : plannedKeywordColumns;

  const getKeywordPrimaryColumn = (
    table: KeywordTableName,
  ): KeywordColumn | undefined => {
    const columns = getKeywordColumns(table);

    return (
      columns.find((column) => column.Key === "PRI") ||
      columns.find((column) => column.Field === "id")
    );
  };

  const openCreateKeywordForm = (
    table: KeywordTableName,
  ) => {
    resetMessages();

    const values = Object.fromEntries(
      getKeywordColumns(table)
        .filter((column) => !isAutomaticColumn(column))
        .map((column) => [column.Field, ""]),
    );

    setKeywordForm(values);
    setKeywordEditor({ table, row: null });
  };

  const openEditKeywordForm = (
    table: KeywordTableName,
    row: KeywordRow,
  ) => {
    resetMessages();

    const values = Object.fromEntries(
      getKeywordColumns(table)
        .filter((column) => !isAutomaticColumn(column))
        .map((column) => [
          column.Field,
          toFormValue(row[column.Field], column),
        ]),
    );

    setKeywordForm(values);
    setKeywordEditor({ table, row });
  };

  const closeKeywordForm = () => {
    if (isSavingKeyword) {
      return;
    }

    setKeywordEditor(null);
    setKeywordForm({});
  };

  const keywordSqlValue = (
    value: string,
    column: KeywordColumn,
  ): string => {
    if (value.trim() === "" && column.Null === "YES") {
      return "NULL";
    }

    const normalizedValue = isDateColumn(column)
      ? value.replace("T", " ")
      : value;

    return sqlString(normalizedValue);
  };

  const handleKeywordSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!keywordEditor) {
      return;
    }

    resetMessages();
    setIsSavingKeyword(true);

    try {
      const { table, row } = keywordEditor;
      const columns = getKeywordColumns(table);
      const primaryColumn = getKeywordPrimaryColumn(table);
      const editableColumns = columns.filter(
        (column) =>
          !isAutomaticColumn(column) &&
          (row === null || column.Field !== primaryColumn?.Field),
      );

      for (const column of editableColumns) {
        const value = keywordForm[column.Field] ?? "";

        if (
          value.trim() === "" &&
          column.Null === "NO" &&
          column.Default === null
        ) {
          throw new Error(
            `${column.Field.replace(/_/g, " ")} wajib diisi.`,
          );
        }
      }

      if (row === null) {
        const insertColumns = editableColumns.filter((column) => {
          const value = keywordForm[column.Field] ?? "";

          return value.trim() !== "" || column.Default === null;
        });

        if (insertColumns.length === 0) {
          throw new Error("Tidak ada data yang dapat disimpan.");
        }

        const query = `
          INSERT INTO ${sqlIdentifier(table)} (
            ${insertColumns
              .map((column) => sqlIdentifier(column.Field))
              .join(", ")}
          ) VALUES (
            ${insertColumns
              .map((column) =>
                keywordSqlValue(
                  keywordForm[column.Field] ?? "",
                  column,
                ),
              )
              .join(", ")}
          )
        `;

        await executeQuery(query);
        setSuccess("Keyword berhasil ditambahkan.");
      } else {
        if (!primaryColumn) {
          throw new Error(
            `Tabel ${table} tidak mempunyai primary key untuk proses edit.`,
          );
        }

        const primaryValue = row[primaryColumn.Field];

        const query = `
          UPDATE ${sqlIdentifier(table)}
          SET ${editableColumns
            .map(
              (column) =>
                `${sqlIdentifier(column.Field)} = ${keywordSqlValue(
                  keywordForm[column.Field] ?? "",
                  column,
                )}`,
            )
            .join(", ")}
          WHERE ${sqlIdentifier(primaryColumn.Field)} =
            ${sqlString(String(primaryValue))}
          LIMIT 1
        `;

        await executeQuery(query);
        setSuccess("Keyword berhasil diperbarui.");
      }

      setKeywordEditor(null);
      setKeywordForm({});
      await loadKeywords();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Keyword gagal disimpan.",
      );
    } finally {
      setIsSavingKeyword(false);
    }
  };

  const handleDeleteKeyword = async (
    table: KeywordTableName,
    row: KeywordRow,
  ) => {
    const primaryColumn = getKeywordPrimaryColumn(table);

    if (!primaryColumn) {
      setError(
        `Tabel ${table} tidak mempunyai primary key untuk proses hapus.`,
      );
      return;
    }

    const primaryValue = row[primaryColumn.Field];

    if (!window.confirm("Hapus data keyword ini?")) {
      return;
    }

    const deletionKey = `${table}:${String(primaryValue)}`;
    resetMessages();
    setDeletingKeyword(deletionKey);

    try {
      await executeQuery(`
        DELETE FROM ${sqlIdentifier(table)}
        WHERE ${sqlIdentifier(primaryColumn.Field)} =
          ${sqlString(String(primaryValue))}
        LIMIT 1
      `);

      setSuccess("Keyword berhasil dihapus.");
      await loadKeywords();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Keyword gagal dihapus.",
      );
    } finally {
      setDeletingKeyword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("loginTime");

    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("loginTime");

    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      <header className="bg-amber-900 px-4 py-4 text-white shadow-md sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              Pencilvania CMS
            </h1>

            <p className="text-xs text-amber-200">
              Manajemen Artikel &amp; Kategori
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-amber-700 bg-amber-800 px-4 py-2 text-sm font-medium text-amber-100 transition hover:bg-amber-700"
          >
            Keluar
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl p-4 sm:p-8">
        <nav className="mb-6 flex gap-2 rounded-2xl border border-stone-200 bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => changeTab("articles")}
            className={`flex-1 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "articles"
                ? "bg-blue-900 text-white shadow-sm"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            Artikel
            <span
              className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                activeTab === "articles"
                  ? "bg-white/20 text-white"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              {articles.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => changeTab("categories")}
            className={`flex-1 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "categories"
                ? "bg-blue-900 text-white shadow-sm"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            Kategori
            <span
              className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                activeTab === "categories"
                  ? "bg-white/20 text-white"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              {categories.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => changeTab("planned-keywords")}
            className={`flex-1 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "planned-keywords"
                ? "bg-blue-900 text-white shadow-sm"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            Planned Keyword
            <span
              className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                activeTab === "planned-keywords"
                  ? "bg-white/20 text-white"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              {defaultKeywords.length + plannedKeywords.length}
            </span>
          </button>
        </nav>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            {success}
          </div>
        )}

        {activeTab === "articles" && (
          <>
            <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Dashboard artikel
                  </p>

                  <h2 className="text-2xl font-bold text-stone-900">
                    Kelola Artikel
                  </h2>

                  <p className="mt-1 text-sm text-stone-500">
                    Tambah, perbarui, dan hapus artikel.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openCreateArticleForm}
                  disabled={categories.length === 0}
                  className="rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  + Tambah Artikel
                </button>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <div className="grid gap-3 border-b border-stone-200 p-4 md:grid-cols-[1fr_240px_auto]">
                <input
                  type="search"
                  value={articleSearch}
                  onChange={(event) =>
                    setArticleSearch(event.target.value)
                  }
                  placeholder="Cari artikel..."
                  className="h-11 rounded-xl border border-stone-300 px-4 text-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                />

                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="h-11 rounded-xl border border-stone-300 bg-white px-4 text-sm outline-none"
                >
                  <option value="">Semua kategori</option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.nama_kategori}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => void loadData()}
                  disabled={isLoading}
                  className="h-11 rounded-xl border border-stone-300 bg-stone-50 px-4 text-sm font-medium hover:bg-stone-100 disabled:opacity-50"
                >
                  Muat ulang
                </button>
              </div>

              {isLoading ? (
                <EmptyState text="Memuat data artikel..." />
              ) : filteredArticles.length === 0 ? (
                <EmptyState text="Artikel tidak ditemukan." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                      <tr>
                        <TableHead>Artikel</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead align="right">Aksi</TableHead>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-stone-100">
                      {filteredArticles.map((article) => (
                        <tr
                          key={article.id}
                          className="hover:bg-stone-50"
                        >
                          <td className="px-5 py-4">
                            <div className="flex min-w-[340px] items-center gap-4">
                              {article.image ? (
                                <img
                                  src={article.image}
                                  alt=""
                                  className="h-16 w-20 rounded-lg border border-stone-200 object-cover"
                                />
                              ) : (
                                <div className="grid h-16 w-20 place-items-center rounded-lg bg-stone-100 text-xs text-stone-400">
                                  No image
                                </div>
                              )}

                              <div>
                                <p className="font-semibold text-stone-900">
                                  {article.title}
                                </p>

                                <p className="mt-1 max-w-xl truncate text-sm text-stone-500">
                                  {article.excerpt ||
                                    "Tidak ada ringkasan"}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                              {article.category_name}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <ActionButtons
                              onEdit={() =>
                                openEditArticleForm(article)
                              }
                              onDelete={() =>
                                void handleDeleteArticle(
                                  article,
                                )
                              }
                              isDeleting={
                                deletingArticleId === article.id
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === "categories" && (
          <>
            <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Dashboard kategori
                  </p>

                  <h2 className="text-2xl font-bold text-stone-900">
                    Kelola Kategori
                  </h2>

                  <p className="mt-1 text-sm text-stone-500">
                    Tambah, ubah, dan hapus kategori artikel.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openCreateCategoryForm}
                  className="rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  + Tambah Kategori
                </button>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <div className="grid gap-3 border-b border-stone-200 p-4 md:grid-cols-[1fr_auto]">
                <input
                  type="search"
                  value={categorySearch}
                  onChange={(event) =>
                    setCategorySearch(event.target.value)
                  }
                  placeholder="Cari kategori..."
                  className="h-11 rounded-xl border border-stone-300 px-4 text-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => void loadCategories()}
                  disabled={isLoading}
                  className="h-11 rounded-xl border border-stone-300 bg-stone-50 px-4 text-sm font-medium hover:bg-stone-100 disabled:opacity-50"
                >
                  Muat ulang
                </button>
              </div>

              {isLoading ? (
                <EmptyState text="Memuat data kategori..." />
              ) : filteredCategories.length === 0 ? (
                <EmptyState text="Kategori tidak ditemukan." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                      <tr>
                        <TableHead>Nama Kategori</TableHead>
                        <TableHead>Jumlah Artikel</TableHead>
                        <TableHead align="right">Aksi</TableHead>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-stone-100">
                      {filteredCategories.map((category) => (
                        <tr
                          key={category.id}
                          className="hover:bg-stone-50"
                        >
                          <td className="px-5 py-4 font-semibold text-stone-900">
                            {category.nama_kategori}
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
                              {category.article_count} artikel
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <ActionButtons
                              onEdit={() =>
                                openEditCategoryForm(category)
                              }
                              onDelete={() =>
                                void handleDeleteCategory(
                                  category,
                                )
                              }
                              isDeleting={
                                deletingCategoryId ===
                                category.id
                              }
                              deleteDisabled={
                                category.article_count > 0
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === "planned-keywords" && (
          <div className="space-y-6">
            <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Perencanaan konten
                  </p>

                  <h2 className="text-2xl font-bold text-stone-900">
                    Planned Keyword
                  </h2>

                  <p className="mt-1 text-sm text-stone-500">
                    Daftar keyword default dan keyword yang telah
                    dijadwalkan.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void loadData()}
                  disabled={isLoading}
                  className="h-11 rounded-xl border border-stone-300 bg-stone-50 px-4 text-sm font-medium hover:bg-stone-100 disabled:opacity-50"
                >
                  Muat ulang
                </button>
              </div>
            </section>

            <KeywordTable
              title="Keyword Default"
              description="Data dari article_generate_keywords"
              table="article_generate_keywords"
              rows={defaultKeywords}
              columns={defaultKeywordColumns}
              isLoading={isLoading}
              emptyText="Keyword default belum tersedia."
              deletingKeyword={deletingKeyword}
              onCreate={() =>
                openCreateKeywordForm(
                  "article_generate_keywords",
                )
              }
              onEdit={(row) =>
                openEditKeywordForm(
                  "article_generate_keywords",
                  row,
                )
              }
              onDelete={(row) =>
                void handleDeleteKeyword(
                  "article_generate_keywords",
                  row,
                )
              }
            />

            <KeywordTable
              title="Keyword Terjadwal"
              description="Data dari article_generate_keyword_plans"
              table="article_generate_keyword_plans"
              rows={plannedKeywords}
              columns={plannedKeywordColumns}
              isLoading={isLoading}
              emptyText="Keyword terjadwal belum tersedia."
              deletingKeyword={deletingKeyword}
              onCreate={() =>
                openCreateKeywordForm(
                  "article_generate_keyword_plans",
                )
              }
              onEdit={(row) =>
                openEditKeywordForm(
                  "article_generate_keyword_plans",
                  row,
                )
              }
              onDelete={(row) =>
                void handleDeleteKeyword(
                  "article_generate_keyword_plans",
                  row,
                )
              }
            />
          </div>
        )}
      </main>

      {isArticleFormOpen && (
        <Modal
          title={
            articleForm.id === null
              ? "Tambah Artikel"
              : "Edit Artikel"
          }
          subtitle="Lengkapi data artikel berikut."
          onClose={closeArticleForm}
        >
          <form
            onSubmit={handleArticleSubmit}
            className="space-y-5"
          >
            <FormField label="Kategori" htmlFor="category_id">
              <select
                id="category_id"
                name="category_id"
                value={articleForm.category_id}
                onChange={handleArticleFormChange}
                required
                className="h-12 w-full rounded-xl border border-stone-300 bg-white px-4 outline-none focus:border-blue-900"
              >
                <option value="">Pilih kategori</option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.nama_kategori}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Judul artikel" htmlFor="title">
              <input
                id="title"
                name="title"
                maxLength={255}
                value={articleForm.title}
                onChange={handleArticleFormChange}
                required
                className="h-12 w-full rounded-xl border border-stone-300 px-4 outline-none focus:border-blue-900"
              />
            </FormField>

            <FormField label="Ringkasan" htmlFor="excerpt">
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                value={articleForm.excerpt}
                onChange={handleArticleFormChange}
                className="w-full rounded-xl border border-stone-300 p-4 outline-none focus:border-blue-900"
              />
            </FormField>

            <FormField label="Isi artikel" htmlFor="content">
              <RichTextEditor
                value={articleForm.content}
                disabled={isSavingArticle}
                onChange={(html) =>
                  setArticleForm((currentForm) => ({
                    ...currentForm,
                    content: html,
                  }))
                }
              />
            </FormField>

            <FormField label="Gambar artikel" htmlFor="image">
                <div className="mb-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
                        i
                    </span>

                    <div>
                        <p className="text-sm font-semibold text-blue-900">
                        Ukuran gambar yang disarankan
                        </p>

                        <ul className="mt-1 space-y-1 text-xs leading-5 text-blue-700">
                        <li>
                            Ukuran terbaik: <strong>1600 × 900 px</strong>
                        </li>
                        <li>
                            Ukuran minimal: <strong>1200 × 675 px</strong>
                        </li>
                        <li>
                            Rasio gambar: <strong>16:9 (landscape)</strong>
                        </li>
                        <li>
                            Format: JPG, PNG, WebP, atau GIF
                        </li>
                        <li>
                            Ukuran file maksimal: <strong>5 MB</strong>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>

                <input
                    id="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageChange}
                    className="block w-full rounded-xl border border-stone-300 p-3 text-sm"
                />

                {imagePreview && (
                    <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <p className="mb-2 text-xs font-semibold text-stone-600">
                        Pratinjau rasio 16:9
                    </p>

                    <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg bg-stone-200">
                        <img
                        src={imagePreview}
                        alt="Pratinjau artikel"
                        className="h-full w-full object-contain"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={removeSelectedImage}
                        className="mt-3 text-xs font-semibold text-red-700"
                    >
                        Hapus gambar
                    </button>
                    </div>
                )}
                </FormField>

            <ModalActions
              onCancel={closeArticleForm}
              isLoading={isSavingArticle || isUploading}
              submitText={
                isUploading
                  ? "Mengunggah..."
                  : isSavingArticle
                    ? "Menyimpan..."
                    : articleForm.id === null
                      ? "Tambah Artikel"
                      : "Simpan Perubahan"
              }
            />
          </form>
        </Modal>
      )}

      {isCategoryFormOpen && (
        <Modal
          title={
            categoryForm.id === null
              ? "Tambah Kategori"
              : "Edit Kategori"
          }
          subtitle="Masukkan nama kategori artikel."
          onClose={closeCategoryForm}
        >
          <form
            onSubmit={handleCategorySubmit}
            className="space-y-5"
          >
            <FormField
              label="Nama kategori"
              htmlFor="nama_kategori"
            >
              <input
                id="nama_kategori"
                type="text"
                maxLength={255}
                value={categoryForm.nama_kategori}
                onChange={(event) =>
                  setCategoryForm((currentForm) => ({
                    ...currentForm,
                    nama_kategori: event.target.value,
                  }))
                }
                placeholder="Contoh: Tips Pensil"
                autoFocus
                required
                className="h-12 w-full rounded-xl border border-stone-300 px-4 outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
              />
            </FormField>

            <ModalActions
              onCancel={closeCategoryForm}
              isLoading={isSavingCategory}
              submitText={
                isSavingCategory
                  ? "Menyimpan..."
                  : categoryForm.id === null
                    ? "Tambah Kategori"
                    : "Simpan Perubahan"
              }
            />
          </form>
        </Modal>
      )}

      {keywordEditor && (
        <Modal
          title={
            keywordEditor.row === null
              ? "Tambah Keyword"
              : "Edit Keyword"
          }
          subtitle={
            keywordEditor.table ===
            "article_generate_keywords"
              ? "Data keyword default."
              : "Data keyword terjadwal."
          }
          onClose={closeKeywordForm}
        >
          <form
            onSubmit={handleKeywordSubmit}
            className="space-y-5"
          >
            {getKeywordColumns(keywordEditor.table)
              .filter(
                (column) => !isAutomaticColumn(column),
              )
              .map((column) => {
                const primaryColumn =
                  getKeywordPrimaryColumn(
                    keywordEditor.table,
                  );
                const isPrimaryOnEdit =
                  keywordEditor.row !== null &&
                  primaryColumn?.Field === column.Field;
                const required =
                  !isPrimaryOnEdit &&
                  column.Null === "NO" &&
                  column.Default === null;
                const isLongText = /text|json/i.test(
                  column.Type,
                );

                return (
                  <FormField
                    key={column.Field}
                    label={formatColumnName(column.Field)}
                    htmlFor={`keyword-${column.Field}`}
                  >
                    {isLongText ? (
                      <textarea
                        id={`keyword-${column.Field}`}
                        rows={4}
                        value={
                          keywordForm[column.Field] ?? ""
                        }
                        onChange={(event) =>
                          setKeywordForm((current) => ({
                            ...current,
                            [column.Field]: event.target.value,
                          }))
                        }
                        disabled={isPrimaryOnEdit}
                        required={required}
                        className="w-full rounded-xl border border-stone-300 p-4 outline-none focus:border-blue-900 disabled:bg-stone-100"
                      />
                    ) : (
                      <input
                        id={`keyword-${column.Field}`}
                        type={
                          /datetime|timestamp/i.test(
                            column.Type,
                          )
                            ? "datetime-local"
                            : /^date/i.test(column.Type)
                              ? "date"
                              : /int|decimal|float|double/i.test(
                                    column.Type,
                                  )
                                ? "number"
                                : "text"
                        }
                        value={
                          keywordForm[column.Field] ?? ""
                        }
                        onChange={(event) =>
                          setKeywordForm((current) => ({
                            ...current,
                            [column.Field]: event.target.value,
                          }))
                        }
                        disabled={isPrimaryOnEdit}
                        required={required}
                        className="h-12 w-full rounded-xl border border-stone-300 px-4 outline-none focus:border-blue-900 disabled:bg-stone-100"
                      />
                    )}

                    <p className="mt-1 text-xs text-stone-400">
                      {column.Null === "YES"
                        ? " · boleh kosong"
                        : ""}
                    </p>
                  </FormField>
                );
              })}

            <ModalActions
              onCancel={closeKeywordForm}
              isLoading={isSavingKeyword}
              submitText={
                isSavingKeyword
                  ? "Menyimpan..."
                  : keywordEditor.row === null
                    ? "Tambah Keyword"
                    : "Simpan Perubahan"
              }
            />
          </form>
        </Modal>
      )}
    </div>
  );
};

interface TableHeadProps {
  children: React.ReactNode;
  align?: "left" | "right";
}

const TableHead: React.FC<TableHeadProps> = ({
  children,
  align = "left",
}) => (
  <th
    className={`px-5 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 ${
      align === "right" ? "text-right" : "text-left"
    }`}
  >
    {children}
  </th>
);

const EmptyState: React.FC<{ text: string }> = ({
  text,
}) => (
  <div className="p-12 text-center text-sm text-stone-500">
    {text}
  </div>
);

interface KeywordTableProps {
  title: string;
  description: string;
  table: KeywordTableName;
  rows: KeywordRow[];
  columns: KeywordColumn[];
  isLoading: boolean;
  emptyText: string;
  deletingKeyword: string;
  onCreate: () => void;
  onEdit: (row: KeywordRow) => void;
  onDelete: (row: KeywordRow) => void;
}

const formatColumnName = (column: string): string =>
  column
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const formatCellValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
};

const KeywordTable: React.FC<KeywordTableProps> = ({
  title,
  description,
  table,
  rows,
  columns,
  isLoading,
  emptyText,
  deletingKeyword,
  onCreate,
  onEdit,
  onDelete,
}) => {
  const columnNames =
    columns.length > 0
      ? columns.map((column) => column.Field)
      : Array.from(
          new Set(rows.flatMap((row) => Object.keys(row))),
        );
  const primaryColumn =
    columns.find((column) => column.Key === "PRI") ||
    columns.find((column) => column.Field === "id");

  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-stone-200 p-5 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold text-stone-900">
            {title}
          </h3>
          <p className="mt-1 text-sm text-stone-500">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={onCreate}
          disabled={isLoading || columns.length === 0}
          className="rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Tambah Keyword
        </button>
      </div>

      {isLoading ? (
        <EmptyState text={`Memuat ${title.toLowerCase()}...`} />
      ) : rows.length === 0 ? (
        <EmptyState text={emptyText} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
              <tr>
                {columnNames.map((column) => (
                  <TableHead key={column}>
                    {formatColumnName(column)}
                  </TableHead>
                ))}
                <TableHead align="right">Aksi</TableHead>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100">
              {rows.map((row, rowIndex) => {
                const primaryValue = primaryColumn
                  ? row[primaryColumn.Field]
                  : rowIndex;
                const deletionKey = `${table}:${String(
                  primaryValue,
                )}`;

                return (
                  <tr
                    key={String(primaryValue)}
                    className="hover:bg-stone-50"
                  >
                  {columnNames.map((column) => {
                    const value = formatCellValue(row[column]);

                    return (
                      <td
                        key={column}
                        className="max-w-md whitespace-nowrap px-5 py-4 text-sm text-stone-700"
                        title={value}
                      >
                        <div className="max-w-md truncate">
                          {value}
                        </div>
                      </td>
                    );
                  })}

                    <td className="px-5 py-4">
                      <ActionButtons
                        onEdit={() => onEdit(row)}
                        onDelete={() => onDelete(row)}
                        isDeleting={
                          deletingKeyword === deletionKey
                        }
                        deleteDisabled={!primaryColumn}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  deleteDisabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  isDeleting,
  deleteDisabled = false,
}) => (
  <div className="flex justify-end gap-2">
    <button
      type="button"
      onClick={onEdit}
      className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800 hover:bg-blue-100"
    >
      Edit
    </button>

    <button
      type="button"
      onClick={onDelete}
      disabled={isDeleting || deleteDisabled}
      title={
        deleteDisabled
          ? "Kategori masih digunakan oleh artikel"
          : undefined
      }
      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {isDeleting ? "Menghapus..." : "Hapus"}
    </button>
  </div>
);

interface ModalProps {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  subtitle,
  onClose,
  children,
}) => (
  <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
    <div className="mx-auto my-6 w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
        <div>
          <h2 className="text-lg font-bold text-stone-900">
            {title}
          </h2>

          <p className="text-xs text-stone-500">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-3 py-2 text-stone-500 hover:bg-stone-100"
        >
          ✕
        </button>
      </div>

      <div className="p-6">{children}</div>
    </div>
  </div>
);

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  children,
}) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold"
    >
      {label}
    </label>

    {children}
  </div>
);

interface ModalActionsProps {
  onCancel: () => void;
  isLoading: boolean;
  submitText: string;
}

const ModalActions: React.FC<ModalActionsProps> = ({
  onCancel,
  isLoading,
  submitText,
}) => (
  <div className="flex justify-end gap-3 border-t border-stone-200 pt-5">
    <button
      type="button"
      onClick={onCancel}
      disabled={isLoading}
      className="rounded-xl border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-50"
    >
      Batal
    </button>

    <button
      type="submit"
      disabled={isLoading}
      className="rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-wait disabled:opacity-50"
    >
      {submitText}
    </button>
  </div>
);

export default CMSArtikel;
