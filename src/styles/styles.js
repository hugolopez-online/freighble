window.addEventListener("scroll", () => {
    const website_hero = document.getElementById("website_hero");

    if (window.scrollY < 600 && website_hero) {
        website_hero.style.backgroundPositionY = `${-window.scrollY * 0.5}px`;
    }
});
