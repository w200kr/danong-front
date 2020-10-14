

// 뒤로가기 통제
// const stateGenerator = (function* confirmBack(){
//     while(true){
//         console.log('loop')
//         yield (()=>{
//             history.pushState(null, null, '');
//         })()
//     }
// })()
// history.pushState(null, null, '');
// window.onpopstate = function(event) {
//     if (confirm('뒤로가기?')){
//         history.back()
//     }
//     else{
//         stateGenerator.next()
//     }
// };


const strToBool = val => {
    if(typeof val === 'string'){
        if(val==='true')
            return true
        else if(val==='false')
            return false
        // throw new Error("Either true or false but not both")
    }
    // throw new Error("It is not string type")
    return val
}

const checkValue = val=>{
    if (val===undefined || val===null || val===''){
        return false
    }
    return true
}


// fetch()로 부터 반환되는 Promise 객체는 HTTP error 상태를 reject하지 않습니다. 
// HTTP Statue Code가 404나 500을 반환하더라도요. 
// 대신 ok 상태가 false인 resolve가 반환되며, 네트워크 장애나 요청이 완료되지 못한 상태에는 reject가 반환됩니다.
const Fetch = {
    makeUrl: (url)=>{
        if(url[0]==='/'){
            if(process.env.NODE_ENV !== 'production'){
                return 'http://localhost:8000'+url
            }
            // TODO : add my ec2 path
            return 'http://cityhawks-dev.ap-northeast-2.elasticbeanstalk.com'+url
        }
        return url
    },
    getCookie: (name)=>{
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },
    getAuthToken: ()=>{
        const isAuthenticated = strToBool (window.localStorage.getItem('isAuthenticated') );
        const userExist = window.localStorage.getItem('user')!==null;

        if(isAuthenticated && userExist){
            const user = JSON.parse(window.localStorage.getItem('user'));
            if(typeof user.token === 'string' && user.token !== ''){
                return {"Authorization": "Token "+user.token}
            }
        }
        return {}
    },
    getHeaders: function(){
        return {
            "X-CSRFToken": this.getCookie("csrftoken"),
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
            ...this.getAuthToken(),
        }
    },
    errorAlert: response=>{
      let message = "";
      Object.keys(response).map(key=>{
        message += `${key} : ${response[key][0]}\n`;

        return key
      });
      alert(message);

      return;
    },
    // 1. strToBool
    clean: data=>Object.keys(data).reduce((acc, cur, i)=>({
        ...acc, 
        ...{
            [cur]: strToBool(data[cur])
        }
    }), {}),
    get: function (url, options={}){
        if(url===undefined) throw new Error('empty url');
        
        url = this.makeUrl(url);

        return fetch(url, {
            method: 'GET',
            headers: this.getHeaders(),
            ...options,
        }).then(response=>{
            var contentType = response.headers.get('content-type');

            if(response.ok) {
                if(contentType && contentType.includes('application/json')) {
                    return response.json();
                }
                throw new TypeError("Response content type is not json!");
            }
            throw new TypeError("Response is not ok!");
        })
    },
    post: function (url, data={}, options={}){
        if(url===undefined) throw new Error('empty url');
        url = this.makeUrl(url);
        const cleanedData = this.clean(data);

        return fetch(url, {
            method: 'POST',
            headers: this.getHeaders(),
            ...options,
            body: JSON.stringify(cleanedData)
        }).then(response=>{
            var contentType = response.headers.get('content-type');

            if(response.ok) {
                if(contentType && contentType.includes('application/json')) {
                    return response.json();
                }
                throw new TypeError("Response content type is not json!");
            }
            if(contentType && contentType.includes('application/json')) {
                response.json().then(res=>this.errorAlert(res))
            }
            throw new TypeError("Response is not ok!");
        })
        // .catch(err=>{
        //     console.error('There has been a problem with your fetch operation: ', err.message)
        // })
    },
    put: function (url, data={}, options={}){
        if(url===undefined) throw new Error('empty url');
        url = this.makeUrl(url);
        const cleanedData = this.clean(data);

        return fetch(url, {
            method: 'PUT',
            headers: this.getHeaders(),
            ...options,
            body: JSON.stringify(cleanedData)
        }).then(response=>{
            var contentType = response.headers.get('content-type');

            if(response.ok) {
                if(contentType && contentType.includes('application/json')) {
                    return response.json();
                }
                throw new TypeError("Response content type is not json!");
            }
            throw new TypeError("Response is not ok!");
        })
        // .catch(err=>{
        //     console.error('There has been a problem with your fetch operation: ', err.message)
        // })
    },
    delete: function (url, options={}){
        if(url===undefined) throw new Error('empty url');
        url = this.makeUrl(url);

        return fetch(url, {
            method: 'DELETE',
            headers: this.getHeaders(),
            ...options,
        }).then(response=>{
            var contentType = response.headers.get('content-type');

            if(response.ok) {
                if(contentType && contentType.includes('application/json')) {
                    return response.json();
                }
                return response
            }
            throw new TypeError("Response is not ok!");
        })

    },
}

export {Fetch, strToBool, checkValue};