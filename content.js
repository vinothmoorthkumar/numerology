
function countSelectedText() {

  const selection = window.getSelection();
  const selectedtext=selection.toString();
  if (selectedtext) {
    // Create a tooltip element dynamically
    const tooltip = document.createElement('div');
    tooltip.classList.add('word-count-tooltip'); // Add CSS class for styling (optional)
    tooltip.textContent = calculateNumericalValue(selectedtext);

    // Position the tooltip accurately above the selection
    const range = selection.getRangeAt(0);
    const rect = range.getClientRects()[0];
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 20}px`;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = "black";
    tooltip.style.border = "1px solid #0000FF";
    tooltip.style.padding = "2px";
    tooltip.style.fontSize="large";
    tooltip.style.color="#ffffff";



    // Append the tooltip to the body and remove on mouseleave
    document.body.appendChild(tooltip);
    document.addEventListener('mouseout', () => {
      if(tooltip){
        document.body.removeChild(tooltip);
      }
    });
  }
}

document.addEventListener('mouseup', countSelectedText);

function calculateNumericalValue(name) {
  const letterValues = {
    'a': 1, 'i': 1, 'j': 1, 'q': 1, 'y': 1,
    'b': 2, 'k': 2, 'r': 2,
    'c': 3, 'g': 3, 'l': 3, 's': 3,
    'd': 4, 'm': 4, 't': 4,
    'e': 5, 'h': 5, 'n': 5, 'x': 5,
    'u': 6, 'v': 6, 'w': 6,
    'o': 7, 'z': 7,
    'f': 8, 'p': 8
  };
  
  let numericalValue = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name[i].toLowerCase();
    if (letterValues[char]) {
      numericalValue += letterValues[char];
    }
  }
  
  // Reduce the number to a single digit
  while (numericalValue > 9) {
    numericalValue = Math.floor(numericalValue / 10) + (numericalValue % 10);
  }
  return numericalValue;
}