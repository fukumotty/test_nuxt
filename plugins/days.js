import dayjs from "dayjs";
import "dayjs/locale/ja";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore)

dayjs.locale("ja");
dayjs.tz.setDefault('Asia/Tokyo');

export default ({ app }, inject) => {
    inject("dayjs", string => {
        let ret;
        if (string === null || string === undefined) {
            ret = dayjs();
        } else {
            ret = dayjs(string);
        }
        ret.millisecond(0);
        return ret;
    });
    inject("dayjs_without_time", string => {
        let ret;
        if (string === null || string === undefined) {
            ret = dayjs();
        } else {
            ret = dayjs(string);
        }
        ret.hour(0);
        ret.minute(0);
        ret.second(0);
        ret.millisecond(0);
        return ret;
    });
    inject("fromToDays", dates => {
        const ret = [];
        if (dates === undefined || dates === null || dates.length === 0) {
            return ret;
        }
        if (dates.length === 1) {
            ret.push(app.$dayjs_without_time(dates[0]));
            return ret;
        }
        let tmpDate = app.$dayjs_without_time(dates[0]);
        const toDate = app.$dayjs_without_time(dates[1]);
        while (tmpDate.isSameOrBefore(toDate)) {
            ret.push(dayjs(tmpDate));
            tmpDate = tmpDate.add(1, 'day');
        }
        return ret;
    });
};
