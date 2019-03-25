let message = {
    loading: ' Загрузка... ',
    success: ' Спасибо! Скоро мы с вами свяжемся! ',
    failure: ' Что-то пошло не так... '
};

let form = document.querySelector(' .main-form'),
    inputForm = form.getElementsByTagName('input')[0],
    input = document.getElementsByName('input'),
    statusMessage = document.createElement('div'),
    inputsPhone = document.querySelectorAll('input[name="phone"]'),
    formFooter = document.getElementById('form');
statusMessage.classList.add('status');

function sendForm(elem) {
    elem.addEventListener('submit', function (e) {
        e.preventDefault();
        elem.appendChild(statusMessage);
        let formData = new FormData(elem);

        function postData(data) {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();

                request.open('POST', 'server.php');

                request.setRequestHeader('Content-type', ' application/x-www-form-urlencoded ');

                request.onreadystatechange = function(){
                  if(request.readyState < 4 ){
                      resolve()
                  } else if (request.readyState === 4){
                      if (request.status == 200 && request.status < 3 ){
                          resolve();
                      }
                      else{
                          reject();
                      }
                  }
                };
                request.send(data);
            });
        }
        //end postdata

        function clearInput(){
            for( let i = 0; i < input.length; i++ ){
                input[i].value = '';
            }
        }
        
        postData(formData)
          .then( () => statusMessage.innerHTML = message.loading  )
          .then( () => {
              statusMessage.innerHTML = '';
          } )
          .catch( () => statusMessage.innerHTML = message.failure  )
          .then(clearInput)

    });

sendForm(form);
sendForm(formFooter);
}

