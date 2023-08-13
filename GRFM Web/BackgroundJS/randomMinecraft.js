$(document).ready(function () {
    const youtubeVideos = [
        'https://www.youtube.com/watch?v=zLkYYSfqkqw',
        'https://www.youtube.com/watch?v=G5ivDCpsLAs',
    ];

    console.log('Random Minecraft video loaded');
    const minecraftVideosLink = $('#minecraftMenu');

    minecraftVideosLink.on("click", function(event) { 
        event.preventDefault();
        const randomVideo = youtubeVideos[Math.floor(Math.random() * youtubeVideos.length)];
        window.open(randomVideo);
    });
});
