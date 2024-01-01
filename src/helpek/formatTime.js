export const DMY_HMS = "DMY_HMS";
export const DMY = "DMY";
export const MY = "MY";

export const formatTimeIso = (value, type) => {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  if (type === DMY_HMS) {
    return `${day}-${month}-${year} || ${hours}:${minutes}:${seconds}`;
  } else if (type === DMY) {
    return `${day}-${month}-${year} `;
  } else if (type === MY) {
    return `${month}-${year}`;
  }
};
