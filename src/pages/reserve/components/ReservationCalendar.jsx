import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import styled from "styled-components";

const MAX_CAPACITY = 30;

/**
 * 🔹 임시 더미 데이터
 * 나중에 백엔드에서 날짜별 예약 수 내려주면 교체
 */
const reservationCountByDate = {
  "2024-12-14": 5,
  "2024-12-15": 17,
  "2024-12-16": 30,
  "2024-12-17": 22,
};

/* ================= 스타일 ================= */

const CalendarWrapper = styled.div`
  width: 100%;

  .MuiPickersLayout-root {
    width: 100% !important;
    max-width: 100% !important;
  }

  .MuiDayCalendar-root {
    width: 100%;
  }

  .MuiPickersCalendarHeader-root {
    justify-content: center;
    margin-bottom: 4px;
  }
`;

const DayContainer = styled.div`
  position: relative;
`;

const CountText = styled.div`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  line-height: 1;
  color: ${({ theme, $full }) =>
    $full
      ? theme.PALETTE.warn.red.main
      : theme.PALETTE.primary.green.main};
  pointer-events: none;
`;

/* ================= 커스텀 Day ================= */

function CustomDay(props) {
  const { day, outsideCurrentMonth, ...other } = props;
  const key = day.format("YYYY-MM-DD");
  const count = reservationCountByDate[key] || 0;
  const isFull = count >= MAX_CAPACITY;

  return (
    <DayContainer>
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={{
          width: 36,
          height: 36,
          borderRadius: "8px",
        }}
      />
      {!outsideCurrentMonth && (
        <CountText $full={isFull}>
          {count}/{MAX_CAPACITY}
        </CountText>
      )}
    </DayContainer>
  );
}

/* ================= 메인 캘린더 ================= */

const ReservationCalendar = ({
  selectedDate,
  onSelectDate,
  unavailableDates = [],
}) => {
  const today = dayjs().startOf("day");
  const maxDate = dayjs().add(1, "month").endOf("day");

  const handleChange = (newDate) => {
    if (!newDate) return;

    const dateKey = newDate.format("YYYY-MM-DD");

    // ❌ 예약 불가 날짜만 차단 (PLACE 전용 개념)
    if (unavailableDates.includes(dateKey)) return;

    // ✅ 선택 가능 (만석이어도 가능)
    onSelectDate(newDate.toDate());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <CalendarWrapper>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={handleChange}
          minDate={today}
          maxDate={maxDate}
          disablePast
          showToolbar={false}
          slots={{
            actionBar: () => null,
            day: CustomDay,
          }}
        />
      </CalendarWrapper>
    </LocalizationProvider>
  );
};

export default ReservationCalendar;
