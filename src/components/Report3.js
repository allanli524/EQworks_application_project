import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Fuse from 'fuse.js';

const HourlyEvents = () => {

    const [ prop, setProp] = useState();
    const [ renderStatus, setRenderStatus] = useState(false)
    const [query, updateQuery] = useState('');
    const [ dateFuse, setDF] = useState('');
    const [ hourFuse, setHF] = useState('');
    const [ eventsFuse, setEF] = useState('');
  
    const addInformation = () => {
        axios.get(process.env.REACT_APP_HOURLYEVENTS).then((res) => {
          if(res.data){
            setProp(res.data);
            setDF(new Fuse(res.data, {
              keys: [
                'date'
              ],
              threshold: 0.0
            }))
            setHF(new Fuse(res.data, {
              keys: [
                'hour'
              ],
              threshold: 0.0
            }))
            setEF(new Fuse(res.data, {
              keys: [
                'events'
              ],
              threshold: 0.0
            }))
            setRenderStatus(true);
          }
        }).catch((error) => {
        console.log(error)
        alert("Request could not be sent, please try again later")
        })
    }

  useEffect(() => {
    addInformation();
  }, [])

  const getChange = ( {target} ) => {
    updateQuery(target.value);
    console.log(query);
  }

  const getSearch = (type) => {
    if(prop){
      if(type == "date"){
        let results = dateFuse.search(query)
        if(results.length == 0){
          alert("No results found")
        }
        setProp(results.map(data=> data.item))
      }else if(type=="hour"){
        let results = hourFuse.search(query)
        if(results.length == 0){
          alert("No results found")
        }
        setProp(results.map(data=> data.item))
      }else{
        let results = eventsFuse.search(query)
        if(results.length == 0){
          alert("No results found")
        }
        setProp(results.map(data=> data.item))
      }
    }
  }

  // const getDate = (date) => {
  //   const d = new Date(date);
  //   return d.toLocaleString()
  // }

  return (
    <div style={{marginTop: "10%"}}>
      <h2>Hourly Events</h2>
      <input type="text" value={query} onChange={getChange}/>
      <button onClick={()=>{getSearch("date")}}> Search Date </button>
      <button onClick={()=>{getSearch("hour")}}> Search Hour </button>
      <button onClick={()=>{getSearch("events")}}> Search Events </button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Hour</TableCell>
            <TableCell>Events</TableCell>
          </TableRow>
        </TableHead>
        { renderStatus &&
          <TableBody>
          {
            prop.map((obj, index) => (
              <TableRow key={index}>
              <TableCell>{obj.date}</TableCell>
              <TableCell>{obj.hour}</TableCell>
              <TableCell>{obj.events}</TableCell>
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </div>
  );
};

export default HourlyEvents;
