document.addEventListener("DOMContentLoaded", function() {
    var loadingScreen = document.getElementById('loading-screen');
    var mainContent = document.getElementById('main-content');
    var otherScreen = document.getElementById('other-screen');

    
    setTimeout(function() {
        loadingScreen.style.display = 'none'; // Hide the loading screen
        mainContent.style.display = 'block';  // Show the main content
    }, 5000); // 10 seconds delay

    setTimeout(function() {
        otherScreen.style.display = 'none'; // Hide the loading screen
        mainContent.style.display = 'block';  // Show the main content
    }, 0); // 10 seconds delay
});

document.addEventListener("DOMContentLoaded", function() {
    var notesToggle = document.getElementById('notes-toggle');
    var notesList = document.getElementById('notes-list');

    notesToggle.addEventListener('click', function() {
        if (notesList.style.display === 'none') {
            notesList.style.display = 'block'; // Show the notes list
        } else {
            notesList.style.display = 'none'; // Hide the notes list
        }
    });
});
