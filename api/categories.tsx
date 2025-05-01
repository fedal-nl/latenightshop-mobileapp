const API = process.env.EXPO_PUBLIC_API_URL;

// returns a promis of the categories
export async function getCategories() {
    console.log("API URL: ", API);
    if (!API) {
        throw new Error("API URL is not defined");
    }
  return await fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
        console.log("Response Categories: ", res);
        if (!res.ok) {
            throw new Error(`ERROR ${res.status}:  ${res.statusText}`);
        }
        return res.json();
    })
}