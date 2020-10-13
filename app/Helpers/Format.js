'use strict'

const Moment = use('moment-timezone');

class Format {

    static getDateTimeLocaleString(datetime) {
        return Moment.tz(datetime, 'Asia/Ho_Chi_Minh')
            .format('YYYY-MM-DD HH:mm:ss');
    }

    static getCurrentTimeStamp() {
        let date = new Date(), now_utc = date;
        now_utc = new Date(date.toUTCString());
        return (now_utc / 1000).toString();
    }

    static getCurrentDate() {
        let date = new Date(), now_utc = date;
        now_utc = new Date(date.toUTCString());
        return now_utc;
    }

    static getSubDate(subdate) {
        let date = new Date(), now_utc = date;
        now_utc = new Date(date.toUTCString());
        now_utc.setDate(now_utc.getDate() - subdate);
        return now_utc;
    }

    static setExpireDate(minus) {
        let date = new Date(), now_utc = date;
        now_utc = new Date(date.toString());
        now_utc.setMinutes(now_utc.getMinutes() + minus);
        return now_utc.toString();
    }

    static setExpireMonth(mont) {
        let date = new Date(), now_utc = date;
        now_utc = new Date(date.toString());
        now_utc.setMonth(now_utc.getMonth() + mont);
        return now_utc.toString();
    }

    static setExpireMinutes(minu) {
        let date = new Date(), now_utc = date;
        now_utc = new Date(date.toString());
        now_utc.setMinutes(now_utc.getMinutes() + minu);
        return now_utc.toString();
    }

    static minusExpireMinutes(minu) {
        let date = new Date(), now_utc = date;
        now_utc = new Date(date.toString());
        now_utc.setMinutes(now_utc.getMinutes() - minu);
        return now_utc.toString();
    }

    static daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    static removeSpecialChars(str) {
        return str.replace(/[&\/\\#,+=()$~%.'":*?<>{};/\][]/g, '')
    }

    static toLocaleString(date) {
        return (new Date(new Date(date).getTime() + 420000)).toLocaleString()
    }

    static getDaysFrom(startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date(startDate);
        const secondDate = new Date(endDate);

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

        return diffDays;
    }

}

module.exports = Format;
