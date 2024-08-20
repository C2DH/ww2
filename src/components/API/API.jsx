import { useEffect, useState } from "react"

export default function API() {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetch("https://ww2-lu.netlify.app/api/story/home", {
            method: "GET",
            headers: {

            }
        })
        .then((response) => response.json())
        .then((data) => {
        })
        .catch((error) => console.log(error))
    })

    return (
        <h1>API</h1>
    )
}