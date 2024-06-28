export const PrivateRouter = ({ children }) => {
  const isAuth = false;
  if (isAuth) {
    return children;
  }

  // return <Login />
};
