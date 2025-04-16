import { useAuth } from "@/store/authStore";
import { ItemType } from "@/types/item";

const API = process.env.EXPO_PUBLIC_API_URL;

/**
 * Creates an order by sending the items with a token to the API.
 * @param items 
 * @returns 
 */
export async function createOrder(items: ItemType[]) {
    const token : string | null = useAuth.getState().token;
    console.log("API URL: ", API);
    if (!API) {
        throw new Error("API URL is not defined");
    }
    if (!token) {
        throw new Error("Token is not defined");
    }
  return await fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
        order: {},
        items,
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