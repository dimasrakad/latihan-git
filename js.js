// Menggunakan node-fetch untuk melakukan fetch API pada Node
// import fetch from "node-fetch";

let url = 'https://jsonplaceholder.typicode.com'

async function getPhotos() {
	let photos_response = await fetch(url.concat('/photos'));

    try {
    	console.log(photos_response.statusCode);
        return await photos_response.json();
    } catch (error) {
        console.log(error);
    }
}

// Fungsi untuk me-render photo
async function renderPhotos() {
    let photos = await getPhotos();

    // Menambahkan item untuk services dan news
    let services_html = '';
    let news_html = '';
    let i = 1;
    photos.slice(-6).forEach(photo => {
    	services_html += `
    	<div class="col-6">
			<div class="row">
				<div class="col-4">
					<img src="${photo.thumbnailUrl}" alt="${photo.title}" style="object-fit: contain; height: 100px;">
				</div>
				<div class="col-8">
					<h3>Service ${i}</h3>
					<p>${photo.title}.</p>
				</div>
			</div>
		</div>`;

        news_html += `
        <div class="card col-xs-1 col-md-5 col-lg-3">
			<img src="${photo.url}" class="card-img-top" alt="${photo.title}">
			<div class="card-body">
				<p>${photo.title}</p>
			</div>
		</div>`;

		i++;
    });

    document.querySelector('.services').innerHTML = services_html;
    document.querySelector('.news').innerHTML = news_html;
}

renderPhotos();