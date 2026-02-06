import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const KST = 'Asia/Seoul';

//YYYYMMDD 변환
export const getTodayYmdKst = () => dayjs().tz(KST).format('YYYYMMDD');

//해당 날짜의 월요일 조회
export const getMondayYmdKst = (ymd: string) => {
  const base = dayjs.tz(ymd, 'YYYYMMDD', KST);

  const diffToMonday = (base.day() + 6) % 7; // 월요일이면 0
  return base.subtract(diffToMonday, 'day').format('YYYYMMDD');
};
