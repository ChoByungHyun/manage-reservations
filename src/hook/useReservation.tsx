import { useState, useEffect } from "react";
import { UserInfo } from "types/userType";

export function useReservation() {
  const [userInfoArray, setUserInfoArray] = useState<UserInfo[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("userInfo");

    if (storedData) {
      const parsedData: UserInfo[] = JSON.parse(storedData);
      setUserInfoArray(parsedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfoArray));
  }, [userInfoArray]);

  function handleDeleteReservation(id: string) {
    setUserInfoArray((prev) => prev.filter((userInfo) => userInfo.id !== id));
  }

  function handleSetSeatTrue(id: string) {
    setUserInfoArray((prev) =>
      prev.map((userInfo) =>
        userInfo.id === id ? { ...userInfo, isSeat: true } : userInfo
      )
    );
  }

  return { userInfoArray, handleDeleteReservation, handleSetSeatTrue };
}
