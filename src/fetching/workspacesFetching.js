// requestingWS --> function in charge of performing the fetch
// By setting async we indicate that our function is going to resolve asynchronous code and return a promise
const requestingWS = async () => {
    const URL_API_WS = 'http://localhost:5173/data/data.json'
    const responseHTTP = await fetch(URL_API_WS,
        {
            method: 'GET'
        }
    )
    const result = await responseHTTP.json()
    return result
}

// Asynchronous function that receives an id, makes a fetch to URL_API_WS
// From the products returned by the fetch, it looks for the product whose id is the same as the one received.

export const WSById = async (id) => {
    const URL_API_WS = 'http://localhost:5173/data/data.json'

    const response = await fetch(URL_API_WS,
        {
            method:'GET'
        }
    )
    const workspaces = await response.json()

    const foundWorkspace = workspaces.find(workspace => workspace.id == id)
    console.log(foundWorkspace)
    return foundWorkspace
}

export const CHByID = async (id) => {
    const URL_API_WS = 'http://localhost:5173/data/data.json'

    const respuesta = await fetch(URL_API_WS,
        {
            method: 'GET'
        }
    )
    const channels = await respuesta.json()
    
    const foundChannel = channels.find(channel => channel.id === id)
    console.log(foundChannel)
    return foundChannel
}

export default requestingWS
