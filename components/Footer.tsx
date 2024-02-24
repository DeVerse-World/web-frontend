/* eslint-disable react/jsx-key */
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FirebaseService from "../data/services/FirebaseService";
import { useContext } from "react";
import { AppContext } from "./contexts/app_context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FooterLink({ href, label }) {
  return (
    <Row style={{ marginBottom: "10px" }}>
      <Link href={href} prefetch={false}>
        <a className="no-underline text-white">{label}</a>
      </Link>
    </Row>
  );
}

const Footer = () => {
  const { remoteConfig } = useContext(AppContext);

  return (
    <section id="section-footer">
      <div className="gradient-divider"></div>
      {/* <svg
        _ngcontent-qfi-c18=""
        aria-hidden="true"
        width="100%"
        height="8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern
          _ngcontent-qfi-c18=""
          id="a"
          width="91"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <g _ngcontent-qfi-c18="" clip-path="url(#clip0_2426_11367)">
            <path
              _ngcontent-qfi-c18=""
              d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0"
              stroke="#A8C7FA"
              stroke-linecap="square"
            ></path>
          </g>
        </pattern>
        <rect
          _ngcontent-qfi-c18=""
          width="100%"
          height="100%"
          fill="url(#a)"
        ></rect>
      </svg> */}
      <Row style={{ margin: "50px 0px 40px 50px" }}>
        <Col>
          <span
            className="flex gap-1 items-center"
            style={{ marginBottom: "0px" }}
          >
          <svg width="32" height="32" viewBox="0 0 1701 1701" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1679.64 615.313C1669.87 574.859 1656.7 535.587 1640.46 497.787C1585.35 369.211 1494.8 257.223 1379.98 172.362C1341.74 143.988 1300.76 118.651 1257.51 96.7394C1136.64 35.4337 997.838 0.561646 850.381 0.561646C769.151 0.561646 690.548 11.1206 616.143 30.8755C605.889 33.609 599.725 43.2087 602.212 52.8301C619.883 121.204 666.052 227.09 781.729 371.389C959.621 593.286 1142.3 772.768 1208.5 835.884C1216.5 843.522 1228.06 847.056 1239.38 845.238C1353.28 826.984 1466 800.644 1576.61 766.161L1674.35 735.717C1688.3 731.354 1697.14 718.595 1695.58 705.029C1692.12 674.563 1686.77 644.617 1679.64 615.313ZM674.814 869.926C827.215 880.882 980.549 877.6 1132.44 860.031C1142.82 858.834 1146.96 846.897 1139.3 840.283C1040.61 755.011 655.519 412.471 492.288 123.562C487.966 114.958 484.164 106.801 480.845 99.0257C476.903 89.8155 465.274 85.9136 455.805 90.5295C375.741 129.513 303.201 179.992 240.8 239.647C232.629 247.458 230.344 258.997 234.487 269.189C255.166 320 290.483 383.354 348.827 460.881M29.6271 666.695C23.0037 657.131 7.05143 660.434 5.58215 671.736C3.61533 687.228 1.85841 702.814 0.427992 718.429C-0.0773171 724.048 3.6542 729.27 9.40695 731.058L58.4064 746.291C70.3628 750.005 80.5234 737.485 73.3558 727.849C61.1584 711.455 46.6677 691.289 29.6271 666.695ZM163.962 353.625C163.658 352.846 163.363 352.074 163.068 351.295C160.215 343.931 149.572 342.734 144.853 349.232C128.497 371.735 113.392 395.096 99.5541 419.149C88.3596 438.724 77.958 458.76 68.5437 479.251C59.7824 498.248 51.783 517.635 44.6464 537.376C39.64 551.224 41.0471 566.42 48.5956 579.251C108.036 680.211 175.708 768.159 175.708 768.159L180.528 774.138C186.545 781.596 194.995 787.099 204.627 789.731C316.029 820.197 429.288 842.627 543.488 857.023C553.648 858.307 560.194 847.279 553.648 839.959C460.197 735.379 195.952 435.601 163.962 353.625ZM1437.02 1269.16L1377.16 1253.92C1376.36 1253.63 1375.51 1253.87 1374.95 1254.38L1265.64 1343.7C1258.81 1349.29 1248.4 1349.24 1241.63 1343.59L1189.65 1300.78C1182.94 1295.24 1182.09 1285.77 1187.76 1279.32L1270.08 1185.66C1270.31 1185.38 1270.49 1185.03 1270.55 1184.75L1289.32 1117.12C1290.79 1111.75 1293.82 1106.9 1298.17 1103.13L1359.51 1050.28C1363.01 1047.2 1368.31 1051.25 1365.78 1055.13L1332.88 1103.88C1330.65 1107.24 1329 1110.89 1328.09 1114.72L1321.38 1142C1320.14 1147.37 1323.89 1152.78 1329.73 1153.76L1385.4 1163.06C1394.58 1164.6 1401.22 1171.96 1401.22 1180.58V1217C1401.22 1224.22 1404.21 1231.16 1409.58 1236.38L1439.49 1265.45C1441.2 1267.11 1439.49 1269.73 1437.02 1269.16ZM1177.29 1166.83C1176.8 1168.14 1175.99 1169.45 1174.91 1170.43L1078.86 1255.34C1073.14 1260.37 1063.79 1256.66 1063.79 1249.36V1121.4C1063.79 1118.14 1065.88 1115.29 1069.02 1113.98L1096.27 1102.48C1102.18 1099.99 1105.98 1094.51 1105.98 1088.47V1054.45C1105.98 1051.42 1107.78 1048.69 1110.55 1047.14L1266.99 967.063C1268.46 966.321 1269.94 965.982 1271.34 965.982C1277.31 965.982 1282.25 971.687 1279.66 977.507L1247.23 1050.04C1244.7 1055.65 1238.91 1059.41 1232.34 1059.66L1218.83 1060.15C1215.07 1060.21 1211.68 1062.49 1210.57 1065.97L1177.29 1166.83ZM967.388 1314.48L937.924 1434.9L917.867 1537.93L912.27 1566.75C909.813 1578.91 893.566 1583.47 884.463 1574.39L849.705 1540.09L705.878 1397.98C705.078 1397.18 704.277 1396.33 703.663 1395.29L636.301 1287.77C633.409 1283.31 633.285 1277.78 635.866 1273.16L677.947 1199.36C680.59 1194.85 680.473 1189.43 677.76 1184.92L651.367 1142.12C649.898 1139.83 649.214 1137.15 649.214 1134.75C649.214 1130.47 651.126 1126.25 654.819 1123.34C658.014 1120.71 659.981 1117.06 660.23 1113.12L669.792 998.437C670.095 994.817 673.189 991.968 677.091 991.759C694.528 990.807 741.165 988.174 763.181 986.083C767.511 985.671 771.367 988.593 771.779 992.61L773.302 1007.53C773.613 1010.33 774.717 1012.96 776.622 1015.18L829.71 1079.45C833.279 1083.67 839 1085.9 844.784 1085.04L934.667 1073.22C944.509 1071.97 953.185 1078.88 953.185 1088.07V1102.33C953.185 1105.47 952.073 1108.5 950.168 1111.12L909.938 1163.23C907.722 1166.26 906.735 1169.79 907.046 1173.39L918.178 1282.41C918.917 1290.11 925.929 1296.04 934.294 1296.04H951.583C961.977 1296.04 969.743 1305.01 967.388 1314.48ZM468.173 1159.4L445.901 1264.14C445.839 1264.77 445.839 1265.39 445.839 1265.91L458.572 1419.33C459.124 1426.06 449.897 1429.2 445.59 1423.72L324.891 1266.88C323.974 1265.62 322.621 1264.82 321.26 1264.37L250.766 1243.6C248.675 1242.96 247.135 1241.6 246.335 1239.65L203.951 1137.66C203.516 1136.52 202.653 1135.5 201.549 1134.75L100.168 1065.12C98.6912 1064.03 97.5795 1062.49 97.3385 1060.72L85.0945 987.958C84.2316 982.592 90.1398 978.596 95.3095 980.875L252.367 1051.08C253.347 1051.54 254.334 1051.77 255.5 1051.77H345.997C348.889 1051.77 351.595 1053.48 352.574 1055.99L400.687 1171.96C402.227 1175.62 406.899 1177.33 410.646 1175.39L457.772 1152.21C463.128 1149.59 469.339 1153.87 468.173 1159.4ZM1576.61 822.894C1460.15 859.194 1341.36 886.479 1221.33 904.799C1200.48 907.994 1179.56 910.907 1158.64 913.59C998.219 933.908 835.992 938.243 674.814 926.659H674.751C640.422 924.265 606.216 921.063 572.01 917.182C443.071 902.454 315.236 877.514 189.802 842.36C167.833 836.194 145.934 829.688 124.159 822.894L60.6764 803.089L0.381348 784.315V786.536C0.44354 823.406 3.33546 859.764 8.75393 895.264C12.3222 919.18 17.0566 942.808 22.9648 965.982C29.4794 991.78 37.3544 1017.12 46.5822 1041.83C56.5873 1068.61 68.0617 1094.83 80.951 1120.25C81.4951 1121.3 82.2959 1122.22 83.2909 1122.94L145.755 1167.79C148.888 1169.96 151.29 1172.94 152.705 1176.3L197.918 1284.86C199.885 1289.6 204.316 1293.19 209.727 1294.27L268.669 1307C275.923 1308.54 282.383 1312.37 286.876 1317.96L396.995 1451.85L427.935 1489.47L455.991 1523.6C460.788 1529.37 470.264 1529.59 475.185 1523.71L482.073 1515.6L494.442 1501.06L520.15 1470.86C524.581 1465.49 533.133 1465.33 538.116 1470.29L560.202 1493.01C564.757 1497.63 572.197 1498.37 577.67 1494.78L643.99 1450.09C649.836 1446.09 658.014 1447.97 661.52 1453.8C681.204 1487.25 715.907 1528.45 752.756 1568.12C759.278 1575.19 765.793 1582.16 772.377 1589.01C814.823 1633.3 857.215 1673.25 880.467 1694.65C889.935 1703.39 905.569 1702.3 913.506 1692.31L1003.08 1579.65L1020.67 1557.5L1175.76 1362.36C1179.14 1358.03 1186.15 1357.91 1189.79 1362.14L1246.5 1428.57C1249.89 1432.51 1256.16 1432.68 1259.85 1429.03L1375.93 1314.59C1380.86 1309.74 1389.46 1312.03 1391.07 1318.42C1394.26 1332.24 1399.93 1352.46 1408.2 1367.45C1410.57 1371.7 1416.62 1372.8 1420.45 1369.59C1546.22 1264.14 1637.71 1124.24 1677.81 965.982C1683.71 942.75 1688.44 919.18 1692.08 895.264C1696.76 864.618 1699.53 833.338 1700.2 801.661C1700.26 798.812 1700.32 796.013 1700.32 793.157C1700.38 791.845 1700.38 790.481 1700.38 789.162V784.373" fill="white"/>
          </svg>
          <h6 className="items-center">Copyright © Deverse World</h6>
          </span>
        </Col>
      </Row>
      <Row style={{ margin: "50px 0px 40px 50px" }}>
        <Col md={1}>
          {[
            //{ href: "/alpha", label: "Alpha" },
            //{ href: "/expore", label: "Explore" },
            //{ href: "/create", label: "Create" },
            { href: "/docs", label: "Docs" },
          ].map((item) => (
            <FooterLink href={item.href} label={item.label} />
          ))}
          <FooterLink href="https://docs.deverse.world/faq" label="FAQ" />
        </Col>
        <Col md={1}>
          {/* <FooterLink href="/roadmap" label="Roadmap" /> */}
          {/* <FooterLink href="https://docs.deverse.world/faq" label="FAQ" /> */}
          {/* <span
            className="cursor-pointer text-white"
            onClick={() => {
              FirebaseService.getPitchDeckUri(remoteConfig)
                .then((url) => {
                  window.open(url, "_blank");
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            Pitch Deck
          </span> */}
        </Col>
        <Col md={3}>
          {[
            { href: "/privacy-policies", label: "Privacy Policies" },
            { href: "/term-of-use", label: "Term of Use" },
            { href: "/about", label: "About Us" },
          ].map((item) => (
            <FooterLink href={item.href} label={item.label} />
          ))}
        </Col>
        <Col md={4}>
          <h6>
            <b>Contact us</b>
          </h6>
          <div className="flex flex-row gap-5 mt-4">
            {[
              {
                title: "email",
                href: "mailto:info@cosugames.com",
                icon: <MdEmail color="#A8C7FA" fontSize="2rem" />,
              },
              {
                title: "twitter",
                href: "https://twitter.com/DeverseWorld",
                icon: <AiOutlineTwitter color="#A8C7FA" fontSize="2rem" />,
              },
              {
                title: "discord",
                href: "https://discord.gg/z6qRJN9PAp",
                icon: <FaDiscord color="#A8C7FA" fontSize="2rem" />,
              },
              {
                title: "facebook",
                href: "https://www.facebook.com/DeverseWorld/",
                icon: <AiFillFacebook color="#A8C7FA" fontSize="2rem" />,
              },
            ].map((item) => (
              <div style={{ position: "relative" }}>
                <a
                  key={item.title}
                  title={item.title}
                  target="_blank"
                  href={item.href}
                  style={{
                    top: "30%",
                    left: "30%",
                    position: "absolute",
                    zIndex: 1,
                  }}
                >
                  {item.icon}
                </a>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default memo(Footer);
