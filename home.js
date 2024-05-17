// SHOW HOME AND ARTISTS PAGES SCRIPTS
document.addEventListener("DOMContentLoaded", function() {
    var showArtistsButton = document.getElementById("show-artists-page");
    var artistsLink = document.getElementById("artists");
    var artistsPage = document.getElementById("artists-page");
    var homePage = document.getElementById("home-page");
    var titleElement = document.querySelector('title');
    var showHomeButton = document.getElementById("show-home-page");
    var itemsPage = document.getElementById("items-page");

    function showArtistsPage() {
        artistsPage.style.display = "block";
        window.location.hash = "artists-page";
        homePage.style.display = "none";
    }

    function showHomePage() {
        titleElement.innerText = 'Artists*';
        window.location.hash = "";
        artistsPage.style.display = "none";
        itemsPage.style.display = "none";
        homePage.style.display = "block";
    }

    if (showArtistsButton && artistsPage && homePage) {
        showArtistsButton.addEventListener("click", showArtistsPage);
    }

    if (artistsLink && artistsPage && homePage) {
        artistsLink.addEventListener("click", showArtistsPage);
    }

    if (showHomeButton && artistsPage && homePage && itemsPage) {
        showHomeButton.addEventListener("click", showHomePage);
    }
});






// SHOW ITEMS PAGE
document.addEventListener("DOMContentLoaded", function() {
    var titleElement = document.querySelector('title');
    var showItemsButton = document.getElementById("show-items-page");
    var itemsLink = document.getElementById("items");
    var artistsPage = document.getElementById("artists-page");
    var homePage = document.getElementById("home-page");
    var itemsPage = document.getElementById("items-page");

    function showItemsPage() {
        titleElement.innerText = 'Items*';
        window.location.hash = "artists-page";
        artistsPage.style.display = "none";
        itemsPage.style.display = "block";
        homePage.style.display = "none";
    }

    if (showItemsButton && artistsPage) {
        showItemsButton.addEventListener("click", showItemsPage);
    }

    if (itemsLink && artistsPage) {
        itemsLink.addEventListener("click", showItemsPage);
    }
});







// SHOW CREATE PAGE

document.getElementById('create-button').addEventListener('click', function() {
    var artistsPage = document.getElementById("artists-page");
    var homePage = document.getElementById("home-page");

    window.location.hash = 'create';
    artistsPage.style.display = "none";
    homePage.style.display = "none";
    document.getElementById('create-page').style.display = 'block';
});