export default ({ app }, inject) => {
    inject("dateformat_YYYYMMDD_HHmmsss", dateString => {
        if (dateString == null) {
            return '';
        }
        const jpnDate = new Date(new Date(dateString).toLocaleString({ timeZone: 'Asia/Tokyo' }));
        return jpnDate.getFullYear().toString().padStart(2, '0') + "/"
            + (jpnDate.getMonth() + 1).toString().padStart(2, '0') + "/"
            + jpnDate.getDay().toString().padStart(2, '0') + " "
            + jpnDate.getHours().toString().padStart(2, '0') + ":"
            + jpnDate.getMinutes().toString().padStart(2, '0') + ":"
            + jpnDate.getSeconds().toString().padStart(2, '0');
    }
    );
};
