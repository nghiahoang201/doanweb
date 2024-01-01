export const handleValueBrand = (value) => {
  const valueError = {};

  if (value.image === "") {
    valueError.image = "Trường ảnh không được để trống.";
  }
  if (value.banner === "") {
    valueError.banner = "Trường banner không được để trống.";
  }
  if (value.name === "") {
    valueError.name = "Trường tên không được để trống.";
  }
  if (value.genres === "") {
    valueError.genres = "Trường genres không được để trống.";
  }
  if (value.desc === "") {
    valueError.desc = "Trường thông tin không được để trống.";
  }
  return valueError;
};

export const handleValueClock = (value) => {
  const valueError = {};
  const regexQuantity = /^[0-9]+$/g;
  const regexPrice = /^[0-9]+$/g;

  if (value.image === "") {
    valueError.image = "Trường ảnh không được để trống.";
  }
  if (value.brand === "") {
    valueError.brand = "Trường brand không được để trống.";
  }
  if (value.name === "") {
    valueError.name = "Trường tên không được để trống.";
  }
  if (value.genres === "") {
    valueError.genres = "Trường genres không được để trống.";
  }
  if (value.desc === "") {
    valueError.desc = "Trường thông tin không được để trống.";
  }
  if (value.price === "") {
    valueError.price = "Trường giá tiền không được để trống.";
  } else if (!regexPrice.test(value.price)) {
    valueError.price = "Trường số lượng chỉ nhận giá trị từ 0-9.";
  } else if (value.price < 0 || value.price > 10000000000) {
    valueError.price =
      "Trường số lượng không thể nhỏ hơn 0 và lớn hơn 10000000000";
  }
  if (value.sizeFace === "") {
    valueError.sizeFace = "Trường kích thước mặt không được để trống.";
  }
  if (value.thickness === "") {
    valueError.thickness = "Trường độ dày mặt không được để trống.";
  }
  if (value.colorFace === "") {
    valueError.colorFace = "Trường màu mặt không được để trống.";
  }
  if (value.sizeWire === "") {
    valueError.sizeWire = "Trường kích thước dây không được để trống.";
  }
  if (value.Waterproof === "") {
    valueError.Waterproof = "Trường chống nước không được để trống.";
  }
  if (value.faceGlasses === "") {
    valueError.faceGlasses = "Trường mặt kính không được để trống.";
  }
  if (value.wireMaterial === "") {
    valueError.wireMaterial = "Trường chất liệu dây không được để trống.";
  }
  if (value.genresClock === "") {
    valueError.genresClock = "Trường loại máy không được để trống.";
  }
  if (value.quantity === "") {
    valueError.quantity = "Trường số lượng không được để trống.";
  } else if (!regexQuantity.test(value.quantity)) {
    valueError.quantity = "Trường số lượng chỉ nhận giá trị từ 0-9.";
  } else if (value.quantity < 0 || value.quantity > 100000) {
    valueError.quantity =
      "Trường số lượng không thể nhỏ hơn 0 và lớn hơn 100000";
  }
  return valueError;
};

export const handleValueBanner = (value) => {
  const valueError = {};

  if (value.image === "") {
    valueError.image = "Trường ảnh không được để trống.";
  }
  if (value.preTitle === "") {
    valueError.preTitle = "Trường tiêu đề trên không được để trống.";
  }
  if (value.title === "") {
    valueError.title = "Trường tiêu đề dưới không được để trống.";
  }
  if (value.desc === "") {
    valueError.desc = "Trường thông tin không được để trống.";
  }
  return valueError;
};

export const handleValueCustomer = (value) => {
  const valueError = {};

  if (value.email === "") {
    valueError.email = "Trường ảnh không được để trống.";
  }
  if (value.name === "") {
    valueError.name = "Trường tên không được để trống.";
  }
  if (value.phone === "") {
    valueError.phone = "Trường sdt không được để trống.";
  }
  if (value.address === "") {
    valueError.address = "Trường địa chỉ không được để trống.";
  }
  if (Object.keys(value.province).length === 0) {
    valueError.province = "Trường thành không được để trống.";
  }
  if (Object.keys(value.district).length === 0) {
    valueError.district = "Trường quận không được để trống.";
  }
  if (Object.keys(value.ward).length === 0) {
    valueError.ward = "Trường này không được để trống.";
  }
  return valueError;
};

export const handleValueUser = (value) => {
  const valueError = {};
  const regexEmail = /^\S+@\S+\.\S+$/g;

  if (value.image === "") {
    valueError.image = "Ảnh không được để trống";
  }
  if (value.name === "") {
    valueError.name = "Tên không được để trống";
  }
  if (value.email === "") {
    valueError.email = "Email không được để trống";
  } else if (!regexEmail.test(value.email)) {
    valueError.email = "Email không đúng vd:abc@gmail.com";
  }
  return valueError;
};

export const handleValuePassword = (value) => {
  const valueError = {};

  if (value.password === "") {
    valueError.password = "Trường này không được để trống";
  }
  if (value.newPassword === "") {
    valueError.newPassword = "Trường này không được để trống";
  }
  if (value.repeatNewPassword === "") {
    valueError.repeatNewPassword = "Trường này không được để trống";
  } else if (value.repeatNewPassword !== value.newPassword) {
    valueError.repeatNewPassword = "Trường này phải giống mật khẩu mới";
  }
  return valueError;
};
