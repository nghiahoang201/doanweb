import { FiTruck, FiShield, FiPackage } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import imageMomoPay from "../Image/momo.png";
import imageVnPay from "../Image/vnpay.png";

export const DataShip = [
  {
    id: 1,
    text: "FREESHIP ĐƠN HÀNG >700K",
    icon: <FiTruck style={{ fontSize: "20px" }} />,
  },
  {
    id: 2,
    text: "BẢO HÀNH 10 NĂM",
    icon: <FiShield style={{ fontSize: "20px" }} />,
  },
  {
    id: 3,
    text: "ĐỔI TRẢ MIỄN PHÍ TRONG VÒNG 3 NGÀY",
    icon: <FiPackage style={{ fontSize: "20px" }} />,
  },
];

export const dataText = ["Nam Giới", "Nữ Giới"];

export const location = [
  {
    id: 10,
    address: "HANOI STORES",
    addressChildren: [
      "33 Hàm Long, Hoàn Kiếm.",
      "9 B7 Phạm Ngọc Thạch, Đống Đa.",
      "173C Kim Mã, Ba Đình.",
    ],
  },
  {
    id: 11,
    address: "TP.HCM STORES",
    addressChildren: [
      "25 Nguyễn Trãi, P.Bến Thành, Quận 1.",
      "348 Lê Văn Sỹ, Phường 14, Quận 3.",
      "349 Quang Trung, Phường 10, Quận Gò Vấp.",
    ],
  },
];

export const FooterInfomation = [
  {
    id: 12,
    icon: <FaFacebookF style={{ fontSize: "20px", color: "#fff" }} />,
  },
  {
    id: 13,
    icon: <FaInstagram style={{ fontSize: "20px", color: "#fff" }} />,
  },
  {
    id: 14,
    icon: <FaYoutube style={{ fontSize: "20px", color: "#fff" }} />,
  },
];

export const payOnline = [
  {
    id: 15,
    imagePay: imageMomoPay,
  },
  {
    id: 16,
    imagePay: imageVnPay,
  },
];

export const DataSize = [
  {
    id: 20,
    name: "Kashmir 40mm",
    size: "15,5-17,5cm",
    color: "#f1f0ee",
  },
  {
    id: 21,
    name: "Weimar 40mm",
    size: "16-17,5cm",
    color: "",
  },
  {
    id: 22,
    name: "Jackson 40mm",
    size: "16-17,5cm",
    color: "#f1f0ee",
  },
  {
    id: 23,
    name: "Detroit 40mm",
    size: "16-18cm",
    color: "",
  },
  {
    id: 24,
    name: "Colosseum 42mm",
    size: "16-18cm",
    color: "#f1f0ee",
  },
  {
    id: 25,
    name: "Whitesands 38mm",
    size: "14,5-17cm",
    color: "",
  },
  {
    id: 26,
    name: "Futura 40mm",
    size: "16-18cm",
    color: "#f1f0ee",
  },
];

export const DataInfoDesc = [
  {
    id: 30,
    text: "Thông tin sản phẩm",
    hide: "info",
  },
  {
    id: 31,
    text: "Chính sách vận chuyển",
    hide: "ship",
  },
  {
    id: 32,
    text: "Đổi trả & bảo hành",
    hide: "exchange",
  },
  {
    id: 33,
    text: "Hình thức thanh toán",
    hide: "pay",
  },
];

// icon
export const IconSize = ({
  width = "0.7rem",
  height = "1.4rem",
  className,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 7 14"
    opacity="1"
  >
    <path
      fill="currentColor"
      d="M7 0.777778C7 0.518519 6.90278 0.324074 6.70833 0.194445C6.5787 0.0648148 6.41667 0 6.22222 0H0.777778C0.518519 0.0648146 0.324074 0.162037 0.194445 0.291666C0.0648148 0.421296 0 0.583333 0 0.777778V13.2222C0.0648148 13.4167 0.162037 13.5787 0.291667 13.7083C0.421297 13.9028 0.583333 14 0.777778 14H6.125C6.38426 14 6.5787 13.9028 6.70833 13.7083C6.90278 13.5787 7 13.4167 7 13.2222V0.777778ZM5.83333 12.8333H1.16667V11.6667H2.33333C2.52778 11.6667 2.65741 11.6343 2.72222 11.5694C2.85185 11.4398 2.91667 11.2778 2.91667 11.0833C2.91667 10.8889 2.85185 10.7593 2.72222 10.6944C2.65741 10.5648 2.52778 10.5 2.33333 10.5H1.16667V9.91667H3.5C3.69444 9.91667 3.82407 9.88426 3.88889 9.81944C4.01852 9.68981 4.08333 9.52778 4.08333 9.33333C4.08333 9.13889 4.01852 9.00926 3.88889 8.94444C3.82407 8.81481 3.69444 8.75 3.5 8.75H1.16667V8.16667H2.33333C2.52778 8.16667 2.65741 8.10185 2.72222 7.97222C2.85185 7.84259 2.91667 7.71296 2.91667 7.58333C2.91667 7.38889 2.85185 7.25926 2.72222 7.19444C2.65741 7.06482 2.52778 7 2.33333 7H1.16667V6.31944H3.5C3.69444 6.31944 3.82407 6.28704 3.88889 6.22222C4.01852 6.09259 4.08333 5.96296 4.08333 5.83333C4.08333 5.63889 4.01852 5.47685 3.88889 5.34722C3.82407 5.21759 3.69444 5.15278 3.5 5.15278H1.16667V4.56944H2.33333C2.52778 4.56944 2.65741 4.53704 2.72222 4.47222C2.85185 4.34259 2.91667 4.18056 2.91667 3.98611C2.91667 3.79167 2.85185 3.66204 2.72222 3.59722C2.65741 3.46759 2.52778 3.40278 2.33333 3.40278H1.16667V2.81944H3.5C3.69444 2.81944 3.82407 2.78704 3.88889 2.72222C4.01852 2.59259 4.08333 2.43056 4.08333 2.23611C4.08333 1.91204 3.88889 1.75 3.5 1.75H1.16667V1.16667H5.83333V12.8333Z"
    ></path>
  </svg>
);

export const searchText = [
  "Kashmir",
  "Colosseum",
  "Whitesands",
  "Moraine",
  "Melissani",
];
