import moment from 'moment';

export function formatShortTitle(title) {
    let wordsArr = title.split(' ');
    let sum = 0;
    return wordsArr.reduce((acc, cur) => {
        if (sum > 30)
            return acc;
        sum += cur.length;
        return [...acc, cur];
    }, []).join(' ') + '...';
}

export function formatDate(dateString) {
    return moment(dateString, "YYYYMMDD").fromNow();
}