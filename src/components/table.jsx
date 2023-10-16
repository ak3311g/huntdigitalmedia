import { DatePicker } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

export default function Table() {

    const [value, onChange] = useState(null);
    const [exDate, setExDate] = useState(null);
    const [Month, setMonth] = useState("");
    const [Days, setDays] = useState(0);
    const [count, setCount] = useState([0, 0]);
    const [data, setData] = useState([{}]);

    useEffect(() => {
        if (value != null) {
            console.log(value[1]?.$M + 1);
            setMonth(value[1]?.$M + 1);
        }
    }
        , [value])

    useEffect(() => {
        if (exDate != null && value != null) {
            if (exDate[0] > value[0] && exDate[1] < value[1]) {
                let div = 86400000;
                let days = value[1] - value[0];
                let totaldays = (days - (exDate[1] - exDate[0])) / div + 1;
                setDays(totaldays);
            }
        }
    }
        , [exDate]);


    return (
        <>
            <div className="w-[90vw] text-center overflow-scroll">
                <table className="w-full">
                    <tr className="text-center">
                        <th className="border-[1px] border-black min-w-[80px]">Action</th>
                        <th className="border-[1px] border-black min-w-[50px]">ID</th>
                        <th className="border-[1px] border-black min-w-[300px]">Start Date - End-Date</th>
                        <th className="border-[1px] border-black min-w-[150px]">Month,Year</th>
                        <th className="border-[1px] border-black min-w-[300px]">Dates Excluded</th>
                        <th className="border-[1px] border-black min-w-[100px]">Number of Days</th>
                        <th className="border-[1px] border-black min-w-[100px]">Lead Count</th>
                        <th className="border-[1px] border-black min-w-[100px]">Expected DRR</th>
                        <th className="border-[1px] border-black min-w-[100px]">Last Updated</th>
                    </tr>
                    <tr className="">
                        <td className="border-[1px] border-black"></td>
                        <td className="border-[1px] border-black"></td>
                        <td className="border-[1px] border-black">
                            <RangePicker onChange={onChange} />
                        </td>
                        <td className="border-[1px] border-black">{Month}</td>
                        <td className="border-[1px] border-black">
                            <RangePicker onChange={setExDate} />
                        </td>
                        <td className="border-[1px] border-black">{Days}</td>
                        <td className="border-[1px] border-black">
                            <input type="number" onChange={(e) => { setCount([e.target.value, count[1]]) }} />
                        </td>
                        <td className="border-[1px] border-black">
                            <input type="number" onChange={(e) => { setCount([count[0], e.target.value]) }} />
                        </td>
                        <td className="border-[1px] border-black flex flex-col">
                            <button className="bg-green-500" onClick={
                                () => {
                                    let temp = [...data];
                                    console.log(data);
                                    temp.push({
                                        id: data.length,
                                        startDate: `${value[0]?.$D} / ${value[0].$M} / ${value[0].$y}`,
                                        endDate: `${value[1]?.$D} / ${value[1].$M} / ${value[1].$y}`,
                                        monthYear: Month,
                                        datesExcluded: `${exDate[0].$D} / ${exDate[0].$M} / ${exDate[0].$y}, ${exDate[1].$D} / ${exDate[1].$M} / ${exDate[1].$y}`,
                                        numberOfDays: Days,
                                        leadCount: count[0],
                                        expectedDRR: count[1],
                                        lastUpdated: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                                    })
                                    setData(temp);
                                }
                            }>Save</button>
                            <button className="bg-red-500">Cancel</button>
                        </td>
                    </tr>
                    {/* Print data here */}
                    {
                        data.map((item) => {
                            if (item.id != undefined)
                                return (
                                    <tr className="" key={item.id}>
                                        <td className="border-[1px] border-black">Edit</td>
                                        <td className="border-[1px] border-black">{item.id}</td>
                                        <td className="border-[1px] border-black">{item.startDate} - {item.endDate}</td>
                                        <td className="border-[1px] border-black">{item.monthYear}</td>
                                        <td className="border-[1px] border-black">{item.datesExcluded}</td>
                                        <td className="border-[1px] border-black">{item.numberOfDays}</td>
                                        <td className="border-[1px] border-black">{item.leadCount}</td>
                                        <td className="border-[1px] border-black">{item.expectedDRR}</td>
                                        <td className="border-[1px] border-black">{item.lastUpdated}</td>
                                    </tr>
                                )
                        })
                    }
                </table>
            </div>
        </>
    )
}