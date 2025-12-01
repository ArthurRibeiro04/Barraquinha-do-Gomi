import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MangaGrid,
  MangaCard,
  MangaCover,
  MangaTitle,
  MangaVolume,
  PaginationContainer,
  PageButton,
  TopActions,
  ReviewButton,
} from "./StyledComponents";
import { Manga, CreateMangaForm } from "./MangaTypes";
import { CreateMangaModal } from "./CreateMangaModel";
import { MangaDetailModal } from "./MangaDetailModal";
import { EditMangaModal } from "./EditMangaModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

type ReviewForm = {
  rating: number;
  comment: string;
};

type MangaListProps = {
  filterType: string | null;
};

type Feedback = {
  type: "success" | "error";
  message: string;
};

export function MangaList({ filterType }: MangaListProps) {
  const [user, setUser] = useState<any>(null);
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [selectedMangaId, setSelectedMangaId] = useState<number | "">("");
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    rating: 0,
    comment: "",
  });
  const [selectedMangaForDetails, setSelectedMangaForDetails] =
    useState<Manga | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [createForm, setCreateForm] = useState<CreateMangaForm>({
    name: "",
    volume: 1,
    release_date: "",
    type: "",
    rating: 0,
    review: "",
    image: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<CreateMangaForm>({
    name: "",
    volume: 1,
    release_date: "",
    type: "",
    rating: 0,
    review: "",
    image: "",
  });
  const [mangaBeingEdited, setMangaBeingEdited] = useState<Manga | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mangaBeingDeleted, setMangaBeingDeleted] = useState<Manga | null>(null);
  
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  
    async function apiFetch<T = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<T> {
    const res = await fetch(input, init);

    if (!res.ok) {
      let message = "Erro ao comunicar com o servidor.";

      try {
        const text = await res.text();
        if (text) {
          try {
            const data = JSON.parse(text);
            if (typeof data === "string") {
              message = data;
            } else if (data && typeof data.message === "string") {
              message = data.message;
            }
          } catch {
            message = text;
          }
        }
      } catch {

      }

      throw new Error(message);
    }

    const contentType = res.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      return (await res.json()) as T;
    }

    return undefined as T;
  }

  
  function showError(message: string) {
    setFeedback({ type: "error", message });
  }

  function showSuccess(message: string) {
    setFeedback({ type: "success", message });
  }

  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timeout);
  }, [feedback]);


  const navigate = useNavigate();
  function reloadPage() {
    navigate(0);
  }

  useEffect(() => {
    async function load() {
      setIsGlobalLoading(true);
      try {
        const baseUrl = "http://localhost:3333/mangas";

        const url = filterType
          ? `${baseUrl}?type=${encodeURIComponent(filterType)}`
          : baseUrl;

        const data = await apiFetch<Manga[]>(url);
        setMangas(data);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
        showError(
          error instanceof Error
            ? error.message
            : "Erro ao carregar mangás."
        );
      } finally {
        setIsGlobalLoading(false);
      }
    }

    load();
  }, [filterType]);




  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3333/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("token");
          }
          setIsLoggedIn(false);
          return;
        }

        const data = await res.json();
        setUser(data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Erro ao validar auth:", error);
        setIsLoggedIn(false);
      }
    }

    checkAuth();
  }, []);

  const totalPages = Math.ceil(mangas.length / itemsPerPage);
  const indexStart = (currentPage - 1) * itemsPerPage;
  const indexEnd = indexStart + itemsPerPage;
  const mangasToShow = mangas.slice(indexStart, indexEnd);

  function changePage(n: number) {
    setCurrentPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleOpenDetails(manga: Manga) {
    setSelectedMangaForDetails(manga);
  }

  function handleCloseDetails() {
    setSelectedMangaForDetails(null);
  }

  function handleOpenCreateManga() {
    if (!isLoggedIn) {
      alert("Você precisa estar logado para criar uma review.");
      return;
    }

    setSelectedMangaId("");
    setReviewForm({ rating: 0, comment: "" });
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateManga() {
    setIsCreateModalOpen(false);
  }

  function handleChangeCreateManga(
    field: keyof CreateMangaForm,
    value: string | number
  ) {
    setCreateForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmitCreateManga(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      showError("Erro: usuário não identificado.");
      return;
    }

    const token = localStorage.getItem("token");

    const body = {
      ...createForm,
      user_id: user.id,
    };

    setIsGlobalLoading(true);
    try {
      const res = await fetch("http://localhost:3333/mangas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.text();
        console.log(err);
        alert("Erro ao criar mangá.");
        return;
      }

      const created: Manga = await res.json();
      showSuccess("Mangá criado com sucesso!");
      setIsCreateModalOpen(false);
      setMangas((prev) => [...prev, created]);
    } catch (error) {
      console.error(error);
      showError(
        error instanceof Error
          ? error.message
          : "Erro ao criar mangá."
      );
    } finally {
      setIsGlobalLoading(false);
    }
  }


  function handleStartEdit(manga: Manga) {
    setMangaBeingEdited(manga);
    setEditForm({
      name: manga.name,
      volume: manga.volume,
      release_date: manga.release_date || "",
      type: manga.type || "",
      rating: manga.rating ?? 0,
      review: manga.review || "",
      image: manga.image,
    });
    setIsEditModalOpen(true);
  }

  function handleCloseEdit() {
    setIsEditModalOpen(false);
    setMangaBeingEdited(null);
  }

  function handleChangeEditField(
    field: keyof CreateMangaForm,
    value: string | number
  ) {
    setEditForm((prev) => ({
      ...prev,
      [field]:
        field === "volume" || field === "rating"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmitEditManga(e: React.FormEvent) {
    e.preventDefault();
    if (!mangaBeingEdited) return;

    const token = localStorage.getItem("token");
    if (!token) {
      showError("Você precisa estar logado.");
      return;
    }

    setIsGlobalLoading(true);
    try {
      await apiFetch(
        `http://localhost:3333/mangas/${mangaBeingEdited.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      showSuccess("Mangá atualizado com sucesso!");
      setIsEditModalOpen(false);
      setSelectedMangaForDetails(null);
      setMangaBeingEdited(null);

      setMangas(prev =>
        prev.map(m =>
          m.id === mangaBeingEdited.id ? { ...m, ...editForm } : m
        )
      );

    } catch (error) {
      console.error(error);
      showError(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar mangá."
      );
    } finally {
      setIsGlobalLoading(false);
    }
  }



  const loggedUserId =
    (user && (user.id || user.user_id || user.userId)) ?? null;

  const mangaOwnerId =
    selectedMangaForDetails &&
    (selectedMangaForDetails.user_id ||
      (selectedMangaForDetails as any).userId ||
      (selectedMangaForDetails as any).user?.id ||
      (selectedMangaForDetails as any).user?.user_id);

  const canEdit =
    isLoggedIn === true &&
    !!loggedUserId &&
    !!mangaOwnerId &&
    loggedUserId === mangaOwnerId;

  function handleAskDelete(manga: Manga) {
    setMangaBeingDeleted(manga);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDelete() {
    setIsDeleteModalOpen(false);
    setMangaBeingDeleted(null);
  }

  async function handleConfirmDelete() {
    if (!mangaBeingDeleted) return;

    const token = localStorage.getItem("token");
    if (!token) {
      showError("Você precisa estar logado.");
      return;
    }

    setIsGlobalLoading(true);
    try {
      await apiFetch(
        `http://localhost:3333/mangas/${mangaBeingDeleted.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMangas((prev) =>
        prev.filter((manga) => manga.id !== mangaBeingDeleted.id)
      );

      setIsDeleteModalOpen(false);
      setMangaBeingDeleted(null);
      setSelectedMangaForDetails(null);

      showSuccess("Mangá excluído com sucesso!");
    } catch (error) {
      console.error(error);
      showError(
        error instanceof Error
          ? error.message
          : "Erro ao excluir mangá."
      );
    } finally {
      setIsGlobalLoading(false);
    }
  }



  return (
    <>
      {isLoggedIn === true && (
        <TopActions>
          <ReviewButton onClick={handleOpenCreateManga}>
            Criar Review
          </ReviewButton>
        </TopActions>
      )}

      <MangaGrid>
        {mangasToShow.map((manga) => (
          <MangaCard
            key={manga.id}
            onClick={() => handleOpenDetails(manga)}
          >
            <MangaCover src={manga.image} alt={manga.name} />
            <MangaTitle>{manga.name}</MangaTitle>
            <MangaVolume>Volume {manga.volume}</MangaVolume>
          </MangaCard>
        ))}
      </MangaGrid>

      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            isActive={currentPage === i + 1}
            onClick={() => changePage(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </PaginationContainer>
      <CreateMangaModal
        isOpen={isCreateModalOpen}
        form={createForm}
        onChange={handleChangeCreateManga}
        onClose={handleCloseCreateManga}
        onSubmit={handleSubmitCreateManga}
      />
      <MangaDetailModal
        manga={selectedMangaForDetails}
        canEdit={canEdit}
        onClose={handleCloseDetails}
        onComments={() => {
          console.log("Comentários do mangá", selectedMangaForDetails?.id);
        }}
        onEdit={() => {
          if (selectedMangaForDetails) {
            handleStartEdit(selectedMangaForDetails);
          }
        }}
        onDelete={() => {
          if (selectedMangaForDetails) {
            handleAskDelete(selectedMangaForDetails);
          }
        }}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        manga={mangaBeingDeleted}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
      <EditMangaModal
        isOpen={isEditModalOpen}
        manga={mangaBeingEdited}
        form={editForm}
        onChange={handleChangeEditField}
        onClose={handleCloseEdit}
        onSubmit={handleSubmitEditManga}
      />
      {isGlobalLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9998,
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              fontWeight: 500,
            }}
          >
            Carregando...
          </div>
        </div>
      )}
      {feedback && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor:
              feedback.type === "success" ? "#2e7d32" : "#c62828",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 9999,
            maxWidth: "320px",
          }}
        >
          {feedback.message}
        </div>
      )}
    </>
  );
}
