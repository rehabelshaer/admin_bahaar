import React from "react";
import {
  FaUsers,
  FaPassport,
  FaGlobe,
  FaCity,
  FaIndustry,
  FaPeopleCarry,
  FaBriefcase,
  FaBuilding,
  FaUniversity,
  FaChartBar,
  FaLevelUpAlt,
  FaPrayingHands,
  FaTags,
  FaLock,
  FaSortAmountUp,
  FaNetworkWired,
  FaUserFriends,
  FaAsterisk,
  FaQuestionCircle,
  FaUserTie,
  FaMicrophoneAlt,
  FaPoll,
  FaPaste,
  FaSchool,
  FaAlignLeft,
  FaComment,
  FaAward,
  FaCrown,
  FaPager,
  FaRegClipboard,
  FaWrench,
  FaLayerGroup,
  FaBell,
  FaMousePointer,
  FaBriefcaseMedical,
  FaAllergies,
  FaBlackTie,
  FaSearchLocation,
  FaServer,
  FaAddressBook,
  FaStore,
  FaTable,
  FaUserCircle,
  FaShip,
  FaCog,
  FaTimes,
  FaTimesCircle,
  FaStopwatch,
} from "react-icons/fa";

import {
  RiAdvertisementFill,
  RiSurveyFill,
  RiCoupon4Line,
  RiBankFill,
  RiTreasureMapFill,
  RiDashboard3Line,
  RiProfileFill,
  RiApps2Line,
  RiSettings5Fill,
  RiUserVoiceFill,
  RiProductHuntFill,
  RiTimerFlashFill,
} from "react-icons/ri";
import {
  MdTitle,
  MdLocationOn,
  MdRestorePage,
  MdPermContactCalendar,
  MdWork,
  MdChat,
} from "react-icons/md";
import { HiViewBoards, HiDocument } from "react-icons/hi";
import { CgListTree } from "react-icons/cg";
import { BiArea, BiCurrentLocation } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import { GiTiedScroll, GiMedicines } from "react-icons/gi";
import { FiScissors } from "react-icons/fi";
import { RiParentFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { GrServices, GrContactInfo } from "react-icons/gr";
import {
  AiFillContacts,
  AiOutlineFieldTime,
  AiOutlineAppstoreAdd,
  AiFillBank,
  AiFillAppstore,
  AiFillPayCircle,
  AiFillPhone,
  AiFillDelete,
} from "react-icons/ai";

import { GiFactory } from "react-icons/gi";

import { getPermissions } from "@iso/config/permissions";

const options = [
  {
    key: "admin",
    label: "sidebar.admin",
    // dynamic permission to make item available or not in ur menu , true or false

    show: true,
    leftIcon: <RiDashboard3Line className="anticon anticon-dashboard" />,
  },
  {
    key: "users",
    label: "users",
    show: getPermissions("users", "read") && getPermissions("admins", "read"),
    leftIcon: <FaUsers className="anticon anticon-dashboard" />,

    children: [
      {
        key: "users",
        label: "users",
        show: getPermissions("users", "read"),
      },
      {
        key: "Joining",
        label: "Joining Requests",
        show: getPermissions("requests", "joining"),
      },
    ],
  },
  // {
  //   key: "categories",
  //   label: "Categories",
  //   show: getPermissions("categories", "read"),
  //   leftIcon: <FaComment className="anticon anticon-dashboard" />,
  // },

  {
    key: "additions",
    label: "Additions",
    show: getPermissions("additions", "read"),
    leftIcon: <FaAddressBook className="anticon anticon-dashboard" />,
  },
  {
    key: "Countries",
    label: "Countries",
    show: getPermissions("users", "read"),
    leftIcon: <FaCity className="anticon anticon-dashboard" />,
  },
  {
    key: "Cities",
    label: "Cities",
    show: getPermissions("users", "read"),
    leftIcon: <FaStore className="anticon anticon-dashboard" />,
  },

  {
    key: "nationalities",
    label: "Nationalities",
    show: getPermissions("users", "read"),
    leftIcon: <FaUserFriends className="anticon anticon-dashboard" />,
  },
  // {
  //   key: "services",
  //   label: "Services",
  //   show: getPermissions("services", "read"),
  //   leftIcon: <FaServer className="anticon anticon-dashboard" />,
  // },
  {
    key: "contactTypes",
    label: "Contact Types",
    show: getPermissions("services", "read"),
    leftIcon: <AiFillContacts className="anticon anticon-dashboard" />,
  },

  {
    key: "ports",
    label: "Ports",
    show: getPermissions("users", "read"),
    leftIcon: <AiFillPayCircle className="anticon anticon-dashboard" />,
  },
  {
    key: "vehicle",
    label: "Vehicles",
    show: getPermissions("users", "read"),
    leftIcon: <FaShip className="anticon anticon-dashboard" />,
  },
  {
    key: "staff",
    label: "Staff",
    show: getPermissions("admins", "read"),
    leftIcon: <FaUserCircle className="anticon anticon-dashboard" />,
  },
  {
    key: "periods",
    label: "Periods",
    show: getPermissions("users", "read"),
    leftIcon: <FaStopwatch className="anticon anticon-dashboard" />,
  },

  {
    key: "ContactUs",
    label: "Contact Us",
    show: getPermissions("admins", "read"),
    leftIcon: <AiFillPhone className="anticon anticon-dashboard" />,
  },
  {
    key: "settings",
    label: "Settings",
    show: getPermissions("admins", "read"),
    leftIcon: <FaCog className="anticon anticon-dashboard" />,
  },
  {
    key: "cancelStrategy",
    label: "Cancel Strategy",
    show: getPermissions("admins", "read"),
    leftIcon: <AiFillDelete className="anticon anticon-dashboard" />,
  },
  {
    label: "Locations",
    show:
      getPermissions("countries", "read") &&
      getPermissions("cities", "read") &&
      getPermissions("regions", "read") &&
      getPermissions("branches", "read"),
    leftIcon: <FaSearchLocation className="anticon anticon-dashboard" />,
    children: [
      {
        key: "Countries",
        label: "sidebar.provenances",
        show: getPermissions("countries", "read"),
        leftIcon: <FaGlobe className="anticon anticon-dashboard" />,
      },
      {
        key: "Cities",
        label: "sidebar.cites",
        show: getPermissions("cities", "read"),
        leftIcon: <FaCity className="anticon anticon-dashboard" />,
      },

      {
        key: "Regions",
        label: "Regions",
        show: getPermissions("regions", "read"),
        leftIcon: <BiArea className="anticon anticon-dashboard" />,
      },
      {
        key: "Branches",
        label: "Branches",
        show: getPermissions("branches", "read"),
        leftIcon: <BiArea className="anticon anticon-dashboard" />,
      },
    ],
  },

  {
    key: "roles",
    label: "roles",
    show: getPermissions("roles", "read"),
    leftIcon: <FaPager className="anticon anticon-dashboard" />,
  },

  {
    key: "permissions",
    label: "permissions",
    show: getPermissions("permissions", "read"),
    leftIcon: <FaTags className="anticon anticon-dashboard" />,
  },
  {
    key: "Pages",
    label: "Pages",
    show: getPermissions("pages", "read"),
    leftIcon: <MdRestorePage className="anticon anticon-dashboard" />,
  },

  {
    key: "ContactUs",
    label: "Contact us",
    show: getPermissions("contacts", "read"),
    leftIcon: <MdPermContactCalendar className="anticon anticon-dashboard" />,
  },

  {
    key: "Products",
    label: "Product Information",
    show: getPermissions("productInformation", "read"),
    leftIcon: <RiProductHuntFill className="anticon anticon-dashboard" />,
  },

  {
    key: "Applications",
    label: "Applications",
    show: getPermissions("applications", "read"),
    leftIcon: <AiFillAppstore className="anticon anticon-dashboard" />,
  },
  {
    key: "RetentionTimes",
    label: "RetentionTimes",
    show: getPermissions("RetentionTimes", "read"),
    leftIcon: <RiTimerFlashFill className="anticon anticon-dashboard" />,
  },
  {
    key: "userRequests",
    label: "userRequests",
    show: getPermissions("userRequests", "read"),
    leftIcon: <RiUserVoiceFill className="anticon anticon-dashboard" />,
  },
  {
    key: "PurposeFinances",
    label: "Finances Purpose",
    show: getPermissions("purposeFinances", "read"),
    leftIcon: <RiMoneyDollarBoxFill className="anticon anticon-dashboard" />,
  },
  {
    key: "Companies",
    label: "companies",
    show: getPermissions("company", "read"),
    leftIcon: <GiFactory className="anticon anticon-dashboard" />,
  },
  {
    key: "Bank",
    label: "Bank",
    show: getPermissions("bank", "read"),
    leftIcon: <AiFillBank className="anticon anticon-dashboard" />,
  },
  {
    key: "Occupations",
    label: "Occupations",
    show: getPermissions("occupation", "read"),
    leftIcon: <MdWork className="anticon anticon-dashboard" />,
  },
  {
    key: "socials",
    label: "socials",
    show: getPermissions("social", "read"),
    leftIcon: <MdChat className="anticon anticon-dashboard" />,
  },
];
export default options;
