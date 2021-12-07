const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDayOfWeek = (d) => {
    const day = d.getDay();
    return daysOfWeek[day];
};

export const getMonthString = (d) => {
    return month[d.getMonth()]
};

export const formatDay = (d) => {
    const day = d.getDate();
    if (day === 1 || day === 21 || day === 31) {
        return `${day}st`;
    } else if (day === 2 || day === 22) {
        return `${day}nd`;
    } else if (day === 3 || day === 23) {
        return `{day}rd`;
    } else {
        return `${day}th`;
    }
    
};