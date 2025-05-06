const formatText = (text) => {
  // Handle numbered lists (1. 2. 3. etc)
  const numberedListRegex = /^\d+\.\s/;
  
  // Handle bullet points (* or - )
  const bulletPointRegex = /^[\*\-]\s/;
  
  // Split the text into lines
  const lines = text.split('\n');
  
  return lines.map((line, index) => {
    // Check if line is a list item
    if (isNumberedList || isBulletList) {
      return (
        <div key={index} className="list-item" style={{ marginTop: '0.5rem', display: 'block' }}>
          {line}
        </div>
      );
    }
    // ...
