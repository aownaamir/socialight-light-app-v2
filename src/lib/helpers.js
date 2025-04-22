export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('default', {
        dateStyle: 'medium',
    }).format(date);
};

