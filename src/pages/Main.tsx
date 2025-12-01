import React, { useState } from "react";
import { FormContainer } from "../components/StyledComponents";
import { Header } from "../components/Header";
import { MangaFilters } from "../components/MangaFilter";
import { MangaList } from "../components/MangaList";
import { Footer } from "../components/Footer";

export default function MainPage() {
  const [filterType, setFilterType] = useState<string | null>(null);

  return (
    <FormContainer>
      <Header />
      <MangaFilters
        selectedType={filterType}
        onSelectType={setFilterType}
      />
      <MangaList filterType={filterType} />
      <Footer />
    </FormContainer>
  );
}
