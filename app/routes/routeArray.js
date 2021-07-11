import addUsefulLink from '../containers/addUsefulLink/loadable';
import addLocation from '../containers/addLocation/loadable';
import addCeoMessage from '../containers/addCeoMessage/loadable';
import CreateUser from '../containers/createUser/loadable';
import Directory from '../containers/directory/loadable';
import DirectoryImporter from '../containers/directoryImporter/loadable';
import EditUser from '../containers/editUser/loadable';
import Announcement from '../containers/announcement/loadable';
import Blogs from '../containers/blog/loadable';
import BlogDetail from '../containers/blogDetail/loadable';
import CreateAnnouncement from '../containers/createAnnouncement/loadable';
import EditAnnouncement from '../containers/editAnnouncement/loadable';
import Home from '../containers/home/loadable';
import Login from '../containers/login';
import Quote from '../containers/qoute/loadable';
import usefulLinks from '../containers/usefulLinks/loadable';
import UserProfile from '../containers/userProfile/loadable';
import CeoMessage from '../containers/ceoMessage/loadable';
import Events from '../containers/events/loadable';
import { ROLES } from '../utils/constants';
import createEvent from '../containers/createEvent/loadable';
import ViewEvent from '../containers/viewEvent/loadable';
import createBlog from '../containers/createBlog/loadable';
import createPoll from '../containers/createPoll/loadable';
import Polls from '../containers/polls/loadable';
import CreateLinkCategory from '../containers/createLinkCategory/loadable';
import UsefulLinksCategory from '../containers/usefulLinksCategory/loadable';
import Locations from '../containers/location/loadable';
import Departments from '../containers/department/loadable';
import CreateDepartment from '../containers/addDepartment/loadable';
import AddDocument from '../containers/createDocument/loadable';

const routeTypes = { public: 'public', private: 'private' };
export const routeArray = [
  {
    path: '/',
    component: Login,
    exact: true,
    breadCrumbKey: 'login',
    routeType: routeTypes.public,
  },
  {
    path: '/home',
    component: Home,
    exact: true,
    breadCrumbKey: 'home',
    routeType: routeTypes.private,
  },
  {
    path: '/directory',
    component: Directory,
    exact: true,
    breadCrumbKey: 'Directory',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/upload',
        component: DirectoryImporter,
        exact: true,
        breadCrumbKey: 'Upload Directory',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: `/add`,
        component: CreateUser,
        exact: true,
        breadCrumbKey: 'Create User',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/edit/:id',
        component: EditUser,
        exact: true,
        simplifiedPath: 'edit',
        breadCrumbKey: 'Edit User',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
    ],
  },

  {
    path: '/quote',
    component: Quote,
    exact: true,
    breadCrumbKey: 'Daily Quote',
    routeType: routeTypes.private,
    roles: [ROLES.ADMIN],
  },
  {
    path: '/profile',
    component: UserProfile,
    exact: true,
    breadCrumbKey: 'My Profile',
    routeType: routeTypes.private,
  },
  {
    path: '/ceo-message',
    component: CeoMessage,
    exact: true,
    breadCrumbKey: 'Ceo Message',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/edit',
        component: addCeoMessage,
        exact: true,
        breadCrumbKey: 'Edit Ceo Message',
        roles: [ROLES.ADMIN],
      },
    ],
  },
  {
    path: '/announcement',
    component: Announcement,
    exact: true,
    breadCrumbKey: 'Announcement',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: `/add`,
        component: CreateAnnouncement,
        exact: true,
        breadCrumbKey: 'Create Announcement',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/edit/:id',
        component: EditAnnouncement,
        exact: true,
        simplifiedPath: 'edit',
        breadCrumbKey: 'Edit Announcement',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
    ],
  },
  {
    path: '/events',
    component: Events,
    exact: true,
    breadCrumbKey: 'Events',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: createEvent,
        exact: true,
        breadCrumbKey: 'Create New Event',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/edit/:id',
        component: createEvent,
        exact: true,
        breadCrumbKey: 'Edit Event',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/view/:id',
        component: ViewEvent,
        exact: true,
        breadCrumbKey: 'View Event',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.USER],
      },
    ],
  },
  {
    path: '/blogs',
    component: Blogs,
    exact: true,
    breadCrumbKey: 'Blogs',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: createBlog,
        exact: true,
        breadCrumbKey: 'Create New Blog',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/edit/:id',
        component: createBlog,
        exact: true,
        breadCrumbKey: 'Edit Blog',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/detail/:id',
        component: BlogDetail,
        exact: true,
        breadCrumbKey: 'Detail',
        simplifiedPath: 'detail',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/polls',
    component: Polls,
    exact: true,
    breadCrumbKey: 'Polls',
    routeType: routeTypes.private,
    roles: [ROLES.ADMIN],
    nestedRoutes: [
      {
        path: '/add',
        component: createPoll,
        exact: true,
        breadCrumbKey: 'Create New Event',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/edit/:id',
        component: createPoll,
        exact: true,
        breadCrumbKey: 'Edit Poll',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
    ],
  },
  {
    path: '/link-categories',
    component: UsefulLinksCategory,
    exact: true,
    breadCrumbKey: 'Link Categroies',
    routeType: routeTypes.private,
    roles: [ROLES.ADMIN, ROLES.USER],
    nestedRoutes: [
      {
        path: '/add',
        component: CreateLinkCategory,
        exact: true,
        breadCrumbKey: 'Create New Link Category',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN, ROLES.USER],
      },
      {
        path: '/edit/:id',
        component: CreateLinkCategory,
        exact: true,
        breadCrumbKey: 'Edit Link Category',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN, ROLES.USER],
      },
      {
        path: '/useful-links/:categoryId',
        component: usefulLinks,
        exact: true,
        breadCrumbKey: 'Useful Links',
        simplifiedPath: 'useful-links',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        nestedRoutes: [
          {
            path: '/add',
            component: addUsefulLink,
            exact: true,
            thirdLvlNesting: true,
            breadCrumbKey: 'Add New Link',
            routeType: routeTypes.private,
          },
          {
            path: '/edit/:id',
            component: addUsefulLink,
            simplifiedPath: 'edit',
            thirdLvlNesting: true,
            exact: true,
            noOfEnteriesToSkipAfterThisEntry: 1,
            breadCrumbKey: 'Edit Link',
            routeType: routeTypes.private,
          },
        ],
      },
    ],
  },
  {
    path: '/locations',
    component: Locations,
    exact: true,
    breadCrumbKey: 'Locations',
    routeType: routeTypes.private,
    roles: [ROLES.ADMIN],
    nestedRoutes: [
      {
        path: '/add',
        component: addLocation,
        exact: true,
        breadCrumbKey: 'Add New Location',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: addLocation,
        simplifiedPath: 'edit',
        exact: true,
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Edit Location',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/departments',
    component: Departments,
    exact: true,
    breadCrumbKey: 'Departments',
    routeType: routeTypes.private,
    roles: [ROLES.ADMIN, ROLES.USER],
    nestedRoutes: [
      {
        path: '/add',
        component: CreateDepartment,
        exact: true,
        breadCrumbKey: 'Add New Department',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: CreateDepartment,
        simplifiedPath: 'edit',
        exact: true,
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Edit Department',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/documents',
    exact: true,
    breadCrumbKey: 'Documents',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: AddDocument,
        exact: true,
        breadCrumbKey: 'Add New Document',
        routeType: routeTypes.private,
      },
    ],
  },
];
