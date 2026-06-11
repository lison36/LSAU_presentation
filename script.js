function showSection(id) {
    // cacher toutes les sections
    document.querySelectorAll("section").forEach(section => {
        section.classList.remove("active");
    });

    // désactiver tous les boutons
    document.querySelectorAll("nav button").forEach(button => {
        button.classList.remove("active");
    });

    // afficher la section sélectionnée
    document.getElementById(id).classList.add("active");

    // activer le bouton correspondant à la section
    const activeButton = Array.from(document.querySelectorAll("nav button")).find(button => {
        return button.getAttribute("onclick") === `showSection('${id}')`;
    });

    if (activeButton) {
        activeButton.classList.add("active");
    }

}

function initSkillsInteractions() {
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) {
        return;
    }

    const filterButtons = skillsSection.querySelectorAll(".skills-filters button");
    const skillCards = skillsSection.querySelectorAll(".skill-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            skillCards.forEach(card => {
                const cardType = card.dataset.type;
                const shouldShow = filter === "all" || cardType === filter;

                if (shouldShow) {
                    card.removeAttribute("hidden");
                } else {
                    card.setAttribute("hidden", "");
                }
            });
        });
    });
}

function initParcoursInteractions() {
    const parcoursSection = document.getElementById("parcours");
    if (!parcoursSection) {
        return;
    }

    const filterButtons = parcoursSection.querySelectorAll(".parcours-filters button");
    const timelineItems = parcoursSection.querySelectorAll(".timeline-item");
    const detailButtons = parcoursSection.querySelectorAll(".toggle-details");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            timelineItems.forEach(item => {
                const itemType = item.dataset.type;
                const shouldShow = filter === "all" || itemType === filter;

                if (shouldShow) {
                    item.removeAttribute("hidden");
                } else {
                    item.setAttribute("hidden", "");
                }
            });
        });
    });

    detailButtons.forEach(button => {
        button.addEventListener("click", () => {
            const detailId = button.getAttribute("aria-controls");
            const detailBlock = detailId ? document.getElementById(detailId) : null;
            if (!detailBlock) {
                return;
            }

            const expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!expanded));
            button.textContent = expanded ? "Voir plus" : "Voir moins";

            if (expanded) {
                detailBlock.setAttribute("hidden", "");
            } else {
                detailBlock.removeAttribute("hidden");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initParcoursInteractions();
    initSkillsInteractions();
});