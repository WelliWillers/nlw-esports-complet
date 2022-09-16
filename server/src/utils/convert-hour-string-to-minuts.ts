export function convertHourStringToMinutes(hourString: string) {
    const [horas, minutos] = hourString.split(':').map(Number)

    const minutosAmount = (horas * 60) + minutos

    return minutosAmount
}