export async function postRequest(body: string, path: string) {
    const url = "http://localhost:8080"

    return await fetch(url + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
}

export async function getRequest(path: string) {
    const url = "http://localhost:8080"

    return await fetch(url + path)
}