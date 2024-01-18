import React, { useState } from 'react';

const StringifyExample = () => {
  // State to hold an example object
  const [exampleObject, setExampleObject] = useState({
    name: 'John Doe',
    age: 25,
    city: 'Example City',
  });

  // Function to stringify and then parse the object when a button is clicked
  const handleStringify = () => {
    const jsonString = JSON.stringify(exampleObject);
    console.log('Stringified:', jsonString);

    const parsedObject = JSON.parse(jsonString);
    console.log('Parsed Object:', parsedObject);
 
    setExampleObject(parsedObject);
  };

  return (
    <div>
      <h2>Stringify and Parse Example</h2>
      <p>Object to stringify:</p>
      <pre>{JSON.stringify(exampleObject, null, 2)}</pre>

      <button onClick={handleStringify}>Stringify and Parse Object</button>
    </div>
  );
};

export default StringifyExample;


