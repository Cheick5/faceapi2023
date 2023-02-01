import React, { useState } from 'react';
import './InputForm.css';

const InputForm = () => {

  const [listPersonId, setListPersonId] = useState(["listGroupId[0]",123]);
  const [listGroupId, setListGroupId] = useState(["listGroupId[0]",123]);
  const [groupId, setGroupId] = useState(["listGroupId[0]",123]);
  const [personId, setPersonId] = useState(["listPersonId[0]",123]);
  const [image, setImage] = useState(null);

  const handleGroupIdChange = (event) => {
    setGroupId(event.target.value);
  };

  const handlePersonIdChange = (event) => {
    setPersonId(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="input-form">
      <div className="input-group">
        <label className="input-label">
          Group ID:
        </label>
        <select className="input-select" value={groupId} onChange={handleGroupIdChange}>
          {listGroupId.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">
          Person ID:
        </label>
        <select className="input-select" value={personId} onChange={handlePersonIdChange}>
          {listPersonId.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">
          Upload Image:
        </label>
        <input className="input-file" type="file" onChange={handleImageChange} />
      </div>
      <div className="output-group">
        <p className="output-label">Selected Group ID:</p>
        <p className="output-value">{groupId}</p>
      </div>
      <div className="output-group">
        <p className="output-label">Selected Person ID:</p>
        <p className="output-value">{personId}</p>
      </div>
      <div className="output-group">
        <p className="output-label">Selected Image:</p>
        <p className="output-value">{image && image.name}</p>
      </div>
    </div>
  );
};

export default InputForm;