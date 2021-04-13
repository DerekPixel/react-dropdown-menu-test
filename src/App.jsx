import { useState } from 'react';
import './App.css';
import DropDown from './components/DropDown';

function App() {

  const [dropDownList, setDropDownList] = useState(initilizeDropDownListTemp())

  function initilizeDropDownListTemp() {
    var list = [];

    for(var i = 0; i < 10; i++) {
      var obj = {
        title: 'obj' + i,
        index: i,
        selected: false
      };

      list.push(obj);
    }

    return list;
  }
  
  return (
    <div className="App">
      <DropDown dropDownList={dropDownList} title='DropDown List' setDropdownList={(list) => {setDropDownList(list)}} />
    </div>
  );
}

export default App;
