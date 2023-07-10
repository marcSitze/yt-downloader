let Btn = document.getElementById('btn');
let URLinput = document.querySelector('.URL-input');
let serverURL = 'http://localhost:8000';

Btn.addEventListener('click', () => {
	if (!URLinput.value) {
		alert('Enter YouTube URL');
	} else {
		download(URLinput.value);
	}
});

async function download(query) {
	const res = await fetch(`${serverURL}/?url=${query}`);
	if(res.status == 200) {
		var a = document.createElement('a');
  		a.href = `${serverURL}/?url=${query}`;
  		a.setAttribute('download', '');
		a.click();
	} else if(res.status == 400) {
		alert('Invalid url');
	}
}