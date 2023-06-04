import axios from "axios";
import { IUser } from "../components/interface";
export class NodeService {
  API_URL = "http://localhost:3002/data";

  async getUsersData() {
    const res = await axios.get<IUser[]>(this.API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 1000,
    });
    //return "data" in res.data ? res.data["data"] : [];
    return res;
  }
}
