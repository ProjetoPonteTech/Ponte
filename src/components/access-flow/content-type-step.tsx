import { CONTENT_TYPES, type ContentTypeId } from "../../data/contentTypes";
import { ContentTypeCard } from "./content-type-card";
import styles from "./content-types.module.css";

type ContentTypeStepProps = {
  selectedContentType: ContentTypeId | null;
  onSelect: (id: ContentTypeId) => void;
};

export function ContentTypeStep({ selectedContentType, onSelect }: ContentTypeStepProps) {
  return (
    <>
      <p className={styles.support}>
        Escolha o tipo de conteúdo que você quer tornar mais acessível.
      </p>
      <fieldset className={styles.options}>
        <legend className={styles.legend}>Escolha uma opção.</legend>
        <div className={styles.grid}>
          {CONTENT_TYPES.map((contentType) => (
            <ContentTypeCard
              key={contentType.id}
              contentType={contentType}
              selected={selectedContentType === contentType.id}
              onSelect={() => onSelect(contentType.id)}
            />
          ))}
        </div>
      </fieldset>
      <p id="content-type-instruction" className={styles.instruction}>
        Selecione um tipo de conteúdo para continuar.
      </p>
    </>
  );
}
