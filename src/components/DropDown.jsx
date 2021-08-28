import React, { useRef, useState, useEffect } from 'react'

var settingsObject = {
  isSearchable: true,
  canDeleteItems: true,

}

const DropDown = ({dropDownMenuArray = Array, title = String, setDropdownMenuArray, settings = settingsObject}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(title);
  const [dropDown, setDropDown] = useState(mapDropDown(dropDownMenuArray));
  const [searchInput, setSearchInput] = useState('');

  const dropDownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, [])

  function mapDropDown(dropDownArray) {
    return dropDownArray.map((obj, i, list) => {
      return (
      <div
        className='dropdown-item-container'
        key={obj.index}
      >
        <div
          className={list[obj.index].selected ? 'dropdown-item selected' : 'dropdown-item'}
          onClick={(e) => {handleItemClick(e, obj.index, list)}}
        >
          {obj.title}
        </div>
        {
          settings.canDeleteItems &&
          <button
            className='dropdown-item-delete-btn'
            onClick={() => {handleDeleteItem(obj.index, list)}}
          >X</button>
        }
      </div>
      )
    })
  }

  function handleDeleteItem(index, list) {
    var listcopy = list.slice();
    var newArray = [];

    listcopy.splice(index, 1);

    for(var i = 0; i < listcopy.length; i++) {
      var cloneObj = {...listcopy[i]};

      newArray.push(cloneObj);
    }
    setDropdownMenuArray(newArray);
  }

  function handleDropdownHeaderClick() {
    if(isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function handleItemClick(e, index, list = Array) {
    var newList = list.slice();

    for(var i = 0; i < newList.length; i++) {
      if(newList[i].selected === true) {
        newList[i].selected = false;
      }
    }

    newList[index].selected = true;

    setDropdownMenuArray(newList);
    setDropDown(mapDropDown(newList));
    setIsOpen(false);
    setHeaderTitle(e.target.textContent);
  }

  function handleDocumentClick(e) {
    if(dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  function handleSearch(e) {

    if(e.target.value !== '') {
      var results = dropDownMenuArray.filter(obj => {
        return obj.title.includes(e.target.value)
      });

      for(var i = 0; i < results.length; i++) {
        results[i].index = i;
      }

      setDropDown(mapDropDown(results));
    } else {

      var temp = [...dropDownMenuArray];

      for(i = 0; i < temp.length; i++) {
        temp[i].index = i;
      }

      setDropDown(mapDropDown(temp));
    }

    setSearchInput(e.target.value);
  }

  function conditionallyRender() {
    if(settings.isSearchable) {
      if(isOpen) {
        return <div>
          <input
            autoFocus
            className='dropdown-header search-input'
            type="search"
            value={searchInput}
            onChange={(e) => handleSearch(e)}
          />
        </div>
      } else {
        return <div
          className='dropdown-header'
          onClick={() => {handleDropdownHeaderClick()}}
        >
          {headerTitle}
        </div>
      }
    } 

    return <div
      className='dropdown-header'
      onClick={() => {handleDropdownHeaderClick()}}
    >
      {headerTitle}
    </div>
  }

  function duplicateObjectsInArrayOrObject(thingThatNeedsToBeDupped) {
    var thingCopy, thingClone;
  
    if(Array.isArray(thingThatNeedsToBeDupped)) {
      thingCopy = thingThatNeedsToBeDupped.slice();
      thingClone = [];
      for(var i = 0; i < thingCopy.length; i++) {
        var objClone = {...thingCopy[i]}
    
        thingClone.push(objClone);
      }
    } else {
      thingCopy = {...thingThatNeedsToBeDupped};
      thingClone = {};
      for(var j = 0; j < Object.keys(thingCopy).length; j++) {
        var objClone = {...thingCopy[Object.keys(thingCopy)[j]]}
    
        thingClone[Object.keys(thingCopy)[j]] = objClone;
      }
    }
  
    return thingClone;
  }

  return (
    <div className='dropdown' ref={dropDownRef} >

      {
        conditionallyRender()
      }

      {
        isOpen &&
        <div 
          className='dropdown-list'
        >
          {
            dropDown.length === 0 ?
            <div
              className='no-options'
            >Nothing Here</div> :
            dropDown
          }
        </div>
      }
    </div>
  )
}

export default DropDown
