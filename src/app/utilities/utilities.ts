export async function postRequest(body: string, path: string): Promise<any> {
    const url = "http://localhost:8080"

    return await fetch(url + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
}

export async function getRequest(path: string): Promise<any> {
    const url = "http://localhost:8080"

    return await fetch(url + path)
}

export function emptyRow<T>(func: Function): T[] {
    const row: T[] = []

    for (let i: number = 0; i < 15; i++) {
        row.push(func(i))
    }

    return row
}