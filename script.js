document.addEventListener('DOMContentLoaded', () => {
    // FileReader API
    const fileInput = document.getElementById('fileInput');
    const fileOutput = document.getElementById('fileOutput');
  
    fileInput.addEventListener('change', (event) => {
      const files = event.target.files;
      fileOutput.innerHTML = '';
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = result;
            img.style.maxWidth = '100px';
            fileOutput.appendChild(img);
          } else {
            const div = document.createElement('div');
            div.textContent = file.name;
            fileOutput.appendChild(div);
          }
        };
        reader.readAsDataURL(file);
      });
    });
  
    // Drag and Drop API
    const dropZone = document.getElementById('dropZone');
    const dragOutput = document.getElementById('dragOutput');
  
    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropZone.classList.add('drag-over');
    });
  
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-over');
    });
  
    dropZone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropZone.classList.remove('drag-over');
      const files = event.dataTransfer.files;
      dragOutput.innerHTML = '';
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = result;
            img.style.maxWidth = '100px';
            dragOutput.appendChild(img);
          } else {
            const div = document.createElement('div');
            div.textContent = file.name;
            dragOutput.appendChild(div);
          }
        };
        reader.readAsDataURL(file);
      });
    });
  
    // Geolocation API
    const getLocationBtn = document.getElementById('getLocation');
    const locationOutput = document.getElementById('locationOutput');
  
    getLocationBtn.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          locationOutput.textContent = `Местоположение: Ширина ${latitude}, Высота ${longitude}`;
        }, (error) => {
          locationOutput.textContent = `Ошибка при получении местоположения: ${error.message}`;
        });
      } else {
        locationOutput.textContent = 'Местоположение не поддерживается этим браузером.';
      }
    });
  
    // Media Devices API
    const startCameraBtn = document.getElementById('startCamera');
    const cameraStream = document.getElementById('cameraStream');
  
    startCameraBtn.addEventListener('click', () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            cameraStream.srcObject = stream;
          })
          .catch((error) => {
            alert(`Ошибка доступа к камере: ${error.message}`);
          });
      } else {
        alert('Камера не поддерживается этим браузером.');
      }
    });
  });
  