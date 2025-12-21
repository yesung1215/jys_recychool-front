import S from "../style";
import ReservationCalendar from "./ReservationCalendar";

const LeftPanel = ({ data, selectedDate, onDateSelect }) => {
  return (
    <S.LeftPanel>
      {/* 학교명 */}
      <S.Title>{data.schoolName}</S.Title>

      {/* 학교 이미지 */}
      <S.ImageBox>
        {/* TODO: 이미지 슬라이더 예정 */}
      </S.ImageBox>

      {/* 예약 캘린더 */}
      <S.CalendarBox>
        <ReservationCalendar
          selectedDate={selectedDate}
          onSelectDate={onDateSelect}
          unavailableDates={data.unavailableDates || []}
        />
      </S.CalendarBox>
    </S.LeftPanel>
  );
};

export default LeftPanel;
