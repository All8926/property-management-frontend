/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.LoginUserVO }) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: !!currentUser,
    canAdmin: currentUser?.userRole === 'admin' ,
    canRepair: currentUser?.userRole === 'repair' ,
  };
}
