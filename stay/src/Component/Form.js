import './Form.css'
import { useState, useEffect } from 'react';
export default function Form() {
    const initialvalue = {
        firstname: "",
        lastname: "",
        roomtype: "",
        foodtype: "",
        mobile: 0,
        email: '',
        age : 0,
        password :"",
    }
    const [formvalue, setFormvalue] = useState(initialvalue);
    const [formerrors, setFormerrors] = useState({});
    const [issubmit, setIssubmit] = useState(false);
    const [parsedata, setparsedata] = useState([])
    const[addarr, setAddarr] = useState([]);



    function handleChange(e) {
        const { name, value } = e.target;
        setFormvalue({ ...formvalue, [name]: value });


    }
        function handleroomtype(e){
            const roomtype = e.target.value;
            // console.log(roomtype)
       setFormvalue({...formvalue, roomtype});
        }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormerrors(validate(formvalue));
        setIssubmit(true);

    }
    function handleClick(){
        console.log(formvalue);
    
    
    }
    useEffect(() => {
console.log(formerrors)
        if (Object.keys(formerrors).length === 0 && issubmit) {
            console.log(formvalue);
            setAddarr((pdata)=>[...pdata,formvalue]);
            setFormvalue(initialvalue);
            setIssubmit(false);
        //    localStorage.setItem("formdata", JSON.stringify(addarr));
        }
    }, [formerrors,issubmit]);

    useEffect(()=>{
        // console.log("final data : ",addarr)
        localStorage.setItem("formdata", JSON.stringify(addarr));
    },[issubmit])


useEffect(()=>{
    let storedData = JSON.parse(localStorage.getItem("formdata")); 
    console.log("parsed data",storedData) 
     setparsedata(...parsedata, storedData);
    
},[addarr])



    const validate = (values) => {
        const errors = {};
        // const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!values.firstname) {
            errors.firstname = "firstname is required";
        }
        if (!values.lastname) {
            errors.lastname = "lastname is required";
        }
        if (!values.email) {
            errors.email = "email is required";
        }
        // else if(regex.test(values.email)){
        //     errors.email ="this is not a valid email";
        // // }
        if (!values.foodtype) {
            errors.foodtype = "choose the foodtype";
        }
        if(!values.roomtype){
            errors.roomtype ="choose the roomtype";
        }
        if (!values.age) {
            errors.age = "enter your age";
        }
        if(!values.password){
            errors.password ="choose the password"
        }
        if (!values.mobile) {
            errors.mobile = "mobile number is required"
        }
        return errors;


    }
    

    
    return (
        <>
            <h1>Book your Room</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className='form-label' for="exfirst"> First Name :
                    <input className="form-control" id="exfirst" type="text" name="firstname" value={formvalue.firstname} onChange={handleChange}></input>
                    <p className='err'>{formerrors.firstname}</p>
                </label>
              </div>
              <div className="mb-3">
                <label className='form-label' for="exlast">Last Name :
                    <input className='form-control' type="text" name="lastname" id="exlast" value={formvalue.lastname} onChange={handleChange}></input>
                    <p className='err'>{formerrors.lastname}</p>
                </label></div>
                <div className="mb-3">
                <label className='form-label'>Age :
                    <input className='form-control' name="age" type="text" placeholder='Minimum age should be 18'value={formvalue.age} onChange={handleChange} ></input> 
                    <p className='err'>{formerrors.age}</p>
                </label>
                </div>
                <div className="mb-3">
                <label className='form-label'> Mobile Number :
                    <input className='form-control' type="number" name="mobile" value={formvalue.mobile} onChange={handleChange} ></input> 
                
                    <p className='err'>{formerrors.mobile}</p>
                </label></div>
                <div className="mb-3">
                <label className='form-label'> Password :
                    <input className='form-control' type="text" name ="password" value={formvalue.password} onChange={handleChange}></input> 
                    <p className='err'>{formerrors.password}</p>
                </label></div>
                <div className="mb-3">
                <label className='form-label'> Email :
                    <input className='form-control' type="text" name="email" value={formvalue.email} onChange={handleChange}></input> 
                    <p className='err'>{formerrors.email}</p>
                </label></div>
                <div className="mb-3">
                <label className='form-label'> Room Type :
                    <select name="roomtype" className='form-control' value={formvalue.roomtype} onChange={handleroomtype}>
                        <option key="a">Select Room Type(Ac/Non AC)</option>
                        <option key="ac" >Ac</option>
                        <option key="non-ac" >Non Ac</option>

                    </select> 
                  
                    <p className='err'>{formerrors.roomtype}</p>
                </label></div>
                <div className="mb-3">
                <label className='form-label'> Food Type :
                    <label> Veg <input type="radio" name="foodtype" value="veg" onChange={handleChange}></input> </label>
                    <label> Non-Veg <input type="radio" name="foodtype" value="non-veg" onChange={handleChange}></input> </label>
                 
                    <p className='err'>{formerrors.foodtype}</p>
                </label> </div>
                <div className="mb-3">
                <label className='form-check-label'> Accept terms
                    <input className='form-check-input' type="checkbox" ></input>
                </label>
                </div>
                <button className="btn btn-primary" type="submit" onClick={handleClick}>Submit</button><br></br>
             

            </form>
          



{/*table Data display*/}

<table className='table'>
            <thead>
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Room Type</th>
                    <th scope="col">FOOD Type</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody className='table-group-divider'>
            {
               
                    
                    addarr.map((data, index) => (
              
            
            <tr key={index}>
                {/* {Object.values(data).map((data)=>( */}
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.roomtype}</td>
                <td>{data.foodtype}</td>
                <td>{data.mobile}</td>
                <td>{data.email}</td>  
             
            </tr>
                    ))

                    }
                

                
          
            </tbody>
            
         
           
        </table>

        </>
    )
}