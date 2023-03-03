export const getLastMonday = () => {
    const prevMonday = new Date();
    prevMonday.setMilliseconds(0);
    prevMonday.setSeconds(0);
    prevMonday.setMinutes(0);
    prevMonday.setHours(0);
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
    return (prevMonday);
}

export const getEndOfWeek = () => {
    const endOfWeek = new Date();
    endOfWeek.setSeconds(59);
    endOfWeek.setMinutes(59);
    endOfWeek.setHours(23);
    endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()) % 7);
    return (endOfWeek);
}