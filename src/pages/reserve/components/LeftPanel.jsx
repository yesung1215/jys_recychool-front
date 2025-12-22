import S from "../style";
import ReservationCalendar from "./ReservationCalendar";

const LeftPanel = ({ data, selectedDate, onDateSelect }) => {
  return (
    <S.LeftPanel>
      <S.Title>{data.schoolName}</S.Title>

    <S.ImageBox>
      {data.schoolImageName && (
        <img
          src={`http://localhost:10000/images/${encodeURIComponent(data.schoolImageName)}`}
          alt={data.schoolName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      )}
    </S.ImageBox>

      <S.CalendarBox>
        <ReservationCalendar
          selectedDate={selectedDate}
          onSelectDate={onDateSelect}
          reserveType={data.reserveType}
          unavailableDates={data.unavailableDates || []}
          maxCapacity={data.maxParkingCapacity}
          dateCountMap={data.dateCountMap} 
        />
      </S.CalendarBox>
    </S.LeftPanel>
  );
};

export default LeftPanel;
