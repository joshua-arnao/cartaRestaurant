import { BASE_API_URL } from "../utils/constans";

export async function loginApi(formValue) {
  try {
    const url = `${BASE_API_URL}/api/auth/login/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue), //transformamos el objeto en string
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getMeApi(token) {
  try {
    const url = `${BASE_API_URL}/api/auth/me`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

// ------ Obteniendo los usuarios creados en el panel --------
export async function getUsersApi(token) {
  try {
    const url = `${BASE_API_URL}/api/users/`;
    const params = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

// ------ FUNCIÓN PARA CREAR USUARIOS --------------------------------
export async function addUserApi(data, token) {
  try {
    const url = `${BASE_API_URL}/api/users/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateUserApi(id, data, token) {
  try {
    const url = `${BASE_API_URL}/api/users/${id}/`;
    const params = {
      method: "PATCH", //Para actualziar lo que queremos
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserApi(id, token) {
  try {
    const url = `${BASE_API_URL}/api/users/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
