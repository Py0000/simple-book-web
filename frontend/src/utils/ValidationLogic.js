export const validateText = (text) => {
    const isEmpty = text.trim().length === 0;
    const isTooLong = text.trim().length > 45;
    return !isEmpty && !isTooLong;
}

export const validateYear = (year) => {
    return year != null && year > 0 && (Math.log(year) * Math.LOG10E + 1 | 0) === 4;
}

export const validateBiography = (biography) => {
    const isEmpty = biography.trim().length === 0;
    const isTooLong = biography.trim().length > 200;
    return !isEmpty && !isTooLong;
}


