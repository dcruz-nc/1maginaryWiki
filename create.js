// SELECT CATEGORY

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("category-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const select = document.getElementById("category");
        const selectedCategory = select.value;

        // Hide all pages
        document.getElementById("create-artist-page").style.display = "none";
        document.getElementById("create-item-page").style.display = "none";
        document.getElementById("create-1maginary-page").style.display = "none";

        // Show the selected page and update URL hash
        if (selectedCategory === "artist") {
            document.getElementById("create-artist-page").style.display = "block";
            window.location.hash = "create-artist-page";
        } else if (selectedCategory === "item") {
            document.getElementById("create-item-page").style.display = "block";
            window.location.hash = "create-item-page";
        } else if (selectedCategory === "1maginary") {
            document.getElementById("create-1maginary-page").style.display = "block";
            window.location.hash = "create-1maginary-page";
        }
    });
});


// CREATE ARTIST
const pageForm = document.getElementById('pageForm');



function processDescription(description) {
    // Replace line breaks with <br> tags
    const reformattedDescription = description.replace(/\n/g, '<br>');

    // Check for markdown links and convert them to HTML links
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const htmlDescriptionWithLinks = reformattedDescription.replace(markdownLinkRegex, '<a href="$2">$1</a>');

    // Check for lines starting with '#'
    const lines = htmlDescriptionWithLinks.split('<br>');
    const reformattedLines = lines.map(line => {
        if (line.trim().startsWith('# ')) {
            // If the line starts with '# ' followed by text, convert it to <h1> tag
            const text = line.substring(2).trim(); // Extract the text after '# '
            return `<h1>${text}</h1>`;
        } else {
            return line;
        }
    });

    // Join the lines back to a single string
    const finalDescription = reformattedLines.join('<br>');

    return finalDescription;
}




pageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];
    let soundcloud = processLink(document.getElementById('soundcloud').value, 'SoundCloud');
    let spotify = processLink(document.getElementById('spotify').value, 'Spotify');
    let bandcamp = processLink(document.getElementById('twitter').value, 'Bandcamp');
    let instagram = processLink(document.getElementById('instagram').value, 'Instagram');
    let twitter = processLink(document.getElementById('twitter').value, 'Twitter');
    const country = document.getElementById('country').value;

    // Check if the fields are blank, if so, set them to null
    soundcloud = soundcloud.trim() !== '' ? soundcloud : null;
    spotify = spotify.trim() !== '' ? spotify : null;
    bandcamp = bandcamp.trim() !== '' ? bandcamp : null;
    instagram = instagram.trim() !== '' ? instagram : null;
    twitter = twitter.trim() !== '' ? twitter : null;

    description = processDescription(description);

    const existingPage = await pagesRef.where('name', '==', name).get();
    if (!existingPage.empty) {
        alert('A page with this name already exists. Please choose a different name.');
        return;
    }

    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${image.name}`);
    const snapshot = await imageRef.put(image);
    const imageURL = await snapshot.ref.getDownloadURL();

    const pageData = {
        name,
        category,
        description,
        imageURL,
        soundcloud,
        spotify,
        bandcamp,
        instagram,
        twitter,
        country,
    };

    await pagesRef.add(pageData);

    pageForm.reset();
    document.getElementById('successMessage').style.display = 'block';
});





function processLink(url, label) {
    if (url.trim() !== '') {
        if (url.trim().startsWith('<a href=')) {
            return url;
        } else {
            return `<a href="${url}" target="_blank">${label}</a>`;
        }
    }
    return '';
}



// TOGGLE GUIDE BOX
function toggleGuide() {
        var content = document.getElementById("guide-box-content");
        var header = document.getElementById("guide-header");
        if (content.style.display === "none") {
            content.style.display = "block";
            header.innerHTML = "🢓 Formatting Guide:";
        } else {
            content.style.display = "none";
            header.innerHTML = "🢒 Formatting Guide:";
        }
    }

