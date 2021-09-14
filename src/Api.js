import axios from "axios";

/** This front end API route is used for direct testing since it is easier to manipulate the data and fix errors 
 * When trying to add new features, this is used instead of aquiring data from backend
 * mainly due to the easy database manipulation which only requires the use of a db.json file
 */

const BASE_API_URL = "http://localhost:5000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class ArcadeScores {

  // get snake data
  // This returns data starting with the highest score desceding to lowest
  static async getSnake() {
    const result = await axios.get(`${BASE_API_URL}/snake?_sort=score&_order=desc`);
    return result.data;
  }

  // get pacman data
  static async getPac() {
    const result = await axios.get(`${BASE_API_URL}/pacman`);
    return result.data;
  }

  //  add snake data
	static async addSnake(newSnake) {
		const result = await axios.post(`${BASE_API_URL}/snake`, { ...newSnake });
		return result.data;
	}

	//  add pacman data
	static async addPac(newPac) {
		const result = await axios.post(`${BASE_API_URL}/pacman`, { ...newPac });
		return result.data;
	}

}

export default ArcadeScores;
export {BASE_API_URL};
