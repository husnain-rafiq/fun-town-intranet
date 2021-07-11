import http from '../service/http';
import { APIS, PAGE_SIZE } from '../utils/constants';
import { insertParams } from '../utils/helper';

const {
  LOGIN,
  FILE_UPLOAD,
  USERS,
  USERS_DELETE,
  LINKS,
  DELETE_LINK,
  QUOTE,
  BIRTHDAYS,
  ANNOUNCEMENT,
  GET_ANNOUNCEMENTS,
  ANNOUNCEMENT_DELETE,
  CEO_MESSAGE,
  EVENTS,
  BLOG,
  GOOGLE_LOGIN,
  CATEGORY,
  LOCATIONS,
  DEPARTMENTS,
  BANNER_IMAGE,
  WORK_ANNIVERSARY,
  DOCUMENT,
} = APIS;

// USER CRUD

export const fetchUsers = ({ queryKey }) => {
  let url;
  const {
    sortColumn,
    sortOrder,
    pageNumber,
    pageSize,
    query,
    filters,
  } = queryKey[1];
  if (query.searchString) {
    url = `${USERS}?${insertParams(
      query
    )}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  } else if (filters) {
    url = `${USERS}?${insertParams(
      filters
    )}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  } else {
    url = `${USERS}?sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  }
  return http.get(url);
};

export const deleteUser = (payload) =>
  http.delete(USERS_DELETE, { data: { ids: payload } });

export const submitUser = async () => {};

export const uploadUsers = async () => {};

export const updateUser = (payload) => {
  const { id, updatedData } = payload;
  return http.put(`${USERS}/${id}`, updatedData);
};

export const getUserById = (id) => http.get(`${USERS}/${id}`);

export const getQuote = () => http.get(`${QUOTE}`);

export const getBirthdays = () => http.get(`${BIRTHDAYS}`);

export const saveQuote = (payload) => http.put(`${QUOTE}`, payload);

export const uploadEmployeeFile = (payload) => http.post(FILE_UPLOAD, payload);

export const createUser = (payload) => http.post(USERS, payload);

export const login = (payload) => http.post(LOGIN, payload);

export const googleLogin = (payload) => http.post(GOOGLE_LOGIN, payload);

// USEFUL LINKS CRUD

export const fetchLinks = () => http.get(`${LINKS}?pageSize=1000&`);

export const createLink = (payload) => http.post(LINKS, payload);

export const getLinkById = (id) => http.get(`${LINKS}/${id}`);

export const updateLink = ({ id, ...payload }) =>
  http.put(`${LINKS}/${id}`, payload);

export const deleteLink = (payload) =>
  http.delete(DELETE_LINK, { data: { ids: payload } });
export const createAnnouncement = (payload) => http.post(ANNOUNCEMENT, payload);

export const retrieveActiveAnnouncements = () =>
  http.get(`${GET_ANNOUNCEMENTS}`);

export const retrieveAnnouncements = () =>
  http.get(`${ANNOUNCEMENT}?pageSize=1000&`);

export const retrieveAnnouncementById = (id) =>
  http.get(`${ANNOUNCEMENT}/${id}`);

export const updateAnnouncement = (payload) =>
  http.put(`${ANNOUNCEMENT}/${payload.id}`, payload);

export const deleteAnnouncement = (payload) =>
  http.delete(ANNOUNCEMENT_DELETE, { data: { ids: payload } });

export const retrieveAnnouncement = () => http.get(`${GET_ANNOUNCEMENTS}`);

export const getCeoMessage = () => http.get(`${CEO_MESSAGE}`);

export const saveCeoMessage = (payload) => http.put(`${CEO_MESSAGE}`, payload);
// EVENTS CRUD

export const createEvent = (payload) => http.post(EVENTS, payload);

export const fetchEvents = () => http.get(`${EVENTS}?pageSize=1000&`);

export const deleteEvents = (payload) =>
  http.delete(EVENTS, { data: { ids: payload } });

export const getEventById = ({ queryKey }) =>
  http.get(`${EVENTS}/${queryKey[1]}`);

export const updateEvent = ({ id, ...payload }) =>
  http.put(`${EVENTS}/${id}`, payload);

// BLOG CRUD
export const getBlogs = ({ queryKey }) => {
  const url = `${BLOG}?sortColumn=updatedAt&sortOrder=desc&pageSize=${PAGE_SIZE}&pageNumber=${queryKey[1]}`;
  return http.get(url);
};
export const createBlog = (payload) => http.post(BLOG, payload);

export const updateBlog = (payload) => {
  const id = payload.get('id');
  payload.delete('id');
  return http.put(`${BLOG}/${id}`, payload);
};

export const getBlogById = ({ queryKey }) => http.get(`${BLOG}/${queryKey[1]}`);

export const deleteBlog = (payload) =>
  http.delete(BLOG, { data: { id: payload } });

export const getLinkCategory = () => http.get(`${CATEGORY}`);

export const getUsefulLinksByCategoryId = ({ queryKey }) =>
  http.get(`${LINKS}?pageSize=1000&categoryId=${queryKey[1]}`);
// LINK CATEGORY CRUD
export const createLinkCategory = (payload) => http.post(CATEGORY, payload);

export const getLinkCategoryById = ({ queryKey }) =>
  http.get(`${CATEGORY}/${queryKey[1]}`);

export const updateLinkCategory = ({ id, ...payload }) =>
  http.put(`${CATEGORY}/${id}`, payload);

export const deleteLinkCategory = (id) => {
  http.delete(`${CATEGORY}/${id}`);
};
export const getCategories = () => http.get(CATEGORY);

export const getLocations = () => http.get(`${LOCATIONS}?pageSize=1000&`);

export const deleteLocation = (payload) =>
  http.delete(LOCATIONS, { data: { ids: payload } });

export const createLocation = (payload) => http.post(LOCATIONS, payload);

export const getLocationById = ({ queryKey }) =>
  http.get(`${LOCATIONS}/${queryKey[1]}`);

export const updateLocation = ({ id, ...payload }) =>
  http.put(`${LOCATIONS}/${id}`, payload);
export const getDepartments = () => http.get(`${DEPARTMENTS}?pageSize=1000&`);

export const getBannerImage = () => http.get(BANNER_IMAGE);

export const updateBannerImage = (payload) => http.put(BANNER_IMAGE, payload);
export const deleteDepartment = (payload) =>
  http.delete(DEPARTMENTS, { data: { ids: payload } });

export const createDepartment = (payload) => http.post(DEPARTMENTS, payload);

export const getDepartmentById = ({ queryKey }) =>
  http.get(`${DEPARTMENTS}/${queryKey[1]}`);

export const updateDepartment = ({ id, ...payload }) =>
  http.put(`${DEPARTMENTS}/${id}`, payload);

export const getWorkAnniversaries = () => http.get(`${WORK_ANNIVERSARY}`);

export const createDocument = (payload) => http.post(DOCUMENT, payload);
