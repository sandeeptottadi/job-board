const schedulerCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "999px",
    // padding: "2px",
    borderColor: state.isFocused ? "rgb(59, 130, 246)" : "rgb(203, 213, 225)",
    borderWidth: "1px",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow: state.isFocused ? "0 0 0 1px rgb(59, 130, 246)" : "none",
    borderColor: "rgb(59, 130, 246)",
    "&:hover": {
      borderColor: "rgb(59, 130, 246)",
    },
    "& .react-select__input": {
      border: "none",
      boxShadow: "none",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    // padding: "2px 8px",
  }),
  input: (provided) => ({
    ...provided,
    color: "rgb(15, 23, 42)",
    "&::placeholder": {
      color: "rgb(156, 163, 175)",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#000",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "rgb(15, 23, 42)",
  }),
  multiValue: (provided) => ({
    ...provided,
    color: "#000",
    backgroundColor: "white",
    border: "1px solid rgb(59, 130, 246)",
    borderRadius: "9px",
    marginRight: "2px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    // padding: "2px 6px",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "rgb(100, 116, 139)",
    ":hover": {
      color: "rgb(15, 23, 42)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    borderRadius: "0.375rem",
    overflow: "hidden",
  }),
  menuList: (provided) => ({
    ...provided,
    // padding: "4px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "rgb(243, 244, 246)" : "transparent",
    color: "rgb(15, 23, 42)",
    ":active": {
      backgroundColor: "rgb(229, 231, 235)",
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "rgb(107, 114, 128)",
    ":hover": {
      color: "rgb(55, 65, 81)",
    },
    transition: "all 0.2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "rgb(107, 114, 128)",
    ":hover": {
      color: "rgb(55, 65, 81)",
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "rgb(229, 231, 235)",
  }),
};

export default schedulerCustomStyles;
