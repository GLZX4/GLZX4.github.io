document.addEventListener('DOMContentLoaded', function() {
    function redirectToRandomCat() {
        const randomCat = 'https://cataas.com/cat';
        window.location.href = randomCat;
    }
    
    const randomCatButton = document.querySelector(".randomCatLink");
    randomCatButton.addEventListener("click", redirectToRandomCat);
});