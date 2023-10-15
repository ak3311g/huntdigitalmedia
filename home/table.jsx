import { Button, DatePicker } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

export default function Table(){

    const [value, onChange] = useState(null);
    const [exDate, setExDate] = useState(null);
    const [Month, setMonth] = useState("");
    const [Days, setDays] = useState(0);
    const [count, setCount] = useState([0,0]);
    const [data, setData] = useState([{
        id:1,
        startDate: new Date(),
        endDate: new Date(),
        monthYear: new Date(),
        datesExcluded: new Date(),
        numberOfDays: 0,
        leadCount: 0,
        expectedDRR: 0,
        lastUpdated: new Date()
    }]);

    useEffect(()=>{
        if(value!=null){
            console.log(value[1]?.$M+1);
            setMonth(value[1]?.$M+1);
        }
    }
    ,[value])

    useEffect(()=>{
        if(exDate!=null&&value!=null){
            if(exDate[0]>value[0]&&exDate[1]<value[1])
            {
                let div = 86400000;
                let days = value[1]-value[0];
                let totaldays = (days - (exDate[1]-exDate[0]))/div+1;
                setDays(totaldays);
            }
        }
    }
    ,[exDate]);

    function savedata(){
        let temp = data;
        
        temp.push({
            id:1,
            startDate: value[0],
            endDate: value[1],
            monthYear: Month,
            datesExcluded: exDate,
            numberOfDays: Days,
            leadCount: count[0],
            expectedDRR: count[1],
            lastUpdated: new Date()
        })
        setData(temp);
        console.log(data);
    }


    return(
        <>
            <div className="">
                <table className="">
                    <tr className="">
                        <th className="">Action</th>
                        <th className="">ID</th>
                        <th className="">Start Date - End-Date</th>
                        <th className="">Month,Year</th>
                        <th className="">Dates Excluded</th>
                        <th className="">Number of Days</th>
                        <th className="">Lead Count</th>
                        <th className="">Expected DRR</th>
                        <th className="">Last Updated</th>
                    </tr>
                    <tr className="">
                        <td className="">Edit</td>
                        <td className="">1</td>
                        <td className="">
                            <RangePicker onChange={onChange} />
                        </td>
                        <td className="">{Month}</td>
                        <td className="">
                        <RangePicker onChange={setExDate} />
                        </td>
                        <td className="">{Days}</td>
                        <td className="">
                            <input type="number" onChange={(e)=>{setCount([e.target.value,count[1]])}}/>
                        </td>
                        <td className="">
                            <input type="number" onChange={(e)=>{setCount([count[0],e.target.value])}}/>
                        </td>
                        <td className="">
                            <button className="" onClick={savedata}>Save</button>
                            <button className="">Cancel</button>
                        </td>
                    </tr>
                    {/* Print data here */}
                </table>
            </div>
        </>
    )
}