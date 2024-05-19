const setCookie = (name, value, local) => {
    document.cookie = `${name}=${value}; ${local}`
}

const login = async () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const data = {username, password}
    const url = process.env.BASE_URL + "/login"

    const fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
}