const setCookie = (name, value) => {
    document.cookie = name + "=" + value
}

const login = () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const data = {username, password}
    const url = process.env.BASE_URL + "/login"

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
}