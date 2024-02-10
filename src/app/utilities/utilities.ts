const url = "https://scrabble.marchome.xyz/api"

export async function postRequest(body: string, path: string): Promise<any> {
    return await fetch(url + path, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
}

export async function getRequest(path: string): Promise<any> {
    return await fetch(url + path, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export async function deleteRequest(body: string, path: string): Promise<any> {
    return await fetch(url + path, {
        method: "DELETE",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
}


export function emptyRow<T>(func: Function): T[] {
    const row: T[] = []

    for (let i: number = 0; i < 15; i++) {
        row.push(func(i))
    }

    return row
}