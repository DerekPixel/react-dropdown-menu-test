import { useState } from 'react';
import './App.css';
import DropDown from './components/DropDown';

function App() {

  const [dropDownList, setDropDownList] = useState(initilizeDropDownListTemp())

  function initilizeDropDownListTemp() {

    var makeArray = false;
    var output;

    if(makeArray) {
      output = [];

      for(let i = 0; i < 10; i++) {
        let obj = {
          title: 'obj' + i,
          index: i,
          selected: false
        };
  
        output.push(obj);
      }
    } else {
      output = {};

      for(let i = 0; i < 10; i++) {
        let obj = {
          title: 'obj' + i,
          index: i,
          selected: false
        };

        output[obj.title] = obj;
      }
    }

    return output;
  }
  
  return (
    <div className="App">
      <DropDown 
        originalDropDownObject={dropDownList} 
        title='DropDown List' 
        setOriginalDropDownObject={(list) => {setDropDownList(list)}}
      />
    </div>
  );
}

export default App;
