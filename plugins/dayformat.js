export default ({ app }, inject) => {
    inject("dateformat_YYYYMMDD_hhmmss", dateString => {
        if (dateString === null || dateString === undefined) {
            return '';
        }
        return app.$dayjs(dateString).format('YYYY/MM/DD hh:mm:ss');
    });
    inject("dateformat_YYYYMMDD", dateString => {
        if (dateString === null || dateString === undefined) {
            return '';
        }
        return app.$dayjs(dateString).format('YYYY/MM/DD');
    });

    inject("dateformat_YYYYMMDD_widthout_delimiter", dateString => {
        if (dateString === null || dateString === undefined) {
            return '';
        }
        return app.$dayjs_without_time(dateString).format('YYYYMMDD');
    });
};
