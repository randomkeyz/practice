import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import Table from '../components/Table';
import { firebaseApp } from '../firebase';
import { doc, getDocFromCache } from "firebase/firestore";

const Assets = () => {
    const [, allData] = useOutletContext();
    const [results, setResults] = useState(null);

    // FIRESTORE
    //const docRef = doc(db, "cities", "SF");


    return ( 
        <>
            <div>
                <div>
                    <div>
                        <img />
                        <span>Bitcoin (BTC)</span>
                    </div>
                    <div>
                        <button>+</button>
                        <button>Delete</button>
                    </div>
                </div>
                <div>
                    <input name="shares" type="text" placeholder="Shares" />
                    <input name="price" type="text" placeholder="Initial Purchase Price (Optional)" />
                </div>
            </div>
            <Table rows={allData} />
        </>
    );
}

export default Assets;