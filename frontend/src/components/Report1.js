import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Fuse from 'fuse.js';

const HourlyStats = () => {

    const [ prop, setProp] = useState();
    const [ renderStatus, setRenderStatus] = useState(false)
    const [query, updateQuery] = useState('');
    const [ dateFuse, setDF] = useState('');
    const [ impressionFuse, setIF] = useState('');
    const [ hourFuse, setHF ] = useState('');
    const [ clicksFuse, setCF] = useState('');
    const [ revenueFuse, setRF] = useState('');
  
    const addInformation = () => {
        axios.get("http://Eqworksyifei-env.eba-58pwepb4.eu-west-1.elasticbeanstalk.com").then((res) => {
          if(res.data){
            setProp(res.data);
            setDF(new Fuse(res.data, {
              keys: [
                'date'
              ],
              threshold: 0.0
            }))
            setIF(new Fuse(res.data, {
              keys: [
                'impressions'
              ],
              threshold: 0.0
            }))
            setHF(new Fuse(res.data, {
              keys: [
                'hour'
              ],
              threshold: 0.0
            }))
            setCF(new Fuse(res.data, {
              keys: [
                'clicks'
              ],
              threshold: 0.0
            }))
            setRF(new Fuse(res.data, {
              keys: [
                'revenue'
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
      if(type=="date"){
        let results = dateFuse.search(query)
        if(results.length == 0){
          alert("No results found")
        }
        setProp(results.map(data=> data.item))
      }else if(type=="impression"){
        let results = impressionFuse.search(query)
        if(results.length == 0){
          alert("No results found")
        }
        setProp(results.map(data=> data.item))
      } else if(type=="clicks"){
        let results = clicksFuse.search(query)
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
        let results = revenueFuse.search(query)
        if(results.length == 0){
          alert("No results found")
        }
        setProp(results.map(data=> data.item))
      }
    }
  }

  return (
    <div style={{marginTop: "10%"}}>
      <h2>Hourly Statistics</h2>
      <input type="text" value={query} onChange={getChange}/>
      <button onClick={()=>{getSearch("date")}}> Search Date </button>
      <button onClick={()=>{getSearch("hour")}}> Search Hours </button>
      <button onClick={()=>{getSearch("impression")}}> Search Impression </button>
      <button onClick={()=>{getSearch("clicks")}}> Search Clicks </button>
      <button onClick={()=>{getSearch("revenue")}}> Search Revenue </button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Hour</TableCell>
            <TableCell>Impression</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        { renderStatus &&
          <TableBody>
          {prop.map((obj, index) => (
              <TableRow key={index}>
              <TableCell>{obj.date}</TableCell>
              <TableCell>{obj.hour}</TableCell>
              <TableCell>{obj.impressions}</TableCell>
              <TableCell>{obj.clicks}</TableCell>
              <TableCell>{obj.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </div>
  );
};

export default HourlyStats;
