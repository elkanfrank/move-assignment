import axios from 'axios';
import {useEffect, useState} from 'react';

const BASE_URL = 'https://64b80f4921b9aa6eb07980bd.mockapi.io';
type Endpoint = '/tags' | '/users';

const useApi = <T,>(endpoint: Endpoint): T | null => {
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		if (data) {
			return;
		}

		axios
			.get(BASE_URL + endpoint, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
				},
			})
			.then((response) => {
				if (response.status === 200) {
					setData(response.data);
				} else {
					console.warn('failed to fetch data', response.status);
				}
			})
			.catch((error) => console.error(error));
	}, [data, endpoint]);

	return data;
};

export default useApi;
