import React, { useEffect, useState } from 'react';
import Papa from "papaparse";

const AddData = () => {

    const [dataList, setDataList] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target.file.files[0];
        Papa.parse(file, {
            encoding: "windows-1251",
            header: true,
            complete: function (results) {
                setDataList(results.data);
            }
        });
    };

    useEffect(() => {
        if (dataList.length) {
            fetch('http://192.168.56.85:8055/flows/trigger/5ae72433-e842-46ea-b6aa-a3c8ab33d203', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataList),
            });
        }
	console.log(JSON.stringify(dataList));
    }, [dataList]);

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="file" />
            <button type="submit">Отправить</button>
        </form>
    );
};

export default AddData;