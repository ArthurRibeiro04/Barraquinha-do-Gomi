import React from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalSubtitle,
  ModalActions,
  ModalButtonPrimary,
  ModalButtonSecondary,
  ModalButtonDanger,
} from "./StyledComponents";
import { Manga } from "./MangaTypes";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  manga: Manga | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteModal({
  isOpen,
  manga,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (!isOpen || !manga) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Excluir review</ModalTitle>
        <ModalSubtitle>
          Tem certeza que deseja excluir a review de{" "}
          <strong>{manga.name}</strong> (Volume {manga.volume})? Essa ação
          não pode ser desfeita.
        </ModalSubtitle>

        <ModalActions style={{ marginTop: "16px" }}>
          <ModalButtonSecondary type="button" onClick={onClose}>
            Cancelar
          </ModalButtonSecondary>
          <ModalButtonDanger type="button" onClick={onConfirm}>
            Confirmar exclusão
          </ModalButtonDanger>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
}
