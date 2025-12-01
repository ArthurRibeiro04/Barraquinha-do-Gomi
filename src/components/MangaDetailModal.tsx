import {
  ModalOverlay,
  DetailModalContent,
  ModalTitle,
  ModalSubtitle,
  ModalActions,
  ModalButtonPrimary,
  ModalButtonSecondary,
  MangaDetailLayout,
  MangaDetailCover,
  MangaDetailInfo,
  MangaDetailTitle,
  MangaDetailField,
  ModalButtonDanger,
} from "./StyledComponents";
import { Manga } from "./MangaTypes";

export type MangaDetailModalProps = {
  manga: Manga | null;
  canEdit: boolean;
  onClose: () => void;
  onComments: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function MangaDetailModal({
  manga,
  canEdit,
  onClose,
  onComments,
  onEdit,
  onDelete,
}: MangaDetailModalProps) {
  if (!manga) return null;

  return (
    <ModalOverlay>
      <DetailModalContent>
        <ModalTitle>Detalhes do Mangá</ModalTitle>
        <ModalSubtitle>
          Veja as informações completas desta review.
        </ModalSubtitle>

        <MangaDetailLayout>
          <MangaDetailCover src={manga.image} alt={manga.name} />

          <MangaDetailInfo>
            <MangaDetailTitle>
              {manga.name} — Volume {manga.volume}
            </MangaDetailTitle>

            {manga.type && (
              <MangaDetailField>
                <strong>Tipo: </strong>
                {manga.type}
              </MangaDetailField>
            )}

            {manga.release_date && (
              <MangaDetailField>
                <strong>Data de lançamento: </strong>
                {manga.release_date}
              </MangaDetailField>
            )}

            {typeof manga.rating === "number" && (
              <MangaDetailField>
                <strong>Nota: </strong>
                {manga.rating}
              </MangaDetailField>
            )}

            {manga.review && (
              <MangaDetailField>
                <strong>Review: </strong>
                {manga.review}
              </MangaDetailField>
            )}

            {manga.user?.name && (
              <MangaDetailField>
                <strong>Criado por: </strong>
                {manga.user.name}
              </MangaDetailField>
            )}
          </MangaDetailInfo>
        </MangaDetailLayout>

        <ModalActions style={{ marginTop: "20px" }}>
          <ModalButtonSecondary type="button" onClick={onClose}>
            Fechar
          </ModalButtonSecondary>

          <ModalButtonPrimary type="button" onClick={onComments}>
            Comentários
          </ModalButtonPrimary>

          {canEdit && (
            <>
              <ModalButtonPrimary
                type="button"
                onClick={onEdit}
                style={{ marginLeft: "8px" }}
              >
                Editar
              </ModalButtonPrimary>

              <ModalButtonDanger
                type="button"
                onClick={onDelete}
                style={{ marginLeft: "8px" }}
              >
                Deletar
              </ModalButtonDanger>
            </>
          )}
        </ModalActions>
      </DetailModalContent>
    </ModalOverlay>
  );
}
