import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";

const SelectBox = ({
  value,
  onChange,
  options = [],
  multiple = false,
  disabled= false,
}) => {

const [isDark, setIsDark] = useState(
  document.documentElement.classList.contains("dark")
);



const optionsArray = (options || []).map(opt => ({
  value: opt,
  label: opt
}));


useEffect(() => {
  const observer = new MutationObserver(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}, []);


  return (
//     <FormControl fullWidth>
//   <Select
//   disabled={disabled}
//     MenuProps={{
//       PaperProps:{
//         style:{
//           maxHeight:'40vh'
//         }
//       }
//     }}
//     displayEmpty
//     multiple={multiple}
//     value={value}
//     onChange={onChange}
//     renderValue={(selected) => {
//       if (multiple) {
//         return selected?.length === 0 ? "Select" : selected?.join(", ");
//       } else {
//         return selected === "" ? "Select" : selected;
//       }
//     }}
//   >
//     {/* Placeholder */}
//     {!multiple && (
//       <MenuItem disabled value="">
//         Select
//       </MenuItem>
//     )}

//     {optionsArray.map((opt, idx) => (
//       <MenuItem key={idx} value={opt.value || opt}>
//         {/* <Checkbox checked={value.includes(opt.value || opt)} /> */}
//         {/* {multiple && <Checkbox checked={Array.isArray(value) && value.includes(opt.value || opt)} />} */}

//          <Checkbox
//               checked={
//                 multiple
//                   ? Array.isArray(value) && value.includes(opt.value)
//                   : value === opt.value
//               }
//             />

//         <ListItemText primary={opt.label || opt} />
//       </MenuItem>
//     ))}
//   </Select>
// </FormControl>


<FormControl fullWidth>
  <Select
    disabled={disabled}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: "40vh",
          backgroundColor: isDark ? "#1f2937" : "#ffffff", // gray-800 : white
          color: isDark ? "#f3f4f6" : "#111827",           // gray-100 : gray-900
        },
      },
    }}
    displayEmpty
    multiple={multiple}
    value={value}
    onChange={onChange}
    renderValue={(selected) => {
      if (multiple) {
        return selected?.length === 0 ? "Select" : selected?.join(", ");
      } else {
        return selected === "" ? "Select" : selected;
      }
    }}
    sx={{
      backgroundColor: isDark ? "#111827" : "#ffffff",   // gray-900 : white
      color: isDark ? "#f3f4f6" : "#111827",             // gray-100 : gray-900
      borderRadius: "8px",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: isDark ? "#4b5563" : "#d1d5db",     // gray-600 : gray-300
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: isDark ? "#6366f1" : "#6366f1",     // indigo-500
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6366f1",                           // indigo-500
      },
      "& .MuiSvgIcon-root": {
        color: isDark ? "#9ca3af" : "#374151",           // gray-400 : gray-700
      },
      "&.Mui-disabled": {
        backgroundColor: isDark ? "#1f2937" : "#f9fafb", // gray-800 : gray-50
        opacity: 0.6,
      },
    }}
  >
    {/* Placeholder */}
    {!multiple && (
      <MenuItem
        disabled
        value=""
        sx={{ color: isDark ? "#6b7280" : "#9ca3af" }}   // gray-500 : gray-400
      >
        Select
      </MenuItem>
    )}

    {optionsArray.map((opt, idx) => (
      <MenuItem
        key={idx}
        value={opt.value || opt}
        sx={{
          color: isDark ? "#f3f4f6" : "#111827",
          "&:hover": {
            backgroundColor: isDark ? "#374151" : "#f3f4f6", // gray-700 : gray-100
          },
          "&.Mui-selected": {
            backgroundColor: isDark ? "#312e81" : "#e0e7ff", // indigo-900 : indigo-100
          },
          "&.Mui-selected:hover": {
            backgroundColor: isDark ? "#3730a3" : "#c7d2fe", // indigo-800 : indigo-200
          },
        }}
      >
        <Checkbox
          checked={
            multiple
              ? Array.isArray(value) && value.includes(opt.value)
              : value === opt.value
          }
          sx={{
            color: isDark ? "#6b7280" : "#9ca3af",           // gray-500 : gray-400
            "&.Mui-checked": {
              color: "#6366f1",                               // indigo-500
            },
          }}
        />
        <ListItemText
          primary={opt.label || opt}
          sx={{ color: isDark ? "#f3f4f6" : "#111827" }}
        />
      </MenuItem>
    ))}
  </Select>
</FormControl>

  );
};

export default SelectBox;
