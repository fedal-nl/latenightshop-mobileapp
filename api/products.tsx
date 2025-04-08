const API = process.env.EXPO_PUBLIC_API_DEV_URL;

export async function getProducts() {
    console.log("API URL: ", API);
    if (!API) {
        throw new Error("API URL is not defined");
    }
  return await fetch(`${API}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
        console.log("Response: ", res);
        if (!res.ok) {
            throw new Error(`ERROR:  ${res}`);
        }
        return res.json();
    })
}

export async function getProduct(id: Number) {
  // get the product by id
  return await fetch(`${API}/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
        console.log("Response: ", res);
        if (!res.ok) {
            throw new Error(`ERROR:  ${res}`);
        }
        return res.json();
    })
}