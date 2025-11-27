import { useMemo, useState } from "react";
import MapView from "./components/MapView.jsx";
import ServiceList from "./components/ServiceList.jsx";
import { services } from "./data/services.js";

export default function App() {
  const [selectedService, setSelectedService] = useState(services[0] || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeObory, setActiveObory] = useState([]); // prázdné = všechny

  // unikátní obory z dat (MO, LKS, KAR, ATS…)
  const allObory = useMemo(() => {
    const set = new Set();
    services.forEach((s) => {
      (s.obory || []).forEach((o) => set.add(o));
    });
    return Array.from(set);
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      // search podle názvu, města, adresy
      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const text =
          (s.name + " " + s.city + " " + s.address).toLowerCase();
        if (!text.includes(q)) return false;
      }

      // filtr oborů: pokud není nic vybrané, bereme vše
      if (activeObory.length > 0) {
        const obory = s.obory || [];
        const hasOverlap = obory.some((o) => activeObory.includes(o));
        if (!hasOverlap) return false;
      }

      return true;
    });
  }, [searchQuery, activeObory]);

  // když se změní filtr/search a vybraný servis už není ve filtru, zrušíme ho
  const safeSelectedService =
    selectedService &&
      filteredServices.some((s) => s.id === selectedService.id)
      ? selectedService
      : filteredServices[0] || null;

  const handleToggleObor = (obor) => {
    setActiveObory((current) =>
      current.includes(obor)
        ? current.filter((o) => o !== obor)
        : [...current, obor]
    );
  };

  return (
    <div className="page">
      <header className="page-header">
        <div className="page-header__content">
          <h1>
            Praxe žáků autooborů – mapa partnerských servisů
          </h1>
          <p>
            Interaktivní mapa autoservisů, ve kterých probíhá praxe
            žáků Střední školy automobilní a informatiky
            (Praha–Hostivař) a v&nbsp;okolí Středočeského kraje.
          </p>
        </div>
      </header>

      <main className="page-main">
        <section className="layout">
          <div className="layout__left">
            <ServiceList
              services={filteredServices}
              selectedService={safeSelectedService}
              onSelect={setSelectedService}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              allObory={allObory}
              activeObory={activeObory}
              onToggleObor={handleToggleObor}
            />
          </div>
          <div className="layout__right">
            <MapView
              services={filteredServices}
              selectedService={safeSelectedService}
              onSelect={setSelectedService}
            />
          </div>
        </section>
      </main>

      <footer className="page-footer">
        <p>
          &copy; {new Date().getFullYear()} Střední škola
          automobilní a informatiky – studentský projekt mapy
          partnerských servisů.
        </p>
      </footer>
    </div>
  );
}
