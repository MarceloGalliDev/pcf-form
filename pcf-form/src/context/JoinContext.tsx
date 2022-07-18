import { createContext, useContext, useEffect, useState } from "react";

interface IJoinContext {
  status: boolean;
  setStatus: (status: boolean) => void;
};

interface JoinProps {
  children: React.ReactNode
}

const JoinContext = createContext<IJoinContext>({ status: false, setStatus: () => null });

export const JoinProvider = ({children}: JoinProps) => {
  const [status, setStatus] = useState<boolean>(false);
  
  // useEffect(() => {
  //   setStatus(true)
  // },[])

  return (
    <JoinContext.Provider
      value={{status, setStatus}}
    >
      {children}
    </JoinContext.Provider>
  )
};

export const userJoin = () => useContext(JoinContext);


//quando return for mais de uma linha (HTML) usa-se função

// export const UseJoin = () => {
//   const [teste, setStatus] = useState();
//   return {
//     status: teste,
//     setStatus
//   }
// };