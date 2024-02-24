import { Fragment, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";
import { AppContext } from "../contexts/app_context";
import { isAdminUser } from "../../utils/user_utils";
import {
  XMarkIcon,
  HomeIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { MarketplaceTabKey } from "../MarketplaceFilterTab";
import Navbar from "../layout/Navbar";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  //{ name: "Alpha", href: "/alpha", icon: PlayCircleIcon },
  // {
  //   name: "Explore",
  //   href: "/marketplace",
  //   icon: RocketLaunchIcon,
  //   options: [
  //     {
  //       name: "Worlds",
  //       href: `/marketplace?type=${MarketplaceTabKey.WORLD_TYPE}`,
  //       type: MarketplaceTabKey.WORLD_TYPE,
  //     },
  //     // {
  //     //   name: "Assets",
  //     //   href: `/marketplace?type=${MarketplaceTabKey.NFT_TYPE}`,
  //     //   type: MarketplaceTabKey.NFT_TYPE,
  //     // },
  //   ],
  // },
  // { name: "Create", href: "/create", icon: WrenchScrewdriverIcon },
  //{ name: "About", href: "/about", icon: UsersIcon },
  // { name: "Stream", href: "/stream", icon: (<BsBroadcast fontSize="1.5rem" color='rgb(97 198 208)' />) },
  { name: "Docs", href: "https://docs.deverse.world", icon: DocumentTextIcon },
  { name: "Blogs", href: "/blogs", icon: PencilSquareIcon },
];

const Tab = ({ item, router, setSidebarOpen }) => {
  return (
    <div key={item.name} className="flex items-center">
      <Link href={item.href}>
        <a
          className={classNames(
            router.pathname === item.href
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800",
            "group flex gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold no-underline"
          )}
          onClick={() => setSidebarOpen(false)}
        >
          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          {item.name}
        </a>
      </Link>
    </div>
  );
};

const TabWithOptions = ({ item, router, setSidebarOpen }) => {
  return (
    <Disclosure
      as="div"
      key={item.name}
      className="py-3 relative"
      defaultOpen={router.pathname === item.href}
    >
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="flex p-2 w-full items-center justify-between rounded-md p-1 text-sm text-gray-400 hover:text-white hover:bg-gray-800 font-semibold">
              <div className="group flex gap-x-2">
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                {item.name}
              </div>
              <span className="ml-2 flex items-center">
                {open ? (
                  <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel
            className="absolute right-0 mt-8 w-full bg-gray-900 rounded-md shadow-md z-50" // Added background color and shadow
          >
            <div className="space-y-4">
              {item.options.map((option, optionIdx) => (
                <Link href={option.href} key={option.name}>
                  <a
                    className={classNames(
                      router.query.type === option.type
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md py-2 pr-2 pl-11 text-sm leading-6 font-semibold no-underline"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {option.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const router = useRouter();
  const { user } = useContext(AppContext);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    {/* <Image
                      className="h-8 w-auto"
                      src="/images/logo.webp"
                      alt="Deverse logo"
                      height={32}
                      width={32}
                    /> */}
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <div className="flex flex-1 flex-col gap-y-7">
                      <div className="-mx-2 space-y-1">
                        {navigation.map((item) => {
                          if (
                            item.adminOnly === undefined ||
                            item.adminOnly === false ||
                            (item.adminOnly === true && isAdminUser(user))
                          ) {
                            if (item.options)
                              return (
                                <TabWithOptions
                                  item={item}
                                  router={router}
                                  setSidebarOpen={setSidebarOpen}
                                />
                              );
                            return (
                              <Tab
                                item={item}
                                router={router}
                                setSidebarOpen={setSidebarOpen}
                              />
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="lg:fixed lg:inset-x-0 lg:z-50 lg:flex lg:flex-row bg-gray-900">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-row gap-y-5 px-6 gap-5 items-center">
          <Link
            className="hidden lg:flex flex h-16 gap-1 shrink-0"
            href="/"
          >
            <svg width="32" height="32" viewBox="0 0 2000 2000" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_223_46)">
              <path d="M1829.26 750.913C1819.49 708.079 1806.32 666.497 1790.08 626.474C1734.97 490.334 1644.42 371.759 1529.6 281.906C1491.35 251.863 1450.38 225.036 1407.13 201.835C1286.25 136.923 1147.46 100 1000 100C918.77 100 840.167 111.18 765.762 132.097C755.508 134.991 749.343 145.156 751.831 155.343C769.501 227.739 815.671 339.853 931.348 492.64C1109.24 727.591 1291.92 917.63 1358.12 984.459C1366.12 992.546 1377.68 996.288 1389 994.363C1502.9 975.035 1615.62 947.146 1726.23 910.635L1823.96 878.4C1837.92 873.78 1846.76 860.271 1845.2 845.906C1841.74 813.649 1836.39 781.941 1829.26 750.913ZM824.432 1020.5C976.834 1032.1 1130.17 1028.63 1282.06 1010.03C1292.44 1008.76 1296.58 996.12 1288.92 989.117C1190.23 898.828 805.137 536.139 641.907 230.236C637.584 221.126 633.783 212.488 630.464 204.256C626.522 194.504 614.892 190.373 605.424 195.26C525.359 236.536 452.82 289.986 390.418 353.149C382.248 361.419 379.962 373.638 384.106 384.429C404.785 438.229 440.102 505.31 498.446 587.397M179.246 805.317C172.622 795.191 156.67 798.689 155.201 810.655C153.234 827.059 151.477 843.562 150.047 860.095C149.541 866.044 153.273 871.573 159.026 873.467L208.025 889.596C219.981 893.529 230.142 880.271 222.974 870.069C210.777 852.71 196.286 831.358 179.246 805.317ZM313.58 473.831C313.277 473.007 312.982 472.189 312.686 471.365C309.833 463.568 299.191 462.3 294.472 469.181C278.115 493.007 263.01 517.742 249.173 543.211C237.978 563.937 227.577 585.151 218.162 606.847C209.401 626.962 201.402 647.49 194.265 668.391C189.259 683.054 190.666 699.144 198.214 712.73C257.654 819.628 325.327 912.75 325.327 912.75L330.147 919.081C336.164 926.977 344.614 932.804 354.246 935.592C465.647 967.849 578.906 991.599 693.106 1006.84C703.267 1008.2 709.813 996.525 703.267 988.773C609.816 878.041 345.57 560.63 313.58 473.831ZM1586.64 1443.23L1526.78 1427.09C1525.98 1426.78 1525.13 1427.03 1524.57 1427.57L1415.26 1522.15C1408.43 1528.07 1398.02 1528.01 1391.25 1522.03L1339.27 1476.7C1332.56 1470.84 1331.71 1460.81 1337.38 1453.98L1419.69 1354.81C1419.93 1354.51 1420.11 1354.14 1420.17 1353.85L1438.93 1282.24C1440.4 1276.55 1443.44 1271.42 1447.79 1267.43L1509.13 1211.47C1512.63 1208.21 1517.93 1212.5 1515.4 1216.61L1482.5 1268.22C1480.27 1271.78 1478.62 1275.65 1477.7 1279.69L1470.99 1308.58C1469.76 1314.26 1473.51 1320 1479.35 1321.03L1535.02 1330.88C1544.19 1332.52 1550.84 1340.31 1550.84 1349.43V1388C1550.84 1395.64 1553.83 1402.99 1559.2 1408.52L1589.11 1439.29C1590.82 1441.05 1589.11 1443.83 1586.64 1443.23ZM1326.91 1334.87C1326.41 1336.26 1325.61 1337.65 1324.53 1338.68L1228.48 1428.59C1222.76 1433.92 1213.41 1429.99 1213.41 1422.25V1286.76C1213.41 1283.32 1215.5 1280.3 1218.64 1278.91L1245.89 1266.74C1251.8 1264.1 1255.6 1258.3 1255.6 1251.9V1215.88C1255.6 1212.67 1257.4 1209.78 1260.16 1208.15L1416.61 1123.35C1418.08 1122.57 1419.55 1122.21 1420.96 1122.21C1426.93 1122.21 1431.87 1128.25 1429.28 1134.41L1396.85 1211.21C1394.32 1217.16 1388.53 1221.14 1381.96 1221.39L1368.45 1221.92C1364.69 1221.98 1361.3 1224.4 1360.18 1228.08L1326.91 1334.87ZM1117.01 1491.21L1087.54 1618.72L1067.49 1727.8L1061.89 1758.32C1059.43 1771.19 1043.18 1776.02 1034.08 1766.41L999.324 1730.09L855.497 1579.62C854.696 1578.77 853.896 1577.87 853.282 1576.78L785.92 1462.93C783.028 1458.21 782.904 1452.35 785.485 1447.46L827.565 1369.32C830.208 1364.54 830.092 1358.8 827.379 1354.03L800.986 1308.7C799.517 1306.28 798.833 1303.44 798.833 1300.91C798.833 1296.37 800.745 1291.9 804.438 1288.82C807.633 1286.04 809.6 1282.18 809.848 1278.01L819.41 1156.57C819.713 1152.74 822.808 1149.72 826.71 1149.5C844.147 1148.49 890.783 1145.71 912.799 1143.49C917.129 1143.06 920.985 1146.15 921.397 1150.4L922.921 1166.2C923.232 1169.17 924.336 1171.95 926.24 1174.3L979.329 1242.35C982.897 1246.82 988.619 1249.18 994.403 1248.27L1084.29 1235.76C1094.13 1234.43 1102.8 1241.75 1102.8 1251.48V1266.58C1102.8 1269.9 1101.69 1273.11 1099.79 1275.89L1059.56 1331.07C1057.34 1334.26 1056.35 1338.01 1056.66 1341.82L1067.8 1457.25C1068.54 1465.4 1075.55 1471.69 1083.91 1471.69H1101.2C1111.6 1471.69 1119.36 1481.18 1117.01 1491.21ZM617.792 1327.01L595.519 1437.9C595.457 1438.57 595.457 1439.23 595.457 1439.78L608.191 1602.22C608.743 1609.35 599.515 1612.68 595.208 1606.87L474.51 1440.8C473.592 1439.48 472.24 1438.63 470.879 1438.15L400.385 1416.15C398.293 1415.48 396.754 1414.04 395.953 1411.98L353.57 1303.99C353.134 1302.78 352.271 1301.69 351.167 1300.91L249.787 1227.18C248.31 1226.03 247.198 1224.4 246.957 1222.52L234.713 1145.48C233.85 1139.8 239.758 1135.57 244.928 1137.98L401.986 1212.31C402.966 1212.8 403.953 1213.04 405.119 1213.04H495.616C498.508 1213.04 501.213 1214.85 502.193 1217.51L550.306 1340.31C551.845 1344.18 556.517 1345.99 560.264 1343.93L607.39 1319.4C612.747 1316.62 618.958 1321.15 617.792 1327.01ZM1726.23 970.705C1609.77 1009.14 1490.97 1038.03 1370.95 1057.43C1350.09 1060.81 1329.18 1063.9 1308.26 1066.74C1147.84 1088.25 985.61 1092.84 824.432 1080.57H824.37C790.04 1078.04 755.835 1074.65 721.629 1070.54C592.69 1054.95 464.854 1028.54 339.421 991.316C317.452 984.787 295.552 977.899 273.777 970.705L210.295 949.735L150 929.856V932.208C150.062 971.247 152.954 1009.74 158.373 1047.33C161.941 1072.65 166.675 1097.67 172.583 1122.21C179.098 1149.53 186.973 1176.35 196.201 1202.52C206.206 1230.87 217.68 1258.64 230.57 1285.55C231.114 1286.67 231.915 1287.64 232.91 1288.4L295.374 1335.89C298.506 1338.19 300.909 1341.34 302.324 1344.9L347.537 1459.84C349.504 1464.86 353.935 1468.66 359.346 1469.81L418.288 1483.29C425.541 1484.92 432.001 1488.97 436.495 1494.9L546.613 1636.66L577.554 1676.49L605.61 1712.63C610.407 1718.73 619.883 1718.97 624.804 1712.75L631.692 1704.16L644.06 1688.76L669.769 1656.79C674.2 1651.1 682.751 1650.93 687.734 1656.18L709.82 1680.24C714.376 1685.13 721.816 1685.92 727.289 1682.11L793.608 1634.79C799.454 1630.56 807.633 1632.55 811.139 1638.72C830.823 1674.14 865.526 1717.76 902.374 1759.77C908.897 1767.26 915.411 1774.63 921.996 1781.88C964.442 1828.78 1006.83 1871.08 1030.09 1893.74C1039.55 1902.99 1055.19 1901.84 1063.12 1891.26L1152.7 1771.98L1170.29 1748.52L1325.38 1541.91C1328.76 1537.32 1335.77 1537.19 1339.4 1541.67L1396.12 1612.01C1399.51 1616.18 1405.78 1616.36 1409.46 1612.49L1525.54 1491.33C1530.48 1486.19 1539.08 1488.61 1540.69 1495.38C1543.88 1510.01 1549.55 1531.42 1557.82 1547.29C1560.19 1551.8 1566.24 1552.96 1570.07 1549.56C1695.84 1437.91 1787.33 1289.78 1827.43 1122.21C1833.32 1097.61 1838.06 1072.65 1841.7 1047.33C1846.38 1014.88 1849.14 981.763 1849.82 948.223C1849.88 945.206 1849.94 942.243 1849.94 939.219C1850 937.829 1850 936.386 1850 934.988V929.917" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0_223_46">
              <rect width="2000" height="2000" fill="white"/>
              </clipPath>
              </defs>
            </svg>
            {/* <Image
              className="h-8 w-auto"
              src="/images/logo.webp"
              alt="Deverse logo"
              height={32}
              width={32}
            /> */}
            {/* <Image
              height={13}
              width={100}
              src={"/images/logo-text.webp"}
              alt="Deverse text logo"
            /> */}
          </Link>
          <nav className="hidden lg:flex flex h-16 gap-1 shrink-0 items-center">
            <div className="flex space-x-4">
              {navigation.map((item) => {
                if (
                  item.adminOnly === undefined ||
                  item.adminOnly === false ||
                  (item.adminOnly === true && isAdminUser(user))
                ) {
                  if (item.options)
                    return (
                      <TabWithOptions
                        item={item}
                        router={router}
                        setSidebarOpen={setSidebarOpen}
                      />
                    );
                  return (
                    <Tab
                      item={item}
                      router={router}
                      setSidebarOpen={setSidebarOpen}
                    />
                  );
                }
              })}
            </div>
          </nav>
          <div className="hidden lg:flex flex flex-grow"></div>
          <Navbar setSidebarOpen={setSidebarOpen} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
