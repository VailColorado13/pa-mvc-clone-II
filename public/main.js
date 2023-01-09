const initApp = () => {
  const droparea = document.querySelector('.droparea');

  const active = () => droparea.classList.add("blue-border");

  const inactive = () => droparea.classList.remove("blue-border");

  const prevents = (e) => e.preventDefault();

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
      droparea.addEventListener(evtName, prevents);
  });

  ['dragenter', 'dragover'].forEach(evtName => {
      droparea.addEventListener(evtName, active);
  });

  ['dragleave', 'drop'].forEach(evtName => {
      droparea.addEventListener(evtName, inactive);
  });

 // droparea.addEventListener("drop", handleDrop);
  droparea.addEventListener("drop", sendToBackend)
}


async function sendToBackend(e){
  console.log('dropped')
  e.preventDefault
  const dt = e.dataTransfer
  const files = dt.files
  const fileArray = Array.from(files)
  const fileContents = []
  const nameArray = []
  
  //create an array of just the names of the files: 
  fileArray.forEach((file) => nameArray.push(file.name))

  //read the data from one of the word docs and save as 'file'
  const file = fileArray[0];
  const reader = new FileReader();
    
  const result = await new Promise((resolve, reject) => {
      reader.onloadend = function() {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsText(file)     
  })

  // fileContents.push(result)
  
  //make post request with data from drop
  const data = {names: nameArray}
  const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    
    fetch('/handleDrop', options)
}



//we want to create a new function here that sends a request to the controller via the router. 

document.addEventListener("DOMContentLoaded", initApp);

const handleDrop = (e) => {
  const dt = e.dataTransfer;
  //Should be able to read the files in the file variable with the word document protocol. 
  const files = dt.files;
  const fileArray = [...files];
  // console.log(files); // FileList
  // console.log(fileArray)

console.log('dropped')


//remove the disabled attribute from the download button
// const button = document.querySelector('input[type="submit"]')
// button.removeAttribute('disabled');

// //add green border to bottom section 
// const downloadArea = document.querySelector('.downloadArea')
// downloadArea.classList.add('green-border')

// // 
// const excelLogo = document.querySelector('.fa-file-excel');
// excelLogo.classList.add('black')

}




