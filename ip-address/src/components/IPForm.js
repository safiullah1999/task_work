import { React, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
// import Select from "react-select";
import "./Form.css";

var Netmask = require("netmask").Netmask;

function IPForm() {
  const [Cust, setCust] = useState(false); // when custom option is selecled this state will be set to true.
  const [submit, setsubmit] = useState(false); // when form is submitted this state will be set to True.
  const [selectedvalue, setselectedvalue] = useState(""); // when dropdown value is selected this state will be set to the value selected.
  const initialValues = {
    ip: "",
    custom_value: "",
  };

  const valuesOptions = [
    { value: "16", label: "16" },
    // { value: "18", label: "18" },
    { value: "24", label: "24" },
    { value: "custom", label: "custom" },
  ];
  const ip_values = ["16", "17", "18", "19", "20", "21", "22", "23", "24"];

  const handleSelect = (e) => {
    setsubmit(false); //Set submit is false since validation has not been made. 
    
    if (e === "custom") { // if custom is selected setCust will be set to True so Custom Subnet ID can be selected.
      setCust(true);
    } else { // if custom not selected then this means dropdown value is selected so our selected value is set to the dropdown event value i.e. 'e'
      for (let i = 0; i < ip_values.length; i++) {
        if (ip_values[i] === e) { // we also validate that e should be between 16 to 24.
          setselectedvalue(e);
        }
      }
    }

    return;
  };

  const validate = (values) => {
    let errors = {}; // To return validation errors..

    //Class A: 10.0. 0.0 to 10.255. 255.255.
    // Class B: 172.16. 0.0 to 172.31. 255.255.
    // Class C: 192.168. 0.0 to 192.168. 255.255.
    ///(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)|(^127\.0\.0\.1)$/
    //class A ^(10\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5]\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5]\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5])$
    //class B ^(172\.1[6-9]|2[0-9]|3[0-1|\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5]\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5])$
    //class C ^(192\.168\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5]\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5])$
    //normal ip
    const regex1 =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const custom_regex =
      /^([1][2][8-9]|[1][3-8][0-9]|[1][9][0-2])\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[1-9][0-9]|[0-9]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9]?[0-9][0-9]?)$/;
    //class A (10.0.0.0 | 10.255.255.255)
    const classA =
      /^(10\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5]\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5]\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5])$/;
    //class B (172.16.0.0 | 172.31.255.255)
    const classB =
      /^(172\.1[6-9]|2[0-9]|3[0-1|\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5]\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5])$/;
    //class C (192.168.0.0 | 192.168.255.255)
    const classC =
      /^(192\.168\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5]\.[0-9]|[1-9][0-9]|[1-2][0-5][0-5])$/;
    let temp_custom = "";
    let check_val = false;
    if (!values.ip) {
      errors.ip = "ip is required";
    } else {
      
      if (!regex1.test(values.ip) || !custom_regex.test(values.ip)) {
        console.log("regex check:", custom_regex.test(values.ip), values.ip);
        console.log("first if Invalid ip");
        errors.ip = "Invalid ip";
      }
    }
    if (setselectedvalue && !Cust)
    {
      console.log("custome value:", selectedvalue)
      values.custom_value = selectedvalue
    }
    if (!Cust) {
      values.custom_value = selectedvalue;
    } else {
      if (!values.custom_value) {
        errors.custom_value = "custom value is required";
      } else if (
        values.custom_value &&
        values.custom_value >= "16" &&
        values.custom_value <= "24"
      ) {
        for (let i = 0; i < ip_values.length; i++) {
          if (ip_values[i] === values.custom_value) {
            check_val = true;
          }
        }
        temp_custom = values.custom_value;
      }
      if (check_val === false) {
        errors.custom_value = "Value not in range";
      }
    }
    if (
      (values.ip && custom_regex.test(values.ip)) ||
      values.custom_value ||
      (values.custom_value >= "16" && values.custom_value <= "24")
    ) {
      var octets = values.ip.split(".");
      var base_ip = "";

      if (octets[0] >= "127" && octets[0] <= "192") {
        base_ip = octets[0] + "." + octets[1] + "." + octets[2] + ".0";
        
      } else {
        console.log("fist octet condition failed Invalid ip!!");
        errors.ip = "invalid ip";
      }

      if (ip_values.includes(values.custom_value) && custom_regex.test(values.ip)) {
        var temp_ip = base_ip + "/" + values.custom_value;
        if (custom_regex.test(values.ip)) {
          var block = new Netmask(temp_ip);
          if (!block.contains(values.ip)) {
            errors.ip = "Invalid ip";
          }
        } else {
          console.log(
            "last check Invalid ip:",
            values.ip,
            temp_ip.split("/")[[0]]
          );
          errors.ip = "Invalid ip";
        }
      } else {
        errors.custom_value = "Value not in range";
      }
    }

    return errors;
  };

  const submitForm = (values) => {
    console.log("Data Sent to server:", values);
    setsubmit(true);
    axios
      .post("http://127.0.0.1:8000/postip", values)
      .then((response) => console.log("Response from Server:", response.data));
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik;
        return (
          <div className="container">
            <form className="IPForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="ip">IP Address</label>
                <input
                  type="ip"
                  name="ip"
                  id="ip"
                  value={values.ip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.ip && touched.ip ? "input-error" : null}
                />
                {errors.ip && touched.ip && (
                  <span className="error">{errors.ip}</span>
                )}
              </div>
              <DropdownButton
                title="Dropdown"
                id="values"
                value={values.custom_value}
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="16">16</Dropdown.Item>
                {/* <Dropdown.Item eventKey="18">18</Dropdown.Item> */}
                <Dropdown.Item eventKey="24">24</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="custom">custom</Dropdown.Item>
              </DropdownButton>
              {Cust ? (
                <div className="form-row">
                  <label htmlFor="custom_value">Custom value</label>
                  <input
                    type="custom_value"
                    name="custom_value"
                    id="custom_value"
                    value={values.custom_value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.custom_value && touched.custom_value
                        ? "input-error"
                        : null
                    }
                  />
                  {errors.custom_value && touched.custom_value && (
                    <span className="error">{errors.custom_value}</span>
                  )}
                </div>
              ) : null}

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Submit
              </button>
              {submit ? (
                <span className="submit">submission successful!</span>
              ) : null}
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default IPForm;
