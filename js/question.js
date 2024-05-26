const endpoint = "https://api-sdg2.onrender.com/"
fetch(endpoint).then(response => {
    console.log(response.json());
}).then(data => {
  console.log(data)
}).catch(error => {
  console.error('Error:', error)
});