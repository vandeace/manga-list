import create from "zustand";
import { API, token } from "config/api";

export const useStore = create((set) => ({
  collection: [],
  loadingCollection: false,
  fetchError: false,
  fetchErrorMessage: "",
  fetchCollection: async (firstToken) => {
    if (token || firstToken) {
      set({ loadingCollection: true, fetchError: false });

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${firstToken ? firstToken : token}`,
      };
      console.log(headers, "headers");

      const res = await API.get(`mangas`, {
        headers: headers,
      });
      if (res.data) {
        set({ loadingCollection: false });
      }
      set({ collection: await res.data.data });
    } else {
      set({ fetchErrorMessage: "token not found", fetchError: false });
    }
  },
  loading: false,
  removeCollection: () => set({ collection: [] }),
  isAuth: false,
  setAuthTrue: () => set({ isAuth: true }),
  setAuthFalse: () => set({ isAuth: false }),
  details: {},
  removeDetails: () => set({ details: [] }),
  fetchingSuccess: false,
  fetchDetails: async (id) => {
    set({ loading: true });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await API.get(`/mangas/${id}`, {
      headers: headers,
    });
    if (res.data) {
      set({ loading: false });
    }
    set({ details: await res.data.data });
  },
  updateDataSuccess: false,
  updateData: async (id, payload) => {
    set({ loading: true, updateDataSuccess: false });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await API.patch(`/mangas/${id}`, payload, {
      headers: headers,
    });
    if (res.data) {
      set({ loading: false, updateDataSuccess: true });
    }
    set({ details: await res.data.data });
  },
  deleteDataSuccess: false,
  deleteData: async (id) => {
    set({ loading: true, deleteDataSuccess: false });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await API.delete(`mangas/${id}`, {
      headers: headers,
    });
    if (res.status === 200) {
      set({ loading: false, deleteDataSuccess: true, details: {} });
    }
  },
  addMangaSuccess: false,
  addMangaLoading: false,
  addManga: async (payload) => {
    set({ addMangaLoading: true, addMangaSuccess: false });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await API.post(`/mangas`, payload, { headers: headers });
    if (res.data) {
      set({ addMangaLoading: false, addMangaSuccess: true });
    }
  },
  loginLoading: false,
  loginError: false,
  errorMessage: "",
  token: "",
  removeError: () => set({ loginError: false }),
  Login: async (payload) => {
    set({ loginLoading: true });

    const res = await API.post("/login", payload).catch(function (error) {
      if (error.response) {
        const errorMessage = error?.response?.data?.message;
        console.log(errorMessage, "errorMessage");
        set({
          loginLoading: false,
          loginError: true,
          errorMessage: errorMessage,
        });
      }
    });
    if (res?.status === 200) {
      localStorage.setItem("token", res.data.data.token);

      set({ loginLoading: false, isAuth: true });
    }
  },
}));
