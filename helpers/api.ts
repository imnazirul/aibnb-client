import axios from "axios";

//apply base url for axios
const API_URL = process.env.backend_url + "api/v1";

const axiosApi = axios.create({
  baseURL: API_URL,
  validateStatus: function (status) {
    return status >= 200 && status < 600; // default
  },
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const updateRequest = (url, data) => {
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token") ?? ""
    }`;
  let variables = url.match(/:[a-zA-Z]+/g);
  if (variables?.length) {
    variables.forEach((variable) => {
      url = url.replace(variable, data[variable.replace(":", "")]);
      delete data[variable.replace(":", "")];
    });
  }
  return { url, data };
};

export async function get(url, data, config = {}) {
  let { url: newUrl, data: newData } = updateRequest(url, data);
  return await axiosApi
    .get(newUrl, { ...config, params: newData })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  let { url: newUrl, data: newData } = updateRequest(url, data);
  return axiosApi
    .post(newUrl, newData, { ...config })
    .then((response) => response.data);
}
export async function postForm(url, data, config = {}) {
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token") ?? ""
    }`;
  axiosApi.defaults.headers.common["Content-Type"] = "multipart/form-data";
  let formData = convertObjectToFormData(data);
  return axiosApi
    .post(url, formData, { ...config })
    .then((response) => response.data);
}

export async function patchForm(url, data, config = {}) {
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token") ?? ""
    }`;
  axiosApi.defaults.headers.common["Content-Type"] = "multipart/form-data";
  let { url: newUrl, data: newData } = updateRequest(url, data);
  let formData = convertObjectToFormData(newData);
  return axiosApi
    .patch(newUrl, formData, { ...config })
    .then((response) => response.data);
}


export async function put(url, data, config = {}) {
  let { url: newUrl, data: newData } = updateRequest(url, data);
  return axiosApi
    .put(newUrl, newData, { ...config })
    .then((response) => response.data);
}

export async function patch(url, data, config = {}) {
  let { url: newUrl, data: newData } = updateRequest(url, data);
  return axiosApi
    .patch(newUrl, newData, { ...config })
    .then((response) => response.data);
}

export async function del(url, data, config = {}) {
  let { url: newUrl, data: newData } = updateRequest(url, data);
  return await axiosApi
    .delete(newUrl, { ...config, params: newData })
    .then((response) => response.data);
}

export const convertObjectToFormData = (object) => {
  let form_data = new FormData();
  for (let key in object) {
    if (object[key] !== null && object[key] !== undefined) {
      if (Array.isArray(object[key])) {
        object[key].forEach(item => {
          form_data.append(key, item);
        });
      } else {
        if(isFile(object[key])){
            form_data.append(key, object[key], object[key].name);
        } else if(typeof object[key] === 'object' && object[key] !== null){
            form_data.append(key, JSON.stringify(object[key]));
        } else {
          form_data.append(key, object[key]);
        }

      }
    }
  }
  return form_data;
};

function isFile(input) {
  return "File" in window && input instanceof File;
}
