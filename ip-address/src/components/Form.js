import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import "./Form.css";
function Form () {
  const intialValues = { ip: "", value: 0};
  const ip_values = ['16','18','24']
  const [Cust, setCust] = useState(false)
  
  const [value, setvalue] = useState("")
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(formValues);
  };

  //input change handler
  const handleChange = (e) => {
    console.log("e.target",e.target)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelect=(e)=>{
    console.log(e);
    if(e === "custom")
    {
      setCust(true)
      // return (<div>{customformfield}</div>);
    }
    else
    {  for (let i = 0; i < ip_values.length; i++) {
        if (ip_values[i] === e)
        {
          e = {"target":ip_values[i]}
          handleChange(e)

          break;
        }
      }
    }
    
    return
    // setValue(e)
  }

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/g;

    if (!values.ip) {
      errors.ip = "Cannot be blank";
    } else if (!regex.test(values.ip)) {
      errors.ip = "Invalid email format";
    }   
    let val_check = false
    if (!values.value) {
      for (let i = 0; i < values.length; i++) {
        if (ip_values[i] === values.value)
        {
          val_check = true
          break
        }
      }
      
      if (!val_check){errors.value="selected value not in range."}
    }


    // if (!values.password) {
    //   errors.password = "Cannot be blank";
    // } else if (values.password.length < 4) {
    //   errors.password = "Password must be more than 4 characters";
    // }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="success-msg">Form submitted successfully</span>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="ip">Ip address</label>
          <input
            type="ip"
            name="ip"
            id="ip"
            value={formValues.ip}
            onChange={handleChange}
            className={formErrors.ip && "input-error"}
          />
          {formErrors.ip && (
            <span className="error">{formErrors.ip}</span>
          )}
        </div>

        {/* <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            className={formErrors.password && "input-error"}
          />
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
        </div> */}
        <DropdownButton
        alignRight
        title="Dropdown"
        id="values"
        onSelect={handleSelect}
          >
          <Dropdown.Item eventKey="16">16</Dropdown.Item>
          <Dropdown.Item eventKey="18">18</Dropdown.Item>
          <Dropdown.Item eventKey="24">24</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="custom">custom</Dropdown.Item>
        </DropdownButton>
        {Cust?<div className="form-row">
              <label htmlFor="value">Ip address</label>
              <input
                type="value"
                name="value"
                id="value"
                // value={formValues.value}
                onChange={handleChange}
                className={formErrors.value && "input-error"}
              />
              {formErrors.value && (
                <span className="error">{formErrors.value}</span>
              )}
            </div>:null}
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
};


export default Form;
