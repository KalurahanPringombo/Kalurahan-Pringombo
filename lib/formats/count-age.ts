export function countAge(birthDay: string): number {
	const birthdayObj = new Date(birthDay);
	const dateNow = new Date();

	const year = birthdayObj.getFullYear();
	const month = birthdayObj.getMonth();
	const birthdayNumber = birthdayObj.getDate();

	const tahunSekarang = dateNow.getFullYear();
	const bulanSekarang = dateNow.getMonth();
	const dateNowNumber = dateNow.getDate();

	let age = tahunSekarang - year;

	if (
		bulanSekarang < month ||
		(bulanSekarang === month && dateNowNumber < birthdayNumber)
	) {
		age--;
	}

	return age;
}
export function countAgeByDate(birthDay: Date): number {
	const dateNow = new Date();

	const year = birthDay.getFullYear();
	const month = birthDay.getMonth();
	const birthdayNumber = birthDay.getDate();

	const tahunSekarang = dateNow.getFullYear();
	const bulanSekarang = dateNow.getMonth();
	const dateNowNumber = dateNow.getDate();

	let age = tahunSekarang - year;

	if (
		bulanSekarang < month ||
		(bulanSekarang === month && dateNowNumber < birthdayNumber)
	) {
		age--;
	}

	return age;
}
