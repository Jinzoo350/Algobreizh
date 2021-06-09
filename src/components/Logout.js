const Logout = () => {
  localStorage.removeItem("jwt");
  window.location.replace("/");
};

export default Logout;
