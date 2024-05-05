import React,{useState} from 'react'
import './Cards.css'

function Cards({datas}) {

    const [apply, setapply] = useState(false)
    const applied =()=>{
        setapply(!apply)
        alert("You applied for this job!!")
    }
    
  return (
    <>
    <div className="main_container">
        <div className="main_nav">
            <div className="role_cname">
                <span>{datas.jobRole}</span>
                <em>{datas.companyName}</em>
            </div>
            <div className="location">
                <i>{datas.location}</i>
            </div>
        </div>
        <div className="company_logo" style={{"width": "100%"}}>
            <img src={datas.logoUrl} alt="Logo" width={"100px"} />
        </div>
        <br />
        <div className="company_desc">
            {datas.jobDetailsFromCompany}
        </div><br />
        <div className="exp_sal">
            <div className="exp">
                <span>Min Exp : {datas ? datas.minExp: "N/A"}</span>
                <span>Max Exp : {datas ? datas.maxExp: "N/A"}</span>
            </div>
            <div className="sal">
                <span>Code: {datas ? datas.salaryCurrencyCode : "null"}</span>
                <span>Salary: {datas ? datas.maxJdSalary : " null"}</span>
            </div>
        </div>
        <div className="foot">
            {/* <button className='jd_link'>Jd Link</button> */}
            <button className='apply' onClick={applied} disabled={apply}>{apply ? 'applied' : 'apply'}</button>
        </div>
    </div>
    </>
  )
}

export default Cards