import moment from "moment";

const formatDate = (d: any, m: any, y: any) => {
    return `${d}/${m}/${y}`;
};

const calculateDateBefore = (day: number = 30) => {
    let date = new Date();
    let last = new Date(date.getTime() - day * 24 * 60 * 60 * 1000);
    let currentDay = last.getDate();
    let month = last.getMonth() + 1;
    let year = last.getFullYear();
    return formatDate(`0${currentDay}`.slice(-2), `0${month}`.slice(-2), year);
};

const calculateDateFuture = (dateForm: any = "", day: number = 15) => {
    let date = new Date(dateForm);
    if (dateForm === "") {

        date = new Date();
    }
    date.setDate((date.getDate() as number) + day);
    let futureDay = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return formatDate(`0${futureDay}`.slice(-2), `0${month}`.slice(-2), year);
};

const getDateToday = () => {
    const date = new Date();
    return formatDate(
        `0${date.getDate()}`.slice(-2),
        `0${date.getMonth() + 1}`.slice(-2),
        date.getFullYear(),
    );
};

const getRangeDate = (start: any, end: any) => {
    let startDate = new Date(start); //YYYY-MM-DD
    let endDate = new Date(end);
    let arrayDate = [] as Date[];
    let dt = new Date(startDate);
    while (dt <= endDate) {
        arrayDate.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }

    return arrayDate;
};

export const useGetDate = () => {
    const today = getDateToday();
    const dateBefore = calculateDateBefore();

    return { today, dateBefore, calculateDateFuture, getRangeDate };
};
