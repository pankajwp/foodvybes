import React from "react";
import Select from "react-select";

const dropDownOpt = [
	{ label: "React", value: "react" },
	{ label: "ReactNative", value: "react-native" },
	{ label: "Js", value: "javascript" },
	{ label: "Css", value: "css" },
	{ label: "HTML", value: "html" },
];

const CustomSelect = (props) => {
	return (
		<div style={props.style}>
			<Select options={dropDownOpt} name={props.name} />
		</div>
	);
};

export default CustomSelect;
