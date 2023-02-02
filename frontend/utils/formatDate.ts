 // format date
export const formatDate = (input: number) => {
    let date = new Date(input * 1000).toLocaleDateString()
    return date;
}

// format date in seconds
export const _formatDate = (dateInput: number) => {
    const timestamp = dateInput / 1000;
    return timestamp;
}
