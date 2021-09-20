import axios from "axios";

export function validateRGH(hospital, rgh) {
	if (hospital === 'Hospital das Clínicas') {
		if (rgh.length !== 9) {
			return false;
		}
		const numeroDeControle = 11 - ((8 * rgh[1] + 7 * rgh[2] + 6 * rgh[3] + 5 * rgh[4] + 4 * rgh[5] + 3 * rgh[6] + 1 * rgh[7]) % 11);

		return rgh[rgh.length - 1] === String.fromCharCode(64 + numeroDeControle);
	}
	return true;
}

export async function loadOrRequestHospitals(component) {
	try {
		const newHospitals = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/hospital`);
		component.$store.commit('loadHospitals', newHospitals);
		return newHospitals;
	}
	catch {
		return await component.$store.getters.getHospitals;
	}
}

export function todaysDate() {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();

	return dd + '/' + mm + '/' + yyyy;
}