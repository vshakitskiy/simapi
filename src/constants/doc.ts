export const doc = `import axios from "axios"

axios
    .post(
        ".../api/v1/similarity", 
        {
            text1: "First text",
            text2: "Second text"
        },
        {
            headers: {
                "Authorization": "YOUR_API_KEY",
            }
        }
    )
    .then(res => console.log(res.data))
    .catch(err => console.error(err))`