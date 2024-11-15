import React, { useEffect } from "react";
import Header from "../components/header";
import axios from "axios";

function JSONtoTable(data: any) {
    if (!Array.isArray(data) || data.length === 0) {
        return <h1>Loading...</h1>
    }
    console.log('DATA IS',data);
    const keys = Object.keys(data[0]);
    return (
        <table className="inventory-table">
            <thead>
                <tr>
                    {keys.map((key: any) => (
                        <th>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item: any) => (
                    <tr>
                        {keys.map((key: any) => (
                            <td>{item[key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default function Inventory() {
    // use effect at initiate
    const [inventory, setInventory] = React.useState([] as any);
    useEffect(() => {
        axios.get('/api/products').then((response) => {
            setInventory(response.data);
            console.log(JSONtoTable(response.data));
        })
    }, [])
    return <>
        <Header />
        {
            Array.isArray(inventory) ?
                JSONtoTable(inventory) :
                <h1>Loading...</h1>
        }
    </>;
}