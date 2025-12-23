import api from "../utils/axiosConfig";

// USER APIs (Profile)
export const userService = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (data) => api.put("/user/update", data),
};

// AUTH / ADMIN APIs
export const authService = {
  logout: () => api.post("/user/logout"),

  getUsers: (page = 0, size = 10) => {
    return api.get(`/admin/get/user?page=${page}&size=${size}`);
  },

  deleteUser: (id) => {
    return api.delete(`/admin/delete/user/${id}`);
  }
};
