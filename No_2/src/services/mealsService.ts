import { getMondayYmdKst } from '@/utils/day';
import axios from 'axios';

export type NeisMealRow = {
  MLSV_YMD: string; // 급식일자 YYYYMMDD
  MMEAL_SC_NM?: string; // 조식/중식/석식
  DDISH_NM?: string; // 메뉴
  ORPLC_INFO?: string;
  CAL_INFO?: string;
  NTR_INFO?: string;
};

type NeisResponse = {
  mealServiceDietInfo?: Array<{ row: NeisMealRow[] } | Record<string, unknown>>;
};
export const getWeeklyMeals = async (from: string) => {
  const apiKey = process.env.NEIS_API_KEY;

  if (!apiKey) {
    throw new Error('NEIS_API_KEY가 설정되어 있지 않습니다.');
  }

  const officeCode = process.env.NEIS_ATPT_OFCDC_SC_CODE;

  if (!officeCode) {
    throw new Error('ATPT_OFCDC_SC_CODE가 설정되어 있지 않습니다.');
  }

  const schoolCode = process.env.NEIS_SD_SCHUL_CODE;
  if (!schoolCode) {
    throw new Error('SD_SCHUL_CODE가 설정되어 있지 않습니다.');
  }

  //From이 속한 주의 월요일(YYYYMMDD) 조회
  const mondayYmd = getMondayYmdKst(from);

  //ex. 20250121 -> 202501
  const monthYmd = mondayYmd.slice(0, 6);

  const url = process.env.NEIS_URL;
  if (!url) {
    throw new Error('NEIS_URL이 설정되어 있지 않습니다.');
  }

  const response = await axios.get(url, {
    params: {
      KEY: apiKey,
      Type: 'json',
      pIndex: 1,
      pSize: 1000,
      ATPT_OFCDC_SC_CODE: officeCode,
      SD_SCHUL_CODE: schoolCode,
      MLSV_YMD: monthYmd,
    },
  });

  const data = response.data as NeisResponse;

  const rows =
    data.mealServiceDietInfo?.find(
      (v): v is { row: NeisMealRow[] } => 'row' in v,
    )?.row ?? [];

  const mappedRows = rows.map((r) => ({
    MLSV_YMD: r.MLSV_YMD,
    MMEAL_SC_NM: r.MMEAL_SC_NM,
    DDISH_NM: r.DDISH_NM,
    ORPLC_INFO: r.ORPLC_INFO,
    CAL_INFO: r.CAL_INFO,
    NTR_INFO: r.NTR_INFO,
  }));
  return mappedRows;
};
