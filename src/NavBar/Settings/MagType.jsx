import React from "react";
import Form from 'react-bootstrap/Form';
import { useDispatch,useSelector } from "react-redux";
import { setSettings } from "../../redux/userSlice";

const MagType = () => {

    const dispatch = useDispatch();
    const {magType} = useSelector((state) => state.user.settings);

    const handleCheck = (e) => {
        const {value,checked} = e.target;
        //alert(checked)
        if(checked){
            dispatch(setSettings({magType:[...magType,value]}));
        }else{
            dispatch(setSettings({magType:magType.filter((mag) => mag !== value)}));
            //console.log({magType:magType.filter((mag) => mag !== value)})
        }
    }

return(
    <>
    <h6>Filter by type of magnitude:</h6>
     <Form>
      {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="md"
            value={"md"}
            type={type}
            id={`inline-${type}-1`}
            onChange={handleCheck}
            checked={magType.includes("md") && undefined}
            defaultChecked={magType.includes("md")}
          />
          <Form.Check
            inline
            label="ml"
            value="ml"
            type={type}
            id={`inline-${type}-2`}
            onChange={handleCheck}
            checked={magType.includes("ml") && undefined}
            defaultChecked={magType.includes("ml")}
          />
          <Form.Check
            inline
            label="ms"
            value="ms"
            type={type}
            id={`inline-${type}-3`}
            onChange={handleCheck}
            checked={magType.includes("ms") && undefined}
            defaultChecked={magType.includes("ms")}
          />
           <Form.Check
            inline
            label="mw"
            value="mw"
            type={type}
            id={`inline-${type}-4`}
            onChange={handleCheck}
            checked={magType.includes("mw") && undefined}
            defaultChecked={magType.includes("mw")}
          />
           <Form.Check
            inline
            label="me"
            value="me"
            type={type}
            id={`inline-${type}-5`}
            onChange={handleCheck}
            checked={magType.includes("me") && undefined}
            defaultChecked={magType.includes("me")}
          />
           <Form.Check
            inline
            label="mi"
            value="mi"
            type={type}
            id={`inline-${type}-6`}
            onChange={handleCheck}
            checked={magType.includes("mi") && undefined}
            defaultChecked={magType.includes("mi")}
          />
           <Form.Check
            inline
            label="mb"
            value="mb"
            type={type}
            id={`inline-${type}-7`}
            onChange={handleCheck}
            checked={magType.includes("mb") && undefined}
            defaultChecked={magType.includes("mb")}
          />
           <Form.Check
            inline
            label="mlg"
            value="mlg"
            type={type}
            id={`inline-${type}-8`}
            onChange={handleCheck}
            checked={magType.includes("mlg") && undefined}
            defaultChecked={magType.includes("mlg")}
          />
        </div>
      ))}
    </Form>
    </>
)};

export default MagType;