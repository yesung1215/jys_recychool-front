import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import styled from "styled-components";

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
  const {
    day,
    outsideCurrentMonth,
    reserveType,
    maxCapacity,
    dateCountMap,
    ...other
  } = props;

  const key = day.format("YYYY-MM-DD");
  const count = dateCountMap[key] ?? 0;
  const isFull = count >= maxCapacity;

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

      {/* ✅ PARKING일 때만 숫자 표시 */}
      {!outsideCurrentMonth && reserveType === "PARKING" && (
        <CountText $full={isFull}>
          {count}/{maxCapacity}
        </CountText>
      )}
    </DayContainer>
  );
}

/* ================= 메인 캘린더 ================= */

const ReservationCalendar = ({
  selectedDate,
  onSelectDate,
  reserveType,              
  unavailableDates = [],
  maxCapacity,
  dateCountMap = {},
}) => {
  const today = dayjs().startOf("day");
  const maxDate = dayjs().add(1, "month").endOf("day");

  const handleChange = (newDate) => {
    if (!newDate) return;

    const dateKey = newDate.format("YYYY-MM-DD");

    if (reserveType === "PLACE" && unavailableDates.includes(dateKey)) return;

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
            day: (props) => (
              <CustomDay
                {...props}
                reserveType={reserveType}
                maxCapacity={maxCapacity}
                dateCountMap={dateCountMap}
              />
            ),
          }}
        />
      </CalendarWrapper>
    </LocalizationProvider>
  );
};

export default ReservationCalendar;
