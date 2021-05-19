import moment from "moment";

const formatDate = (d:any, m:any, y:any)=>{
  return `${d}/${m}/${y}`
}

const calculateDateBefore = (day: number = 15) => {
    var date = new Date();
    var last = new Date(date.getTime() - day * 24 * 60 * 60 * 1000);
    var currentDay = last.getDate();
    var month = last.getMonth() + 1;
    var year = last.getFullYear();
    return formatDate(`0${currentDay}`.slice(-2) ,`0${month}`.slice(-2),year);
};

const getDateToday = ()=>{
  const date =new Date()
  return formatDate(`0${date.getDate()}`.slice(-2) ,`0${date.getMonth()+1}`.slice(-2),date.getFullYear())
}

export const useGetDate = () => {
    const today = getDateToday();
    const dateBefore = calculateDateBefore();

    getDateToday()

    return { today, dateBefore };
};
