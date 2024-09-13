document.addEventListener("DOMContentLoaded", function() {
    var loadingScreen = document.getElementById('loading-screen');
    var mainContent = document.getElementById('main-content');
    
    setTimeout(function() {
        loadingScreen.style.display = 'none'; // Hide the loading screen
        mainContent.style.display = 'block';  // Show the main content
    }, 0); // 10 seconds delay
});
