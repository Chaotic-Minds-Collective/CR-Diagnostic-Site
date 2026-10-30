import React, { useCallback, useState } from 'react';
import { CaseWorksheet } from './components/CaseWorksheet';
import { DetailDialog } from './components/DetailDialog';
import { DiagnosticLab } from './components/DiagnosticLab';
import { GuidedTriage } from './components/GuidedTriage';
import { GuidesSection } from './components/GuidesSection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import {
  AboutSection,
  LearningSection,
  SafetySection,
  SiteFooter,
} from './components/InfoSections';
import { SearchSection } from './components/SearchSection';
import { SymptomsSection } from './components/SymptomsSection';
import { searchDiagnosticLibrary } from './data/diagnosticsData';
import { DetailSelection, SearchResultItem } from './types/diagnostics';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [activeDetail, setActiveDetail] = useState<DetailSelection | null>(null);

  const handleRunSearch = useCallback(
    (queryValue: string, resultsEl?: HTMLDivElement | null) => {
      const { status, results } = searchDiagnosticLibrary(queryValue);
      setSearchStatus(status);
      setSearchResults(results);

      if (results.length > 0 && resultsEl) {
        requestAnimationFrame(() => {
          resultsEl.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'nearest',
          });
        });
      }
    },
    []
  );

  const handleSelectSymptom = useCallback((symptomQuery: string) => {
    setSearchQuery(symptomQuery);
    const { status, results } = searchDiagnosticLibrary(symptomQuery);
    setSearchStatus(status);
    setSearchResults(results);

    const searchSectionEl = document.getElementById('search');
    if (searchSectionEl) {
      searchSectionEl.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }, []);

  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <SearchSection
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onRunSearch={handleRunSearch}
          statusMessage={searchStatus}
          results={searchResults}
          onOpenDetail={setActiveDetail}
        />
        <DiagnosticLab onOpenDetail={setActiveDetail} />
        <SymptomsSection onSelectSymptom={handleSelectSymptom} />
        <GuidedTriage />
        <CaseWorksheet />
        <GuidesSection onOpenDetail={setActiveDetail} />
        <LearningSection />
        <SafetySection />
        <AboutSection />
      </main>
      <SiteFooter />
      <DetailDialog
        selection={activeDetail}
        onClose={() => setActiveDetail(null)}
      />
    </>
  );
};

export default App;
