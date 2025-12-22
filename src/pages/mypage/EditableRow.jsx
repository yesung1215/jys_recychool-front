import React, { useState } from "react";
import S from "./style";

const EditableRow = ({
  fieldKey,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  editingField,
  setEditingField,
}) => {
  const isEdit = editingField === fieldKey;
  const isDisabled = editingField && editingField !== fieldKey;

  return (
    <S.Row>
      <S.RowHeader>
        <S.Label>{label}</S.Label>

        {!isEdit && (
          <S.EditBtn
            $disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => setEditingField(fieldKey)}
          >
            수정하기
          </S.EditBtn>
        )}
      </S.RowHeader>

      {isEdit ? (
        <S.InputBox
          autoFocus
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <S.UpdateBox>{placeholder}</S.UpdateBox>
      )}
    </S.Row>
  );
};


export default EditableRow;
