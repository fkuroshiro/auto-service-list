import { useState } from "react";
import MapView from "./components/MapView.jsx";
import ServiceList from "./components/ServiceList.jsx";
import { services } from "./data/services.js";

export default function App() {
  const [selectedService, setSelectedService] = useState(services[0] || null);

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
              services={services}
              selectedService={selectedService}
              onSelect={setSelectedService}
            />
          </div>
          <div className="layout__right">
            <MapView
              services={services}
              selectedService={selectedService}
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
