import React, { useEffect, useState } from "react";
import S from "./style";
import EditableRow from "./EditableRow";
import Password from "./Password";

const MyPage = () => {
  const [phone, setPhone] = useState("");
  const [editingField, setEditingField] = useState(null);

  // 비밀번호 전용 상태
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [user, setUser] = useState(null);
  // const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:10000/user/1");
      const data = await res.json();

      setUser(data);
      setPhone(data.userPhone || "");
    };

    fetchUser();
  }, []);

//비밀번호 변경
  const updatePassword = async () => {
    const res = await fetch("http://localhost:10000/user/1/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: currentPw,
        newPassword: newPw,
      }),
    });

    // 현재 비밀번호가 틀린 경우
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
  };


  //전화번호 변경
  const updatePhone = async () => {
  await fetch("http://localhost:10000/user/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPhone: phone,
      }),
    });
  };


  //핸들러
  const handleSubmit = async () => {
    try {
      // 전화번호 수정 중일 때
      if (editingField === "phone") {
        await updatePhone();
        alert("전화번호가 수정되었습니다.");
      }

      //비밀번호 수정
      if (editingField === "password") {
        if (newPw !== confirmPw) {
          alert("새 비밀번호가 일치하지 않습니다.");
          return;
        }

        await updatePassword(); // 여기서 에러 나면 catch로 감
        alert("비밀번호가 변경되었습니다.");

        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      }

      setEditingField(null);
    } catch (e) {
      // 여기서 처리
      alert("현재 비밀번호가 올바르지 않습니다.");
      console.error(e);
    }
  };


  return (
    <S.All>
      <S.Head>계정관리</S.Head>

      <S.MyPage>
        <S.Title>정보 수정</S.Title>

        <S.Content>
          <S.Row>
            <S.Label>이름</S.Label>
            <S.ReadOnlyBox>{user?.userName}</S.ReadOnlyBox>
          </S.Row>

          <S.Row>
            <S.Label>생년월일</S.Label>
            <S.ReadOnlyBox>
              {user?.userBirthday?.replaceAll("-", ".")}
            </S.ReadOnlyBox>
          </S.Row>

          <S.Row>
            <S.Label>본인 확인 이메일</S.Label>
            <S.ReadOnlyBox>{user?.userEmail}</S.ReadOnlyBox>
          </S.Row>


          {/* 전화번호 */}
          <EditableRow
            fieldKey="phone"
            label="전화번호"
            placeholder="휴대폰 번호 ‘-’ 제외하고 입력"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            editingField={editingField}
            setEditingField={setEditingField}
          />

          {/* 비밀번호 */}
          <Password
            editingField={editingField}
            setEditingField={setEditingField}
            currentPw={currentPw}
            newPw={newPw}
            confirmPw={confirmPw}
            setCurrentPw={setCurrentPw}
            setNewPw={setNewPw}
            setConfirmPw={setConfirmPw}
          />

          <S.SubmitBtn onClick={handleSubmit}>
            완료하기
          </S.SubmitBtn>

        </S.Content>
      </S.MyPage>
    </S.All>
  );
};

export default MyPage;
