const pagesRef = db.collection('submitted-pages');
const userCollectionRef = db.collection('user-collection');
const maxSubmissions = 2; // Set your submission limit

document.getElementById('pageForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const user = firebase.auth().currentUser;
    if (!user) {
        alert('You must be logged in to submit a page.');
        return;
    }

    // Get the user's submission count
    const userDoc = await userCollectionRef.doc(user.uid).get();
    if (userDoc.exists) {
        const userData = userDoc.data();
        const submissionCount = userData.submissionCount || 0;

        if (submissionCount >= maxSubmissions) {
            alert(`You have reached the maximum number of submissions (${maxSubmissions}).`);
            return;
        }

        // Get form values
        const name = document.getElementById('name').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const image = document.getElementById('image').files[0];
        const soundcloud = document.getElementById('soundcloud').value;
        const spotify = document.getElementById('spotify').value;
        const bandcamp = document.getElementById('bandcamp').value;
        const instagram = document.getElementById('instagram').value;
        const twitter = document.getElementById('twitter').value;
        const country = document.getElementById('country').value;

        // Check if the fields are blank, if so, set them to null
        const processedSoundcloud = soundcloud.trim() !== '' ? soundcloud : null;
        const processedSpotify = spotify.trim() !== '' ? spotify : null;
        const processedBandcamp = bandcamp.trim() !== '' ? bandcamp : null;
        const processedInstagram = instagram.trim() !== '' ? instagram : null;
        const processedTwitter = twitter.trim() !== '' ? twitter : null;

        // Process image upload
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`images/${image.name}`);
        const snapshot = await imageRef.put(image);
        const imageURL = await snapshot.ref.getDownloadURL();

        const pageData = {
            name,
            category,
            description,
            imageURL,
            soundcloud: processedSoundcloud,
            spotify: processedSpotify,
            bandcamp: processedBandcamp,
            instagram: processedInstagram,
            twitter: processedTwitter,
            country,
            submittedBy: user.displayName || user.email
        };

        await pagesRef.add(pageData);

        // Increment submission count
        await userCollectionRef.doc(user.uid).update({
            submissionCount: firebase.firestore.FieldValue.increment(1)
        });

        // Display success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';

        // Clear form values after a short delay
        setTimeout(() => {
            document.getElementById('pageForm').reset();
            successMessage.style.display = 'none';
        }, 3000); // Adjust the delay as needed
    } else {
        alert('User data not found.');
    }
});
