const API = process.env.EXPO_PUBLIC_API_URL;

export async function login(email: string, password: string) {
    console.log("API URL: ", API);
    if (!API) {
        throw new Error("API URL is not defined");
    }
  return await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
        console.log("Response: ", res);
        if (!res.ok) {
            throw new Error(`ERROR ${res.status}:  ${res.statusText}`);
        }
        return res.json();
    })
}

export async function register(email: string, password: string) {
    console.log("API URL: ", API);
    if (!API) {
        throw new Error("API URL is not defined");
    }
  return await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
        console.log("Response: ", res);
        if (!res.ok) {
            throw new Error(`ERROR ${res.status}:  ${res.statusText}`);
        }
        return res.json();
    })
}