import { Map as KMap, MapMarker } from "react-kakao-maps-sdk";

const ReserveMap = ({ lat, lng }) => {
  if (!lat || !lng) return null;

  return (
    <KMap
      center={{ lat, lng }}
      level={4}
      style={{ width: "100%", height: "100%" }}
    >
      <MapMarker
        position={{ lat, lng }}
      />
    </KMap>
  );
};

export default ReserveMap;
