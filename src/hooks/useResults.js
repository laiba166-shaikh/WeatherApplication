import React,{useState} from 'react';
import axios from 'axios';

export default ()=>{
    const [results,setResults]=useState({});
    const [ErrorMesssage,setErrorMessage]=useState('');

    const apiReq= async (searchTerm)=>{
        try{
            const response= await axios.get(`http://autocomplete.wunderground.com/aq?query=${searchTerm}`);
            setResults(response.data.RESULTS.slice(0,14));
        }
        catch(e){
            setErrorMessage('something went wrong');
        }
    }
    return [apiReq,ErrorMesssage,results];
}