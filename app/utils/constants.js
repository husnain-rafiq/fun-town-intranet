export const STYLE_CONSTANTS = {
  HEADER_WIDTH: '5rem',
  menuWidth: '5rem',
};

export const FILE_ACCEPT_TYPES = {
  imageFiles: 'image/x-png,image/jpeg,image/jpg',
};
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 100];
export const PAGE_SIZE = 10;
export const LOCAL_STORAGE_ENTRIES = { user: 'user' };
export const MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS = 10; // Mb
export const MIN_UPLOADABLE_IMAGE_SIZE_IN_MBS = 0.1; // Mb
export const MIN_UPLOADABLE_FILE_SIZE_IN_MBS = 0; // Mb
export const MAX_UPLOADABLE_FILE_SIZE_IN_MBS = 100; // Mb
export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
];

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};
export const ANNOUNCEMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const POLL_OPTIONS_LIMIT = 4;

export const APIS = {
  LOGIN: 'users/login',
  GOOGLE_LOGIN: 'users/googleLogin',
  USERS_DELETE: '/users/deleteUsers',
  USERS: '/users',
  BIRTHDAYS: '/users/birthday',
  QUOTE: '/quote',
  FILE_UPLOAD: 'users/upload',
  LINKS: '/usefulLinks',
  DELETE_LINK: '/usefulLinks/deleteLinks',
  ANNOUNCEMENT: '/announcements',
  ANNOUNCEMENT_DELETE: '/announcements/deleteAnnouncements',
  GET_ANNOUNCEMENTS: '/announcements/userAnnouncements',
  CEO_MESSAGE: '/ceo',
  EVENTS: '/events',
  BLOG: '/blogs',
  CATEGORY: '/linkCategories',
  LOCATIONS: '/locations',
  DEPARTMENTS: '/departments',
  BANNER_IMAGE: 'bannerImage',
  WORK_ANNIVERSARY: '/users/workAnniversary',
  DOCUMENT: '/documents',
};
