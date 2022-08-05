export default ({ app }, inject) => {

    inject("getJpnDate", dateString => {
        let jpnDate;
        if (dateString === null || dateString === undefined) {
            jpnDate = new Date(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }));
        } else {
            jpnDate = new Date(new Date(dateString).toLocaleString({ timeZone: 'Asia/Tokyo' }));
        }
        jpnDate.setMilliseconds(0);
        return jpnDate;
    });

    inject("getJpnDate_YYYYMMDD", dateString => {
        const jpnDate = app.$getJpnDate(dateString);
        jpnDate.setHours(0);
        jpnDate.setMinutes(0);
        jpnDate.setSeconds(0);
        jpnDate.setMilliseconds(0);
        return jpnDate;
    });

    inject("dateformat_YYYYMMDD_HHmmss", dateString => {
        if (dateString === null || dateString === undefined) {
            return '';
        }
        const jpnDate = app.$getJpnDate(dateString);
        return jpnDate.getFullYear().toString().padStart(2, '0') + "/"
            + (jpnDate.getMonth() + 1).toString().padStart(2, '0') + "/"
            + jpnDate.getDate().toString().padStart(2, '0') + " "
            + jpnDate.getHours().toString().padStart(2, '0') + ":"
            + jpnDate.getMinutes().toString().padStart(2, '0') + ":"
            + jpnDate.getSeconds().toString().padStart(2, '0');
    });
    inject("dateformat_YYYYMMDD", dateString => {
        if (dateString === null || dateString === undefined) {
            return '';
        }
        const jpnDate = app.$getJpnDate_YYYYMMDD(dateString);
        return jpnDate.getFullYear().toString().padStart(2, '0') + "/"
            + (jpnDate.getMonth() + 1).toString().padStart(2, '0') + "/"
            + jpnDate.getDate().toString().padStart(2, '0');
    });

    inject("dateformat_YYYYMMDD_widthout_Delimiter", dateString => {
        if (dateString === null || dateString === undefined) {
            return '';
        }
        const jpnDate = app.$getJpnDate_YYYYMMDD(dateString);
        return jpnDate.getFullYear().toString().padStart(2, '0')
            + (jpnDate.getMonth() + 1).toString().padStart(2, '0')
            + jpnDate.getDate().toString().padStart(2, '0');
    });

    inject("fromToDatesString", dates => {
        if (dates === undefined || dates === null || dates.length === 0) {
            return '';
        }
        if (dates.length === 1) {
            return app.$dateformat_YYYYMMDD_widthout_Delimiter(dates[0]);
        }
        const tmpDate = app.$getJpnDate_YYYYMMDD(dates[0]);
        const toDate = app.$getJpnDate_YYYYMMDD(dates[1]);
        const retDates = [];
        while (tmpDate.getTime() <= toDate.getTime()) {
            retDates.push(app.$dateformat_YYYYMMDD_widthout_Delimiter(tmpDate));
            tmpDate.setDate(tmpDate.getDate() + 1);
        }
        return retDates.join(',');
    });
};
