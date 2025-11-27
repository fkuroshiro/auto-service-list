export default function ServiceList({
    services,
    selectedService,
    onSelect,
    searchQuery,
    onSearchChange,
    allObory,
    activeObory,
    onToggleObor,
}) {
    return (
        <div className="service-panel">
            <h2>Servisy – partneři školy</h2>
            <p className="service-panel__intro">
                Klikni na servis v seznamu nebo na mapě pro zobrazení detailu.
            </p>

            {/* FILTRY */}
            <div className="filters">
                <div className="filters__row">
                    <input
                        type="text"
                        className="filters__search"
                        placeholder="Hledat podle názvu, města, adresy…"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <div className="filters__row filters__row--chips">
                    {allObory.map((obor) => {
                        const active = activeObory.includes(obor);
                        return (
                            <button
                                key={obor}
                                type="button"
                                className={
                                    "chip" + (active ? " chip--active" : "")
                                }
                                onClick={() => onToggleObor(obor)}
                            >
                                {obor}
                            </button>
                        );
                    })}
                    {allObory.length > 0 && (
                        <button
                            type="button"
                            className={
                                "chip chip--ghost" +
                                (activeObory.length === 0
                                    ? " chip--ghost-active"
                                    : "")
                            }
                            onClick={() => onSearchChange(searchQuery) || onToggleAllOff()}
                        >
                            Všechny obory
                        </button>
                    )}
                </div>
            </div>

            {/* seznam servisů */}
            <div className="service-panel__list">
                {services.length === 0 && (
                    <p className="service-panel__empty">
                        Žádný servis neodpovídá zadanému filtru.
                    </p>
                )}

                {services.map((service) => {
                    const isActive =
                        selectedService && selectedService.id === service.id;

                    return (
                        <button
                            key={service.id}
                            className={
                                "service-item" + (isActive ? " service-item--active" : "")
                            }
                            onClick={() => onSelect(service)}
                        >
                            <div className="service-item__name">
                                {service.name}
                            </div>
                            <div className="service-item__meta">
                                {service.city} • {service.region}
                            </div>
                            <div className="service-item__tags">
                                {service.obory.map((o) => (
                                    <span key={o} className="tag">
                                        {o}
                                    </span>
                                ))}
                            </div>
                        </button>
                    );
                })}
            </div>

            {selectedService && (
                <div className="service-detail">
                    <h3>{selectedService.name}</h3>
                    <p className="service-detail__address">
                        {selectedService.address}, {selectedService.city}
                        {selectedService.region ? (
                            <> ({selectedService.region})</>
                        ) : null}
                    </p>

                    <dl className="service-detail__grid">
                        <div>
                            <dt>Kontaktní osoba</dt>
                            <dd>{selectedService.contactPerson || "—"}</dd>
                        </div>
                        <div>
                            <dt>Telefon</dt>
                            <dd>{selectedService.phone || "—"}</dd>
                        </div>
                        <div>
                            <dt>E-mail</dt>
                            <dd>
                                {selectedService.email ? (
                                    <a href={`mailto:${selectedService.email}`}>
                                        {selectedService.email}
                                    </a>
                                ) : (
                                    "—"
                                )}
                            </dd>
                        </div>
                        <div>
                            <dt>Obory praxe</dt>
                            <dd>
                                {selectedService.obory && selectedService.obory.length
                                    ? selectedService.obory.join(", ")
                                    : "—"}
                            </dd>
                        </div>
                    </dl>

                    <div className="service-detail__links">
                        {selectedService.website && (
                            <a
                                href={selectedService.website}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-link"
                            >
                                Web servisu
                            </a>
                        )}
                        {selectedService.mapUrl && (
                            <a
                                href={selectedService.mapUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-link btn-link--secondary"
                            >
                                Otevřít v mapě
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    // pomocná funkce „Všechny obory“
    function onToggleAllOff() {
        // když jsou nějaké aktivní → vyčistíme (všechny obory)
        if (activeObory.length > 0) {
            onToggleObor("__reset__"); // hack obejdeme dole
        }
    }
}
