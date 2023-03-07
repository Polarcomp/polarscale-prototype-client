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
    endOfWeek.setMilliseconds(0)
    endOfWeek.setSeconds(0);
    endOfWeek.setMinutes(0);
    endOfWeek.setHours(0);
    endOfWeek.setDate(endOfWeek.getDate() + ((7 - endOfWeek.getDay()) % 7) + 1);
    return (endOfWeek);
}

export const todayTimestamp = () => {
    const today = new Date();
    today.setMilliseconds(0);
    today.setSeconds(59);
    today.setMinutes(59);
    today.setHours(23);
    return (today.getTime() / 1000);
}

export const verticalFillColors = () =>{
    const length = 14;
    const colorArray = []
    for (let index = 0; index < length; index++)
    {
        if (index < length / 2)
            colorArray.push('#555555');
        else
            colorArray.push('#333333');
    }
    return colorArray;
}