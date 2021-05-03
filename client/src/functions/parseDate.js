export const parseDate = (date, short )=> {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date(date);
    const dateText = dateObj.toTimeString()
    const hhmmss = dateText.split(' ')[0];

    const hours = hhmmss.split(':')[0]

    const minutes = hhmmss.split(':')[1]
    const seconds = hhmmss.split(':')[2]


    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();


    if(isNaN(year)){
        return
    }
    if(short){
        const output = `${hours}:${minutes}`
        return output
    }

    const output = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`
    return output
}
