
import axios from 'axios';
class HttpManager {
    constructor() { }
    async httpRequest(path, method) {
        try {
            switch (method) {
                case 'GET': {
                    return (await axios.get(path)).data
                }
            }

        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export let requestLib = new HttpManager()