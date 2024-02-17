import axios from 'axios';
import React, { useEffect, useState, useReducer } from 'react';
import DropDown from './DropDown';
import Slider from './Slider';
import Row from './Row';

function reducer(state, action) {
  if (action.type === 'technology' && action.payload !== '') {
    console.log('state');
    return { ...state, technology: action.payload };
  }
  if (action.type === 'role' && action.payload !== '') {
    return { ...state, role: action.payload };
  }
  if (action.type === 'experience' && action.payload !== '') {
    return { ...state, experience: action.payload };
  }
  if (action.type === 'ctc' && action.payload !== '') {
    return { ...state, ctc: action.payload };
  }
}

export default function AllJobs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableDta] = useState([]);
  const [state, dispatch] = useReducer(reducer, {ctc: 2});

  useEffect(() => {
    console.log(state, '***');

    if (state) {
      let temp = [...data];
      for (let item in state) {
        if(item === 'role' || item === 'experience'){
          temp = temp.filter(job => job[item] === state[item]);
        }
        if(item === 'technology'){
          temp = temp.filter(job => job[item].includes(state[item]))
        }
        if(item === 'ctc'){
          temp = temp.filter(job => job[item] >= parseInt(state[item]))
        }
        
        console.log(item, state[item], '***');
      }
      console.log(temp, '***sorted');
      setTableDta(temp);
    }
  }, [state, data]);

  async function getData() {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1710/data.json'
      );
      setLoading(false);
      setData(res.data.data);
      setTableDta(res.data.data);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <>
      <div className="p-10 bg-[#1dac88da] flex justify-between w-full items-center">
        <DropDown
          label={'Job Role'}
          id={'role-filter'}
          name={'role'}
          optionParam={'role'}
          data={data}
          handleChange={e => {
            dispatch({ type: 'role', payload: e });
          }}
        />
        <DropDown
          label={'Technology'}
          id={'technology-filter'}
          name={'tech'}
          optionParam={'technology'}
          data={data}
          handleChange={e => {
            dispatch({ type: 'technology', payload: e });
          }}
        />
        <DropDown
          label={'Experience'}
          id={'experience-filter'}
          name={'experience'}
          optionParam={'experience'}
          data={data}
          handleChange={e => {
            dispatch({ type: 'experience', payload: e });
          }}
        />
        <Slider
          label={'CTC'}
          id={'ctc-filter'}
          name={'ctc'}
          optionParam={'ctc'}
          data={data}
          value={state?.ctc || 0}
          handleChange={(e) => {
            dispatch({ type: 'ctc', payload: e });
          }}
        />
      </div>
      <div className="bg-[#a7f5e1da] w-full  flex flex-col items-center justify-center py-8 gap-5 job-list">
        {tableData[0] ? (
          tableData.map(item => (
            <div
              key={item.id}
              className={`w-[80%] h-36 rounded-md shadow-md job-list-${item.id}`}
            >
              <Row data={item} />
            </div>
          ))
        ) : (
          <div className={`w-[80%] h-36 rounded-md shadow-md `}>
            <div className="flex items-center justify-center w-full h-full px-3 bg-white rounded-md">
              No Data Available
            </div>
          </div>
        )}
      </div>
    </>
  );
}
