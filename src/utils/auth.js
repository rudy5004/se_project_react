export const baseUrl = "http://localhost:3001";

export const signup = ({ name, email, password, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  }).then((res) => {
    console.log("Signup response status:", res.status); // Debug response status
    return res.json().then((data) => {
      console.log("Signup response body:", data); // Debug response body
      return data;
    });
  });
};

export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    console.log("Signin response status:", res.status); // Debug response status
    return res.json().then((data) => {
      console.log("Signin response body:", data); // Debug response body
      return data;
    });
  });
};
