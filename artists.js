function fetchAndSortPages() {
    const pageListArtists = document.getElementById('pageList-artists');
    const pageListItems = document.getElementById('pageList-items');
    pageListArtists.innerText = '';
    pageListItems.innerText = '';

    pagesRef.get().then((querySnapshot) => {
        const sortedArtists = {};
        const sortedItems = {};

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const category = data.category;
            const itemName = data.name.toUpperCase();

            const firstLetter = itemName.charAt(0);

            if (category === 'artist') {
                if (!sortedArtists[firstLetter]) {
                    sortedArtists[firstLetter] = [];
                }
                sortedArtists[firstLetter].push(data);
            } else if (category === 'item') {
                if (!sortedItems[firstLetter]) {
                    sortedItems[firstLetter] = [];
                }
                sortedItems[firstLetter].push(data);
            }
        });

        displaySortedCategories(sortedArtists, pageListArtists);
        displaySortedCategories(sortedItems, pageListItems);
    });
}

function displaySortedCategories(sortedCategories, targetElement) {
    Object.keys(sortedCategories).sort().forEach((letter) => {
        const group = sortedCategories[letter];

        const header = document.createElement('h2');
        header.innerText = letter;
        targetElement.appendChild(header);

        group.sort((a, b) => a.name.localeCompare(b.name));

        group.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.innerText = item.name;

            listItem.addEventListener('click', () => {
                displayPageData(item);
            });

            targetElement.appendChild(listItem);
        });
    });
}

window.onload = () => {
    fetchAndSortPages();
    getPageDataFromURL();
};

function insertLinksIntoParagraph(description, container) {
// Create a temporary div element to parse the HTML content
const tempDiv = document.createElement('div');
tempDiv.innerHTML = description;

// Iterate over child nodes and handle them accordingly
tempDiv.childNodes.forEach(node => {
    if (node.tagName && node.tagName.toLowerCase() === 'h1') {
        // If the node is an <h1> tag, apply the modal-description-header class
        const header = document.createElement('h1');
        header.innerText = node.innerText;
        header.classList.add('modal-description-header');
        container.appendChild(header);
    } else {
        // Otherwise, append the node as it is
        container.appendChild(node.cloneNode(true));
    }
});
}



function displayPageData(data) {
const modalContent = document.getElementById('modalContent');
modalContent.innerText = '';

// Create container for image and category
const imageCategoryContainer = document.createElement('div');
imageCategoryContainer.classList.add('modal-image-category-container');
modalContent.appendChild(imageCategoryContainer);

// Create container for artist name and image
const container = document.createElement('div');
container.classList.add('modal-image-container');

// Create element for artist name
const nameElement = document.createElement('p');
nameElement.innerText = data.name;
nameElement.style.fontWeight = 'bold';
nameElement.style.textAlign = 'center';
container.appendChild(nameElement);

// Create image element
const image = document.createElement('img');
image.classList.add('modal-image');
image.src = data.imageURL;
image.style.width = '200px';
image.style.height = '200px';
container.appendChild(image);

// Append artist name and image to container
imageCategoryContainer.appendChild(container);

// Create header for artist
const headerCountry = document.createElement('div');
headerCountry.classList.add('modal-header');
headerCountry.innerText = 'Artist';
imageCategoryContainer.appendChild(headerCountry);

// Create table for artist details
const tableCountry = document.createElement('table');
imageCategoryContainer.appendChild(tableCountry);

// Add artist details to table
addTableRow(tableCountry, 'Country', data.country, true);

// Create header for media
const header = document.createElement('div');
header.classList.add('modal-header');
header.innerText = 'Media';
imageCategoryContainer.appendChild(header);

// Create table for media links
const table = document.createElement('table');
imageCategoryContainer.appendChild(table);

// Add media links to table
addTableRow(table, 'SoundCloud', parseLinks(data.soundcloud || 'unknown'), true);
addTableRow(table, 'Spotify', parseLinks(data.spotify || 'unknown'), true);
addTableRow(table, 'Instagram', parseLinks(data.instagram || 'unknown'), true);
addTableRow(table, 'Twitter', parseLinks(data.twitter || 'unknown'), true);

// Create element for artist name
const nameHeader = document.createElement('h1');
nameHeader.innerText = data.name;
nameHeader.classList.add('modal-name');
modalContent.appendChild(nameHeader);

// Create element for description header
const descHeader = document.createElement('h1');
descHeader.classList.add('modal-description-header');
modalContent.appendChild(descHeader);

// Create container for description
const desc = document.createElement('div');
insertLinksIntoParagraph(parseLinks(data.description), desc);
desc.classList.add('modal-description');
modalContent.appendChild(desc);

// Create a <br> element
const lineBreak = document.createElement('br');
modalContent.appendChild(lineBreak);

// Create a <br> element
const lineBreakTwo = document.createElement('br');
modalContent.appendChild(lineBreakTwo);

// Create a <br> element
const lineBreakThree = document.createElement('br');
modalContent.appendChild(lineBreakThree);


// Create element for ref header
const refHeader = document.createElement('h1');
refHeader.classList.add('modal-content-header');
refHeader.textContent = "References"; 
modalContent.appendChild(refHeader);


// Create ref element dynamically
const refElement = document.createElement('div');
refElement.id = 'ref';
modalContent.appendChild(refElement);



checkAndDisplayHeaders(data.description);


if (!data.description || !data.description.trim()) {
    // Hide the description section if description data is empty
    descHeader.style.display = 'none';
    desc.style.display = 'none';
}


// Parse description for links and append to container
const modal = document.getElementById('pageModal');
modal.style.display = 'block';

const itemName = data.name.replace(/\s+/g, '-').toLowerCase();
const url = new URL(window.location.href);
url.hash = itemName;
history.pushState({}, '', url);
}








function parseLinks(text) {
const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
const replacedText = text.replace(regex, (match, href, innerHTML) => {
    return `<a href="${href}">${innerHTML}</a>`;
    });
    return replacedText;
}

function insertLinksIntoParagraph(textWithLinks, paragraphElement) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = textWithLinks;

    // Create a new div element to contain both inner text and inner HTML
    const containerDiv = document.createElement('div');
    containerDiv.appendChild(document.createTextNode(paragraphElement.innerText));
    containerDiv.appendChild(tempElement);

    // Clear the existing content of the paragraph element
    paragraphElement.innerHTML = '';

    // Append the container div to the paragraph element
    paragraphElement.appendChild(containerDiv);
}


function addTableRow(table, headerText, dataText, isHeaderBold) {
const row = table.insertRow();
const header = row.insertCell(0);
const data = row.insertCell(1);

header.innerText = headerText;
data.innerHTML = dataText;

if (isHeaderBold) {
    header.style.fontWeight = 'bold';
}
}



function getPageDataFromURL() {
    const url = new URL(window.location.href);
    let artistName = url.hash.substring(1).toLowerCase();
    artistName = artistName.replace(/\s+/g, '-');
    if (artistName) {
        pagesRef.where('category', '==', 'artist').get()
            .then((querySnapshot) => {
                const artistData = querySnapshot.docs.find(doc => doc.data().name.toLowerCase().replace(/\s+/g, '-') === artistName);
                if (artistData) {
                    displayPageData(artistData.data());
                } else {
                    console.log("Artist not found");
                }
            })
            .catch((error) => {
                console.error("Error getting artist data:", error);
            });
    }
}


window.onload = () => {
    fetchAndSortPages();
    getPageDataFromURL();
};




function checkAndDisplayHeaders(description) {
const regexLinks = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi; // Regular expression to match links

const linkMatches = description.match(regexLinks); 

const refElement = document.getElementById('ref');
refElement.innerHTML = ''; 

if (linkMatches) {
    const list = document.createElement('ul');


    // Display links
    if (linkMatches) {
        linkMatches.forEach(match => {
            const linkUrl = match.replace(regexLinks, '$1'); 
            const linkElement = document.createElement('li');
            const anchorElement = document.createElement('a');
            anchorElement.href = linkUrl; 
            anchorElement.innerText = linkUrl; 
            linkElement.appendChild(anchorElement);
            list.appendChild(linkElement);
        });
    }

    // Append the list of headers and links to the ref element
    refElement.appendChild(list);
}
}






window.onclick = function(event) {
    const modal = document.getElementById('pageModal');
    if (event.target === modal) {
        closeModal();
    }
}

function closeModal() {
    const modal = document.getElementById('pageModal');
    modal.style.display = 'none';
    const url = new URL(window.location.href);
    url.hash = '';
    history.pushState({}, '', url);
    window.location.hash = "artists-page";
}

function closeEditModal() {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
    const url = new URL(window.location.href);
    url.hash = '';
    history.pushState({}, '', url);
}

const closeModalButton = document.getElementById('artists');
if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

const closeModalButtonTwo = document.getElementById('back');
if (closeModalButtonTwo) {
    closeModalButtonTwo.addEventListener('click', closeModal);
}

const closeEditModalButton = document.getElementById('artists');
if (closeEditModalButton) {
    closeEditModalButton.addEventListener('click', closeEditModal);
}

const closeEditModalButtonTwo = document.getElementById('backEdit');
if (closeEditModalButtonTwo) {
    closeEditModalButtonTwo.addEventListener('click', closeEditModal);
}


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

const editButton = document.getElementById('editButton');
const authenticationRequiredElement = document.getElementById('authentication-required');

editButton.addEventListener('click', () => {
    const user = firebase.auth().currentUser;
    
    if (user) {
        displayEditModal();
    } else {
        authenticationRequiredElement.style.display = 'block';
        setTimeout(() => {
            authenticationRequiredElement.classList.add('fade-out');
            setTimeout(() => {
                authenticationRequiredElement.style.display = 'none';
                authenticationRequiredElement.classList.remove('fade-out');
            }, 1000); // Fade-out transition duration
        }, 3000); // 5 seconds timeout
    }
});


function displayEditModal() {
    console.log("Edit button clicked");
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'block';
    const backButton = document.getElementById('back');
    backButton.style.display = 'none';
    const url = new URL(window.location.href);
    const artistName = url.hash.substring(1).toLowerCase();
    url.hash = artistName + '?edit';
    history.pushState({}, '', url);

    // Populate input fields with existing artist data
    populateEditFields(artistName);
}

function populateEditFields(artistName) {
    // Fetch artist data from Firestore based on artistName
    pagesRef.where('category', '==', 'artist').get()
        .then((querySnapshot) => {
            const artistData = querySnapshot.docs.find(doc => doc.data().name.toLowerCase().replace(/\s+/g, '-') === artistName);
            if (artistData) {
                const data = artistData.data();
                document.getElementById('editName').value = data.name;
                document.getElementById('editDescription').value = data.description;
                document.getElementById('editSoundcloud').value = data.soundcloud || '';
                document.getElementById('editSpotify').value = data.spotify || '';
                document.getElementById('editInstagram').value = data.instagram || '';
                document.getElementById('editTwitter').value = data.twitter || '';
                document.getElementById('editCountry').value = data.country || '';
            } else {
                console.log("Artist not found");
            }
        })
        .catch((error) => {
            console.error("Error getting artist data:", error);
        });
}

function submitEditForm() {
    // Get updated data from input fields
    const updatedData = {
        name: document.getElementById('editName').value,
        description: document.getElementById('editDescription').value,
        soundcloud: document.getElementById('editSoundcloud').value,
        spotify: document.getElementById('editSpotify').value,
        instagram: document.getElementById('editInstagram').value,
        twitter: document.getElementById('editTwitter').value,
        country: document.getElementById('editCountry').value
    };

    // Update data in Firestore
    const artistName = updatedData.name.toLowerCase().replace(/\s+/g, '-');
    pagesRef.where('category', '==', 'artist').get()
        .then((querySnapshot) => {
            const artistData = querySnapshot.docs.find(doc => doc.data().name.toLowerCase().replace(/\s+/g, '-') === artistName);
            if (artistData) {
                artistData.ref.update(updatedData)
                    .then(() => {
                        console.log("Document successfully updated");
                        // Hide edit modal
                        const editModal = document.getElementById('editModal');
                        editModal.style.display = 'none';
                        // Reset hash fragment
                        const url = new URL(window.location.href);
                        url.hash = artistName;
                        history.pushState({}, '', url);
                        location.reload();
                    })
                    .catch((error) => {
                        console.error("Error updating document:", error);
                    });
            } else {
                console.log("Artist not found");
            }
        })
        .catch((error) => {
            console.error("Error getting artist data:", error);
        });
}

function checkHashFragment() {
    var url = window.location.href;
    var hashIndex = url.lastIndexOf("#");
    var queryStringIndex = url.lastIndexOf("?");

    // If hash fragment is found at the end of the URL
    if (hashIndex !== -1 && (hashIndex > queryStringIndex || queryStringIndex === -1)) {
        if (url.substring(hashIndex + 1) === "") { // Check if hash is just #
            // Display the #home-page element
            document.getElementById("artists-page").style.display = "none";
            document.getElementById("home-page").style.display = "block";
            titleElement.innerText = 'Home';
        } else {
            // Display the #artists-page element
            document.getElementById("artists-page").style.display = "block";
            document.getElementById("home-page").style.display = "none";
            titleElement.innerText = 'Artists*';
        }
    }
}

