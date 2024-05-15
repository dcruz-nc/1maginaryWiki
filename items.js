function fetchAndSortPages() {
    const pageListArtists = document.getElementById('pageList-artists');
    const pageListItems = document.getElementById('pageList-items');
    pageListArtists.innerHTML = '';
    pageListItems.innerHTML = '';

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
        header.textContent = letter;
        targetElement.appendChild(header);

        group.sort((a, b) => a.name.localeCompare(b.name));

        group.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name;

            listItem.addEventListener('click', () => {
                displayPageData(item);
            });

            targetElement.appendChild(listItem);
        });
    });
}

window.onload = fetchAndSortPages;

function displayPageData(data) {
        const itemsModalContent = document.getElementById('itemsModalContent');
        itemsModalContent.innerText = '';

        const imageCategoryContainer = document.createElement('div');
        imageCategoryContainer.classList.add('modal-image-category-container');
        itemsModalContent.appendChild(imageCategoryContainer);

        const container = document.createElement('div');
        container.classList.add('modal-image-container');

        const nameElement = document.createElement('p');
        nameElement.innerText = data.name;
        nameElement.style.fontWeight = 'bold';
        nameElement.style.textAlign = 'center';
        container.appendChild(nameElement);

        const image = document.createElement('img');
        image.classList.add('modal-image');
        image.src = data.imageURL;
        image.style.width = '200px';
        image.style.height = '200px';
        container.appendChild(image);

        imageCategoryContainer.appendChild(container);

        const headerCountry = document.createElement('div');
        headerCountry.classList.add('modal-header');
        headerCountry.innerText = 'Item';
        imageCategoryContainer.appendChild(headerCountry);

        const tableCountry = document.createElement('table');
        imageCategoryContainer.appendChild(tableCountry);



        const nameHeader = document.createElement('h1');
        nameHeader.innerText = data.name;
        nameHeader.classList.add('modal-name');
        itemsModalContent.appendChild(nameHeader);

        const descHeader = document.createElement('h1');
        descHeader.innerText = 'Description';
        descHeader.classList.add('modal-description-header');
        itemsModalContent.appendChild(descHeader);
        const desc = document.createElement('p');
        insertLinksIntoParagraph(parseLinks(data.description), desc);
        desc.classList.add('modal-description');
        itemsModalContent.appendChild(desc);

        if (!data.description || !data.description.trim()) {
    // Hide the description section if description data is empty
        descHeader.style.display = 'none';
        desc.style.display = 'none';
    }


        const modal = document.getElementById('itemsPageModal');
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

    window.onclick = function(event) {
        const modal = document.getElementById('itemsPageModal');
        if (event.target === modal) {
            closeModal();
        }
    }

function closeModal() {
        const modal = document.getElementById('itemsPageModal');
        modal.style.display = 'none';
        const url = new URL(window.location.href);
        url.hash = '';
        history.pushState({}, '', url);
    }


const closeModalButton = document.getElementById('items');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
