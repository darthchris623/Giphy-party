console.log('Get giphy');

const input = document.querySelector('input'); // DOM selector for text input field
const submit = document.getElementById('submit'); // DOM selector for submit button
const remove = document.getElementById('delete'); // DOM selector for delete button
const giphyBox = document.getElementById('giphy-box'); // DOM selector for section where giphys will go
// Event listener for delete button
remove.addEventListener('click', function (event) {
    event.preventDefault();
    const giphys = document.querySelectorAll('div');
    for (let giph of giphys){
        giph.remove();
    }
});
// Event listener for submit button
submit.addEventListener('click', function (event) {
    if (input.value === '') {
        return;
    }
    event.preventDefault();
    getGiphy(input.value);
    input.value = '';
});
// Function for retrieving giphys
async function getGiphy(type) {
    const giphy = document.createElement('div');
    giphy.classList = 'giphy';
    const response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${type}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
    let index = Math.floor(Math.random() * response.data.data.length); // Generates a random index to extract data from an array
    const url = response.data.data[index].url; // The URL for the API
    const embed = response.data.data[index].embed_url; // The code to render the giphy onto the DOM
    giphy.innerHTML = `<iframe src="${embed}" width="270" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="${url}">via GIPHY</a></p>`;
    giphyBox.append(giphy);
};
