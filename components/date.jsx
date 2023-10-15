import { useEffect, useState } from "react"
import {DatePicker} from 'antd';

export default function RowDate(){

    const [value, onChange] = useState(new Date());

    useEffect(()=>{
        console.log(value)
    }
    ,[value])

    return(
        <>
            <div className="">
                
            </div>
        </>
    )
}