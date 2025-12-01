import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalSubtitle,
  ModalForm,
  ModalLabel,
  ModalInput,
  ModalTextarea,
  ModalSelect,
  ModalActions,
  ModalButtonPrimary,
  ModalButtonSecondary,
} from "./StyledComponents";
import { CreateMangaForm, Manga } from "./MangaTypes";

type EditMangaModalProps = {
  isOpen: boolean;
  manga: Manga | null;
  form: CreateMangaForm; 
  onChange: (field: keyof CreateMangaForm, value: string | number) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};


export function EditMangaModal({
  isOpen,
  manga,
  form,
  onChange,
  onClose,
  onSubmit,
}: EditMangaModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Editar Review</ModalTitle>
        <ModalSubtitle>
          Altere as informações desta review e salve as mudanças.
        </ModalSubtitle>

        <ModalForm onSubmit={onSubmit}>
          <ModalLabel>
            Nome do Mangá
            <ModalInput
              type="text"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              required
            />
          </ModalLabel>

          <ModalLabel>
            Volume
            <ModalInput
              type="number"
              min={1}
              value={form.volume}
              onChange={(e) =>
                onChange("volume", Number(e.target.value) || 0)
              }
              required
            />
          </ModalLabel>

          <ModalLabel>
            Data de Lançamento
            <ModalInput
              type="date"
              value={form.release_date}
              onChange={(e) => onChange("release_date", e.target.value)}
              required
            />
          </ModalLabel>

          <ModalLabel>
            Tipo
            <ModalSelect
              value={form.type}
              onChange={(e) => onChange("type", e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="Shounen">Shounen</option>
              <option value="Shojo">Shojo</option>
              <option value="Seinen">Seinen</option>
              <option value="Isekai">Isekai</option>
            </ModalSelect>
          </ModalLabel>

          <ModalLabel>
            Nota (0 a 10)
            <ModalInput
              type="number"
              min={0}
              max={10}
              value={form.rating}
              onChange={(e) =>
                onChange("rating", Number(e.target.value) || 0)
              }
              required
            />
          </ModalLabel>

          <ModalLabel>
            Review
            <ModalTextarea
              value={form.review}
              onChange={(e) => onChange("review", e.target.value)}
              required
            />
          </ModalLabel>

          <ModalLabel>
            URL da Imagem
            <ModalInput
              type="text"
              value={form.image}
              onChange={(e) => onChange("image", e.target.value)}
              required
            />
          </ModalLabel>

          <ModalActions>
            <ModalButtonSecondary type="button" onClick={onClose}>
              Cancelar
            </ModalButtonSecondary>
            <ModalButtonPrimary type="submit">
              Salvar alterações
            </ModalButtonPrimary>
          </ModalActions>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
}
