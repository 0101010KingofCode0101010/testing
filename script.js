window.onload = function() {
    fetch('https://0101010kingofcode0101010.github.io/testing/videos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let navContainer = document.getElementById('category-nav');
            let videosContainer = document.getElementById('videos-container');

            // Populate navigation bar with categories
            data.categories.forEach(category => {
                let navItem = document.createElement('button');
                navItem.textContent = category.name;
                navItem.classList.add('nav-item');
                navItem.onclick = () => {
                    displayVideos(category.videos);
                };
                navContainer.appendChild(navItem);
            });

            // Display the videos of the first category by default
            if (data.categories.length > 0) {
                displayVideos(data.categories[0].videos);
            }

            function displayVideos(videos) {
                videosContainer.innerHTML = ''; // Clear previous videos
                videos.forEach(video => {
                    let videoElement = document.createElement('div');
                    videoElement.classList.add('video');

                    let thumbnail = document.createElement('img');
                    thumbnail.src = video.thumbnail;
                    videoElement.appendChild(thumbnail);

                    let title = document.createElement('h3');
                    title.textContent = video.title;
                    videoElement.appendChild(title);

                    let link = document.createElement('a');
                    link.href = video.url;
                    link.target = '_blank';
                    link.textContent = 'Watch Video';
                    videoElement.appendChild(link);

                    videosContainer.appendChild(videoElement);
                });
            }
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
            alert("Không thể tải video JSON. Vui lòng kiểm tra lại đường dẫn.");
        });
};
