// SHOW PAGES SCRIPTS



// SHOW ARTISTS PAGE
document.addEventListener("DOMContentLoaded", function() {
    var showArtistsButton = document.getElementById("show-artists-page");
    var artistsPage = document.getElementById("artists-page");
    var homePage = document.getElementById("home-page");

    if (showArtistsButton && artistsPage) {
        showArtistsButton.addEventListener("click", function() {
            artistsPage.style.display = "block";
            window.location.hash = "artists-page"; // Add the fragment identifier to the URL
            homePage.style.display = "none";
        });
    }
});


// SHOW ARTISTS PAGE
document.addEventListener("DOMContentLoaded", function() {
    var titleElement = document.querySelector('title');
    var showArtistsButton = document.getElementById("show-home-page");
    var artistsPage = document.getElementById("artists-page");
    var homePage = document.getElementById("home-page");

    if (showArtistsButton && artistsPage) {
        showArtistsButton.addEventListener("click", function() {
            titleElement.innerText = 'Artists*';
            window.location.hash = "";
            artistsPage.style.display = "none";
            homePage.style.display = "block";
        });
        
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