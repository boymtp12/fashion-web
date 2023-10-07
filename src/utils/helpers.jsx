import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const formatPrice = (number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};

export const filterSubCategories = (categories, mainCategory) => {
  const mainCategoryObj = categories.find(
    (category) => category.categoryName.toLowerCase() === mainCategory
  );
  const subCategories = mainCategoryObj && mainCategoryObj.subCategories;
  return subCategories
    ? ["all", ...new Set(subCategories.map((item) => item.categoryName))]
    : ["all"];
};

export const filterColors = (colors) => {
  if (colors.length) {
    const all_colors = [];
    colors.forEach((color) => {
      all_colors.push(color.name);
      return;
    });
    return ["all", ...new Set(all_colors)];
  } else {
    return ["all"];
  }
};

export const getValuesFromItems = (productOptions, type) => {
  const allColorIds = productOptions
    .flatMap((option) => option.items.map((item) => item[type]))
    .filter((value, index, self) => self.indexOf(value) === index);
  return allColorIds;
};

export const isTokenExpired = (token) => {
  try {
    const decodedToken = decode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      // console.log("isTokenExpired", true);
      return true;
    } else {
      // console.log("isTokenExpired", false);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const isUserLoggedIn = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  // console.log("Token", token);
  // console.log("isUserLoggedIn", !isTokenExpired(token));
  return token && !isTokenExpired(token);
};

export const isValidPhoneNumber = (phoneNumber) => {
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phoneNumber);
};

export const toastHelper = (action, message, time) => {
  const toastType = action === "success" ? toast.success : toast.warning;
  return toastType(message, {
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const toastNavigateHelper = (action, message, time, callback) => {
  const toastType = action === "success" ? toast.success : toast.warning;
  return toastType(message, {
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    onClose: callback,
  });
};

export const validatePassword = (password, repeatPassword) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (password !== repeatPassword) {
    return {
      isValid: false,
      errorMessage: "Password confirmation does not match",
    };
  }

  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      errorMessage:
        "The password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, and 1 number",
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
};
