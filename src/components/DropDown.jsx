import React, { useRef, useState, useEffect } from 'react'

const DropDown = ({dropDownMenuArray = Array, title = String, setDropdownArray}) => {

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
          className={obj.selected ? 'dropdown-item selected' : 'dropdown-item'}
          key={obj.index}
          onClick={(e) => {handleItemClick(e, obj.index, list)}}
        >
          {obj.title}
        </div>
      )
    })
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

    setDropdownArray(newList);
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

      setDropDown(mapDropDown(results));
    } else {
      setDropDown(mapDropDown(dropDownMenuArray));
    }

    setSearchInput(e.target.value);
  }

  return (
    <div className='dropdown' ref={dropDownRef} >

      {
        isOpen ?

        <div>
          <input
            autoFocus
            className='dropdown-header'
            type="search"
            value={searchInput}
            onChange={(e) => handleSearch(e)}
          />
        </div>:

        <div
          className='dropdown-header'
          onClick={() => {handleDropdownHeaderClick()}}

        >
          {headerTitle}
        </div>
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
