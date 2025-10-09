document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#gallery");
  const iso = new Isotope(grid, {
    itemSelector: ".grid-item",
    layoutMode: "masonry",
    transitionDuration: "0.3s",
    percentPosition: true,
  });

  imagesLoaded(grid, () => iso.layout());

  const filters = document.querySelectorAll("#filters button");
  const noResults = document.getElementById("no-results");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filterValue = btn.dataset.filter;
      iso.arrange({ filter: filterValue });

      iso.once("arrangeComplete", (filteredItems) => {
        noResults.style.display = filteredItems.length === 0 ? "block" : "none";
      });
    });
  });
});
