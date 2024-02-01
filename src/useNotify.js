export const useNotify = () => {
  const apiSucess = (res) => {
    if (res?.data) {
      console.log("Data is coming sucessfully");
    }
  };
  const apiFail = (error) => {
    if (error) {
      console.log("Error is coming!", error);
    }
  };

  return { apiSucess, apiFail };
};
