import { Category } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

interface Query {
  billboardId?: string;
}

const getCategories = async (query: Query): Promise<Category[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      billboardId: query.billboardId,
    }
  })

  const res = await fetch(url);

  return res.json()
}

export default getCategories;